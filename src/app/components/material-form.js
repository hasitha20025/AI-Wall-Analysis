// I:\FromGit\Wall-Damage-Analysis-and-Cost-Estimation-project\src\app\components\material-form.js
"use client";

import { useState } from "react";

export default function MaterialForm({ onSubmit }) {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file && onSubmit) {
      onSubmit(file);
    }
  }; 

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white/95 backdrop-blur-sm shadow-construction-lg rounded-3xl border border-[var(--color-border)] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-dark)] rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-1">Upload Wall Image</h2>
              <p className="text-[var(--color-foreground-muted)] text-sm">AI-powered damage detection & cost analysis</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Upload Area */}
          <div className="space-y-4">
            <label htmlFor="image" className="block text-lg font-semibold text-[var(--color-foreground)] mb-3">
              Select Image for Analysis
            </label>
            
            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">📸 Photo Guidelines for Best Results</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><strong>Image Resolution:</strong> Upload image with upto (1512×2688) pixels for optimal analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><strong>Distance:</strong> Take photo from (1.5 or 2.0) meters away from the wall</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><strong>Lighting:</strong> Ensure good lighting and avoid shadows on the wall</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><strong>Focus:</strong> Keep the camera steady and ensure the wall is in focus</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* File Input Area */}
            <div className="relative">
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              
              {/* Custom Upload UI */}
              <div className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                file
                  ? "border-[var(--color-success)] bg-[var(--color-success)]/5"
                  : "border-[var(--color-border-dark)] hover:border-[var(--color-accent)] bg-[var(--color-background-secondary)]"
              }`}>
                <div className="text-center">
                  {file ? (
                    <>
                      <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-success)] rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold text-[var(--color-success)] mb-2">Image Selected!</p>
                      <p className="text-sm text-[var(--color-foreground-secondary)] mb-4 break-all">{file.name}</p>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="text-sm text-[var(--color-error)] hover:text-[var(--color-error-dark)] underline transition-colors duration-300"
                      >
                        Remove file
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 mx-auto mb-6 bg-[var(--color-background-tertiary)] rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-[var(--color-foreground-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-xl font-semibold text-[var(--color-foreground)] mb-3">
                        Drop your wall image here
                      </p>
                      <p className="text-sm text-[var(--color-foreground-secondary)] mb-4">
                        or click to browse • Supports JPG, PNG, WebP
                      </p>
                      <p className="text-xs text-[var(--color-foreground-tertiary)]">
                        Maximum file size: 10MB • Follow the photo guidelines above for best results
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-[var(--color-ai-primary)]/10 rounded-xl border border-[var(--color-ai-primary)]/20">
              <div className="w-10 h-10 mx-auto mb-3 bg-[var(--color-ai-primary)]/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--color-ai-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="text-xs font-medium text-[var(--color-ai-primary)]">AI Detection</p>
              <p className="text-xs text-[var(--color-foreground-tertiary)] mt-1">Advanced algorithms</p>
            </div>
            
            <div className="text-center p-4 bg-[var(--color-success)]/10 rounded-xl border border-[var(--color-success)]/20">
              <div className="w-10 h-10 mx-auto mb-3 bg-[var(--color-success)]/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <p className="text-xs font-medium text-[var(--color-success)]">Cost Analysis</p>
              <p className="text-xs text-[var(--color-foreground-tertiary)] mt-1">Accurate estimates</p>
            </div>
            
            <div className="text-center p-4 bg-[var(--color-accent)]/10 rounded-xl border border-[var(--color-accent)]/20">
              <div className="w-10 h-10 mx-auto mb-3 bg-[var(--color-accent)]/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-xs font-medium text-[var(--color-accent)]">Detailed Report</p>
              <p className="text-xs text-[var(--color-foreground-tertiary)] mt-1">Professional output</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!file}
            className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform ${
              file
                ? "bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)] hover:from-[var(--color-accent-dark)] hover:to-[var(--color-accent)] text-white shadow-construction hover:shadow-construction-lg hover:scale-[1.02] active:scale-[0.98]"
                : "bg-[var(--color-background-tertiary)] text-[var(--color-foreground-muted)] cursor-not-allowed"
            }`}
          >
            {file ? (
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Analyze Wall Damage</span>
              </div>
            ) : (
              "Please select an image to continue"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
