"use client";

import { useRef } from "react";
import MaterialForm from "./components/material-form";
import HeroSection from "./components/hero-section";
import PreventionGuidelines from "./components/prevention-guidelines";
import ImageAnalysisCanvas from "./components/image-analysis-canvas";
import DetectionResults from "./components/detection-results";
import LoadingOverlay from "./components/loading-overlay";
import ErrorAlert from "./components/error-alert";
import { useAIAnalysis } from "./hooks/useAIAnalysis";

export default function Home() {
  const canvasRef = useRef();
  
  const {
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
  } = useAIAnalysis();

  const onImageUpload = async (file) => {
    try {
      const img = await handleImageUpload(file);
      
      // Auto-start analysis after successful upload
      setTimeout(() => {
        if (canvasRef.current && modelWorkerId) {
          canvasRef.current.getCanvas().width = img.width;
          canvasRef.current.getCanvas().height = img.height;
          
          processImage(img, canvasRef).then((predictionsWithCost) => {
            if (predictionsWithCost.length > 0) {
              canvasRef.current.drawPredictions(img, predictionsWithCost);
            }
          });
        } else {
          setIsProcessing(false);
          if (!modelWorkerId) {
            clearError();
            setTimeout(() => {
              setError("AI model is still loading. Please wait a moment and try again.");
            }, 100);
          }
        }
      }, 100);
    } catch (err) {
      // Error already handled in the hook
    }
  };

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
              <MaterialForm onSubmit={onImageUpload} />
            </section>
          </div>
          
          {/* Only show Image Analysis and Detection Results if an image is uploaded */}
          {uploadedImage && (
            <div className="space-y-8 lg:space-y-12">
              {/* Image Analysis and Detection Results */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column - Image Display */}
                <div className="order-2 lg:order-1">
                  <ImageAnalysisCanvas
                    ref={canvasRef}
                    uploadedImage={uploadedImage}
                    predictions={predictionsList}
                    damageCostRates={damageCostRates}
                  />
                </div>
                
                {/* Right Column - Results */}
                <div className="order-3 lg:order-2">
                  <DetectionResults
                    predictionsList={predictionsList}
                    totalEstimatedCost={totalEstimatedCost}
                    onDownloadJson={handleDownloadJson}
                  />
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

      {/* Loading Overlay */}
      <LoadingOverlay 
        isVisible={isProcessing}
        title="Analyzing Image"
        subtitle="AI is detecting wall damage patterns..."
      />

      {/* Error Alert */}
      <ErrorAlert 
        error={error}
        onClose={clearError}
      />
    </main>
  );
}
