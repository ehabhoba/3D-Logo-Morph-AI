
import React, { useState, useRef } from 'react';
import Header from './components/Header';
import UploadArea from './components/UploadArea';
import StyleSelector from './components/StyleSelector';
import ResultDisplay from './components/ResultDisplay';
import LoadingState from './components/LoadingState';
import { generate3DLogo } from './services/geminiService';
import { AppState } from './types';
import { STYLE_OPTIONS, HERO_TITLE, HERO_SUBTITLE, FEATURES, GALLERY_ITEMS, FAQS } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [originalImage, setOriginalImage] = useState<{base64: string, mime: string} | null>(null);
  const [selectedStyleId, setSelectedStyleId] = useState<string>(STYLE_OPTIONS[0].id);
  const [removeBackground, setRemoveBackground] = useState<boolean>(true);
  
  // Advanced Options State
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [negativePrompt, setNegativePrompt] = useState<string>("");
  const [temperature, setTemperature] = useState<number>(0.4);

  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resultSectionRef = useRef<HTMLDivElement>(null);

  const handleImageSelected = (base64: string, mime: string) => {
    setOriginalImage({ base64, mime });
    setAppState(AppState.READY);
    setGeneratedImage(null);
    setErrorMessage(null);
    setTimeout(() => {
        window.scrollBy({ top: 200, behavior: 'smooth' });
    }, 100);
  };

  const handleClear = () => {
    setOriginalImage(null);
    setAppState(AppState.IDLE);
    setGeneratedImage(null);
    setErrorMessage(null);
    setNegativePrompt("");
    setTemperature(0.4);
  };

  const handleGenerate = async () => {
    if (!originalImage) return;

    setAppState(AppState.GENERATING);
    setErrorMessage(null);
    
    setTimeout(() => {
        resultSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    try {
      const selectedStyle = STYLE_OPTIONS.find(s => s.id === selectedStyleId);
      if (!selectedStyle) throw new Error("Style not found");

      const resultBase64 = await generate3DLogo(
        originalImage.base64,
        originalImage.mime,
        selectedStyle.promptModifier,
        removeBackground,
        negativePrompt,
        temperature
      );

      setGeneratedImage(resultBase64);
      setAppState(AppState.SUCCESS);

    } catch (error: any) {
      console.error(error);
      setAppState(AppState.ERROR);
      setErrorMessage(error.message || "حدث خطأ غير متوقع أثناء المعالجة");
    }
  };

  return (
    <div className="min-h-screen bg-dark overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <Header />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[150px] animate-blob animation-delay-2000"></div>
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-36 pb-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/50 border border-white/5 text-xs md:text-sm text-primaryLight font-medium animate-fade-in-up backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            تكنولوجيا Gemini 2.5 Flash المتطورة
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl">
            {HERO_TITLE} <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primaryLight to-secondary">
              تصميم الهوية الكاملة
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
            {HERO_SUBTITLE}
            <br className="hidden md:block"/>
            اصنع واجهات المحلات، المطبوعات، والإعلانات بضغطة زر.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button 
              onClick={() => document.getElementById('workspace')?.scrollIntoView({behavior: 'smooth'})}
              className="px-8 py-4 bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 text-white font-bold rounded-2xl text-lg transition-all transform hover:-translate-y-1"
            >
              ابدأ مشروعك الآن ✨
            </button>
            <button 
               onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}
               className="px-8 py-4 bg-surface hover:bg-slate-700 text-white font-medium rounded-2xl text-lg border border-white/5 transition-all"
            >
              استكشف القوالب
            </button>
          </div>
        </div>
      </section>

      {/* MAIN TOOL WORKSPACE */}
      <section id="workspace" className="relative z-10 py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="glass-panel rounded-[2.5rem] p-6 md:p-12 shadow-2xl ring-1 ring-white/10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">استوديو التصميم</h2>
            <p className="text-slate-400">ارفع الشعار واختر من بين أكثر من 20 تطبيق واقعي</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Left Column: Controls */}
            <div className="lg:col-span-6 space-y-8">
              
              {/* Step 1 */}
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-white">
                   <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">1</div>
                   <h3 className="font-bold text-lg">رفع الشعار</h3>
                 </div>
                 <UploadArea 
                  onImageSelected={handleImageSelected} 
                  selectedImage={originalImage ? originalImage.base64 : null}
                  onClear={handleClear}
                />
              </div>

              {/* Step 2 & 3 */}
              {originalImage && (
                <div className="space-y-8 animate-fade-in-up">
                  
                  {/* Styles */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white text-sm font-bold">2</div>
                      <h3 className="font-bold text-lg">اختيار التطبيق</h3>
                    </div>
                    <StyleSelector 
                      selectedStyleId={selectedStyleId}
                      onSelect={setSelectedStyleId}
                      disabled={appState === AppState.GENERATING}
                    />
                  </div>

                  {/* Settings */}
                  <div className="bg-surface p-5 rounded-2xl border border-white/5">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div className="flex-1">
                        <span className="block font-bold text-white group-hover:text-primary transition-colors">
                          إزالة الخلفية الذكي
                        </span>
                        <span className="text-xs text-slate-400 mt-1">
                          تحسين دمج الشعار مع القالب بإزالة الخلفية الأصلية
                        </span>
                      </div>
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          className="peer sr-only"
                          checked={removeBackground}
                          onChange={(e) => setRemoveBackground(e.target.checked)}
                          disabled={appState === AppState.GENERATING}
                        />
                         <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </div>
                    </label>
                  </div>

                  {/* Advanced Section */}
                  <div className="border border-white/5 rounded-2xl overflow-hidden bg-black/20">
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      disabled={appState === AppState.GENERATING}
                      className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                    >
                      <span className="text-slate-400 font-medium text-sm">خيارات متقدمة (Creative Control)</span>
                      <svg 
                        className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${showAdvanced ? 'rotate-180' : ''}`} 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showAdvanced && (
                      <div className="p-5 border-t border-white/5 space-y-6 animate-fade-in">
                        <div>
                          <label className="block text-xs font-bold text-slate-400 mb-2">تعليمات سلبية (Negative Prompt)</label>
                          <textarea
                            value={negativePrompt}
                            onChange={(e) => setNegativePrompt(e.target.value)}
                            disabled={appState === AppState.GENERATING}
                            className="w-full bg-dark border border-white/10 rounded-xl p-3 text-sm text-white focus:border-primary outline-none transition-all resize-none"
                            placeholder="مثال: لا تقم بتغيير ألوان الشعار..."
                            rows={2}
                          />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-slate-400">الإبداع (Temperature)</label>
                            <span className="text-xs font-mono bg-white/10 px-2 py-1 rounded text-primaryLight">{temperature}</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={temperature}
                            onChange={(e) => setTemperature(parseFloat(e.target.value))}
                            disabled={appState === AppState.GENERATING}
                            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={handleGenerate}
                    disabled={appState === AppState.GENERATING}
                    className={`
                      w-full py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 transform relative overflow-hidden group
                      ${appState === AppState.GENERATING 
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-primary to-secondary text-white hover:scale-[1.01] hover:shadow-primary/30'
                      }
                    `}
                  >
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      {appState === AppState.GENERATING ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          <span>جاري العمل على التصميم...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                          تنفيذ التصميم
                        </>
                      )}
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Output */}
            <div className="lg:col-span-6 sticky top-24" ref={resultSectionRef}>
              <div className="min-h-[600px] h-full rounded-[2rem] bg-surface/50 border border-white/5 flex flex-col relative overflow-hidden shadow-inner">
                 {appState === AppState.GENERATING && originalImage ? (
                    <LoadingState originalImage={originalImage.base64} />
                 ) : appState === AppState.SUCCESS && generatedImage && originalImage ? (
                   <ResultDisplay 
                     resultImage={generatedImage} 
                     originalImage={originalImage.base64}
                     styleName={STYLE_OPTIONS.find(s => s.id === selectedStyleId)?.name || 'Custom'}
                   />
                 ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center opacity-40">
                      <div className="w-40 h-40 mb-6 bg-slate-800 rounded-full flex items-center justify-center">
                        <svg className="w-20 h-20 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">معاينة التصميم</h3>
                      <p className="text-slate-400">ستظهر النتيجة النهائية هنا بجودة عالية</p>
                    </div>
                 )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">كيف يعمل؟</h2>
            <p className="text-slate-400 text-lg">ثلاث خطوات بسيطة تفصلك عن هويتك البصرية الجديدة</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-surface/30 backdrop-blur-sm border border-white/5 p-8 rounded-3xl text-center relative group hover:bg-surface/50 transition-all">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition-transform">
                📤
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1. ارفع الشعار</h3>
              <p className="text-slate-400 leading-relaxed">قم برفع شعارك بصيغة PNG أو JPG. يفضل أن يكون الشعار بخلفية شفافة للحصول على أفضل النتائج.</p>
            </div>
            
            <div className="bg-surface/30 backdrop-blur-sm border border-white/5 p-8 rounded-3xl text-center relative group hover:bg-surface/50 transition-all">
              <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-l from-transparent to-primary/50"></div>
              <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition-transform">
                🎨
              </div>
              <h3 className="text-xl font-bold text-white mb-3">2. اختر القالب</h3>
              <p className="text-slate-400 leading-relaxed">تصفح مكتبة القوالب الضخمة التي تضم المكاتب، الملابس، اللافتات الخارجية، والمنتجات.</p>
            </div>

            <div className="bg-surface/30 backdrop-blur-sm border border-white/5 p-8 rounded-3xl text-center relative group hover:bg-surface/50 transition-all">
              <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-l from-transparent to-secondary/50"></div>
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition-transform">
                ✨
              </div>
              <h3 className="text-xl font-bold text-white mb-3">3. استلم التصميم</h3>
              <p className="text-slate-400 leading-relaxed">يقوم الذكاء الاصطناعي بمعالجة الصورة ودمجها في القالب المختار في ثوانٍ معدودة.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 px-4 bg-dark/50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">مميزات المنصة</h2>
            <p className="text-slate-400 text-lg">أدوات احترافية مصممة للمصممين وأصحاب الأعمال</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="bg-gradient-to-b from-surface/40 to-surface/10 p-6 rounded-3xl border border-white/5 hover:border-primary/30 transition-all hover:-translate-y-2">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SHOWCASE */}
      <section id="gallery" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">معرض الأعمال</h2>
              <p className="text-slate-400 text-lg">نتائج حقيقية تم إنشاؤها باستخدام DLogo AI</p>
            </div>
            <button className="text-primary hover:text-white font-bold flex items-center gap-2 transition-colors">
              مشاهدة المزيد <span className="text-xl">←</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((src, idx) => (
              <div key={idx} className={`group relative overflow-hidden rounded-2xl ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <div className="absolute inset-0 bg-slate-900 animate-pulse"></div>
                <img 
                  src={src} 
                  alt={`Gallery item ${idx}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    تم الإنشاء بواسطة DLogo AI
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-4 bg-surface/20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">الأسئلة الشائعة</h2>
          </div>
          
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-surface/50 border border-white/5 rounded-2xl p-6 hover:bg-surface/70 transition-colors">
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 bg-black/40 text-center relative z-10">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex items-center justify-center gap-2 mb-4">
              <span className="font-black text-2xl text-white">DLogo <span className="text-primary">AI</span></span>
           </div>
           <p className="text-slate-500 mb-8 max-w-md mx-auto">
             منصة متكاملة مدعومة من Google Gemini لإنشاء الهوية البصرية والموك-أب الاحترافي.
           </p>
           <div className="flex justify-center gap-6 text-sm text-slate-400 mb-8">
             <a href="#" className="hover:text-white">سياسة الخصوصية</a>
             <a href="#" className="hover:text-white">الشروط والأحكام</a>
             <a href="#" className="hover:text-white">اتصل بنا</a>
           </div>
           <p className="text-slate-700 text-xs">© {new Date().getFullYear()} DLogo AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
