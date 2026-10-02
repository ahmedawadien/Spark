import React, { useEffect, useState } from 'react';
import WOW from 'wowjs';
import sparkImage from '../assets/img/spark.jpg';
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  ExternalLink,
  Globe,
  LayoutDashboard,
  Lightbulb,
  Mail,
  Menu,
  RefreshCw,
  Send,
  Smartphone,
  Star,
  X
} from 'lucide-react';

import 'animate.css';

const translations = {
  en: {
    dir: 'ltr',
    nav: {
      services: 'Services',
      portfolio: 'Portfolio',
      estimator: 'Estimator',
      faq: 'FAQ',
      startProject: 'Start Project',
      subtitle: 'Digital Web Studio'
    },
    hero: {
      tag: 'Spark Your Digital Presence',
      titleLine1: 'Crafting web experiences that ',
      titleHighlight: 'ignite client growth',
      desc: 'We build ultra-fast React applications, custom PHP backends, and responsive mobile interfaces tailored to elevate your brand online.',
      estimateBtn: 'Estimate Cost Live',
      exploreBtn: 'Explore Work',
      stats: {
        responsive: 'Responsive Precision',
        speed: 'Avg Load Speed',
        satisfaction: 'Client Satisfaction'
      }
    },
    services: {
      tag: 'Full-Spectrum Services',
      title: 'Engineered for Quality & Scale',
      desc: 'Every line of code and UI component is built from the ground up for speed and aesthetics.',
      list: [
        {
          title: 'UI/UX & Spatial Design',
          desc: 'Intuitive visual hierarchies, custom design systems, and responsive wireframes built in Figma.',
          features: ['Figma Design Systems', 'User Journey Mapping', 'Interactive Prototypes']
        },
        {
          title: 'Full-Stack Web Apps',
          desc: 'High-speed React web applications powered by robust PHP, Laravel, and custom API backends.',
          features: ['React & Next.js', 'PHP / MySQL / Laravel', 'RESTful API Architecture']
        },
        {
          title: 'Cross-Platform Mobile',
          desc: 'Fluid native mobile interfaces designed and compiled with Flutter and Dart.',
          features: ['iOS & Android Apps', 'Flutter Engine', 'Real-time State Sync']
        },
        {
          title: 'Performance Optimization',
          desc: 'Lightning-fast site speeds, lighthouse 99+ score fixes, and Google SEO structured metadata.',
          features: ['Vitals Audit', 'Asset Compression', 'Technical SEO']
        }
      ]
    },
    portfolio: {
      tag: 'Interactive Showcase',
      title: 'Our Recent Work',
      categories: ['All', 'E-Commerce', 'Corporate', 'Web App'],
      visitSite: 'Visit Live Website',
      projects: [
        {
          id: 1,
          title: 'Mode Street Store',
          category: 'E-Commerce',
          desc: 'Dynamic apparel platform featuring real-time cart session management and seamless checkout.',
          fullDesc: 'Mode Street is a high-fashion e-commerce solution engineered for fast page loads and custom session management. Features automated order invoicing and dynamic database filtering.',
          tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap 5'],
          metrics: '99.8% Uptime • < 1.2s Load Time',
          gradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
          border: 'border-orange-200',
          url: 'https://ahmed-awaden24.lovestoblog.com/'
        },
        {
          id: 2,
          title: 'T-Square Corporate Portal',
          category: 'Corporate',
          desc: 'Modern digital agency website featuring interactive service showcases and slick animations.',
          fullDesc: 'Complete brand portal for T-Square Center showcasing digital solution offerings with responsive animations, interactive lead capturing, and clear visual navigation.',
          tech: ['React', 'Tailwind CSS', 'Node.js'],
          metrics: '+140% Lead Inquiries Rate',
          gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
          border: 'border-amber-200',
          url: 'https://tsquarecenter.com/'
        },
        {
          id: 3,
          title: 'Frais Personalised Gifts',
          category: 'E-Commerce',
          desc: 'Custom gift customization engine with dynamic product previewing and client dashboard.',
          fullDesc: 'Specialized ordering web app built for custom gift creation. Allows users to configure personalized products and track live order status updates.',
          tech: ['PHP', 'MySQL', 'Tailwind CSS', 'REST API'],
          metrics: 'Over 5,000+ Custom Orders',
          gradient: 'from-orange-600/20 via-amber-600/10 to-transparent',
          border: 'border-orange-200',
          url: 'https://frais-gift.lovestoblog.com/?'
        },
        {
          id: 4,
          title: 'Life Care Pharmacy System',
          category: 'Web App',
          desc: 'Enterprise medicine inventory dashboard featuring CRUD management and instant sales reporting.',
          fullDesc: 'Complete pharmacy management system handling medicine records, customer databases, sales invoices, and daily analytical financial summaries.',
          tech: ['PHP', 'MySQL', 'Chart.js', 'Bootstrap'],
          metrics: 'Instant Invoicing Engine',
          gradient: 'from-yellow-500/20 via-orange-500/10 to-transparent',
          border: 'border-yellow-200',
          url: 'https://life-care.lovestoblog.com/'
        },
        {
          id: 5,
          title: 'Arkive Furniture Store',
          category: 'E-Commerce',
          desc: 'Modern luxury furniture e-commerce platform built with an intuitive React front-end and robust Laravel backend.',
          fullDesc: 'Arkive is an immersive luxury furniture e-commerce platform featuring dynamic product filtering, responsive image galleries, real-time cart state management, and optimized checkout flow.',
          tech: ['React', 'Laravel', 'Tailwind CSS', 'MySQL'],
          metrics: '100% Fully Responsive Design',
          gradient: 'from-amber-600/20 via-orange-500/10 to-transparent',
          border: 'border-amber-200',
          url: 'https://arkive.lovestoblog.com/'
        }
      ]
    },
    modal: {
      techUsed: 'Technologies Used',
      close: 'Close Preview',
      requestSimilar: 'Request Similar Site'
    },
    estimator: {
      tag: 'Transparent Pricing',
      title: 'Interactive Project Estimator',
      desc: 'Select your scope to generate instant estimated pricing and delivery turnaround.',
      step1: '1. Select Project Type',
      types: {
        landing: 'Landing Page',
        webApp: 'Full Web App',
        store: 'E-Commerce Store'
      },
      step2: '2. Number of Pages / Views',
      pagesUnit: 'Pages',
      step3: '3. Add-on Features',
      addons: {
        backend: 'Custom Backend & Database Integration',
        seo: 'SEO Audit & Structured Metadata',
        priority: 'Priority Delivery'
      },
      result: {
        title: 'Estimated Investment',
        currency: 'EGP',
        subtitle: 'Custom scope estimate',
        time: 'Estimated Time',
        daysUnit: 'Days',
        revisions: 'Revision Passes',
        unlimited: 'Unlimited',
        lockScope: 'Lock In This Scope'
      }
    },
    faq: {
      tag: 'Got Questions?',
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'How long does a typical web design project take?',
          a: 'Standard landing pages take 3-5 days. Full-stack web applications usually take between 1 to 3 weeks depending on features and custom database requirements.'
        },
        {
          q: 'Which tech stack does SparkFrame specialize in?',
          a: 'Our core stack includes React, Tailwind CSS, JavaScript (ES6+), PHP, MySQL, Laravel, and Flutter for mobile applications.'
        },
        {
          q: 'Will my website be mobile-friendly and optimized for Google?',
          a: 'Yes! Every site we craft is 100% responsive across mobile, tablet, and desktop viewports, with integrated semantic SEO metadata.'
        },
        {
          q: 'Do you offer post-launch support and maintenance?',
          a: 'Absolutely. We provide dedicated support packages for continuous security updates, feature additions, and server maintenance.'
        }
      ]
    },
    contact: {
      tag: 'Get In Touch',
      title: "Let's build your next web project.",
      desc: 'Have a web application, e-commerce store, or custom dashboard in mind? Send us a message and receive a response within 24 hours.',
      emailLabel: 'Email Contact',
      availabilityLabel: 'Availability',
      availabilityText: 'Open for New Projects & Freelance',
      form: {
        name: 'Your Name',
        namePlaceholder: 'Ahmed Mohamed',
        email: 'Email Address',
        emailPlaceholder: 'name@example.com',
        service: 'Service Interested In',
        serviceOptions: {
          fullstack: '⚡ Full-Stack Web Development',
          uiux: '🎨 UI/UX & Spatial Design',
          mobile: '📱 Cross-Platform Mobile App (Flutter)',
          speed: '🚀 Speed & Performance Optimization'
        },
        brief: 'Project Brief',
        briefPlaceholder: 'Tell us about your project goals, timelines, or features...',
        submitting: 'Saving Your Inquiry...',
        submit: 'Send Inquiry'
      }
    },
    successModal: {
      tag: 'Successfully Submitted',
      title: 'Your inquiry is in!',
      desc: 'Your project details have been securely saved. The SparkFrame team will review your request and contact you within 24 hours.',
      nextStep: 'Next step',
      nextStepDesc: "We'll get back to you within 24 hours.",
      continue: 'Continue Exploring'
    },
    toast: {
      saved: 'Inquiry saved successfully!',
      errorPrefix: '❌ '
    },
    footer: {
      rights: 'SparkFrame Studio. All rights reserved.'
    }
  },
  ar: {
    dir: 'rtl',
    nav: {
      services: 'خدماتنا',
      portfolio: 'أعمالنا',
      estimator: 'حاسبة التكلفة',
      faq: 'الأسئلة الشائعة',
      startProject: 'ابدأ مشروعك',
      subtitle: 'استوديو تطوير الويب الرقمي'
    },
    hero: {
      tag: 'أطلق حضورك الرقمي',
      titleLine1: 'نصمم تجارب ويب توفر ',
      titleHighlight: 'نمواً استثنائياً لأعمالك',
      desc: 'نبني تطبيقات React فائقة السرعة، ولوحات تحكم برمجية بلغة PHP، وواجهات تطبيقات جوال متجاوبة مصممة لرفع قيمة علامتك التجارية.',
      estimateBtn: 'احسب التكلفة مباشرة',
      exploreBtn: 'استكشف أعمالنا',
      stats: {
        responsive: 'دقة وتوافق كامل',
        speed: 'متوسط سرعة التحميل',
        satisfaction: 'نسبة رضا العملاء'
      }
    },
    services: {
      tag: 'خدمات متكاملة',
      title: 'مصممة للجودة والتوسع',
      desc: 'كل سطر برمجي ومكون في واجهة المستخدم يتم بناؤه من الصفر لتحقيق أعلى سرعة وأجمل مظهر.',
      list: [
        {
          title: 'تصميم الواجهات وتجربة المستخدم',
          desc: 'تسلسل بصري متناسق، وأنظمة تصميم مخصصة، ونماذج أولية متجاوبة مصممة عبر Figma.',
          features: ['أنظمة تصميم Figma', 'رسم مسار المستخدم', 'نماذج تفاعلية']
        },
        {
          title: 'تطبيقات الويب المتكاملة',
          desc: 'تطبيقات React سريعة جداً مدعومة بقواعد بيانات وتطبيقات PHP وLaravel وواجهات API.',
          features: ['React & Next.js', 'PHP / MySQL / Laravel', 'معمارية RESTful API']
        },
        {
          title: 'تطبيقات الجوال متعددة المنصات',
          desc: 'واجهات تطبيقات جوال سلسة وعالية الأداء تم تطويرها وبناؤها بفراموورك Flutter وDart.',
          features: ['تطبيقات iOS وAndroid', 'مُحرك Flutter', 'مزامنة فورية للبيانات']
        },
        {
          title: 'تحسين الأداء وسرعة المواقع',
          desc: 'سرعة تحميل فائقة، وإصلاحات تقييم Lighthouse 99+، وتهيئة مخصصة لمحركات البحث Google.',
          features: ['فحص المؤشرات الحيوية', 'ضغط الأصول والملفات', 'تهيئة SEO التقنية']
        }
      ]
    },
    portfolio: {
      tag: 'معرض الأعمال التفاعلي',
      title: 'أحدث مشاريعنا',
      categories: ['الكل', 'متجر إلكتروني', 'شركات', 'تطبيق ويب'],
      visitSite: 'زيارة الموقع الحي',
      projects: [
        {
          id: 1,
          title: 'متجر Mode Street',
          category: 'متجر إلكتروني',
          desc: 'منصة تسوق ملابس تفاعلية تتميز بإدارة سلة الشراء الفورية وعملية دفع سلسة.',
          fullDesc: 'متجر Mode Street هو حل تسوق إلكتروني متكامل مصمم لتحميل الصفحات بسرعة وإدارة الجلسات بشكل مخصص. يتضمن الفواتير الآلية والتصفية الديناميكية.',
          tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap 5'],
          metrics: 'تشغيل 99.8% • تحميل أقل من 1.2 ثانية',
          gradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
          border: 'border-orange-200',
          url: 'https://ahmed-awaden24.lovestoblog.com/'
        },
        {
          id: 2,
          title: 'بوابة T-Square للشركات',
          category: 'شركات',
          desc: 'موقع إلكتروني حديث لوكالة رقمية يعرض الخدمات مع تأثيرات بصرية وانتقالات سلسة.',
          fullDesc: 'بوابة متكاملة لمركز T-Square تعرض الحلول الرقمية مع أنيميشن متجاوب واستمارات التقاط العملاء وتصفح بصري واضح.',
          tech: ['React', 'Tailwind CSS', 'Node.js'],
          metrics: '+140% زيادة في طلبات الخدمات',
          gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
          border: 'border-amber-200',
          url: 'https://tsquarecenter.com/'
        },
        {
          id: 3,
          title: 'منصة Frais الهدايا المخصصة',
          category: 'متجر إلكتروني',
          desc: 'محرك مخصص لتصميم الهدايا مع معاينة حية للمنتجات ولوحة تحكم للعملاء.',
          fullDesc: 'تطبيق ويب متخصص لإنشاء الهدايا المخصصة. يتيح للمستخدمين تخصيص المنتجات ومتابعة حالة الطلب مباشرة.',
          tech: ['PHP', 'MySQL', 'Tailwind CSS', 'REST API'],
          metrics: 'أكثر من 5,000+ طلب مخصص',
          gradient: 'from-orange-600/20 via-amber-600/10 to-transparent',
          border: 'border-orange-200',
          url: 'https://frais-gift.lovestoblog.com/?'
        },
        {
          id: 4,
          title: 'نظام Life Care لإدارة الصيدليات',
          category: 'تطبيق ويب',
          desc: 'لوحة تحكم لإدارة مخزون الصيدليات وتتبع الأدوية مع إصدار فورية للفواتير والتقارير.',
          fullDesc: 'نظام إدارة صيدليات متكامل يتعامل مع سجلات الأدوية، وقواعد بيانات العملاء، وفواتير المبيعات، والملخصات المالية اليومية.',
          tech: ['PHP', 'MySQL', 'Chart.js', 'Bootstrap'],
          metrics: 'محرك إصدار فواتير لحظي',
          gradient: 'from-yellow-500/20 via-orange-500/10 to-transparent',
          border: 'border-yellow-200',
          url: 'https://life-care.lovestoblog.com/'
        },
        {
          id: 5,
          title: 'متجر Arkive للأثاث الفاخر',
          category: 'متجر إلكتروني',
          desc: 'منصة تسوق أثاث فاخرة مبنية بواجهة React سلسة وخلفية برمجية قوية باستخدام Laravel.',
          fullDesc: 'Arkive هي منصة تسوق أثاث فاخرة توفر فلترة ديناميكية للمنتجات، ومعارض صور متجاوبة، وإدارة حالة السلة فورياً مع تسليم سلس.',
          tech: ['React', 'Laravel', 'Tailwind CSS', 'MySQL'],
          metrics: 'تصميم متجاوب 100% لكافة الشاشات',
          gradient: 'from-amber-600/20 via-orange-500/10 to-transparent',
          border: 'border-amber-200',
          url: 'https://arkive.lovestoblog.com/'
        }
      ]
    },
    modal: {
      techUsed: 'التقنيات المستخدمة',
      close: 'إغلاق المعاينة',
      requestSimilar: 'طلب موقع مماثل'
    },
    estimator: {
      tag: 'تسعير شفاف',
      title: 'حاسبة التكلفة التفاعلية',
      desc: 'حدد نطاق مشروعك للحصول على تقدير فوري للتكلفة والمدة الزمنية للتسليم.',
      step1: '1. اختر نوع المشروع',
      types: {
        landing: 'صفحة هبوط',
        webApp: 'تطبيق ويب متكامل',
        store: 'متجر إلكتروني'
      },
      step2: '2. عدد الصفحات / الواجهات',
      pagesUnit: 'صفحات',
      step3: '3. الميزات الإضافية',
      addons: {
        backend: 'ربط قاعدة بيانات وخلفية برمجية مخصصة',
        seo: 'فحص SEO وتهيئة البيانات المهيكلة',
        priority: 'تسليم سريع وأولوية تنفيذه'
      },
      result: {
        title: 'التكلفة التقديرية',
        currency: 'جنيه',
        subtitle: 'تقدير مخصص لنطاق العمل',
        time: 'المدة التقديرية',
        daysUnit: 'أيام',
        revisions: 'مراجعات وتعديلات',
        unlimited: 'غير محدودة',
        lockScope: 'اعتماد هذا النطاق'
      }
    },
    faq: {
      tag: 'لديك أسئلة؟',
      title: 'الأسئلة الشائعة',
      items: [
        {
          q: 'كم يستغرق بناء مشروع موقع ويب؟',
          a: 'تستغرق صفحات الهبوط العادية من 3 إلى 5 أيام. بينما تستغرق تطبيقات الويب المتكاملة من أسبوع إلى 3 أسابيع حسب الميزات ومتطلبات قاعدة البيانات.'
        },
        {
          q: 'ما هي التقنيات الأساسية التي يعمل بها SparkFrame؟',
          a: 'تقنياتنا الأساسية تشمل React وTailwind CSS وJavaScript (ES6+) وPHP وMySQL وLaravel وFlutter لتطبيقات الجوال.'
        },
        {
          q: 'هل سيكون موقعي متوافقاً مع الهواتف ومحركات البحث Google؟',
          a: 'نعم! كل موقع نصممه متوافق بنسبة 100% مع جميع الهواتف والأجهزة اللوحية والمكتبية، مع تهيئة مخصصة لمحركات البحث.'
        },
        {
          q: 'هل تقدمون خدمات الدعم والصيانة بعد إطلاق الموقع؟',
          a: 'بالتأكيد. نقدم باقات دعم مخصصة للتحديثات الأمنية المستمرة، وإضافة الميزات، وصيانة الخوادم.'
        }
      ]
    },
    contact: {
      tag: 'تواصل معنا',
      title: 'دعنا نبني مشروعك القادم على الويب.',
      desc: 'هل لديك فكرة تطبيق ويب، متجر إلكتروني، أو لوحة تحكم مخصصة؟ أرسل لنا تفاصيل مشروعك وسنرد عليك خلال 24 ساعة.',
      emailLabel: 'البريد الإلكتروني',
      availabilityLabel: 'الحالة الحالية',
      availabilityText: 'متاح لاستقبال مشاريع جديدة وعمل حر',
      form: {
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        emailPlaceholder: 'name@example.com',
        service: 'الخدمة المطلوبة',
        serviceOptions: {
          fullstack: '⚡ تطوير تطبيقات الويب المتكاملة',
          uiux: '🎨 تصميم الواجهات وتجربة المستخدم',
          mobile: '📱 تطبيق جوال متعدد المنصات (Flutter)',
          speed: '🚀 تسريع وتأمين أداء المواقع'
        },
        brief: 'تفاصيل المشروع',
        briefPlaceholder: 'اكتب لنا أهداف مشروعك، الجدول الزمني، أو الميزات المطلوبة...',
        submitting: 'جاري حفظ طلبك...',
        submit: 'إرسال الطلب'
      }
    },
    successModal: {
      tag: 'تم الإرسال بنجاح',
      title: 'تم استلام طلبك!',
      desc: 'تم حفظ تفاصيل مشروعك بنجاح. سيقوم فريق SparkFrame بمراجعة طلبك والتواصل معك خلال 24 ساعة.',
      nextStep: 'الخطوة القادمة',
      nextStepDesc: 'سنقوم بالرد عليك في غضون 24 ساعة.',
      continue: 'متابعة التصفح'
    },
    toast: {
      saved: 'تم حفظ الاستفسار بنجاح!',
      errorPrefix: '❌ '
    },
    footer: {
      rights: 'استوديو SparkFrame. جميع الحقوق محفوظة.'
    }
  }
};

export default function SparkFrameApp() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const brandFirst = lang === 'ar' ? 'سبارك ' : 'Spark';
  const brandSecond = lang === 'ar' ? 'فريم' : 'Frame';
  const brandName = lang === 'ar' ? 'سبارك فريم' : 'SparkFrame';

  useEffect(() => {
    const wow = new WOW.WOW({
      live: false,
      offset: 80,
      mobile: true
    });

    wow.init();

    return () => {
      wow.stop();
    };
  }, []);

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const API_URL = '/sparkframe';
  const [estimator, setEstimator] = useState({
    projectType: 'web-app',
    pages: 5,
    needsBackend: true,
    needsSEO: true,
    speedPriority: false
  });

  const calculateEstimate = () => {
    let base =
      estimator.projectType === 'landing'
        ? 500
        : estimator.projectType === 'web-app'
          ? 2000
          : 8000;

    base += estimator.pages * 500;

    if (estimator.needsBackend) {
      base += 1000;
    }

    if (estimator.needsSEO) {
      base += 500;
    }

    if (estimator.speedPriority) {
      base += 500;
    }

    return base;
  };

  const calculateDays = () => {
    let days =
      estimator.projectType === 'landing'
        ? 4
        : estimator.projectType === 'web-app'
          ? 10
          : 20;

    days += estimator.pages;

    if (estimator.speedPriority) {
      days = Math.max(3, Math.floor(days * 0.65));
    }

    return days;
  };

  const showToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      service: form.service.value,
      project_brief: form.project_brief.value.trim()
    };

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/submit_inquiry.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to save your inquiry.');
      }

      form.reset();

      setShowSuccess(true);

      showToast(t.toast.saved);
    } catch (error) {
      console.error('Inquiry submission error:', error);

      showToast(`${t.toast.errorPrefix}${error.message || 'Unable to connect to the server.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: LayoutDashboard,
      title: t.services.list[0].title,
      desc: t.services.list[0].desc,
      features: t.services.list[0].features
    },
    {
      icon: Code2,
      title: t.services.list[1].title,
      desc: t.services.list[1].desc,
      features: t.services.list[1].features
    },
    {
      icon: Smartphone,
      title: t.services.list[2].title,
      desc: t.services.list[2].desc,
      features: t.services.list[2].features
    },
    {
      icon: Lightbulb,
      title: t.services.list[3].title,
      desc: t.services.list[3].desc,
      features: t.services.list[3].features
    }
  ];

  const portfolioProjects = t.portfolio.projects;

  const categoryMap = {
    'All': 'All',
    'E-Commerce': 'E-Commerce',
    'Corporate': 'Corporate',
    'Web App': 'Web App',
    'الكل': 'All',
    'متجر إلكتروني': 'E-Commerce',
    'شركات': 'Corporate',
    'تطبيق ويب': 'Web App'
  };

  const filteredProjects =
    activeCategory === 'All' || activeCategory === 'الكل'
      ? portfolioProjects
      : portfolioProjects.filter(
          (project) =>
            categoryMap[project.category] === categoryMap[activeCategory] ||
            project.category === activeCategory
        );

  useEffect(() => {
    const timer = setTimeout(() => {
      const wow = new WOW.WOW({
        live: false,
        offset: 80,
        mobile: true
      });

      wow.init();
    }, 50);

    return () => clearTimeout(timer);
  }, [activeCategory, lang]);

  return (
    <div
      dir={t.dir}
      className="min-h-screen bg-[#FAFAFC] text-slate-800 font-sans selection:bg-orange-500 selection:text-white relative overflow-hidden overflow-x-hidden"
    >
      <style>{`
        .spark-float {
          animation: sparkFloat 5s ease-in-out infinite;
        }

        @keyframes sparkFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        .hover-lift {
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-6px);
        }

        @media (max-width: 767px) {
          html {
            scroll-behavior: smooth;
          }

          body {
            overflow-x: hidden;
          }

          .spark-float {
            animation-duration: 6s;
          }
        }

        @media (max-width: 420px) {
          .spark-mobile-tight {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .spark-float,
          .hover-lift {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {toastMessage && (
        <div
          className={`fixed bottom-6 ${t.dir === 'rtl' ? 'left-6' : 'right-6'} z-[150] bg-white/95 border border-orange-200 text-orange-950 px-6 py-4 rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.16)] flex items-center gap-3 backdrop-blur-xl animate__animated animate__fadeInUp`}
        >
          <Lightbulb className="w-5 h-5 text-orange-600" />

          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {showSuccess && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-slate-950/50 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.28)] animate__animated animate__zoomIn">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400" />

            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              aria-label="Close success message"
              className={`absolute ${t.dir === 'rtl' ? 'left-5' : 'right-5'} top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900`}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="px-7 pb-8 pt-10 text-center sm:px-9">
              <div className="relative mx-auto mb-6 h-24 w-24">
                <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate__animated animate__pulse animate__infinite" />

                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-xl shadow-emerald-500/25">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
              </div>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-emerald-700">
                <Lightbulb className="h-3.5 w-3.5" />

                {t.successModal.tag}
              </div>

              <h2 id="success-title" className="text-3xl font-black tracking-tight text-slate-900">
                {t.successModal.title}
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                {t.successModal.desc}
              </p>

              <div className="mt-6 rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-4 text-start">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/20">
                    <Send className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                      {t.successModal.nextStep}
                    </p>

                    <p className="text-sm font-bold text-slate-800">
                      {t.successModal.nextStepDesc}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                className="mt-7 w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:brightness-110"
              >
                {t.successModal.continue}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-orange-200/40 rounded-full blur-[150px]" />

        <div className="absolute top-[35%] -left-[10%] w-[600px] h-[600px] bg-amber-200/40 rounded-full blur-[160px]" />

        <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-yellow-200/40 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10">
        <nav
          className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-sm wow animate__animated animate__fadeInDown"
          data-wow-duration="0.8s"
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-3 min-w-0">
              {/* Brand */}
              <a
                href="#"
                className="flex items-center gap-2.5 sm:gap-3 group min-w-0 shrink-0"
                aria-label={brandName}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-10 shrink-0 group-hover:scale-105 transition duration-300">
                  <div className="w-full h-full bg-white flex items-center justify-center">
                    <img
                      src={sparkImage}
                      alt={brandName}
                      className="w-10 h-10 sm:w-14 sm:h-12 rounded-xl shadow-sm border object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-base sm:text-xl font-black tracking-tight text-slate-900 flex items-center gap-1 whitespace-nowrap">
                    {brandFirst}
                    <span className="text-orange-600">{brandSecond}</span>
                  </span>

                  <span className="hidden sm:block text-[9px] lg:text-[10px] text-slate-500 font-bold whitespace-nowrap">
                    {t.nav.subtitle}
                  </span>
                </div>
              </a>

              {/* Desktop navigation */}
              <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-slate-600 flex-1 justify-center">
                <a href="#services" className="hover:text-orange-600 transition whitespace-nowrap">
                  {t.nav.services}
                </a>
                <a href="#portfolio" className="hover:text-orange-600 transition whitespace-nowrap">
                  {t.nav.portfolio}
                </a>
                <a href="#estimator" className="hover:text-orange-600 transition whitespace-nowrap">
                  {t.nav.estimator}
                </a>
                <a href="#faq" className="hover:text-orange-600 transition whitespace-nowrap">
                  {t.nav.faq}
                </a>
              </div>

              {/* Desktop actions */}
              <div className="hidden md:flex items-center gap-2.5 lg:gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const nextLang = lang === 'en' ? 'ar' : 'en';
                    setLang(nextLang);
                    setActiveCategory(nextLang === 'ar' ? 'الكل' : 'All');
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition whitespace-nowrap"
                  aria-label="Change language"
                >
                  <Globe className="w-3.5 h-3.5 text-orange-600" />
                  <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
                </button>

                <a
                  href="#contact"
                  className="px-3 lg:px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-[11px] sm:text-[12px] hover:brightness-110 shadow-lg shadow-orange-500/25 transition duration-300 flex items-center gap-2 whitespace-nowrap"
                >
                  <span>{t.nav.startProject}</span>
                  <ArrowRight className={`w-4 h-4 shrink-0 ${t.dir === 'rtl' ? 'rotate-180' : ''}`} />
                </a>
              </div>

              {/* Mobile actions */}
              <div className="md:hidden flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const nextLang = lang === 'en' ? 'ar' : 'en';
                    setLang(nextLang);
                    setActiveCategory(nextLang === 'ar' ? 'الكل' : 'All');
                  }}
                  className="h-9 px-2.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 font-bold text-[11px] flex items-center gap-1.5"
                  aria-label="Change language"
                >
                  <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
                  <Globe className="w-3.5 h-3.5 text-orange-600" />
                </button>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((open) => !open)}
                  className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-800 flex items-center justify-center hover:border-orange-300 hover:text-orange-600 transition"
                  aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile navigation */}
            <div
              className={`md:hidden overflow-hidden transition-all duration-300 ${
                mobileMenuOpen ? 'max-h-[500px] opacity-100 pt-4' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-900/5">
                <div className="flex flex-col gap-1">
                  <a
                    href="#services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition"
                  >
                    {t.nav.services}
                  </a>

                  <a
                    href="#portfolio"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition"
                  >
                    {t.nav.portfolio}
                  </a>

                  <a
                    href="#estimator"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition"
                  >
                    {t.nav.estimator}
                  </a>

                  <a
                    href="#faq"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition"
                  >
                    {t.nav.faq}
                  </a>

                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-1 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 text-sm font-black text-white flex items-center justify-center gap-2 shadow-md shadow-orange-500/20"
                  >
                    <span>{t.nav.startProject}</span>
                    <ArrowRight className={`w-4 h-4 ${t.dir === 'rtl' ? 'rotate-180' : ''}`} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <section className="max-w-7xl mx-auto px-6 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-28">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm wow animate__animated animate__fadeInDown"
                data-wow-duration="0.8s"
              >
                <Lightbulb className="w-3.5 h-3.5 text-orange-600" />

                {t.hero.tag}
              </div>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.08] tracking-tight wow animate__animated animate__fadeInUp"
                data-wow-delay="0.1s"
                data-wow-duration="1s"
              >
                {t.hero.titleLine1}{' '}

                <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  {t.hero.titleHighlight}
                </span>
              </h1>

              <p
                className="mt-6 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed wow animate__animated animate__fadeInUp"
                data-wow-delay="0.2s"
                data-wow-duration="1s"
              >
                {t.hero.desc}
              </p>

              <div
                className="mt-7 sm:mt-10 flex flex-wrap items-center gap-4 wow animate__animated animate__fadeInUp"
                data-wow-delay="0.3s"
                data-wow-duration="1s"
              >
                <a
                  href="#estimator"
                  className="px-5 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-sm rounded-full shadow-xl shadow-orange-500/20 hover:scale-105 transition duration-300 flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>{t.hero.estimateBtn}</span>
                </a>

                <a
                  href="#portfolio"
                  className="px-5 sm:px-8 py-3.5 sm:py-4 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-full hover:bg-slate-50 transition shadow-sm flex items-center gap-2"
                >
                  <span>{t.hero.exploreBtn}</span>
                </a>
              </div>

              <div
                className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-slate-200 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg wow animate__animated animate__fadeInUp"
                data-wow-delay="0.4s"
                data-wow-duration="1s"
              >
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">100%</div>

                  <div className="text-xs text-slate-500 font-semibold mt-1">
                    {t.hero.stats.responsive}
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900"> 1s</div>

                  <div className="text-xs text-slate-500 font-semibold mt-1">
                    {t.hero.stats.speed}
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-1">
                    <span>5.0</span>

                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>

                  <div className="text-xs text-slate-500 font-semibold mt-1">
                    {t.hero.stats.satisfaction}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`lg:col-span-5 relative wow animate__animated ${
                t.dir === 'rtl' ? 'animate__fadeInLeft' : 'animate__fadeInRight'
              }`}
              data-wow-delay="0.3s"
              data-wow-duration="1s"
            >
              <div className="relative bg-white/90 backdrop-blur-2xl p-4 rounded-3xl border border-slate-200/80 shadow-[0_20px_50px_rgba(255,107,0,0.08)]">
                <div className="rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden">
                  <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 max-w-[75%] truncate bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                      https://sparkframe.studio
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="h-28 rounded-xl bg-gradient-to-r from-orange-500/15 via-amber-500/15 to-yellow-500/10 border border-orange-200 p-4 flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <div className="w-24 h-3 bg-orange-500/40 rounded-full" />

                        <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded border border-orange-200">
                          SPARK UI
                        </span>
                      </div>

                      <div className="w-3/4 h-5 bg-slate-800/10 rounded-md" />

                      <div className="w-1/2 h-3 bg-slate-400/30 rounded-full" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-24 bg-white rounded-xl border border-slate-200 p-3 flex flex-col justify-between shadow-sm">
                        <Code2 className="w-5 h-5 text-orange-600" />

                        <div className="text-xs font-bold text-slate-800">Clean Code API</div>
                      </div>

                      <div className="h-24 bg-white rounded-xl border border-slate-200 p-3 flex flex-col justify-between shadow-sm">
                        <Smartphone className="w-5 h-5 text-amber-600" />

                        <div className="text-xs font-bold text-slate-800">Mobile Ready</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="py-16 sm:py-20 lg:py-24 bg-slate-100/60 border-t border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div
              className="text-center max-w-2xl mx-auto mb-16 wow animate__animated animate__fadeInUp"
              data-wow-duration="0.9s"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold uppercase mb-4">
                {t.services.tag}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                {t.services.title}
              </h2>

              <p className="mt-3 text-slate-600 text-sm">{t.services.desc}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const ServiceIcon = service.icon;

                return (
                  <div
                    key={service.title}
                    className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-orange-400 hover:shadow-[0_10px_30px_rgba(255,107,0,0.08)] transition duration-300 flex flex-col justify-between group hover-lift wow animate__animated animate__fadeInUp"
                    data-wow-delay={`${index * 0.1}s`}
                    data-wow-duration="0.8s"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition duration-300 shadow-sm">
                        <ServiceIcon className="w-6 h-6" />
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>

                      <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.desc}</p>
                    </div>

                    <div className="space-y-2 border-t border-slate-100 pt-4">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-xs text-slate-700 font-medium"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />

                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="portfolio" className="mx-auto py-16 sm:py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div
                className={`wow animate__animated ${
                  t.dir === 'rtl' ? 'animate__fadeInRight' : 'animate__fadeInLeft'
                }`}
                data-wow-duration="0.9s"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold uppercase mb-4">
                  {t.portfolio.tag}
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                  {t.portfolio.title}
                </h2>
              </div>

              <div
                className={`flex items-center justify-center sm:gap-2 gap-2 bg-white p-1.5 rounded-3xl border border-slate-200 shadow-sm flex-wrap wow animate__animated ${
                  t.dir === 'rtl' ? 'animate__fadeInLeft' : 'animate__fadeInRight'
                }`}
                data-wow-duration="0.9s"
              >
                {t.portfolio.categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      activeCategory === category
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`bg-white border ${project.border} w-full rounded-3xl overflow-hidden hover:border-orange-400 hover:shadow-[0_15px_35px_rgba(255,107,0,0.1)] transition duration-300 shadow-sm flex flex-col justify-between group hover-lift wow animate__animated animate__fadeInUp`}
                  data-wow-delay={`${index * 0.12}s`}
                  data-wow-duration="0.9s"
                >
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="cursor-pointer flex-1 flex flex-col"
                  >
                    <div
                      className={`aspect-[16/9] bg-gradient-to-br ${project.gradient} p-6 relative flex flex-col justify-between`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-800 bg-white/90 px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                          {project.category}
                        </span>

                        <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-orange-600 transition" />
                      </div>

                      <div className="w-full bg-white/90 backdrop-blur-md p-3 rounded-xl border border-slate-200 text-xs text-slate-800 font-mono shadow-sm">
                        {project.metrics}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition">
                          {project.title}
                        </h3>

                        <p className="text-sm text-slate-600 mb-4 line-clamp-3">{project.desc}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tech.map((technology) => (
                          <span
                            key={technology}
                            className="text-[11px] font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition"
                    >
                      <Globe className="w-4 h-4" />

                      {t.portfolio.visitSite}

                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            PROJECT MODAL
        ====================================================== */}

        {selectedProject && (
          <div
            className="fixed inset-0 z-[80] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6 animate__animated animate__fadeIn"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-white border border-slate-200 max-w-2xl w-full rounded-3xl p-5 sm:p-8 relative shadow-2xl animate__animated animate__zoomIn max-h-[90vh] overflow-y-auto"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className={`absolute top-6 ${
                  t.dir === 'rtl' ? 'left-6' : 'right-6'
                } p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition`}
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-bold text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                {selectedProject.category}
              </span>

              <h3 className="text-3xl font-black text-slate-900 mt-4 mb-3">
                {selectedProject.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {selectedProject.fullDesc}
              </p>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6">
                <div className="text-xs text-slate-500 font-bold uppercase mb-2">
                  {t.modal.techUsed}
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((technology) => (
                    <span
                      key={technology}
                      className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-sm"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition"
                >
                  {t.modal.close}
                </button>

                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-orange-500 text-white font-black text-xs rounded-xl hover:bg-orange-600 transition shadow-md shadow-orange-500/20 flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4" />

                  {t.portfolio.visitSite}

                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 bg-slate-900 text-white font-black text-xs rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2"
                >
                  {t.modal.requestSimilar}

                  <ArrowRight className={`w-4 h-4 ${t.dir === 'rtl' ? 'rotate-180' : ''}`} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            ESTIMATOR
        ====================================================== */}

        <section
          id="estimator"
          className="py-16 sm:py-20 lg:py-24 bg-slate-100/60 border-t border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div
              className="text-center max-w-2xl mx-auto mb-16 wow animate__animated animate__fadeInUp"
              data-wow-duration="0.9s"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold uppercase mb-4">
                {t.estimator.tag}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                {t.estimator.title}
              </h2>

              <p className="mt-3 text-slate-600 text-sm">{t.estimator.desc}</p>
            </div>

            <div
              className="grid lg:grid-cols-12 gap-12 items-center bg-white p-5 sm:p-8 lg:p-12 rounded-3xl border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.04)] wow animate__animated animate__fadeInUp"
              data-wow-duration="1s"
            >
              <div className="lg:col-span-7 space-y-6">
                {/* PROJECT TYPE */}

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-3">
                    {t.estimator.step1}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'landing', label: t.estimator.types.landing },
                      { id: 'web-app', label: t.estimator.types.webApp },
                      { id: 'store', label: t.estimator.types.store }
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() =>
                          setEstimator({
                            ...estimator,
                            projectType: type.id
                          })
                        }
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition ${
                          estimator.projectType === type.id
                            ? 'bg-orange-50 border-orange-400 text-orange-700 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PAGES */}

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase mb-2">
                    <span>{t.estimator.step2}</span>

                    <span className="text-orange-600">
                      {estimator.pages} {t.estimator.pagesUnit}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={estimator.pages}
                    onChange={(event) =>
                      setEstimator({
                        ...estimator,
                        pages: parseInt(event.target.value, 10)
                      })
                    }
                    className="w-full accent-orange-500 bg-slate-200 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* ADDONS */}

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    {t.estimator.step3}
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300">
                    <span className="text-sm font-semibold text-slate-800">
                      {t.estimator.addons.backend}
                    </span>

                    <input
                      type="checkbox"
                      checked={estimator.needsBackend}
                      onChange={(event) =>
                        setEstimator({
                          ...estimator,
                          needsBackend: event.target.checked
                        })
                      }
                      className="w-4 h-4 accent-orange-500 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300">
                    <span className="text-sm font-semibold text-slate-800">
                      {t.estimator.addons.seo}
                    </span>

                    <input
                      type="checkbox"
                      checked={estimator.needsSEO}
                      onChange={(event) =>
                        setEstimator({
                          ...estimator,
                          needsSEO: event.target.checked
                        })
                      }
                      className="w-4 h-4 accent-orange-500 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300">
                    <span className="text-sm font-semibold text-slate-800">
                      {t.estimator.addons.priority}
                    </span>

                    <input
                      type="checkbox"
                      checked={estimator.speedPriority}
                      onChange={(event) =>
                        setEstimator({
                          ...estimator,
                          speedPriority: event.target.checked
                        })
                      }
                      className="w-4 h-4 accent-orange-500 rounded"
                    />
                  </label>
                </div>
              </div>

              {/* ESTIMATE RESULT */}

              <div
                className={`lg:col-span-5 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-8 rounded-2xl text-white text-center flex flex-col justify-between h-full shadow-lg shadow-orange-500/20 wow animate__animated ${
                  t.dir === 'rtl' ? 'animate__fadeInLeft' : 'animate__fadeInRight'
                }`}
                data-wow-delay="0.2s"
                data-wow-duration="1s"
              >
                <div>
                  <div className="text-xs uppercase font-bold tracking-widest text-orange-100 mb-2">
                    {t.estimator.result.title}
                  </div>

                  <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                    {calculateEstimate().toLocaleString()}

                    <span className="text-xl sm:text-2xl mx-2">{t.estimator.result.currency}</span>
                  </div>

                  <div className="text-xs text-orange-100 mt-2 font-semibold">
                    {t.estimator.result.subtitle}
                  </div>
                </div>

                <div className="my-8 py-6 border-y border-white/20 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase text-orange-100">
                      {t.estimator.result.time}
                    </div>

                    <div className="text-xl sm:text-2xl font-black mt-1 flex items-center justify-center gap-1">
                      <Clock className="w-5 h-5" />

                      <span>
                        {calculateDays()} {t.estimator.result.daysUnit}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-bold uppercase text-orange-100">
                      {t.estimator.result.revisions}
                    </div>

                    <div className="text-xl sm:text-2xl font-black mt-1 flex items-center justify-center gap-1">
                      <RefreshCw className="w-5 h-5" />

                      <span>{t.estimator.result.unlimited}</span>
                    </div>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="w-full py-4 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition duration-300 flex items-center justify-center gap-2 shadow-md"
                >
                  <span>{t.estimator.result.lockScope}</span>

                  <ArrowRight className={`w-4 h-4 ${t.dir === 'rtl' ? 'rotate-180' : ''}`} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div
              className="text-center mb-16 wow animate__animated animate__fadeInUp"
              data-wow-duration="0.9s"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold uppercase mb-4">
                {t.faq.tag}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                {t.faq.title}
              </h2>
            </div>

            <div className="space-y-4">
              {t.faq.items.map((faq, index) => (
                <div
                  key={faq.q}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition shadow-sm wow animate__animated animate__fadeInUp"
                  data-wow-delay={`${index * 0.1}s`}
                  data-wow-duration="0.8s"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full p-6 text-start flex items-center justify-between gap-4 font-bold text-slate-900 text-base hover:text-orange-600 transition"
                  >
                    <span>{faq.q}</span>

                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        activeFaq === index ? 'rotate-180 text-orange-600' : ''
                      }`}
                    />
                  </button>

                  {activeFaq === index && (
                    <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 animate__animated animate__fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 bg-slate-100/80 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-12">
              {/* LEFT */}

              <div
                className={`lg:col-span-5 wow animate__animated ${
                  t.dir === 'rtl' ? 'animate__fadeInRight' : 'animate__fadeInLeft'
                }`}
                data-wow-duration="1s"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold uppercase mb-4">
                  {t.contact.tag}
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-6">
                  {t.contact.title}
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed mb-8">{t.contact.desc}</p>

                <div className="space-y-4 text-sm font-medium text-slate-700">
                  <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase">
                        {t.contact.emailLabel}
                      </div>

                      <a
                        href="mailto:sparkframe80@gmail.com"
                        className="text-slate-900 font-bold hover:text-orange-600 transition"
                      >
                        sparkframe80@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                      <Globe className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase">
                        {t.contact.availabilityLabel}
                      </div>

                      <div className="text-slate-900 font-bold">{t.contact.availabilityText}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <form
                  onSubmit={handleContactSubmit}
                  className={`wow animate__animated ${
                    t.dir === 'rtl' ? 'animate__fadeInLeft' : 'animate__fadeInRight'
                  } bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-5`}
                  data-wow-delay="0.2s"
                  data-wow-duration="1s"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                        {t.contact.form.name}
                      </label>

                      <input
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-orange-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                        {t.contact.form.email}
                      </label>

                      <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-orange-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                      {t.contact.form.service}
                    </label>

                    <select
                      name="service"
                      required
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm truncate text-slate-700 font-medium focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 hover:bg-slate-100/80 transition-all cursor-pointer shadow-sm"
                    >
                      <option value="fullstack">{t.contact.form.serviceOptions.fullstack}</option>
                      <option value="uiux">{t.contact.form.serviceOptions.uiux}</option>
                      <option value="mobile">{t.contact.form.serviceOptions.mobile}</option>
                      <option value="speed">{t.contact.form.serviceOptions.speed}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                      {t.contact.form.brief}
                    </label>

                    <textarea
                      name="project_brief"
                      rows={4}
                      required
                      placeholder={t.contact.form.briefPlaceholder}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-orange-500 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-xl hover:brightness-110 shadow-lg shadow-orange-500/20 transition duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />

                        <span>{t.contact.form.submitting}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />

                        <span>{t.contact.form.submit}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <footer
          className="border-t border-slate-200 bg-white py-10 wow animate__animated animate__fadeIn"
          data-wow-duration="0.8s"
        >
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Lightbulb className="w-4 h-4 text-orange-600" />

              <span dir={t.dir}>
                {brandFirst}
                <span className="text-orange-600">{brandSecond}</span>{' '}
                {lang === 'ar' ? 'ستوديو' : 'Studio'}
              </span>
            </div>

            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} {t.footer.rights}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}