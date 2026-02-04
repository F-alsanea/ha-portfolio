
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
// Fixed the error by importing EXPERIENCES_DATA instead of the non-existent EXPERIENCES
import { EXPERIENCES_DATA } from '../constants.tsx';
import GlassCard from './GlassCard';
import { Theme } from '../types';

interface TimelineProps {
  theme: Theme;
  // Added lang prop to ensure consistency with the application's multi-language support
  lang: 'en' | 'ar';
}

const ExperienceTimeline: React.FC<TimelineProps> = ({ theme, lang }) => {
  const isDark = theme === 'dark';
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Use localized data based on the provided language prop
  const experiences = EXPERIENCES_DATA[lang] || EXPERIENCES_DATA.en;

  return (
    <div ref={containerRef} className="relative py-12">
      {/* Central Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
        <motion.div 
          style={{ scaleY: pathLength, originY: 0 }}
          className={`absolute inset-0 ${isDark ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]' : 'bg-indigo-600'}`}
        />
      </div>

      <div className="space-y-16">
        {experiences.map((exp, index) => (
          <div key={exp.id} className={`flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            {/* Timeline Dot */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-20 border-2 ${
                isDark ? 'bg-slate-900 border-indigo-500' : 'bg-white border-indigo-600'
              }`}
            />
            
            <div className="w-full md:w-1/2 px-8 md:px-12">
              <GlassCard theme={theme} delay={index * 0.1}>
                {/* Wrapped content in padding for better UI presentation inside the glass card */}
                <div className="p-8">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                    {exp.period}
                  </span>
                  <h3 className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>{exp.role}</h3>
                  <p className={`text-lg font-semibold mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className={`text-sm flex items-start gap-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${isDark ? 'bg-indigo-500' : 'bg-indigo-400'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
