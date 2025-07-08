"use client";

import { useRef, useImperativeHandle, forwardRef } from "react";

const ImageAnalysisCanvas = forwardRef(({ uploadedImage, predictions, damageCostRates }, ref) => {
  const canvasRef = useRef();
  
  // Define how many pixels represent 1 meter (this is based on your camera setup)
  const PIXELS_PER_1_5_METER = 1414; // Example: 1414 pixels = 1.5 meter
  //const PIXELS_PER_2_METER = 1163; // Example: 1163 pixels = 2 meter
  
  const PIXEL_TO_M2 = 1 / (PIXELS_PER_1_5_METER * PIXELS_PER_1_5_METER);

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
    drawPredictions: (img, predictions) => {
      if (!canvasRef.current) return;

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

      return predictionsWithCost;
    }
  }));

  return (
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
          {uploadedImage && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
});

ImageAnalysisCanvas.displayName = "ImageAnalysisCanvas";

export default ImageAnalysisCanvas;
