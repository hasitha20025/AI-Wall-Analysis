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
      <section className="relative bg-gray-100 flex items-center justify-center min-h-screen pt-16 lg:pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-section.png"
            alt="Wall Analysis Background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
          {/* Gradient overlay from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center flex flex-col items-center justify-center min-h-[80vh]">
            <h1 className="heading-main text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
              AI Wall Analysis
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100 mb-8 max-w-4xl mx-auto leading-relaxed px-4 drop-shadow-xl">
              Professional wall damage detection and cost estimation powered by advanced AI technology
            </p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm sm:text-base text-white mb-10">
              <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
                <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg"></div>
                <span className="font-medium">Instant Detection</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
                <div className="w-3 h-3 bg-sky-400 rounded-full shadow-lg"></div>
                <span className="font-medium">Cost Analysis</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
                <div className="w-3 h-3 bg-violet-400 rounded-full shadow-lg"></div>
                <span className="font-medium">Professional Reports</span>
              </div>
            </div>
            <button
              onClick={handleGetStarted}
              className="inline-block px-12 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg sm:text-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black/20 transform hover:scale-105 hover:-translate-y-1"
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
            {/* Damage Type 1: crack_damage - #8ACC00 (Darker lime green) */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/Crack_Damage.jpeg"
                alt="Crack Damage"
                width={224}
                height={224}
                className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-full shadow-lg mb-6 mx-auto"
                style={{ border: '3px solid #8ACC00' }}
                priority
              />
              <h3 className="heading-main text-lg sm:text-xl font-bold mb-3" style={{ color: '#8ACC00' }}>Crack Damage</h3>
              <p className="text-[var(--color-foreground-secondary)] text-sm sm:text-base leading-relaxed">Detect cracks and deformations affecting structural integrity.</p>
            </div>
            {/* Damage Type 2: flaking_paint_damage - #7B3FCC (Darker purple) */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/Flaking_Paint_Damage.jpeg"
                alt="Flaking Paint Damage"
                width={224}
                height={224}
                className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-full shadow-lg mb-6 mx-auto"
                style={{ border: '3px solid #7B3FCC' }}
              />
              <h3 className="heading-main text-lg sm:text-xl font-bold mb-3" style={{ color: '#7B3FCC' }}>Flaking Paint Damage</h3>
              <p className="text-[var(--color-foreground-secondary)] text-sm sm:text-base leading-relaxed">Analyze and categorize paint deterioration in various materials.</p>
            </div>
            {/* Damage Type 3: missing_piece_damage - #CC2A4A (Darker pink/red) */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/Missing_Piece_Damage.webp"
                alt="Missing Piece Damage"
                width={224}
                height={224}
                className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-full shadow-lg mb-6 mx-auto"
                style={{ border: '3px solid #CC2A4A' }}
              />
              <h3 className="heading-main text-lg sm:text-xl font-bold mb-3" style={{ color: '#CC2A4A' }}>Missing Piece Damage</h3>
              <p className="text-[var(--color-foreground-secondary)] text-sm sm:text-base leading-relaxed">Detect and estimate areas where wall material is missing or fallen off.</p>
            </div>
            {/* Damage Type 4: water_damage - #1FCC99 (Darker teal) */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/Water_Damage.jpg"
                alt="Water Damage"
                width={224}
                height={224}
                className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-full shadow-lg mb-6 mx-auto"
                style={{ border: '3px solid #1FCC99' }}
              />
              <h3 className="heading-main text-lg sm:text-xl font-bold mb-3" style={{ color: '#1FCC99' }}>Water Damage</h3>
              <p className="text-[var(--color-foreground-secondary)] text-sm sm:text-base leading-relaxed">Identify moisture-related damages in buildings.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
