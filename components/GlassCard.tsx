
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  theme: Theme;
  delay?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', theme, delay = 0 }) => {
  const isDark = theme === 'dark';
  const isTwilight = theme === 'twilight';
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group rounded-[2rem] p-[1px] overflow-hidden ${className}`}
    >
      {/* Hover Glow Border */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${
            isTwilight ? 'rgba(167, 139, 250, 0.4)' : isDark ? 'rgba(99, 102, 241, 0.4)' : 'rgba(99, 102, 241, 0.2)'
          }, transparent 70%)`,
        }}
      />

      <div className={`relative h-full w-full rounded-[1.95rem] overflow-hidden backdrop-blur-2xl border transition-colors duration-500 ${
        isTwilight
        ? 'bg-purple-900/10 border-purple-500/20 shadow-2xl shadow-purple-950/40'
        : isDark 
        ? 'bg-slate-900/40 border-white/5 shadow-2xl shadow-black/40' 
        : 'bg-white/60 border-slate-200/50 shadow-xl shadow-slate-100/50'
      }`}>
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default GlassCard;
