"use client";

import { useState } from "react";

export default function DetectionResults({ 
  predictionsList, 
  totalEstimatedCost, 
  onDownloadJson 
}) {
  const [showRawData, setShowRawData] = useState(false);

  if (predictionsList.length === 0) {
    return (
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
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-background-secondary)] rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--color-foreground-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-[var(--color-foreground-tertiary)] font-medium mb-2">No damage detected yet</p>
            <p className="text-sm text-[var(--color-foreground-muted)]">Upload a wall image to start the analysis</p>
          </div>
        </div>
      </div>
    );
  }

  return (
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
            onClick={onDownloadJson}
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
        </div>
      </div>
    </div>
  );
}
