// HeroSection.js
import { useRef } from "react";

import Image from "next/image";

export default function HeroSection() {
  const scrollRef = useRef(null);

  // Scroll to upload form when button is clicked
  const handleGetStarted = () => {
    const el = document.getElementById("settings");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <section className="flex items-center justify-center min-h-screen pt-16 lg:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center flex flex-col items-center justify-center min-h-[80vh]">
            <h1 className="heading-main text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-[var(--color-primary-dark)] leading-tight">
              AI Wall Analysis
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[var(--color-foreground-secondary)] mb-8 max-w-4xl mx-auto leading-relaxed px-4">
              Professional wall damage detection and cost estimation powered by advanced AI technology
            </p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm sm:text-base text-[var(--color-foreground-tertiary)] mb-10">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[var(--color-success)] rounded-full"></div>
                <span>Instant Detection</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[var(--color-ai-primary)] rounded-full"></div>
                <span>Cost Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[var(--color-accent)] rounded-full"></div>
                <span>Professional Reports</span>
              </div>
            </div>
            <button
              onClick={handleGetStarted}
              className="inline-block px-10 py-5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-bold text-lg sm:text-xl shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-light)] focus:ring-offset-2 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Damage Types Section */}
      <section className="bg-[var(--color-background-secondary)] py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-main text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-tight">Damage Types</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Damage Type 1: crack_damage - #D6FF00 */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/Crack_Damage.jpeg"
                alt="Crack Damage"
                width={224}
                height={224}
                className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-full shadow-lg mb-6 mx-auto"
                style={{ border: '3px solid #D6FF00' }}
                priority
              />
              <h3 className="heading-main text-lg sm:text-xl font-bold mb-3" style={{ color: '#D6FF00' }}>Crack Damage</h3>
              <p className="text-[var(--color-foreground-secondary)] text-sm sm:text-base leading-relaxed">Detect cracks and deformations affecting structural integrity.</p>
            </div>
            {/* Damage Type 2: flaking_paint_damage - #A259FF */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/Flaking_Paint_Damage.jpeg"
                alt="Flaking Paint Damage"
                width={224}
                height={224}
                className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-full shadow-lg mb-6 mx-auto"
                style={{ border: '3px solid #A259FF' }}
              />
              <h3 className="heading-main text-lg sm:text-xl font-bold mb-3" style={{ color: '#A259FF' }}>Flaking Paint Damage</h3>
              <p className="text-[var(--color-foreground-secondary)] text-sm sm:text-base leading-relaxed">Analyze and categorize paint deterioration in various materials.</p>
            </div>
            {/* Damage Type 3: missing_piece_damage - #FF3864 */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/Missing_Piece_Damage.webp"
                alt="Missing Piece Damage"
                width={224}
                height={224}
                className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-full shadow-lg mb-6 mx-auto"
                style={{ border: '3px solid #FF3864' }}
              />
              <h3 className="heading-main text-lg sm:text-xl font-bold mb-3" style={{ color: '#FF3864' }}>Missing Piece Damage</h3>
              <p className="text-[var(--color-foreground-secondary)] text-sm sm:text-base leading-relaxed">Detect and estimate areas where wall material is missing or fallen off.</p>
            </div>
            {/* Damage Type 4: water_damage - #2FF3E0 */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/Water_Damage.jpg"
                alt="Water Damage"
                width={224}
                height={224}
                className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-full shadow-lg mb-6 mx-auto"
                style={{ border: '3px solid #2FF3E0' }}
              />
              <h3 className="heading-main text-lg sm:text-xl font-bold mb-3" style={{ color: '#2FF3E0' }}>Water Damage</h3>
              <p className="text-[var(--color-foreground-secondary)] text-sm sm:text-base leading-relaxed">Identify moisture-related damages in buildings.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
