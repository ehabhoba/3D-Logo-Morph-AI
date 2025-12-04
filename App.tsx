import React, { useState, useRef } from 'react';
import Header from './components/Header';
import UploadArea from './components/UploadArea';
import StyleSelector from './components/StyleSelector';
import ResultDisplay from './components/ResultDisplay';
import LoadingState from './components/LoadingState';
import { generate3DLogo } from './services/geminiService';
import { AppState } from './types';
import { STYLE_OPTIONS, HERO_TITLE, HERO_SUBTITLE } from './constants';

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
    // Scroll a bit down to show styles
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
    
    // Auto scroll to result area
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
      
      {/* Background Ambience - Global */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-primaryLight font-medium animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            تكنولوجيا Gemini 2.5 الجديدة
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 leading-[1.1] tracking-tight drop-shadow-2xl">
            حول شعارك إلى <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">تحفة فنية</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            استخدم الذكاء الاصطناعي لتحويل الشعارات المسطحة إلى مجسمات ثلاثية الأبعاد، لافتات واقعية، وموك-أب احترافي بضغطة زر واحدة.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button 
              onClick={() => document.getElementById('workspace')?.scrollIntoView({behavior: 'smooth'})}
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 text-white font-bold rounded-2xl text-lg transition-all transform hover:-translate-y-1"
            >
              جرب الأداة مجاناً ✨
            </button>
            <button 
               onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}
               className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-white font-medium rounded-2xl text-lg border border-slate-700 transition-all backdrop-blur-md"
            >
              كيف يعمل؟
            </button>
          </div>

          {/* Stats / Trust Badges */}
          <div className="pt-12 flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="text-center">
                <div className="text-2xl font-bold text-white">+50K</div>
                <div className="text-xs text-slate-500">شعار تم تحويله</div>
             </div>
             <div className="text-center">
                <div className="text-2xl font-bold text-white">4K</div>
                <div className="text-xs text-slate-500">دقة عالية</div>
             </div>
             <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-slate-500">مجاني</div>
             </div>
          </div>
        </div>
      </section>

      {/* MAIN TOOL WORKSPACE */}
      <section id="workspace" className="relative z-10 py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="glass-panel rounded-[2.5rem] p-6 md:p-12 shadow-2xl ring-1 ring-white/10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">مساحة العمل الإبداعية</h2>
            <p className="text-slate-400">ابدأ برفع شعارك ودع السحر يحدث</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Left Column: Controls */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Step 1 */}
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-primaryLight">
                   <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border border-primary/20 text-sm font-bold">1</span>
                   <span className="font-bold tracking-wide text-sm uppercase">رفع الملف</span>
                 </div>
                 <UploadArea 
                  onImageSelected={handleImageSelected} 
                  selectedImage={originalImage ? originalImage.base64 : null}
                  onClear={handleClear}
                />
              </div>

              {/* Step 2 & 3 (Only visible if image uploaded) */}
              {originalImage && (
                <div className="space-y-8 animate-fade-in-up">
                  
                  {/* Styles */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-secondary">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10 border border-secondary/20 text-sm font-bold">2</span>
                      <span className="font-bold tracking-wide text-sm uppercase">اختيار النمط</span>
                    </div>
                    <StyleSelector 
                      selectedStyleId={selectedStyleId}
                      onSelect={setSelectedStyleId}
                      disabled={appState === AppState.GENERATING}
                    />
                  </div>

                  {/* Settings */}
                  <div className="bg-slate-900/40 p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <div className="relative flex items-center pt-1">
                        <input 
                          type="checkbox" 
                          className="peer sr-only"
                          checked={removeBackground}
                          onChange={(e) => setRemoveBackground(e.target.checked)}
                          disabled={appState === AppState.GENERATING}
                        />
                         <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </div>
                      <div className="flex-1">
                        <span className="block font-bold text-slate-200 group-hover:text-primary transition-colors">
                          وضع الشفافية الذكي
                        </span>
                        <span className="text-xs text-slate-500 mt-1 block leading-relaxed">
                          فصل الشعار عن خلفيته الأصلية لدمجه بشكل مثالي في القالب.
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Advanced Section */}
                  <div className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02]">
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      disabled={appState === AppState.GENERATING}
                      className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
                        <span>إعدادات متقدمة</span>
                      </div>
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
                          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                            توجيهات سلبية
                          </label>
                          <textarea
                            value={negativePrompt}
                            onChange={(e) => setNegativePrompt(e.target.value)}
                            disabled={appState === AppState.GENERATING}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all resize-none"
                            placeholder="ما الذي تريد تجنبه؟"
                            rows={2}
                          />
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                              مستوى الابتكار
                            </label>
                            <span className="text-xs font-mono bg-white/10 px-2 py-1 rounded text-primaryLight">
                              {temperature}
                            </span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={temperature}
                            onChange={(e) => setTemperature(parseFloat(e.target.value))}
                            disabled={appState === AppState.GENERATING}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
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
                        : 'bg-gradient-to-r from-primary via-indigo-500 to-secondary text-white hover:scale-[1.01] hover:shadow-primary/30'
                      }
                    `}
                  >
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      {appState === AppState.GENERATING ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          <span>جارٍ المعالجة...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                          إنشاء التصميم الآن
                        </>
                      )}
                    </div>
                    {/* Shine effect */}
                    {!appState && <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />}
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Output */}
            <div className="lg:col-span-7 sticky top-24" ref={resultSectionRef}>
              <div className="min-h-[500px] h-full rounded-[2rem] bg-slate-900/50 border border-slate-800/50 flex flex-col relative overflow-hidden">
                 {appState === AppState.GENERATING && originalImage ? (
                    <LoadingState originalImage={originalImage.base64} />
                 ) : appState === AppState.SUCCESS && generatedImage && originalImage ? (
                   <ResultDisplay 
                     resultImage={generatedImage} 
                     originalImage={originalImage.base64}
                     styleName={STYLE_OPTIONS.find(s => s.id === selectedStyleId)?.name || 'Custom'}
                   />
                 ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center opacity-60">
                      <div className="w-32 h-32 mb-8 relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                        <img src="https://cdn-icons-png.flaticon.com/512/3159/3159301.png" className="w-full h-full object-contain relative z-10 opacity-50 invert" alt="Placeholder" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">النتيجة ستظهر هنا</h3>
                      <p className="text-slate-400 max-w-sm mx-auto">
                        شاهد شعارك يتحول إلى واقع بأعلى دقة وتفاصيل مذهلة.
                      </p>
                    </div>
                 )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION (SEO Rich) */}
      <section id="features" className="py-20 px-4 md:px-8 bg-surface/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">لماذا هذه الأداة هي الأفضل؟</h2>
             <p className="text-slate-400 text-lg max-w-2xl mx-auto">نستخدم أحدث نماذج الذكاء الاصطناعي التوليدي لضمان نتائج لا يمكن تفريقها عن الحقيقة.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-3xl mb-6">🚀</div>
              <h3 className="text-xl font-bold text-white mb-3">سرعة فائقة</h3>
              <p className="text-slate-400 leading-relaxed">احصل على تصميمات معقدة وموك-أب احترافي في ثوانٍ معدودة بدلاً من ساعات العمل على برامج التصميم.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-secondary/30 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center text-3xl mb-6">💎</div>
              <h3 className="text-xl font-bold text-white mb-3">جودة 4K</h3>
              <p className="text-slate-400 leading-relaxed">نقوم بتوليد صور عالية الدقة تصلح للطباعة، العرض على الشاشات الكبيرة، والاستخدام التجاري.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center text-3xl mb-6">🧠</div>
              <h3 className="text-xl font-bold text-white mb-3">ذكاء اصطناعي</h3>
              <p className="text-slate-400 leading-relaxed">يفهم النموذج سياق الشعار، الخامة المطلوبة (ذهب، خشب، نيون) ويطبق الإضاءة والظلال بفيزيائية دقيقة.</p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">معرض الأعمال</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-800 hover:scale-[1.02] transition-transform duration-300">
               <img src="https://img.freepik.com/free-psd/3d-logo-mockup-modern-building_145275-236.jpg" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt="Example 1" />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-800 hover:scale-[1.02] transition-transform duration-300">
               <img src="https://img.freepik.com/free-psd/luxurious-metallic-logo-mockup_145275-385.jpg" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt="Example 2" />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-800 hover:scale-[1.02] transition-transform duration-300">
               <img src="https://img.freepik.com/free-psd/embossed-paper-logo-mockup_145275-181.jpg" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt="Example 3" />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-800 hover:scale-[1.02] transition-transform duration-300">
               <img src="https://img.freepik.com/free-psd/3d-glass-window-logo-mockup_125540-545.jpg" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt="Example 4" />
            </div>
          </div>
          <p className="text-center text-slate-500 mt-6 text-sm">نماذج تم إنشاؤها باستخدام تقنيات مماثلة</p>
        </div>
      </section>

      {/* FAQ SECTION (SEO Goldmine) */}
      <section id="faq" className="py-20 px-4 md:px-8 bg-surface/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">الأسئلة الشائعة</h2>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-2">هل الخدمة مجانية؟</h3>
              <p className="text-slate-400">نعم، يمكنك استخدام الأداة لتحويل الشعارات مجاناً تماماً لأغراض العرض والتجربة.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-2">ما هي الصيغ المدعومة؟</h3>
              <p className="text-slate-400">ندعم جميع صيغ الصور الشائعة مثل PNG (المفضلة للشفافية)، JPG، و WEBP.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-2">كيف أحصل على أفضل نتيجة؟</h3>
              <p className="text-slate-400">للحصول على أفضل النتائج، استخدم شعاراً عالي الدقة، ويفضل أن يكون بخلفية شفافة أو بيضاء نقية.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 bg-black/20 text-center">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary"></div>
              <span className="font-bold text-xl text-white">3D Morph AI</span>
           </div>
           <p className="text-slate-500 mb-8">أداة المستقبل لتصميم الهوية البصرية والموك-أب.</p>
           <div className="flex justify-center gap-6 text-sm text-slate-400">
             <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
             <a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a>
             <a href="#" className="hover:text-white transition-colors">اتصل بنا</a>
           </div>
           <p className="text-slate-700 text-xs mt-8">© {new Date().getFullYear()} جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;