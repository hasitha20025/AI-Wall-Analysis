"use client";

export default function ErrorAlert({ error, onClose }) {
  if (!error) return null;

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-md mx-4">
      <div className="bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 rounded-2xl p-6 shadow-construction-lg backdrop-blur-sm">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-[var(--color-error)]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-[var(--color-error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-[var(--color-error)] mb-1">Analysis Failed</h4>
            <p className="text-[var(--color-error-dark)] text-sm">{error}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="w-6 h-6 bg-[var(--color-error)]/20 rounded-full flex items-center justify-center hover:bg-[var(--color-error)]/30 transition-colors duration-200"
              aria-label="Close error"
            >
              <svg className="w-3 h-3 text-[var(--color-error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
