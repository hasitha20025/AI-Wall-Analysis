// I:\FromGit\Wall-Damage-Analysis-and-Cost-Estimation-project\src\app\components\footer.js
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from '../../../public/logo.png'; // Adjust the path as necessary

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('');

  // Set current year on client side to prevent hydration mismatch
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);
  return (
    <footer className="bg-[var(--color-primary-dark)] border-t border-[var(--color-border-dark)]">
      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <Image
                  src={logo}
                  alt="Wall Analyzer Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                  priority
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Wall Damage Analysis and Cost Estimation</h3>
                <p className="text-[var(--color-foreground-muted)] text-sm">AI-Powered Damage Detection</p>
              </div>
            </div>
            <p className="text-[var(--color-foreground-muted)] text-sm leading-relaxed">
              Advanced AI technology for accurate wall damage detection and cost estimation. Making property assessment faster and more reliable.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <div className="space-y-3">
              <a href="#features" className="block text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 text-sm">
                Features
              </a>
              <a href="#how-it-works" className="block text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 text-sm">
                How It Works
              </a>
              <a href="#pricing" className="block text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 text-sm">
                Pricing
              </a>
              <a href="#about" className="block text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 text-sm">
                About Us
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6">Support</h4>
            <div className="space-y-3">
              <a href="#help" className="block text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 text-sm">
                Help Center
              </a>
              <a href="#contact" className="block text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 text-sm">
                Contact Us
              </a>
              <a href="#api" className="block text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 text-sm">
                API Documentation
              </a>
              <a href="#status" className="block text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 text-sm">
                System Status
              </a>
            </div>
          </div>

          {/* Connect */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6">Connect</h4>
            <p className="text-[var(--color-foreground-muted)] text-sm mb-4 leading-relaxed">
              Stay updated with our latest features and improvements.
            </p>
            <div className="flex space-x-3">
              {/* Email Contact */}
              <a href="mailto:contact@wallanalyzer.com" className="w-10 h-10 bg-[var(--color-secondary-dark)] rounded-lg flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors duration-300 group" title="Email Us">
                <svg className="w-5 h-5 text-[var(--color-foreground-muted)] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              
              {/* Phone Contact */}
              <a href="tel:+1234567890" className="w-10 h-10 bg-[var(--color-secondary-dark)] rounded-lg flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors duration-300 group" title="Call Us">
                <svg className="w-5 h-5 text-[var(--color-foreground-muted)] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              
              {/* Documentation/Guide */}
              <a href="#documentation" className="w-10 h-10 bg-[var(--color-secondary-dark)] rounded-lg flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors duration-300 group" title="Documentation">
                <svg className="w-5 h-5 text-[var(--color-foreground-muted)] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
              
              {/* GitHub/Code Repository */}
              <a href="#github" className="w-10 h-10 bg-[var(--color-secondary-dark)] rounded-lg flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors duration-300 group" title="GitHub Repository">
                <svg className="w-5 h-5 text-[var(--color-foreground-muted)] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              
              {/* Newsletter/Updates */}
              <a href="#newsletter" className="w-10 h-10 bg-[var(--color-secondary-dark)] rounded-lg flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors duration-300 group" title="Newsletter">
                <svg className="w-5 h-5 text-[var(--color-foreground-muted)] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </a>
              
              {/* Support/Chat */}
              <a href="#support" className="w-10 h-10 bg-[var(--color-secondary-dark)] rounded-lg flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors duration-300 group" title="Live Support">
                <svg className="w-5 h-5 text-[var(--color-foreground-muted)] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-border-dark)] bg-[var(--color-primary-dark)]/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-[var(--color-foreground-muted)] text-sm">
              © {currentYear || '2024'} WallAnalyzer. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#privacy" className="text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#terms" className="text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#cookies" className="text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors duration-300">
                Cookie Policy
              </a>
              {/* Scroll to top button */}
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-8 h-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center hover:bg-[var(--color-accent-dark)] transition-colors duration-300 group"
                aria-label="Scroll to top"
              >
                <svg className="w-4 h-4 text-white group-hover:transform group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
