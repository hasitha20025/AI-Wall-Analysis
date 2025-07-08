"use client";

export default function LoadingOverlay({ isVisible, title = "Analyzing Image", subtitle = "AI is detecting wall damage patterns..." }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-[var(--color-backdrop)] backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-sm mx-4 text-center shadow-construction-lg border border-[var(--color-border)]">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[var(--color-background-tertiary)]"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[var(--color-accent)] border-t-transparent absolute top-0"></div>
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">{title}</h3>
        <p className="text-sm text-[var(--color-foreground-secondary)]">{subtitle}</p>
      </div>
    </div>
  );
}
