import React from "react";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 fixed top-0 left-0 w-full text-white shadow-2xl z-50 border-b border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 lg:h-20">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🏗️</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl xl:text-2xl font-bold text-white"> 
                Wall Damage Analysis and Cost Estimation
              </h1>
              <p className="text-xs lg:text-sm text-gray-400">AI-Powered Cost Estimation</p>
            </div>
          </div>

          {/* Mobile Title */}
          <div className="sm:hidden flex-1 text-center">
            <h1 className="text-sm font-bold text-white">Wall Damage Analysis and Cost Estimation</h1>
          </div>

          {/* Settings Button */}
          <a
            href="#settings"
            className="group relative p-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/70 transition-all duration-300 border border-slate-600/30 hover:border-orange-500/50"
            aria-label="Settings"
          >
            <svg className="w-5 h-5 text-gray-300 group-hover:text-orange-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>
      </div>
      
      {/* Subtle gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
    </header>
  );
}
