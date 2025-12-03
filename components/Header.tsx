import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 border-b border-slate-800/50 backdrop-blur-md sticky top-0 z-50 bg-darker/80">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
            3D
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            مُحول الشعارات
          </h1>
        </div>
        <div className="text-xs md:text-sm text-slate-500 font-medium px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50">
          Powered by Gemini AI
        </div>
      </div>
    </header>
  );
};

export default Header;