import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen ? 'py-3 bg-dark/90 backdrop-blur-xl border-b border-white/5' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center relative z-50">
        {/* Logo Area */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-12 h-12 relative flex items-center justify-center filter drop-shadow-[0_0_10px_rgba(14,165,233,0.5)]">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M50 5L93.3013 30V80L50 105L6.69873 80V30L50 5Z" fill="url(#paint0_linear)" stroke="#38bdf8" strokeWidth="2"/>
              <path d="M35 30H55C70 30 75 40 75 55C75 70 70 80 55 80H35V30Z" fill="url(#paint1_linear)" />
              <path d="M35 30V80" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              <defs>
                <linearGradient id="paint0_linear" x1="50" y1="5" x2="50" y2="105" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0ea5e9" stopOpacity="0.2"/>
                  <stop offset="1" stopColor="#0f172a" stopOpacity="0.8"/>
                </linearGradient>
                <linearGradient id="paint1_linear" x1="35" y1="30" x2="75" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38bdf8"/>
                  <stop offset="1" stopColor="#0284c7"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-white">
              DLogo <span className="text-primary">AI</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide">Brand Identity Platform</span>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button onClick={() => scrollToSection('how-it-works')} className="hover:text-primary transition-colors">كيف يعمل؟</button>
          <button onClick={() => scrollToSection('features')} className="hover:text-primary transition-colors">المميزات</button>
          <button onClick={() => scrollToSection('gallery')} className="hover:text-primary transition-colors">معرض الأعمال</button>
          <button 
            onClick={() => scrollToSection('workspace')}
            className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-95"
          >
            ابدأ التصميم مجاناً
          </button>
        </nav>

        {/* Mobile Toggle Button */}
        <button 
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col p-4 space-y-4 text-center">
          <button onClick={() => scrollToSection('workspace')} className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-bold shadow-lg">
            ابدأ مشروعك الآن 🚀
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="p-2 text-slate-300 hover:text-white border-b border-white/5">كيف يعمل؟</button>
          <button onClick={() => scrollToSection('features')} className="p-2 text-slate-300 hover:text-white border-b border-white/5">المميزات</button>
          <button onClick={() => scrollToSection('gallery')} className="p-2 text-slate-300 hover:text-white">معرض الأعمال</button>
        </div>
      </div>
    </header>
  );
};

export default Header;