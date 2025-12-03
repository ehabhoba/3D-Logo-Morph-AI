import React from 'react';
import { StyleOption } from '../types';
import { STYLE_OPTIONS } from '../constants';

interface StyleSelectorProps {
  selectedStyleId: string;
  onSelect: (id: string) => void;
  disabled: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyleId, onSelect, disabled }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {STYLE_OPTIONS.map((style) => (
        <button
          key={style.id}
          disabled={disabled}
          onClick={() => onSelect(style.id)}
          className={`
            relative overflow-hidden rounded-xl p-4 text-right transition-all duration-300 group
            ${selectedStyleId === style.id 
              ? 'ring-2 ring-primary ring-offset-2 ring-offset-darker bg-slate-800' 
              : 'bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {/* Background Gradient overlay on hover/active */}
          <div className={`
            absolute inset-0 opacity-10 bg-gradient-to-br transition-opacity duration-300
            ${style.previewColor}
            ${selectedStyleId === style.id ? 'opacity-20' : 'group-hover:opacity-20'}
          `} />

          <div className="relative z-10 flex flex-col h-full justify-between gap-3">
            <div className="text-4xl mb-2 filter drop-shadow-lg">{style.icon}</div>
            <div>
              <h3 className="font-bold text-slate-100 text-lg">{style.name}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{style.description}</p>
            </div>
            
            <div className={`
              w-6 h-6 rounded-full border-2 ml-auto mt-2 flex items-center justify-center transition-colors
              ${selectedStyleId === style.id ? 'border-primary bg-primary text-white' : 'border-slate-600'}
            `}>
              {selectedStyleId === style.id && (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default StyleSelector;