import React, { useState } from 'react';

interface ResultDisplayProps {
  resultImage: string; // base64
  originalImage: string; // base64
  styleName: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ resultImage, originalImage, styleName }) => {
  const [viewMode, setViewMode] = useState<'result' | 'compare'>('result');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${resultImage}`;
    link.download = `3d-logo-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const finalSrc = `data:image/png;base64,${resultImage}`;

  return (
    <div className="w-full bg-slate-900/50 rounded-3xl border border-slate-700 overflow-hidden animate-fade-in">
      {/* Toolbar */}
      <div className="p-4 border-b border-slate-700 flex flex-wrap gap-4 justify-between items-center">
        <h2 className="text-xl font-bold text-white">🎉 النتيجة: {styleName}</h2>
        <div className="flex bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode('result')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'result' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            النتيجة
          </button>
          <button
            onClick={() => setViewMode('compare')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'compare' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            مقارنة
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative w-full aspect-square md:aspect-video bg-black/40 flex items-center justify-center p-4">
        {viewMode === 'result' ? (
          <img 
            src={finalSrc} 
            alt="Generated 3D Logo" 
            className="w-full h-full object-contain rounded-lg shadow-2xl"
          />
        ) : (
          <div className="flex gap-4 w-full h-full">
            <div className="flex-1 flex flex-col gap-2">
              <span className="text-xs text-slate-500 text-center">الأصلي</span>
              <img src={originalImage} className="w-full h-full object-contain bg-slate-800/30 rounded-lg border border-slate-700" alt="Original" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <span className="text-xs text-slate-500 text-center">النتيجة</span>
              <img src={finalSrc} className="w-full h-full object-contain rounded-lg border border-primary/30 shadow-lg shadow-primary/10" alt="Result" />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-6 bg-slate-900 border-t border-slate-800 flex justify-center">
        <button
          onClick={handleDownload}
          className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white transition-all duration-200 bg-gradient-to-r from-primary to-secondary rounded-full hover:shadow-lg hover:shadow-primary/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-slate-900"
        >
          <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          تحميل الصورة
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;