"use client";

import { InferenceEngine, CVImage } from "inferencejs";
import { useEffect, useRef, useState, useMemo } from "react";
import MaterialForm from "./components/material-form";
import HeroSection from "./components/hero-section";
import PreventionGuidelines from "./components/prevention-guidelines";
import GeminiService from "../lib/geminiService";

export default function Home() {
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

  const canvasRef = useRef();

  // Define how many pixels represent 1 meter (this is based on your camera setup)
  const PIXELS_PER_METER = 100; // Example: 100 pixels = 1 meter
  const PIXEL_TO_M2 = 1 / (PIXELS_PER_METER * PIXELS_PER_METER);

  // Damage repair costs per square meter in LKR
  const damageCostRates = {
    crack_damages: 1500,
    flaking_paint_damage: 1000,
    water_damage: 1200,
    missing_piece_damage: 1800,
  };

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

  const handleImageUpload = async (file) => {
    setIsProcessing(true);
    setError(null);
    setPredictionsList([]);
    setUploadedImage(null);
    setPreventionGuidelines(''); // Clear previous guidelines

    try {
      if (!file.type.startsWith("image/"))
        throw new Error("File is not an image");
      if (file.size > 15 * 1024 * 1024)
        throw new Error("Image size exceeds 15MB");

      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setUploadedImage(img);
        // Use setTimeout to ensure canvas is rendered before accessing it
        setTimeout(() => {
          if (canvasRef.current) {
            canvasRef.current.width = img.width;
            canvasRef.current.height = img.height;
            processImage(img);
          } else {
            setError("Canvas not available for processing.");
          }
          setIsProcessing(false);
        }, 100);
      };
      img.onerror = () => {
        setError("Failed to load image.");
        setIsProcessing(false);
      };
    } catch (err) {
      setError(err.message);
      setIsProcessing(false);
    }
  };

  const processImage = (img) => {
    if (!canvasRef.current) {
      setError("Canvas not available for image processing.");
      return;
    }

    const cvImage = new CVImage(img);
    inferEngine
      .infer(modelWorkerId, cvImage)
      .then((predictions) => {
        if (!canvasRef.current) {
          setError("Canvas lost during processing.");
          return;
        }

        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0);

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

        for (const prediction of predictionsWithCost) {
          const { width, height } = prediction.bbox;
          const x = prediction.bbox.x - width / 2;
          const y = prediction.bbox.y - height / 2;

          ctx.strokeStyle = prediction.color || "red";
          ctx.lineWidth = 4;
          ctx.strokeRect(x, y, width, height);

          const label = `${prediction.class} (${Math.round(
            prediction.confidence * 100
          )}%)`;
          ctx.font = "15px monospace";
          const text = ctx.measureText(label);
          ctx.fillStyle = ctx.strokeStyle;
          ctx.fillRect(x - 2, y - 30, text.width + 4, 30);
          ctx.fillStyle = "black";
          ctx.fillText(label, x, y - 10);
        }
      })
      .catch((err) => {
        setError("Image processing failed: " + err.message);
        setPredictionsList([]);
        setUploadedImage(null);
        setIsProcessing(false);
      });
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--color-background)] via-[var(--color-background-secondary)] to-[var(--color-background)]">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Upload Form - Always on Top */}
          <div className="order-1 lg:order-3 mb-12">
            <section id="settings">
              <MaterialForm onSubmit={handleImageUpload} />
            </section>
          </div>
          {/* Only show Image Analysis and Detection Results if an image is uploaded */}
          {uploadedImage && (
            <div className="space-y-8 lg:space-y-12">
              {/* Image Analysis and Detection Results */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column - Image Display */}
                <div className="order-2 lg:order-1">
                  <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-construction-lg border border-[var(--color-border)] overflow-hidden">
                    <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] px-6 py-4">
                      <h3 className="text-lg font-semibold text-white flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Image Analysis
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="relative aspect-video bg-[var(--color-background-secondary)] rounded-2xl overflow-hidden shadow-inner">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={uploadedImage.src}
                          className="w-full h-full object-cover"
                          alt="Wall analysis"
                        />
                        <canvas
                          id="canvas"
                          ref={canvasRef}
                          className="absolute top-0 left-0 w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Column - Results */}
                <div className="order-3 lg:order-2">
                  <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-construction-lg border border-[var(--color-border)] overflow-hidden">
                  <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] px-6 py-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Detection Results
                    </h3>
                  </div>
                  <div className="p-6">
                    {predictionsList.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-background-secondary)] rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-[var(--color-foreground-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <p className="text-[var(--color-foreground-tertiary)] font-medium mb-2">No damage detected yet</p>
                        <p className="text-sm text-[var(--color-foreground-muted)]">Upload a wall image to start the analysis</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Damage List */}
                        <div className="space-y-3">
                          {predictionsList.map((prediction, index) => (
                            <div key={index} className="bg-[var(--color-background-secondary)] rounded-xl p-4 border border-[var(--color-border-light)] hover:shadow-md transition-shadow duration-300">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: prediction.color || "#ef4444" }}></div>
                                  <h4 className="font-semibold text-[var(--color-foreground)] capitalize text-sm md:text-base">
                                    {prediction.class.replace(/_/g, ' ')}
                                  </h4>
                                </div>
                                <span className="text-xs md:text-sm font-medium text-[var(--color-foreground-secondary)] bg-[var(--color-background)] px-2 py-1 rounded-full">
                                  {Math.round(prediction.confidence * 100)}%
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                                <div>
                                  <p className="text-[var(--color-foreground-tertiary)] mb-1">Area</p>
                                  <p className="font-medium text-[var(--color-foreground)]">{prediction.areaInM2.toFixed(4)} m²</p>
                                </div>
                                <div>
                                  <p className="text-[var(--color-foreground-tertiary)] mb-1">Est. Cost</p>
                                  <p className="font-medium text-[var(--color-success)]">LKR {Math.round(prediction.estimatedCost).toLocaleString()}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {predictionsList.length > 0 && (
                          <>
                            {/* Total Cost */}
                            <div className="bg-gradient-to-r from-[var(--color-success)]/10 to-[var(--color-success)]/5 rounded-xl p-6 border border-[var(--color-success)]/20">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-[var(--color-success)] font-medium mb-1 text-sm">Total Repair Cost</p>
                                  <p className="text-2xl md:text-3xl font-bold text-[var(--color-success-dark)]">
                                    LKR {Math.round(totalEstimatedCost).toLocaleString()}
                                  </p>
                                </div>
                                <div className="w-12 h-12 bg-[var(--color-success)]/20 rounded-full flex items-center justify-center">
                                  <span className="text-[var(--color-success)] text-xl">💰</span>
                                </div>
                              </div>
                            </div>
                            {/* Action Buttons */}
                            <button
                              onClick={handleDownloadJson}
                              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span>Download Analysis Report</span>
                            </button>
                            {/* Raw Data Toggle */}
                            <details className="group">
                              <summary className="cursor-pointer bg-[var(--color-background-secondary)] hover:bg-[var(--color-background-tertiary)] rounded-xl px-4 py-3 transition-colors duration-300 list-none">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-[var(--color-foreground-secondary)] text-sm">View Raw Analysis Data</span>
                                  <svg className="w-4 h-4 text-[var(--color-foreground-tertiary)] group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </summary>
                              <div className="mt-3 bg-[var(--color-primary-dark)] rounded-xl p-4 max-h-64 overflow-y-auto">
                                <pre className="text-xs text-[var(--color-success)] whitespace-pre-wrap break-words font-mono">
                                  {JSON.stringify(predictionsList, null, 2)}
                                </pre>
                              </div>
                            </details>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                </div>
              </div>
              
              {/* Prevention Guidelines Section - Full Width */}
              <PreventionGuidelines
                damageTypes={predictionsList}
                onGenerateGuidelines={handleGenerateGuidelines}
                isGenerating={isGeneratingGuidelines}
                guidelines={preventionGuidelines}
                onGenerateSpecificAdvice={handleGenerateSpecificAdvice}
                onGenerateMaintenanceSchedule={handleGenerateMaintenanceSchedule}
              />
            </div>
          )}
        </div>
      </div>

      {/* Processing Loading Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-[var(--color-backdrop)] backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm mx-4 text-center shadow-construction-lg border border-[var(--color-border)]">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[var(--color-background-tertiary)]"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[var(--color-accent)] border-t-transparent absolute top-0"></div>
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">Analyzing Image</h3>
            <p className="text-sm text-[var(--color-foreground-secondary)]">AI is detecting wall damage patterns...</p>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-md mx-4">
          <div className="bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 rounded-2xl p-6 shadow-construction-lg backdrop-blur-sm">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[var(--color-error)]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-[var(--color-error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--color-error)] mb-1">Analysis Failed</h4>
                <p className="text-[var(--color-error-dark)] text-sm">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
