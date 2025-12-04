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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            3D Morph AI
          </span>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors">كيف يعمل؟</button>
          <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">المميزات</button>
          <button onClick={() => scrollToSection('gallery')} className="hover:text-white transition-colors">معرض الأعمال</button>
          <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors">الأسئلة الشائعة</button>
          <button 
            onClick={() => scrollToSection('workspace')}
            className="px-5 py-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 active:scale-95"
          >
            جرب الأداة
          </button>
        </nav>

        {/* Mobile Toggle Button */}
        <button 
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="القائمة"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <button onClick={() => scrollToSection('workspace')} className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-bold">
            ابـدأ الآن 🚀
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="p-2 text-slate-300 hover:text-white border-b border-white/5">كيف يعمل؟</button>
          <button onClick={() => scrollToSection('features')} className="p-2 text-slate-300 hover:text-white border-b border-white/5">المميزات</button>
          <button onClick={() => scrollToSection('gallery')} className="p-2 text-slate-300 hover:text-white border-b border-white/5">معرض الأعمال</button>
          <button onClick={() => scrollToSection('faq')} className="p-2 text-slate-300 hover:text-white">الأسئلة الشائعة</button>
        </div>
      </div>
    </header>
  );
};

export default Header;