import React from 'react';
import { motion } from 'framer-motion';
import {
    FileText, X, Printer, MapPin, Mail, Linkedin, Download
} from 'lucide-react';
import { EXPERIENCES_DATA, EDUCATIONS_DATA, SKILLS_DETAILED } from '../constants.tsx';

interface PortfolioModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: 'en' | 'ar';
    t: any;
    isRTL: boolean;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose, lang, t, isRTL }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-[40px] flex items-center justify-center p-3 lg:p-10 no-print"
        >
            <motion.div
                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className={`relative w-[98%] lg:w-full max-w-6xl h-[90vh] lg:h-full bg-white text-slate-950 rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden flex flex-col shadow-2xl ${isRTL ? 'text-right' : 'text-left'}`}
            >
                <div className={`p-6 lg:p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/90 backdrop-blur-3xl shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-4 lg:gap-8 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/30">
                            <FileText className="w-6 h-6 lg:w-9 lg:h-9" />
                        </div>
                        <div>
                            <h2 className={`text-xl lg:text-3xl font-black uppercase tracking-tighter ${isRTL ? 'font-ar text-2xl' : ''}`}>{t.viewResume}</h2>
                            <p className="text-[9px] font-black text-slate-400 mt-1 uppercase tracking-[0.3em] hidden sm:block">Haya_Alharbi_Portfolio.pdf</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => window.print()} className="p-3 lg:p-5 hover:bg-slate-200 rounded-2xl transition-all hidden sm:block"><Printer className="w-5 h-5 lg:w-7 lg:h-7" /></button>
                        <button
                            onClick={onClose}
                            className="p-4 lg:p-6 bg-rose-500 text-white rounded-2xl transition-all shadow-xl shadow-rose-500/20 active:scale-95"
                            aria-label="Close"
                        >
                            <X className="w-6 h-6 lg:w-8 lg:h-8" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 lg:p-20 bg-white selection:bg-indigo-100">
                    <div className="max-w-4xl mx-auto space-y-16 lg:space-y-24">
                        <header className="text-center">
                            <h1 className={`text-5xl lg:text-8xl font-black mb-6 uppercase tracking-tighter leading-none ${isRTL ? 'font-ar text-5xl lg:text-8xl' : ''}`}>{t.brand}</h1>
                            <p className={`text-lg lg:text-xl font-black text-indigo-600 uppercase tracking-[0.4em] mb-12 ${isRTL ? 'font-ar text-base' : ''}`}>{t.role}</p>
                            <div className="flex justify-center flex-wrap gap-6 lg:gap-16 text-[10px] lg:text-[11px] font-black text-slate-400 uppercase tracking-widest border-y border-slate-100 py-10">
                                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-500" /> Riyadh, KSA</span>
                                <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-indigo-500" /> {t.email}</span>
                                <span className="flex items-center gap-2"><Linkedin className="w-4 h-4 text-indigo-500" /> Haya Alharbi</span>
                            </div>
                        </header>

                        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 ${isRTL ? 'rtl' : ''}`}>
                            <div className="lg:col-span-2 space-y-16 lg:space-y-24">
                                <section>
                                    <h3 className={`text-[11px] font-black uppercase tracking-[0.6em] mb-12 flex items-center gap-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        <span className="bg-slate-950 text-white px-8 py-3 rounded-2xl">{t.expHeader}</span>
                                        <div className="h-px flex-1 bg-slate-100" />
                                    </h3>
                                    <div className="space-y-12">
                                        {EXPERIENCES_DATA[lang].map((exp: any) => (
                                            <div key={exp.id} className="print-card p-6 lg:p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm">
                                                <div className={`flex flex-col sm:flex-row justify-between items-baseline mb-4 ${isRTL ? 'sm:flex-row-reverse text-right' : ''}`}>
                                                    <h4 className={`font-black text-2xl uppercase tracking-tighter ${isRTL ? 'font-ar text-2xl' : ''}`}>{exp.role}</h4>
                                                    <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">{exp.period}</span>
                                                </div>
                                                <p className={`font-black text-indigo-600 text-[11px] uppercase tracking-[0.3em] mb-8 ${isRTL ? 'font-ar' : ''}`}>{exp.company}</p>
                                                <ul className="space-y-4">
                                                    {exp.description.map((d: string, idx: number) => (
                                                        <li key={idx} className={`flex gap-4 text-[15px] leading-relaxed text-slate-600 font-medium ${isRTL ? 'flex-row-reverse text-right font-ar text-xl' : ''}`}>
                                                            <div className="w-2 h-2 rounded-full bg-slate-200 mt-2.5 shrink-0" />
                                                            {d}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            <div className="space-y-16 lg:space-y-24">
                                <section>
                                    <h3 className={`text-[11px] font-black uppercase tracking-[0.6em] mb-12 flex items-center gap-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        <span className="bg-slate-950 text-white px-8 py-3 rounded-2xl">{t.eduHeader}</span>
                                    </h3>
                                    <div className="space-y-8">
                                        {EDUCATIONS_DATA[lang].map((edu: any) => (
                                            <div key={edu.id} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm">
                                                <p className={`font-black text-xl uppercase leading-tight tracking-tighter mb-4 ${isRTL ? 'font-ar text-xl' : ''}`}>{edu.degree}</p>
                                                <p className={`text-[11px] font-black text-slate-400 uppercase tracking-wider ${isRTL ? 'font-ar text-sm' : ''}`}>{edu.institution}</p>
                                                <p className={`text-[10px] font-black text-indigo-600 mt-4 uppercase tracking-[0.5em] ${isRTL ? 'font-ar' : ''}`}>{edu.period}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h3 className={`text-[11px] font-black uppercase tracking-[0.6em] mb-12 flex items-center gap-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        <span className="bg-slate-950 text-white px-8 py-3 rounded-2xl">{isRTL ? 'الكفاءات' : 'Competencies'}</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {SKILLS_DETAILED[lang].map((skill: any) => (
                                            <span key={skill.name} className="px-5 py-2.5 bg-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 lg:p-12 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-center gap-6 lg:gap-10 shrink-0">
                    <button className={`px-16 py-6 bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.4em] rounded-full flex items-center justify-center gap-6 shadow-2xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto ${isRTL ? 'font-ar' : ''}`}>
                        <Download className="w-6 h-6" /> <span>{t.download}</span>
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PortfolioModal;
