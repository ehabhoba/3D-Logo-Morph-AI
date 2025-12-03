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
      // Extract base64 and mime type
      // result looks like "data:image/png;base64,....."
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  if (selectedImage) {
    return (
      <div className="w-full max-w-md mx-auto relative group rounded-2xl overflow-hidden border-2 border-primary/50 shadow-2xl shadow-primary/20 transition-all duration-300">
        <img 
          src={selectedImage} 
          alt="Uploaded Logo" 
          className="w-full h-64 object-contain bg-slate-800/50 p-4" 
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
          <button 
            onClick={onClear}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            حذف واستبدال
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className={`
          relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300
          ${dragActive ? 'border-primary bg-primary/10 scale-105' : 'border-slate-600 hover:border-slate-400 hover:bg-slate-800/50'}
        `}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
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
        
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-3xl">
            📤
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-200 mb-2">اضغط للرفع أو اسحب الملف هنا</h3>
            <p className="text-slate-400 text-sm">PNG, JPG بحد أقصى {MAX_FILE_SIZE_MB} ميجابايت</p>
          </div>
        </div>
      </div>
      {error && (
        <p className="text-red-400 text-sm text-center mt-3 bg-red-900/20 py-2 rounded-lg border border-red-900/50">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
};

export default UploadArea;