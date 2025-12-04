import React, { useRef, useState } from 'react';
import { MAX_FILE_SIZE_MB } from '../constants';

interface UploadAreaProps {
  onImageSelected: (base64: string, mimeType: string) => void;
  selectedImage: string | null;
  onClear: () => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onImageSelected, selectedImage, onClear }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = (file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('يرجى رفع ملف صورة فقط (PNG, JPG, WEBP)');
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`حجم الملف كبير جداً. الحد الأقصى هو ${MAX_FILE_SIZE_MB} ميجابايت`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const parts = result.split(',');
      const meta = parts[0];
      const base64 = parts[1];
      const mimeMatch = meta.match(/:(.*?);/);
      
      if (mimeMatch && base64) {
        onImageSelected(base64, mimeMatch[1]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  if (selectedImage) {
    return (
      <div className="w-full relative group rounded-3xl overflow-hidden border border-primary/30 shadow-2xl shadow-primary/10 transition-all duration-500 hover:shadow-primary/20 bg-slate-900/50">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
        <img 
          src={selectedImage} 
          alt="Uploaded Logo" 
          className="w-full h-64 object-contain p-8" 
        />
        <div className="absolute inset-0 bg-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-sm gap-4">
          <p className="text-white font-medium">هل تريد تغيير الشعار؟</p>
          <button 
            onClick={onClear}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
          >
            حذف واستبدال
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full group">
      <div 
        className={`
          relative border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-300
          flex flex-col items-center justify-center min-h-[300px]
          ${dragActive 
            ? 'border-primary bg-primary/5 scale-[1.02]' 
            : 'border-slate-700 hover:border-primary/50 hover:bg-slate-800/30'
          }
        `}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleChange}
        />
        
        {/* Decorative background blurs */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
              اضغط لرفع الشعار
            </h3>
            <p className="text-slate-400">
              أو اسحب الملف وأفلته هنا
            </p>
          </div>
          <div className="flex gap-3 text-xs text-slate-500 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
            <span>PNG</span>
            <span className="w-px h-3 bg-slate-700"></span>
            <span>JPG</span>
            <span className="w-px h-3 bg-slate-700"></span>
            <span>WEBP</span>
            <span className="w-px h-3 bg-slate-700"></span>
            <span>Max {MAX_FILE_SIZE_MB}MB</span>
          </div>
        </div>
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 animate-shake">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default UploadArea;