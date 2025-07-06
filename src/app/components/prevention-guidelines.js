import { useState, useEffect } from 'react';

const PreventionGuidelines = ({ 
  damageTypes, 
  onGenerateGuidelines, 
  isGenerating, 
  guidelines,
  onGenerateSpecificAdvice,
  onGenerateMaintenanceSchedule 
}) => {
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);

  // Auto-generate guidelines when damage types change
  useEffect(() => {
    if (damageTypes.length > 0 && !guidelines && !isGenerating && !isAutoGenerating) {
      setIsAutoGenerating(true);
      onGenerateGuidelines();
      setIsAutoGenerating(false);
    }
  }, [damageTypes, guidelines, isGenerating, isAutoGenerating, onGenerateGuidelines]);

  const formatText = (text) => {
    if (!text) return '';
    
    // Convert markdown-style formatting to HTML
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^#{1,6}\s(.+)$/gm, '<h3 class="text-lg font-semibold text-[var(--color-foreground)] mt-4 mb-2">$1</h3>')
      .replace(/^-\s(.+)$/gm, '<li class="ml-4 mb-1">$1</li>')
      .replace(/^\d+\.\s(.+)$/gm, '<li class="ml-4 mb-1">$1</li>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  };

  if (damageTypes.length === 0) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-construction-lg border border-[var(--color-border)] overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] px-6 py-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Prevention Guidelines
          </h3>
        </div>
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-background-secondary)] rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--color-foreground-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-[var(--color-foreground-tertiary)] font-medium mb-2">No damage detected</p>
          <p className="text-sm text-[var(--color-foreground-muted)]">Upload an image with detected damage to get prevention guidelines</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-construction-lg border border-[var(--color-border)] overflow-hidden">
      <div className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] px-6 py-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          AI Prevention Guidelines
        </h3>
      </div>

      <div className="p-6">
        {/* Content Display - Auto-generated Guidelines */}
        <div className="bg-[var(--color-background-secondary)] rounded-xl p-4 min-h-[300px]">
          {isGenerating || isAutoGenerating ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-4 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-[var(--color-foreground-secondary)] font-medium">Generating AI-powered prevention guidelines...</p>
            </div>
          ) : guidelines ? (
            <div 
              className="prose prose-sm max-w-none text-[var(--color-foreground)]"
              dangerouslySetInnerHTML={{ __html: formatText(guidelines) }}
            />
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-4 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-[var(--color-foreground-secondary)] font-medium">AI guidelines will appear automatically when damage is detected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreventionGuidelines;
