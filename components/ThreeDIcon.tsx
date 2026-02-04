
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Network, GraduationCap } from 'lucide-react';
import { Theme } from '../types';

type IconType = 'rocket' | 'neural' | 'grad';

interface ThreeDIconProps {
  type: IconType;
  theme: Theme;
  className?: string;
}

const ThreeDIcon: React.FC<ThreeDIconProps> = ({ type, theme, className = "" }) => {
  const isDark = theme === 'dark';

  const iconMap = {
    rocket: <Rocket className="w-8 h-8 md:w-10 md:h-10" />,
    neural: <Network className="w-8 h-8 md:w-10 md:h-10" />,
    grad: <GraduationCap className="w-8 h-8 md:w-10 md:h-10" />,
  };

  const palette = {
    rocket: {
      color: isDark ? 'text-indigo-400' : 'text-indigo-600',
      glow: isDark ? 'bg-indigo-500/30 shadow-indigo-500/50' : 'bg-indigo-100 shadow-indigo-200',
      gradient: 'from-indigo-500/20 to-blue-500/10'
    },
    neural: {
      color: isDark ? 'text-emerald-400' : 'text-emerald-600',
      glow: isDark ? 'bg-emerald-500/30 shadow-emerald-500/50' : 'bg-emerald-100 shadow-emerald-200',
      gradient: 'from-emerald-500/20 to-teal-500/10'
    },
    grad: {
      color: isDark ? 'text-blue-400' : 'text-blue-600',
      glow: isDark ? 'bg-blue-500/30 shadow-blue-500/50' : 'bg-blue-100 shadow-blue-200',
      gradient: 'from-blue-500/20 to-indigo-500/10'
    }
  };

  const styles = palette[type];

  return (
    <motion.div
      whileHover={{ 
        scale: 1.15, 
        rotateY: 15,
        rotateX: -10,
        z: 50 
      }}
      animate={{ 
        y: [0, -12, 0],
        rotateX: [0, 5, -5, 0],
        rotateY: [0, -5, 5, 0],
      }}
      transition={{ 
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        scale: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      className={`relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl border transition-all duration-500 group ${className} ${
        isDark ? 'bg-slate-900/40 border-white/10' : 'bg-white/60 border-slate-200 shadow-lg'
      } backdrop-blur-md`}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
    >
      {/* Dynamic Pulsating Glow Layer */}
      <motion.div 
        animate={{ 
          opacity: [0.2, 0.45, 0.2],
          scale: [0.95, 1.1, 0.95],
        }}
        transition={{ 
          duration: 3.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute inset-0 blur-3xl rounded-full ${styles.glow} pointer-events-none`} 
      />
      
      {/* 3D Stacked Structural Layers */}
      <div 
        className={`absolute inset-2 rounded-xl bg-gradient-to-br ${styles.gradient} opacity-50`} 
        style={{ transform: 'translateZ(-15px)' }} 
      />
      
      <div 
        className={`absolute inset-0 rounded-2xl border border-white/10 opacity-60`} 
        style={{ transform: 'translateZ(10px)' }} 
      />

      {/* Main Icon Content */}
      <motion.div 
        className={`relative z-10 transition-colors group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] ${styles.color}`}
        style={{ transform: 'translateZ(20px)' }}
      >
        {iconMap[type]}
      </motion.div>
      
      {/* Reactive High-End Light Sweep Reflection */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none">
        <motion.div 
          animate={{ x: ['-150%', '250%'] }}
          transition={{ 
            duration: 1.8, 
            repeat: Infinity, 
            repeatDelay: 0.5,
            ease: "circInOut" 
          }}
          className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[35deg]"
        />
      </div>

      {/* Subtle Bottom Shadow */}
      <div 
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-1 bg-black/20 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ transform: 'translateZ(-10px)' }}
      />
    </motion.div>
  );
};

export default ThreeDIcon;
