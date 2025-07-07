"use client";

import { useState, useEffect, useMemo } from "react";
import { InferenceEngine, CVImage } from "inferencejs";
import GeminiService from "../../lib/geminiService";

export function useAIAnalysis() {
  const inferEngine = useMemo(() => new InferenceEngine(), []);
  const geminiService = useMemo(() => new GeminiService(), []);
  
  const [modelWorkerId, setModelWorkerId] = useState(null);
  const [modelLoading, setModelLoading] = useState(false);
  const [predictionsList, setPredictionsList] = useState([]);
  const [error, setError] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preventionGuidelines, setPreventionGuidelines] = useState('');
  const [isGeneratingGuidelines, setIsGeneratingGuidelines] = useState(false);
  const [materialCosts, setMaterialCosts] = useState({
    cement: 1800,
    sand: 9000,
    water: 15,
    putty: 400,
    paint: 600,
    laborCost: 2500,
  });

  // Damage repair costs per square meter in LKR
  // const damageCostRates = {
  //   crack_damage: 1500,
  //   flaking_paint_damage: 1000,
  //   water_damage: 1200,
  //   missing_piece_damage: 1800, 
  // };
  
  // Damage repair costs per square meter in LKR - calculated dynamically based on material costs
  const damageCostRates = {
    crack_damage: materialCosts.cement*0.2 + materialCosts.sand*0.04 + materialCosts.water*5 + materialCosts.putty*0.1 + materialCosts.paint*0.1 + materialCosts.laborCost*1,
    flaking_paint_damage: materialCosts.putty*0.1 + materialCosts.paint*0.2 + materialCosts.laborCost*1,
    water_damage: materialCosts.putty*0.1 + materialCosts.paint*0.2 + materialCosts.laborCost*1,
    missing_piece_damage: materialCosts.cement*0.5 + materialCosts.sand*0.04 + materialCosts.water*5 + materialCosts.putty*0.1 + materialCosts.paint*0.2 + materialCosts.laborCost*1, 
  };

  // Define how many pixels represent 1.5 meter (this is based on your camera setup)

  const PIXELS_PER_1_5_METER = 1414; // Example: 1414 pixels = 1.5 meter
  const PIXELS_PER_2_METER = 1163; // Example: 1163 pixels = 2 meter
  
  const PIXEL_TO_M2 = 1 / (PIXELS_PER_1_5_METER * PIXELS_PER_1_5_METER);

  // Load material costs from localStorage on mount
  useEffect(() => {
    // Only access localStorage on the client side
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('wallAnalysisSettings');
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings);
          setMaterialCosts(parsed);
        }
      } catch (error) {
        console.error('Error loading material costs:', error);
      }
    };

    // Listen for settings updates
    const handleSettingsUpdate = (event) => {
      setMaterialCosts(event.detail);
    };

    loadSettings();
    window.addEventListener('settingsUpdated', handleSettingsUpdate);
    
    return () => {
      window.removeEventListener('settingsUpdated', handleSettingsUpdate);
    };
  }, []);

  // Initialize AI model
  useEffect(() => {
    if (!modelLoading) {
      setModelLoading(true);
      inferEngine
        .startWorker(
          "wall-damage-detection",
          "1",
          process.env.NEXT_PUBLIC_INFERENCE_API_KEY
        )
        .then((id) => setModelWorkerId(id))
        .catch((err) => setError("Failed to load model: " + err.message));
    }
  }, [inferEngine, modelLoading]);

  const processImage = async (img, canvasRef) => {
    if (!canvasRef.current) {
      setError("Canvas not available for image processing.");
      setIsProcessing(false);
      return [];
    }

    try {
      const cvImage = new CVImage(img);
      const predictions = await inferEngine.infer(modelWorkerId, cvImage);
      
      if (!canvasRef.current) {
        setError("Canvas lost during processing.");
        setIsProcessing(false);
        return [];
      }

      const predictionsWithCost = predictions.map((prediction) => {
        const { width, height } = prediction.bbox;
        const pixelArea = width * height;
        const areaInM2 = pixelArea * PIXEL_TO_M2;
        const damageType = prediction.class;
        const rate = damageCostRates[damageType] || 0;
        const estimatedCost = rate * areaInM2;

        return {
          ...prediction,
          pixelArea,
          areaInM2,
          estimatedCost,
        };
      });

      setPredictionsList(predictionsWithCost);
      setIsProcessing(false);
      return predictionsWithCost;
    } catch (err) {
      setError("Image processing failed: " + err.message);
      setPredictionsList([]);
      setUploadedImage(null);
      setIsProcessing(false);
      return [];
    }
  };

  const handleImageUpload = async (file) => {
    setIsProcessing(true);
    setError(null);
    setPredictionsList([]);
    setUploadedImage(null);
    setPreventionGuidelines('');

    try {
      if (!file.type.startsWith("image/"))
        throw new Error("File is not an image");
      if (file.size > 15 * 1024 * 1024)
        throw new Error("Image size exceeds 15MB");

      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        
        img.onload = () => {
          setUploadedImage(img);
          resolve(img);
        };
        
        img.onerror = () => {
          const error = new Error("Failed to load image.");
          setError(error.message);
          setIsProcessing(false);
          reject(error);
        };
      });
    } catch (err) {
      setError(err.message);
      setIsProcessing(false);
      throw err;
    }
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(predictionsList, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "predictions.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Gemini API Functions
  const handleGenerateGuidelines = async () => {
    if (predictionsList.length === 0) {
      setError("No damage detected to generate guidelines for.");
      return;
    }

    setIsGeneratingGuidelines(true);
    setError(null);

    try {
      const guidelines = await geminiService.generatePreventionGuidelines(predictionsList);
      setPreventionGuidelines(guidelines);
    } catch (error) {
      setError("Failed to generate prevention guidelines: " + error.message);
    } finally {
      setIsGeneratingGuidelines(false);
    }
  };

  const handleGenerateSpecificAdvice = async (damageType, confidence, areaSize, estimatedCost) => {
    try {
      const advice = await geminiService.generateSpecificAdvice(damageType, confidence, areaSize, estimatedCost);
      return advice;
    } catch (error) {
      setError("Failed to generate specific advice: " + error.message);
      throw error;
    }
  };

  const handleGenerateMaintenanceSchedule = async (damageTypes) => {
    try {
      const schedule = await geminiService.generateMaintenanceSchedule(damageTypes);
      return schedule;
    } catch (error) {
      setError("Failed to generate maintenance schedule: " + error.message);
      throw error;
    }
  };

  const totalEstimatedCost = predictionsList.reduce(
    (acc, p) => acc + p.estimatedCost,
    0
  );

  const clearError = () => setError(null);

  return {
    // State
    modelWorkerId,
    predictionsList,
    error,
    uploadedImage,
    isProcessing,
    preventionGuidelines,
    isGeneratingGuidelines,
    totalEstimatedCost,
    damageCostRates,
    materialCosts,
    
    // Actions
    handleImageUpload,
    processImage,
    handleDownloadJson,
    handleGenerateGuidelines,
    handleGenerateSpecificAdvice,
    handleGenerateMaintenanceSchedule,
    clearError,
    setError,
    setIsProcessing
  };
}
