import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';

interface BackgroundProps {
  theme: Theme;
}

const Background: React.FC<BackgroundProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const isTwilight = theme === 'twilight';

  // Mobile check for extreme simplification
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden theme-transition bg-transparent pointer-events-none">
      {/* Mesh Gradient Orbs - Simplified for Mobile */}
      <motion.div
        animate={isMobile ? {} : {
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className={`absolute -top-[10%] -left-[10%] w-[100vw] h-[100vw] rounded-full ${isMobile ? 'blur-[80px] opacity-20' : 'blur-[120px] opacity-30'}`}
        style={{
          background: `radial-gradient(circle, ${isTwilight ? '#7c3aed' : isDark ? '#4f46e5' : '#c7d2fe'} 0%, transparent 70%)`,
          willChange: isMobile ? 'auto' : 'transform, opacity'
        }}
      />
      <motion.div
        animate={isMobile ? {} : {
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={`absolute -bottom-[10%] -right-[10%] w-[80vw] h-[80vw] rounded-full ${isMobile ? 'blur-[80px] opacity-15' : 'blur-[120px] opacity-25'}`}
        style={{
          background: `radial-gradient(circle, ${isTwilight ? '#ec4899' : isDark ? '#10b981' : '#a5f3fc'} 0%, transparent 70%)`,
          willChange: isMobile ? 'auto' : 'transform, opacity'
        }}
      />

      {/* Grid Overlay - Static and ultra-light */}
      <div
        className={`absolute inset-0 opacity-[0.02] ${isDark || isTwilight ? 'invert-0' : 'invert'}`}
        style={{
          backgroundImage: `linear-gradient(to right, #6366f111 1px, transparent 1px), linear-gradient(to bottom, #6366f111 1px, transparent 1px)`,
          backgroundSize: '120px 120px',
        }}
      />

      {/* Dynamic Background Color Layer */}
      <div className={`absolute inset-0 transition-colors duration-700 -z-20 ${isTwilight ? 'bg-[#0f0720]' : isDark ? 'bg-slate-950' : 'bg-slate-50'
        }`} />
    </div>
  );
};

export default React.memo(Background);