import React, { useState, useEffect, useMemo, memo, Suspense, lazy } from 'react';
import { motion, AnimatePresence, Variants, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
  Languages, Moon, Sun, Download, Eye,
  Linkedin, Mail, TrendingUp, Users,
  X, GraduationCap, Briefcase, MapPin,
  FileText, Share2, BarChart3, Settings, Zap, Star, Home, Code, Database
} from 'lucide-react';
import Background from './components/Background';
import GlassCard from './components/GlassCard';
import CountUp from './components/CountUp';
import { Theme } from './types';
import { EXPERIENCES_DATA, EDUCATIONS_DATA, SKILLS_DETAILED, PILLARS, TRUST_TOOLS } from './constants.tsx';

// Performance: Lazy load the heavy modal to keep initial load small
const PortfolioModal = lazy(() => import('./components/PortfolioModal'));

const LINKEDIN_URL = "https://www.linkedin.com/in/hayamazen96";

const contentDictionary = {
  en: {
    brand: "Haya Alharbi",
    role: "Marketing Specialist & Team Lead",
    tagline: "Bridging Data Analytics & Creative Strategy to Drive Scalable Growth.",
    heroTitle: "Strategic Growth",
    summary: "Leveraging an international academic foundation from Colorado State University to implement global marketing standards in the Saudi market.",
    cta: "Build Your Growth Strategy",
    viewResume: "View Portfolio",
    download: "Download PDF",
    print: "Print CV",
    skillsHeader: "Expertise Spectrum",
    expHeader: "Success History",
    eduHeader: "The Strategic Edge",
    email: "hayamazen96@gmail.com",
    trustLabel: "Masters the Tools of the Trade",
    achievements: [
      { label: "Revenue Growth", value: 15, suffix: "%+", icon: TrendingUp, id: 'growth' },
      { label: "Salesforce Accuracy", value: 98, suffix: "%", icon: Database, id: 'crm' },
      { label: "Team Leadership", value: 5, suffix: "+ Experts", icon: Users, id: 'team' },
    ],
    nav: [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'experience', label: 'Impact', icon: Briefcase },
      { id: 'skills', label: 'Expertise', icon: Code },
      { id: 'resume', label: 'Portfolio', icon: FileText }
    ],
    loadingMsg: "Compiling Growth Analytics...",
    close: "Close"
  },
  ar: {
    brand: "هيا الحربي",
    role: "أخصائية تسويق وقائدة فريق",
    tagline: "قيادة النمو الرقمي من خلال الدقة التحليلية والاستراتيجيات التسويقية المبتكرة.",
    heroTitle: "النمو الاستراتيجي",
    summary: "الاستفادة من أساس أكاديمي دولي من جامعة كولورادو ستيت لتطبيق المعايير التسويقية العالمية في السوق السعودي.",
    cta: "لنبدأ في بناء استراتيجية نموك",
    viewResume: "استعراض الملف المهني",
    download: "تحميل PDF",
    print: "طباعة",
    skillsHeader: "نطاق الخبرة",
    expHeader: "سجل النجاحات",
    eduHeader: "الميزة الاستراتيجية",
    email: "hayamazen96@gmail.com",
    trustLabel: "أدوات التميز التقني",
    achievements: [
      { label: "نمو الإيرادات", value: 15, suffix: "%+", icon: TrendingUp, id: 'growth' },
      { label: "دقة بيانات سيلز فورس", value: 98, suffix: "%", icon: Database, id: 'crm' },
      { label: "قيادة الفريق", value: 5, suffix: "+ خبراء", icon: Users, id: 'team' },
    ],
    nav: [
      { id: 'home', label: 'الرئيسية', icon: Home },
      { id: 'experience', label: 'الأثر', icon: Briefcase },
      { id: 'skills', label: 'الخبرة', icon: Code },
      { id: 'resume', label: 'السيرة', icon: FileText }
    ],
    loadingMsg: "جاري تجميع تحليلات النمو...",
    close: "إغلاق"
  }
};

const MiniBarChart = memo(() => (
  <div className="flex items-end gap-1.5 h-16 w-32 justify-center transform-gpu">
    {[20, 50, 35, 80, 55, 95, 40].map((h, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        animate={{ height: `${h}%` }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1, ease: "easeInOut" }}
        className="flex-1 bg-gradient-to-t from-indigo-500/10 to-indigo-500/60 rounded-t-lg"
      />
    ))}
  </div>
));

const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 100, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 25 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseXVal = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseYVal = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseXVal);
    y.set(mouseYVal);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`${className} will-change-transform transform-gpu backface-hidden`}
      style={{
        rotateX: window.innerWidth >= 1024 ? rotateX : 0,
        rotateY: window.innerWidth >= 1024 ? rotateY : 0,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

const InfiniteMarquee: React.FC<{ isRTL: boolean; theme: Theme }> = memo(({ isRTL, theme }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const marqueeData = useMemo(() => [...TRUST_TOOLS, ...TRUST_TOOLS, ...TRUST_TOOLS], []);

  return (
    <div className="relative w-full overflow-hidden py-8 lg:py-16">
      <div className="absolute inset-y-0 left-0 w-16 lg:w-48 z-10 pointer-events-none no-print"
        style={{ background: `linear-gradient(to right, ${theme === 'light' ? '#f8fafc' : theme === 'twilight' ? '#0f0720' : '#020617'} 0%, transparent 100%)` }} />
      <div className="absolute inset-y-0 right-0 w-16 lg:w-48 z-10 pointer-events-none no-print"
        style={{ background: `linear-gradient(to left, ${theme === 'light' ? '#f8fafc' : theme === 'twilight' ? '#0f0720' : '#020617'} 0%, transparent 100%)` }} />

      <motion.div
        className="flex gap-8 lg:gap-24 w-max items-center transform-gpu will-change-transform"
        animate={{ x: isRTL ? [0, 800] : [0, -800] }}
        transition={{
          duration: isMobile ? 40 : 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {marqueeData.map((tool, i) => (
          <div key={i} className="flex items-center gap-4 group/tool cursor-default shrink-0 backface-hidden">
            <div
              className={`p-4 lg:p-7 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md grayscale group-hover/tool:grayscale-0 group-hover/tool:scale-110 transition-all duration-500`}
              style={{ color: tool.color, borderColor: `${tool.color}33` }}
            >
              <tool.icon className="w-8 h-8 lg:w-10 lg:h-10" />
            </div>
            <span className={`text-base lg:text-2xl font-bold opacity-30 group-hover/tool:opacity-100 group-hover/tool:text-indigo-500 transition-all ${isRTL ? 'font-ar' : ''}`}>
              {tool.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
});

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [theme, setTheme] = useState<Theme>('twilight');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const t = useMemo(() => contentDictionary[lang], [lang]);
  const isRTL = lang === 'ar';

  // Performance: Hide splash screen once React has taken over
  useEffect(() => {
    const splash = document.getElementById('splash');
    if (splash) {
      splash.classList.add('fade-out');
      const timer = setTimeout(() => splash.remove(), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'twilight'];
    const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const handleOpenResume = () => {
    setIsLoadingResume(true);
    setTimeout(() => {
      setIsLoadingResume(false);
      setIsResumeOpen(true);
    }, 600);
  };

  const reveal: Variants = {
    hidden: { opacity: 0, y: window.innerWidth < 768 ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: window.innerWidth < 1024 ? 0.2 : 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={`min-h-screen theme-transition selection:bg-indigo-500/30 overflow-x-hidden ${theme === 'twilight' ? 'text-purple-100' : theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
      }`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Optimized Background: Conditionally render or simplify for mobile if needed */}
      <Background theme={theme} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[60] p-4 lg:p-8 no-print pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            className={`flex items-center gap-3 pointer-events-auto cursor-default transition-all ${isRTL ? 'font-ar text-xl flex-row-reverse' : 'text-lg font-bold'}`}
          >
            <div className="w-9 h-9 lg:w-12 lg:h-12 bg-indigo-600 rounded-xl lg:rounded-2xl flex items-center justify-center text-white text-lg lg:text-xl shadow-xl shadow-indigo-600/20 shrink-0">H</div>
            <span className="tracking-tighter whitespace-nowrap">{t.brand}</span>
          </motion.div>

          <div className="flex gap-2 lg:gap-3 pointer-events-auto">
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="px-4 py-2 lg:px-6 lg:py-3 bg-indigo-600 text-white rounded-xl shadow-lg text-[10px] lg:text-xs font-black hover:scale-105 active:scale-95 transition-all flex items-center gap-2 uppercase tracking-widest"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'AR' : 'EN'}</span>
            </button>
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shadow-lg border backdrop-blur-3xl hover:scale-105 active:scale-95 transition-all ${theme === 'twilight' ? 'bg-purple-900/40 text-purple-400 border-purple-500/20' :
                theme === 'dark' ? 'bg-slate-900/40 text-indigo-400 border-white/5' :
                  'bg-white/90 text-indigo-600 border-slate-200'
                }`}
            >
              {theme === 'light' ? <Sun className="w-5 h-5" /> : theme === 'dark' ? <Moon className="w-5 h-5" /> : <Star className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* FIXED BOTTOM NAVIGATION - Mobile Priority */}
      <nav className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden no-print pb-[env(safe-area-inset-bottom)] px-4">
        <div className={`mx-auto mb-6 max-w-sm flex justify-around items-center backdrop-blur-3xl rounded-[2.5rem] p-2 border shadow-2xl transition-all duration-500 ${theme === 'twilight' ? 'bg-purple-900/80 border-purple-500/30 shadow-purple-900/30' :
          theme === 'dark' ? 'bg-slate-900/80 border-white/10 shadow-black/40' :
            'bg-white/95 border-slate-200 shadow-slate-200/40'
          }`}>
          {t.nav.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'resume') {
                  handleOpenResume();
                } else {
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection(item.id);
                }
              }}
              className={`p-3.5 rounded-[1.2rem] transition-all flex flex-col items-center gap-0.5 ${activeSection === item.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 scale-105' : 'text-slate-400 opacity-70'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className={`text-[7.5px] font-bold uppercase tracking-widest ${isRTL ? 'font-ar' : ''}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-5 sm:px-10 pt-28 lg:pt-60 pb-32 lg:pb-60">

        {/* Hero Section */}
        <motion.section
          id="home"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
        >
          <div className="text-start space-y-6 lg:space-y-12">
            <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[clamp(0.6rem,2.5vw,0.75rem)] font-bold tracking-[0.2em] uppercase ${isRTL ? 'font-ar' : ''}`}>
              <Zap className={`w-4 h-4 fill-indigo-500 ${isRTL ? 'rotate-180' : ''}`} />
              <span>{t.tagline}</span>
            </div>

            <h1 className={`text-[clamp(2.2rem,8.5vw,7.5rem)] font-black tracking-tighter leading-[0.85] ${isRTL ? 'font-ar text-center lg:text-right' : ''}`}>
              {t.heroTitle}
            </h1>

            <p className={`text-[clamp(1rem,3vw,1.6rem)] font-medium leading-[1.8] max-w-xl opacity-70 ${isRTL ? 'font-ar text-center lg:text-right' : ''}`}>
              {t.summary}
            </p>

            {/* CTA BUTTONS - Scaled for mobile */}
            <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
              <motion.a
                href={LINKEDIN_URL}
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-6 py-3 lg:px-10 lg:py-5 bg-indigo-600 text-white rounded-full font-bold text-xs lg:text-sm uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 transition-all animate-pulse-slow overflow-hidden w-fit sm:w-auto ${isRTL ? 'font-ar' : ''}`}
              >
                <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <Share2 className="w-4 h-4 relative z-10" />
                <span className="relative z-10 whitespace-nowrap">{t.cta}</span>
              </motion.a>

              <button
                onClick={handleOpenResume}
                className={`px-6 py-3 lg:px-10 lg:py-5 border-2 border-indigo-500/30 rounded-full font-bold text-xs lg:text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 hover:bg-white/5 active:scale-95 ${isRTL ? 'font-ar' : ''}`}
              >
                <Eye className="w-4 h-4" />
                <span>{t.viewResume}</span>
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            <div className="absolute inset-0 bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />
            {t.achievements.map((stat, i) => (
              <div key={i} className="relative group w-full">
                <GlassCard theme={theme} className="flex flex-col items-center justify-center py-8 lg:py-12 w-full h-full" delay={i * 0.1}>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4 transform-gpu group-hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6 text-indigo-500" />
                  </div>
                  <div className="text-center px-4 flex flex-col items-center">
                    <span className={`text-[clamp(1.8rem,5.5vw,3.5rem)] font-black tracking-tighter mb-1 leading-none block ${isRTL ? 'font-ar' : ''}`}>
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className={`text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.3em] opacity-30 block text-center ${isRTL ? 'font-ar' : ''}`}>{stat.label}</span>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Expertise Spectrum */}
        <section id="skills" className="space-y-16 lg:space-y-24">
          <div className={`flex items-center gap-6 overflow-hidden ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h2 className={`text-[clamp(1.8rem,5.5vw,5rem)] font-black tracking-tighter uppercase whitespace-nowrap ${isRTL ? 'font-ar' : ''}`}>{t.skillsHeader}</h2>
            <div className="h-0.5 flex-1 bg-current opacity-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {PILLARS[lang].map((pillar, i) => (
              <TiltCard key={i} className="h-full">
                <GlassCard theme={theme} delay={i * 0.1} className="h-full group/bento backdrop-blur-xl relative">
                  <div className="p-8 lg:p-14 text-center h-full flex flex-col items-center justify-between space-y-8 relative z-20">
                    <div className="space-y-6 flex flex-col items-center">
                      <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-[1.8rem] bg-indigo-500/10 flex items-center justify-center transform-gpu group-hover/bento:scale-110 transition-all ${pillar.hasChart ? 'animate-pulse' : ''}`}>
                        <pillar.icon className="w-8 h-8 lg:w-10 lg:h-10 text-indigo-500" />
                      </div>
                      <div className="space-y-4">
                        <h3 className={`text-[clamp(1.4rem,3vw,2rem)] font-black leading-tight ${isRTL ? 'font-ar' : ''}`}>{pillar.title}</h3>
                        <p className={`text-[clamp(0.9rem,1.8vw,1.1rem)] opacity-60 leading-relaxed font-medium ${isRTL ? 'font-ar' : ''}`}>{pillar.desc}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {pillar.tags?.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[9px] font-bold uppercase tracking-widest text-indigo-400 whitespace-nowrap">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {pillar.hasChart && (
                      <div className="pt-4 transform-gpu">
                        <MiniBarChart />
                      </div>
                    )}
                  </div>
                </GlassCard>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Tools Infinite Marquee */}
        <section className="space-y-12 lg:space-y-16">
          <div className={`flex items-center gap-6 overflow-hidden ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h2 className={`text-[clamp(1.6rem,5vw,4.5rem)] font-black tracking-tighter uppercase whitespace-nowrap ${isRTL ? 'font-ar' : ''}`}>{t.trustLabel}</h2>
            <div className="h-0.5 flex-1 bg-current opacity-10" />
          </div>

          <InfiniteMarquee isRTL={isRTL} theme={theme} />
        </section>

        {/* Experience History */}
        <section id="experience" className="space-y-16 lg:space-y-24">
          <div className={`flex items-center gap-6 overflow-hidden ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h2 className={`text-[clamp(1.8rem,5vw,4.5rem)] font-black tracking-tighter uppercase whitespace-nowrap ${isRTL ? 'font-ar' : ''}`}>{t.expHeader}</h2>
            <div className="h-0.5 flex-1 bg-current opacity-10" />
          </div>

          <div className="space-y-8 lg:space-y-12">
            {EXPERIENCES_DATA[lang].map((exp, i) => (
              <GlassCard key={exp.id} theme={theme} delay={i * 0.1}>
                <div className={`p-8 lg:p-16 flex flex-col lg:flex-row gap-8 lg:gap-20 text-start ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="lg:w-[35%] shrink-0">
                    <span className={`text-indigo-500 text-[10px] font-bold uppercase tracking-widest bg-indigo-500/10 px-5 py-2 rounded-xl mb-6 inline-block ${isRTL ? 'font-ar' : ''}`}>{exp.period}</span>
                    <h3 className={`text-[clamp(1.5rem,4vw,2.8rem)] font-black mb-1 leading-tight ${isRTL ? 'font-ar text-2xl' : ''}`}>{exp.role}</h3>
                    <p className={`text-[clamp(1rem,2.5vw,1.5rem)] opacity-40 font-bold ${isRTL ? 'font-ar' : ''}`}>{exp.company}</p>
                  </div>
                  <div className="lg:w-[65%] space-y-4 lg:space-y-6 pt-2">
                    {exp.description.map((d, idx) => (
                      <div key={idx} className={`flex gap-5 items-start ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                        <p className={`text-[clamp(0.95rem,2vw,1.1rem)] opacity-70 leading-[1.8] font-medium ${isRTL ? 'font-ar text-xl' : ''}`}>{d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="space-y-16 lg:space-y-24">
          <div className={`flex items-center gap-6 overflow-hidden ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h2 className={`text-[clamp(1.8rem,5vw,4.5rem)] font-black tracking-tighter uppercase whitespace-nowrap ${isRTL ? 'font-ar' : ''}`}>{t.eduHeader}</h2>
            <div className="h-0.5 flex-1 bg-current opacity-10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {EDUCATIONS_DATA[lang].map((edu, idx) => (
              <GlassCard key={edu.id} theme={theme} className="h-full">
                <div className={`p-8 lg:p-16 text-start flex flex-col h-full ${isRTL ? 'text-right' : ''}`}>
                  <div className={`flex justify-between items-start mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shadow-xl shadow-indigo-600/10">
                      <GraduationCap className="w-8 h-8 lg:w-9 lg:h-9" />
                    </div>
                    {edu.badge && (
                      <span className={`px-4 py-2 bg-indigo-600 text-white rounded-xl text-[9px] font-bold uppercase tracking-widest shadow-xl shadow-indigo-600/30 ${isRTL ? 'font-ar' : ''}`}>
                        {edu.badge}
                      </span>
                    )}
                  </div>
                  <h3 className={`text-[clamp(1.3rem,3vw,2.2rem)] font-black mb-3 leading-snug ${isRTL ? 'font-ar text-2xl' : ''}`}>{edu.degree}</h3>
                  <p className={`text-[clamp(0.95rem,2vw,1.2rem)] opacity-60 mb-8 font-bold ${isRTL ? 'font-ar' : ''}`}>{edu.institution}</p>
                  <div className={`mt-auto pt-6 border-t border-current opacity-5 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isRTL ? 'font-ar' : ''}`}>{edu.period}</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-24 pb-48 text-center space-y-24">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className={`text-[clamp(2.5rem,8.5vw,7.5rem)] font-black tracking-tighter leading-[0.85] ${isRTL ? 'font-ar' : ''}`}>
              {t.cta}
            </h2>
            <div className="flex justify-center gap-10">
              <motion.a
                href={LINKEDIN_URL}
                target="_blank"
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="p-8 bg-current/5 rounded-3xl hover:bg-indigo-600 hover:text-white transition-all shadow-2xl active:scale-95 backface-hidden"
              >
                <Linkedin className="w-10 h-10 lg:w-14 lg:h-14" />
              </motion.a>
              <motion.a
                href={`mailto:${t.email}`}
                whileHover={{ scale: 1.15, rotate: -5 }}
                className="p-8 bg-current/5 rounded-3xl hover:bg-indigo-600 hover:text-white transition-all shadow-2xl active:scale-95 backface-hidden"
              >
                <Mail className="w-10 h-10 lg:w-14 lg:h-14" />
              </motion.a>
            </div>
          </div>
          <div className="pt-20 border-t border-current opacity-5 flex flex-col items-center gap-6">
            <p className={`text-[10px] font-bold uppercase tracking-[0.5em] opacity-30 ${isRTL ? 'font-ar text-sm' : ''}`}>© 2026 HAYA ALHARBI • LOCALIZED STRATEGY</p>
          </div>
        </footer>
      </main>

      {/* Optimized Portfolio Modal with Suspense */}
      <AnimatePresence>
        {isResumeOpen && (
          <Suspense fallback={null}>
            <PortfolioModal
              isOpen={isResumeOpen}
              onClose={() => setIsResumeOpen(false)}
              lang={lang}
              t={t}
              isRTL={isRTL}
            />
          </Suspense>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoadingResume && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-slate-950 flex items-center justify-center p-12"
          >
            <div className="text-center space-y-16 max-w-sm w-full">
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.25, 1],
                  borderColor: ['#6366f1', '#ec4899', '#6366f1']
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 border-t-2 border-r-2 rounded-full mx-auto shadow-[0_0_40px_rgba(99,102,241,0.5)]"
              />
              <h3 className={`text-white text-2xl font-black uppercase tracking-[0.3em] ${isRTL ? 'font-ar' : ''}`}>{t.loadingMsg}</h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;