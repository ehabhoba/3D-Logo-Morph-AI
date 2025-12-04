import React, { useEffect, useState } from 'react';

interface LoadingStateProps {
  originalImage: string;
}

const LOADING_MESSAGES = [
  "تحليل الأبعاد الهندسية...",
  "بناء المجسم ثلاثي الأبعاد...",
  "معالجة الإضاءة والظلال...",
  "دمج النسيج والخامات...",
  "إخراج الصورة النهائية..."
];

const LoadingState: React.FC<LoadingStateProps> = ({ originalImage }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Message cycling
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 3000);

    // Simulated progress bar logic
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        // Fast start, slow end simulation
        if (prev >= 95) return prev;
        const increment = prev < 50 ? 2 : prev < 80 ? 1 : 0.2;
        return prev + increment;
      });
    }, 200);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-slate-900/40 rounded-3xl border border-slate-700/50 backdrop-blur-sm shadow-2xl overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* Central Animation */}
      <div className="relative w-48 h-48 mb-12">
        {/* Pulsing rings */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
        <div className="absolute inset-4 rounded-full border border-secondary/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1000ms]" />
        
        {/* Rotating border */}
        <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-primary/40 animate-[spin_3s_linear_infinite]" />
        <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-secondary/40 animate-[spin_2s_linear_infinite_reverse]" />

        {/* Image Container with Glow */}
        <div className="absolute inset-4 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.2)]">
          <img 
            src={originalImage} 
            alt="Processing" 
            className="w-3/4 h-3/4 object-contain opacity-80 animate-pulse drop-shadow-lg"
          />
          {/* Scanning Line overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent w-full h-20 animate-[scan_2s_ease-in-out_infinite] blur-sm" />
        </div>
      </div>

      {/* Progress Section */}
      <div className="w-full max-w-md space-y-3 z-10">
        <div className="flex justify-between text-sm font-medium px-1">
          <span className="text-primary animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {LOADING_MESSAGES[messageIndex]}
          </span>
          <span className="text-slate-500 font-mono">{Math.floor(progress)}%</span>
        </div>
        
        {/* Progress Bar Track */}
        <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-700/50">
          {/* Animated Bar */}
          <div 
            className="h-full bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-150%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(250%); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </div>
  );
};

export default LoadingState;