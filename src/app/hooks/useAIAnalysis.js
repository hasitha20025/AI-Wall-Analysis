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
    laborCost: 3500,
  });

  // Damage repair costs per square meter in LKR
  // const damageCostRates = {
  //   crack_damage: 1500,
  //   flaking_paint_damage: 1000,
  //   water_damage: 1200,
  //   missing_piece_damage: 1800, 
  // };

  // Damage repair costs per square meter in LKR - calculated dynamically based on material costs
  // More realistic construction-based calculations

  const damageCostRates = useMemo(() => {
    //console.log('Calculating damage rates with material costs:', materialCosts);
    
    // Base material consumption per square meter (realistic quantities)
    const baseConsumption = {
      // Cement consumption in kg per 1m²
      cementPerM2: {
        crack_repair: 2.5,      // Light cement work
        surface_repair: 3.0,     // Surface plastering
        heavy_repair: 5.0        // Structural repair
      },
      // Sand consumption in cubic feet per 1m²
      sandPerM2: {
        crack_repair: 0.8,
        surface_repair: 1.2,
        heavy_repair: 1.8
      },
      // Water consumption in liters per 1m²
      waterPerM2: {
        crack_repair: 8,
        surface_repair: 12,
        heavy_repair: 18
      },
      // Putty consumption in kg per 1m²
      puttyPerM2: {
        surface_finish: 0.8,     // For paint preparation
        crack_filling: 0.5       // For crack sealing
      },
      // Paint consumption in liters per m²
      paintPerM2: {
        single_coat: 0.12,       // Standard coverage
        double_coat: 0.20        // Better finish
      }
    };

    // Calculate costs per damage type based on actual repair requirements (MATERIALS ONLY)
    return {
      // Crack damage: Crack filling + surface repair + painting (materials only)
      crack_damage: 
        (materialCosts.cement / 50) * baseConsumption.cementPerM2.crack_repair +
        (materialCosts.sand / 100) * baseConsumption.sandPerM2.crack_repair +
        materialCosts.water * baseConsumption.waterPerM2.crack_repair +
        materialCosts.putty * baseConsumption.puttyPerM2.crack_filling +
        materialCosts.paint * baseConsumption.paintPerM2.single_coat,

      // Flaking paint: Surface preparation + putty + repainting (materials only)
      flaking_paint_damage:
        materialCosts.putty * baseConsumption.puttyPerM2.surface_finish +
        materialCosts.water * baseConsumption.waterPerM2.surface_repair +
        materialCosts.paint * baseConsumption.paintPerM2.double_coat,

      // Water damage: Surface repair + waterproofing + painting (materials only)
      water_damage:
        (materialCosts.cement / 50) * baseConsumption.cementPerM2.surface_repair +
        (materialCosts.sand / 100) * baseConsumption.sandPerM2.surface_repair +
        materialCosts.water * baseConsumption.waterPerM2.surface_repair +
        materialCosts.putty * baseConsumption.puttyPerM2.surface_finish +
        materialCosts.paint * baseConsumption.paintPerM2.double_coat,
      
      // Missing piece: Structural repair + plastering + painting (materials only)
      missing_piece_damage:
        (materialCosts.cement / 50) * baseConsumption.cementPerM2.heavy_repair +
        (materialCosts.sand / 100) * baseConsumption.sandPerM2.heavy_repair +
        materialCosts.water * baseConsumption.waterPerM2.heavy_repair +
        materialCosts.putty * baseConsumption.puttyPerM2.surface_finish +
        materialCosts.paint * baseConsumption.paintPerM2.double_coat,
    };
  }, [materialCosts]);


  const materialEstimates = (areaInM2) => {
    // Base material consumption per square meter (realistic quantities)
    const baseConsumption = {
      // Cement consumption in kg per 1m²
      cementPerM2: {
        crack_repair: 2.5,      // Light cement work
        surface_repair: 3.0,     // Surface plastering
        heavy_repair: 5.0        // Structural repair
      },
      // Sand consumption in cubic feet per 1m²
      sandPerM2: {
        crack_repair: 0.8,
        surface_repair: 1.2,
        heavy_repair: 1.8
      },
      // Water consumption in liters per 1m²
      waterPerM2: {
        crack_repair: 8,
        surface_repair: 12,
        heavy_repair: 18
      },
      // Putty consumption in kg per 1m²
      puttyPerM2: {
        surface_finish: 0.8,     // For paint preparation
        crack_filling: 0.5       // For crack sealing
      },
      // Paint consumption in liters per m²
      paintPerM2: {
        single_coat: 0.12,       // Standard coverage
        double_coat: 0.20        // Better finish
      }
    };

    // Calculate material estimates per damage type based on actual repair requirements
    return {
      // Crack damage: Crack filling + surface repair + painting
      crack_damage: 
        [('Cement '+ (baseConsumption.cementPerM2.crack_repair * areaInM2)+ ' Kg') ,
        ('Sand '+ (baseConsumption.sandPerM2.crack_repair * areaInM2)+ ' Kg') ,
        ('Water '+ (baseConsumption.waterPerM2.crack_repair * areaInM2)+ ' L') ,
        ('Putty '+ (baseConsumption.puttyPerM2.crack_filling * areaInM2)+ ' Kg') ,
        ('Paint '+ (baseConsumption.paintPerM2.single_coat * areaInM2)+ ' L') ,
        ('Labor Cost LKR '+ materialCosts.laborCost )], // Full labor cost

      // Flaking paint: Surface preparation + putty + repainting
      flaking_paint_damage:
        [('Putty '+ (baseConsumption.puttyPerM2.surface_finish * areaInM2)+ ' Kg') ,
        ('Water '+ (baseConsumption.waterPerM2.surface_repair * areaInM2)+ ' L') ,
        ('Paint '+ (baseConsumption.paintPerM2.double_coat * areaInM2)+ ' L') ,
        ('Labor Cost LKR '+ materialCosts.laborCost )], // Full labor cost

      // Water damage: Surface repair + waterproofing + painting
      water_damage:
        [('Cement '+ (baseConsumption.cementPerM2.surface_repair * areaInM2) + ' Kg'),
        ('Sand '+ (baseConsumption.sandPerM2.surface_repair * areaInM2) + ' Kg'),
        ('Water '+ (baseConsumption.waterPerM2.surface_repair * areaInM2) + ' L'),
        ('Putty '+ (baseConsumption.puttyPerM2.surface_finish * areaInM2) + ' Kg'),
        ('Paint '+ (baseConsumption.paintPerM2.double_coat * areaInM2) + ' L'),
        ('Labor Cost LKR '+ materialCosts.laborCost )], // Full labor cost

      // Missing piece: Structural repair + plastering + painting
      missing_piece_damage:
        [('Cement '+ (baseConsumption.cementPerM2.heavy_repair * areaInM2)+ ' Kg') ,
        ('Sand '+ (baseConsumption.sandPerM2.heavy_repair * areaInM2)+ ' Kg') ,
        ('Water '+ (baseConsumption.waterPerM2.heavy_repair * areaInM2)+ ' L') ,
        ('Putty '+ (baseConsumption.puttyPerM2.surface_finish * areaInM2)+ ' Kg') ,
        ('Paint '+ (baseConsumption.paintPerM2.double_coat * areaInM2)+ ' L') ,
        ('Labor Cost LKR '+ materialCosts.laborCost )] // Full labor cost
    };
  };

  // Define how many pixels represent 1.5 meter (this is based on your camera setup)

  const PIXELS_PER_1_5_METER = 1414; // Example: 1414 pixels = 1.5 meter
  //const PIXELS_PER_2_METER = 1163; // Example: 1163 pixels = 2 meter
  
  const PIXEL_TO_M2 = 1 / (PIXELS_PER_1_5_METER * PIXELS_PER_1_5_METER);

  // Load material costs from localStorage on mount
  useEffect(() => {
    // Only access localStorage on the client side
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('wallAnalysisSettings');
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings);
          console.log('Loading saved settings:', parsed); // Debug log
          setMaterialCosts(parsed);
        }
      } catch (error) {
        console.error('Error loading material costs:', error);
      }
    };

    // Listen for settings updates
    const handleSettingsUpdate = (event) => {
      console.log('Settings updated:', event.detail); // Debug log
      setMaterialCosts(event.detail);
    };

    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      loadSettings();
      window.addEventListener('settingsUpdated', handleSettingsUpdate);
      
      return () => {
        window.removeEventListener('settingsUpdated', handleSettingsUpdate);
      };
    }
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

        const materialRate = damageCostRates[damageType] || 0;
        const materialCost = materialRate * areaInM2;
        const laborCost = materialCosts.laborCost; // Full labor cost
        const estimatedCost = materialCost + laborCost; // Materials + Full Labor
        //const estimatedCost = materialCost ; // Materials cost only

        const materialBreakDownList = materialEstimates(areaInM2)[damageType] || 0;

        return {
          ...prediction,
          pixelArea,
          areaInM2,
          estimatedCost,
          materialBreakDownList,         
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
