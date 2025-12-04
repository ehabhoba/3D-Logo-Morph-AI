import React, { useState } from 'react';
import { STYLE_OPTIONS, CATEGORIES } from '../constants';

interface StyleSelectorProps {
  selectedStyleId: string;
  onSelect: (id: string) => void;
  disabled: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyleId, onSelect, disabled }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredStyles = activeCategory === 'all' 
    ? STYLE_OPTIONS 
    : STYLE_OPTIONS.filter(style => style.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Categories Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto no-scrollbar mask-gradient">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300
              ${activeCategory === cat.id 
                ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredStyles.map((style) => (
          <button
            key={style.id}
            disabled={disabled}
            onClick={() => onSelect(style.id)}
            className={`
              group relative overflow-hidden rounded-xl text-right transition-all duration-300
              flex flex-col h-48 sm:h-56
              ${selectedStyleId === style.id 
                ? 'ring-2 ring-primary ring-offset-2 ring-offset-dark scale-[1.02] shadow-xl shadow-primary/20' 
                : 'hover:scale-[1.02] hover:shadow-lg'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {/* Image Preview */}
            <div className="absolute inset-0 bg-slate-800">
               <img 
                 src={style.previewImage} 
                 alt={style.name}
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                 loading="lazy"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
            </div>
            
            {/* Selection Check */}
            <div className={`
              absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-20
              ${selectedStyleId === style.id ? 'border-primary bg-primary text-white scale-100' : 'border-white/30 scale-0 opacity-0'}
            `}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 mt-auto p-4 w-full">
              <h3 className={`font-bold text-base mb-1 transition-colors ${selectedStyleId === style.id ? 'text-primaryLight' : 'text-white'}`}>
                {style.name}
              </h3>
              <p className="text-[10px] text-slate-300 leading-snug line-clamp-2 opacity-80 group-hover:opacity-100">
                {style.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;