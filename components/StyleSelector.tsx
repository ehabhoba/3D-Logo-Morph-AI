import React from 'react';
import { STYLE_OPTIONS } from '../constants';

interface StyleSelectorProps {
  selectedStyleId: string;
  onSelect: (id: string) => void;
  disabled: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyleId, onSelect, disabled }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
      {STYLE_OPTIONS.map((style) => (
        <button
          key={style.id}
          disabled={disabled}
          onClick={() => onSelect(style.id)}
          className={`
            group relative overflow-hidden rounded-2xl p-4 text-right transition-all duration-300
            flex flex-col h-full
            ${selectedStyleId === style.id 
              ? 'ring-2 ring-primary ring-offset-2 ring-offset-darker bg-slate-800/80 shadow-lg shadow-primary/20 scale-[1.02]' 
              : 'bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800 hover:border-slate-600'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {/* Background Gradient overlay */}
          <div className={`
            absolute inset-0 opacity-0 transition-opacity duration-500 bg-gradient-to-br
            ${style.previewColor}
            ${selectedStyleId === style.id ? 'opacity-10' : 'group-hover:opacity-10'}
          `} />

          {/* Icon */}
          <div className="relative z-10 text-3xl md:text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300 origin-right">
            {style.icon}
          </div>

          {/* Text Content */}
          <div className="relative z-10 flex-grow">
            <h3 className={`font-bold text-sm md:text-base mb-1 transition-colors ${selectedStyleId === style.id ? 'text-primary' : 'text-slate-200'}`}>
              {style.name}
            </h3>
            <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed line-clamp-2">
              {style.description}
            </p>
          </div>
          
          {/* Selection Indicator */}
          <div className={`
            absolute top-3 left-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300
            ${selectedStyleId === style.id ? 'border-primary bg-primary text-white scale-100' : 'border-slate-700 scale-90 opacity-0 group-hover:opacity-100'}
          `}>
            {selectedStyleId === style.id && (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default StyleSelector;