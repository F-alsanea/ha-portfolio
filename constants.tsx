import { Experience, Education } from './types';
import { TrendingUp, Database, Users, BarChart3, Target, Settings, Zap, Star, Layout, Share2, Home, Code, FileText } from 'lucide-react';

export const EXPERIENCES_DATA = {
  en: [
    {
      id: 'seer',
      company: 'Seer Asharq for Motors (Soueast)',
      role: 'Marketing Specialist & Team Lead',
      period: 'May 2025 - Current',
      description: [
        'Engineered multi-channel digital strategies that accelerated brand positioning and market entry for Soueast in the region.',
        'Orchestrated a high-performance marketing team, harmonizing creative execution with strict ROI-focused timelines.',
        'Transformed Salesforce CRM architecture to optimize lead scoring, reducing response times and boosting customer retention.',
        'Scaled qualified lead generation by 20% through targeted performance marketing and rigorous data-driven optimization.',
        'Directed marketing budgets with precision, ensuring maximum impact across social, digital, and offline touchpoints.'
      ]
    },
    {
      id: 'elite',
      company: 'Elite First Parcel Transfer',
      role: 'Marketing Specialist',
      period: 'Mar 2022 - Sep 2022',
      description: [
        'Accelerated brand awareness by executing localized marketing campaigns that captured new SME segments.',
        'Harmonized logistics scheduling with promotional cycles, increasing operational efficiency by 15%.',
        'Developed a robust KPI tracking dashboard that provided real-time visibility into marketing spend and conversion rates.',
        'Optimized cash flow management by streamlining invoice processing and automated payment follow-ups.'
      ]
    },
    {
      id: 'hamat',
      company: 'Hamat Company',
      role: 'Talent Development & HR Specialist',
      period: 'Jan 2020 - Jul 2020',
      description: [
        'Spearheaded the selection and onboarding of top-tier trainees, building a pipeline for future organizational growth.',
        'Digitized the performance management system, aligning individual KPIs with core corporate strategic objectives.',
        'Conducted organizational gap analyses to design and deploy high-impact professional development programs.'
      ]
    }
  ],
  ar: [
    {
      id: 'seer',
      company: 'سير الشرق للسيارات (ساوإيست)',
      role: 'أخصائية تسويق وقائدة فريق',
      period: 'مايو 2025 - الحالي',
      description: [
        'ابتكار استراتيجيات رقمية متعددة القنوات ساهمت في تعزيز تموضع العلامة التجارية ودخول السوق لشركة "ساوإيست" في المنطقة.',
        'قيادة فريق تسويقي عالي الأداء مع التوفيق بين التنفيذ الإبداعي والجداول الزمنية الصارمة لتحقيق العائد على الاستثمار.',
        'تطوير بنية نظام Salesforce CRM لتحسين جودة تصنيف العملاء، مما قلل وقت الاستجابة وزاد من معدل ولاء العملاء.',
        'زيادة توليد العملاء المتوقعين المؤهلين بنسبة 20% عبر التسويق القائم على الأداء والتحسين المستمر للبيانات.',
        'إدارة الميزانيات التسويقية بدقة متناهية لضمان أقصى تأثير عبر القنوات الرقمية والتقليدية.'
      ]
    },
    {
      id: 'elite',
      company: 'إيليت فيرست لنقل الطرود',
      role: 'أخصائية تسويق',
      period: 'مارس 2022 - سبتمبر 2022',
      description: [
        'تسريع وتيرة الوعي بالعلامة التجارية عبر حملات تسويقية محلية استهدفت قطاع الشركات الصغيرة والمتوسطة.',
        'مواءمة الجدولة اللوجستية مع الدورات الترويجية، مما رفع الكفاءة التشغيلية بنسبة 15%.',
        'إنشاء لوحة مؤشرات أداء (KPI) متطورة لمراقبة الإنفاق التسويقي ومعدلات التحويل بشكل فوري.',
        'تحسين إدارة التدفقات النقدية عبر تبسيط معالجة الفواتير وأتمتة متابعة المدفوعات.'
      ]
    },
    {
      id: 'hamat',
      company: 'شركة هامات',
      role: 'أخصائية تمبير',
      period: 'يناير 2020 - يوليو 2020',
      description: [
        'قيادة عمليات اختيار وتوظيف الكفاءات التدريبية المتميزة لبناء كوادر مستقبلية للشركة.',
        'رقمنة نظام إدارة الأداء لربط مؤشرات الأداء الفردية بالأهداف الاستراتيجية الكبرى للمنظمة.',
        'إجراء تحليلات فجوات الأداء لتصميم وتقديم برامج تطوير مهني عالية التأثير.'
      ]
    }
  ]
};

export const EDUCATIONS_DATA = {
  en: [
    {
      id: 'master',
      degree: "Master of Digital Marketing Management",
      institution: "Saudi Electronic University (Joint program with Colorado State University)",
      period: '2022 - 2024',
      badge: "Second Class Honors"
    },
    {
      id: 'bachelor',
      degree: "Bachelor of Language and Translation",
      institution: "Princess Nourah Bint Abdulrahman University",
      period: '2015 - 2019'
    }
  ],
  ar: [
    {
      id: 'master',
      degree: "ماجستير إدارة التسويق الرقمي",
      institution: "الجامعة السعودية الإلكترونية (بالتعاون مع جامعة كولورادو ستيت)",
      period: '2022 - 2024',
      badge: "مرتبة الشرف الثانية"
    },
    {
      id: 'bachelor',
      degree: "بكالوريوس اللغات والترجمة",
      institution: "جامعة الأميرة نورة بنت عبد الرحمن",
      period: '2015 - 2019'
    }
  ]
};

export const SKILLS_DETAILED = {
  en: [
    { name: "Marketing Strategy", achievement: "Engineered 5+ multi-channel brand launches." },
    { name: "Revenue Growth", achievement: "Consistently delivered 15%+ YoY growth targets." },
    { name: "CRM Management", achievement: "Mastered Salesforce architecture for 10k+ leads." },
    { name: "Performance Analytics", achievement: "Reduced CPA by 22% through data-driven testing." },
    { name: "Team Leadership", achievement: "Mentored 5+ specialists into leadership roles." },
    { name: "Salesforce Operations", achievement: "Automated 40% of manual lead processing tasks." }
  ],
  ar: [
    { name: "استراتيجية التسويق", achievement: "إدارة إطلاق أكثر من 5 علامات تجارية متعددة القنوات." },
    { name: "نمو الإيرادات", achievement: "تحقيق مستهدفات نمو سنوية تتجاوز 15%." },
    { name: "إدارة CRM", achievement: "إتقان هيكلية سيلز فورس لأكثر من 10 آلاف عميل." },
    { name: "تحليلات الأداء", achievement: "تقليل تكلفة الاستحواذ بنسبة 22% عبر اختبارات البيانات." },
    { name: "قيادة الفريق", achievement: "توجيه أكثر من 5 أخصائيين إلى أدوار قيادية." },
    { name: "عمليات سيلز فورس", achievement: "أتمتة 40% من مهام معالجة العملاء اليدوية." }
  ]
};

export const PILLARS = {
  en: [
    { title: "Growth Marketing", desc: "Scaling ROI through precision targeting.", icon: TrendingUp, hasChart: true, tags: ["Revenue Growth", "Ads Strategy"] },
    { title: "CRM Excellence", desc: "Transforming raw data into insights.", icon: Database, hasChart: false, tags: ["Salesforce Ops", "Lead Quality"] },
    { title: "Team Leadership", desc: "Cultivating high-performance cultures.", icon: Star, hasChart: false, tags: ["Mentorship", "Team ROI"] }
  ],
  ar: [
    { title: "تسويق النمو", desc: "زيادة العائد من خلال الاستهداف الدقيق.", icon: TrendingUp, hasChart: true, tags: ["نمو الإيرادات", "استراتيجية الإعلانات"] },
    { title: "تميز الـ CRM", desc: "تحويل البيانات الخام إلى رؤى قابلة للتنفيذ.", icon: Database, hasChart: false, tags: ["سيلز فورس", "جودة العملاء"] },
    { title: "قيادة الفريق", desc: "بناء ثقافة عمل عالية الأداء.", icon: Star, hasChart: false, tags: ["التوجيه المهني", "عائد الفريق"] }
  ]
};

export const TRUST_TOOLS = [
  { name: "Salesforce", icon: Database, color: "#00a1e0" },
  { name: "Meta Ads", icon: Target, color: "#0668E1" },
  { name: "Google Analytics", icon: BarChart3, color: "#E37400" },
  { name: "Automation", icon: Settings, color: "#10b981" },
  { name: "Performance", icon: Zap, color: "#6366f1" },
  { name: "Management", icon: Users, color: "#f59e0b" }
];
