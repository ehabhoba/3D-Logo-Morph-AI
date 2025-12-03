import React, { useState, useRef } from 'react';
import Header from './components/Header';
import UploadArea from './components/UploadArea';
import StyleSelector from './components/StyleSelector';
import ResultDisplay from './components/ResultDisplay';
import { generate3DLogo } from './services/geminiService';
import { AppState } from './types';
import { STYLE_OPTIONS, HERO_TITLE, HERO_SUBTITLE } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [originalImage, setOriginalImage] = useState<{base64: string, mime: string} | null>(null);
  const [selectedStyleId, setSelectedStyleId] = useState<string>(STYLE_OPTIONS[0].id);
  const [removeBackground, setRemoveBackground] = useState<boolean>(true);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resultSectionRef = useRef<HTMLDivElement>(null);

  const handleImageSelected = (base64: string, mime: string) => {
    setOriginalImage({ base64, mime });
    setAppState(AppState.READY);
    setGeneratedImage(null);
    setErrorMessage(null);
  };

  const handleClear = () => {
    setOriginalImage(null);
    setAppState(AppState.IDLE);
    setGeneratedImage(null);
    setErrorMessage(null);
  };

  const handleGenerate = async () => {
    if (!originalImage) return;

    setAppState(AppState.GENERATING);
    setErrorMessage(null);

    try {
      const selectedStyle = STYLE_OPTIONS.find(s => s.id === selectedStyleId);
      if (!selectedStyle) throw new Error("Style not found");

      const resultBase64 = await generate3DLogo(
        originalImage.base64,
        originalImage.mime,
        selectedStyle.promptModifier,
        removeBackground
      );

      setGeneratedImage(resultBase64);
      setAppState(AppState.SUCCESS);
      
      // Smooth scroll to result
      setTimeout(() => {
        resultSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (error: any) {
      console.error(error);
      setAppState(AppState.ERROR);
      setErrorMessage(error.message || "حدث خطأ غير متوقع أثناء المعالجة");
    }
  };

  return (
    <div className="min-h-screen bg-darker text-slate-100 flex flex-col">
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col gap-16">
        
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 leading-tight pb-2">
            {HERO_TITLE}
          </h2>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
            {HERO_SUBTITLE}
          </p>
        </section>

        {/* Workspace */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-5 space-y-8 sticky top-24">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold border border-slate-700">1</span>
                <h3 className="text-xl font-bold">ارفع الشعار</h3>
              </div>
              <UploadArea 
                onImageSelected={handleImageSelected} 
                selectedImage={originalImage ? originalImage.base64 : null}
                onClear={handleClear}
              />
            </div>

            {originalImage && (
              <div className="space-y-6 animate-fade-in-up">
                
                {/* Style Selector */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold border border-slate-700">2</span>
                    <h3 className="text-xl font-bold">اختر النمط</h3>
                  </div>
                  <StyleSelector 
                    selectedStyleId={selectedStyleId}
                    onSelect={setSelectedStyleId}
                    disabled={appState === AppState.GENERATING}
                  />
                </div>

                {/* Settings Toggle */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={removeBackground}
                        onChange={(e) => setRemoveBackground(e.target.checked)}
                        disabled={appState === AppState.GENERATING}
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </div>
                    <div className="flex-1">
                      <span className="block font-bold text-slate-200 group-hover:text-primary transition-colors">
                        إزالة الخلفية والتركيز على الشعار
                      </span>
                      <span className="text-xs text-slate-500">
                        قم بتفعيل هذا الخيار إذا كانت الصورة الأصلية تحتوي على خلفية وتريد استخراج الشعار فقط لعمل الـ 3D.
                      </span>
                    </div>
                  </label>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={appState === AppState.GENERATING}
                  className={`
                    w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 transform
                    ${appState === AppState.GENERATING 
                      ? 'bg-slate-700 text-slate-400 cursor-wait' 
                      : 'bg-gradient-to-r from-primary to-secondary text-white hover:scale-[1.02] hover:shadow-primary/25'
                    }
                  `}
                >
                  {appState === AppState.GENERATING ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري المعالجة...
                    </span>
                  ) : '✨ تحويل الآن'}
                </button>
              </div>
            )}

            {appState === AppState.ERROR && errorMessage && (
              <div className="p-4 bg-red-900/30 border border-red-800 rounded-xl text-red-200 text-center animate-shake">
                {errorMessage}
              </div>
            )}
          </div>

          {/* Right Column: Result or Placeholder */}
          <div className="lg:col-span-7" ref={resultSectionRef}>
            {appState === AppState.SUCCESS && generatedImage && originalImage ? (
              <ResultDisplay 
                resultImage={generatedImage} 
                originalImage={originalImage.base64}
                styleName={STYLE_OPTIONS.find(s => s.id === selectedStyleId)?.name || 'Custom'}
              />
            ) : (
              // Placeholder State
              <div className="w-full aspect-video rounded-3xl border-2 border-dashed border-slate-800 bg-slate-900/20 flex flex-col items-center justify-center p-8 text-center opacity-50">
                <div className="w-24 h-24 mb-6 rounded-full bg-slate-800 flex items-center justify-center">
                  <span className="text-4xl">🎨</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-600 mb-2">مساحة العمل</h3>
                <p className="text-slate-500 max-w-sm">
                  قم برفع شعار واختيار نمط لرؤية النتيجة السحرية هنا.
                </p>
              </div>
            )}
          </div>

        </div>
      </main>

      <footer className="py-8 text-center text-slate-600 text-sm">
        <p>© {new Date().getFullYear()} 3D Logo Morphic AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;