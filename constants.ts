
import { StyleOption } from './types';

export const MAX_FILE_SIZE_MB = 10;

export const CATEGORIES = [
  { id: 'all', label: 'الكل' },
  { id: 'office', label: 'مكاتب وشركات' },
  { id: 'outdoor', label: 'لافتات خارجية' },
  { id: 'apparel', label: 'ملابس وأقمشة' },
  { id: 'print', label: 'قرطاسية وتغليف' },
  { id: 'vehicle', label: 'مركبات' },
  { id: 'digital', label: 'ديجيتال' },
];

export const STYLE_OPTIONS: StyleOption[] = [
  // --- OFFICE & INTERIOR ---
  {
    id: 'office-3d-blue',
    name: 'جدار أزرق عصري',
    description: 'شعار مجسم لامع على جدار أزرق ملكي',
    category: 'office',
    promptModifier: 'Corporate Office Mockup. A high-end 3D glossy logo mounted on a dark royal blue smooth feature wall. Cinematic studio lighting, soft shadows, slight side perspective. The material of the logo should look like polished acrylic or glass.',
    previewImage: 'https://img.freepik.com/free-psd/3d-logo-mockup-modern-office-wall_145275-120.jpg'
  },
  {
    id: 'office-wood-gold',
    name: 'خشب وذهب فاخر',
    description: 'شعار ذهبي فاخر على جدار خشبي',
    category: 'office',
    promptModifier: 'Luxury Interior Mockup. Premium brushed gold metal 3D logo mounted on a vertical wood slat wall (walnut or oak texture). Warm accent lighting from above, realistic metallic reflections, sharp details.',
    previewImage: 'https://img.freepik.com/free-psd/3d-signage-mockup-wooden-wall_145275-201.jpg'
  },
  {
    id: 'office-reception-glass',
    name: 'زجاج الاستقبال',
    description: 'شعار محفور على زجاج مكتب الاستقبال',
    category: 'office',
    promptModifier: 'Reception Desk Mockup. The logo is frosted glass effect applied to a modern glass partition behind a reception desk. Clean, white, minimalist office environment. Bokeh background of the office.',
    previewImage: 'https://img.freepik.com/free-psd/glass-logo-mockup-modern-office_145275-165.jpg'
  },
  {
    id: 'office-concrete-neon',
    name: 'خرسانة ونيون',
    description: 'شعار مضيء نيون على جدار خرساني',
    category: 'office',
    promptModifier: 'Industrial Office Mockup. Glowing neon light logo mounted on a raw grey concrete wall. The logo emits a soft colored light matching its original colors. Moody atmosphere, dark industrial loft style.',
    previewImage: 'https://img.freepik.com/free-psd/neon-sign-mockup-concrete-wall_145275-288.jpg'
  },

  // --- OUTDOOR & SIGNAGE ---
  {
    id: 'outdoor-building-facade',
    name: 'واجهة شركة عملاقة',
    description: 'لافتة ضخمة على واجهة مبنى زجاجي',
    category: 'outdoor',
    promptModifier: 'Exterior Building Mockup. A massive 3D logo sign mounted on the facade of a modern glass skyscraper. Daylight, blue sky reflection in the windows, photorealistic urban perspective from street level.',
    previewImage: 'https://img.freepik.com/free-psd/building-facade-logo-mockup_145275-305.jpg'
  },
  {
    id: 'outdoor-shop-sign',
    name: 'لافتة محل تجاري',
    description: 'لافتة دائرية مضيئة خارج متجر',
    category: 'outdoor',
    promptModifier: 'Storefront Mockup. A round or square lightbox sign projecting from a brick wall outside a boutique shop. The logo is illuminated on the sign. Blurred street background, evening twilight atmosphere.',
    previewImage: 'https://img.freepik.com/free-psd/shop-sign-mockup-street_145275-188.jpg'
  },
  {
    id: 'outdoor-billboard',
    name: 'إعلان طرق',
    description: 'شعارك على لوحة إعلانية ضخمة في الشارع',
    category: 'outdoor',
    promptModifier: 'Street Billboard Mockup. A large outdoor advertising billboard on a busy city highway. The logo and brand colors cover the canvas. Blue sky, sunny day, realistic outdoor lighting.',
    previewImage: 'https://img.freepik.com/free-psd/billboard-mockup-city-street_145275-195.jpg'
  },
  
  // --- APPAREL ---
  {
    id: 'apparel-hoodie',
    name: 'هودي مطرز',
    description: 'تطريز الشعار على هودي ثقيل',
    category: 'apparel',
    promptModifier: 'Apparel Mockup. Close-up of a high-quality cotton hoodie (grey or black). The logo is EMBROIDERED on the chest with realistic thread texture and depth. Soft fabric folds, studio lighting.',
    previewImage: 'https://img.freepik.com/free-psd/hoodie-mockup-design_145275-210.jpg'
  },
  {
    id: 'apparel-tshirt',
    name: 'تيشيرت طباعة',
    description: 'طباعة عالية الجودة على تيشيرت',
    category: 'apparel',
    promptModifier: 'T-Shirt Mockup. A white or black crew neck t-shirt laying flat or on a hanger. The logo is screen printed on the center chest. Realistic fabric texture, wrinkles, and shading.',
    previewImage: 'https://img.freepik.com/free-psd/t-shirt-mockup-isolated_145275-225.jpg'
  },
  {
    id: 'apparel-cap',
    name: 'كاب رياضي',
    description: 'شعار مطرز على مقدمة كاب',
    category: 'apparel',
    promptModifier: 'Cap Mockup. A baseball cap (navy or black) sitting on a surface. The logo is 3D embroidered on the front panel. detailed fabric texture, shallow depth of field.',
    previewImage: 'https://img.freepik.com/free-psd/cap-mockup-design_145275-230.jpg'
  },

  // --- PRINT & STATIONERY ---
  {
    id: 'print-card-gold',
    name: 'كارت ذهبي',
    description: 'كارت عمل أسود بختم ذهبي',
    category: 'print',
    promptModifier: 'Luxury Business Card Mockup. A stack of matte black business cards. The logo is hot-foil stamped in GOLD. Macro shot, shallow depth of field, elegant lighting showing the foil reflection.',
    previewImage: 'https://img.freepik.com/free-psd/luxury-business-card-mockup_145275-150.jpg'
  },
  {
    id: 'print-bag',
    name: 'كيس تسوق',
    description: 'حقيبة ورقية فاخرة للعلامات التجارية',
    category: 'print',
    promptModifier: 'Shopping Bag Mockup. A premium paper shopping bag standing on a clean surface. The logo is printed clearly on the side. Realistic paper texture, rope handles, soft studio shadows.',
    previewImage: 'https://img.freepik.com/free-psd/shopping-bag-mockup_145275-160.jpg'
  },
  {
    id: 'print-box',
    name: 'علبة تغليف',
    description: 'صندوق منتج بتصميم مينيمال',
    category: 'print',
    promptModifier: 'Packaging Mockup. A square cardboard product box. The logo is printed on the top lid. Clean, minimalist design, soft lighting, neutral background.',
    previewImage: 'https://img.freepik.com/free-psd/box-packaging-mockup_145275-170.jpg'
  },
  {
    id: 'print-coffee',
    name: 'كوب قهوة',
    description: 'كوب ورقي للبراندات والكافيهات',
    category: 'print',
    promptModifier: 'Coffee Cup Mockup. A takeaway paper coffee cup with a lid. The logo is printed on the cardboard sleeve or the cup body. Coffee shop ambience in the background.',
    previewImage: 'https://img.freepik.com/free-psd/coffee-cup-mockup_145275-180.jpg'
  },

  // --- VEHICLE ---
  {
    id: 'vehicle-van',
    name: 'سيارة شركة',
    description: 'هوية بصرية كاملة على فان تجاري',
    category: 'vehicle',
    promptModifier: 'Vehicle Wrap Mockup. A white delivery van parked on the street. The logo is applied as a large vinyl decal on the side panel of the van. Realistic automotive paint reflection, outdoor lighting.',
    previewImage: 'https://img.freepik.com/free-psd/van-mockup-branding_145275-260.jpg'
  },
  {
    id: 'vehicle-car-door',
    name: 'باب سيارة',
    description: 'شعار الشركة على باب سيارة سيدان',
    category: 'vehicle',
    promptModifier: 'Car Branding Mockup. Close up side view of a modern luxury car door. The logo is applied as a professional decal. Metallic paint reflections, city street reflection in the car body.',
    previewImage: 'https://img.freepik.com/free-psd/car-branding-mockup_145275-270.jpg'
  },

  // --- DIGITAL ---
  {
    id: 'digital-laptop',
    name: 'شاشة لابتوب',
    description: 'موقعك الإلكتروني على شاشة ماك بوك',
    category: 'digital',
    promptModifier: 'Laptop Mockup. A MacBook Pro open on a wooden desk in a modern office. The screen displays the logo on a clean wallpaper or website header. Shallow depth of field focusing on the screen.',
    previewImage: 'https://img.freepik.com/free-psd/laptop-mockup-office_145275-140.jpg'
  },
  {
    id: 'digital-mobile',
    name: 'تطبيق موبايل',
    description: 'شعار التطبيق على هاتف ذكي في اليد',
    category: 'digital',
    promptModifier: 'Smartphone Mockup. A hand holding a modern iPhone. The screen displays the logo as an app splash screen. Blurred lifestyle background.',
    previewImage: 'https://img.freepik.com/free-psd/phone-mockup-hand_145275-145.jpg'
  }
];

export const HERO_TITLE = "DLogo AI";
export const HERO_SUBTITLE = "المنصة الأولى عالمياً لبناء الهوية البصرية المتكاملة. حوّل شعارك إلى واقع في ثوانٍ.";

export const FEATURES = [
  {
    title: "محرك 3D فائق الواقعية",
    description: "تكنولوجيا تتبع الأشعة (Ray Tracing) المدعومة بالذكاء الاصطناعي لمحاكاة الإضاءة والخامات بدقة 100%.",
    icon: "⚡"
  },
  {
    title: "مكتبة قوالب ضخمة",
    description: "أكثر من 20 قالب جاهز يغطي كافة احتياجات الشركات، المطاعم، والمتاجر الإلكترونية.",
    icon: "📚"
  },
  {
    title: "تصدير بجودة 4K",
    description: "احصل على ملفات عالية الدقة تصلح للطباعة والعروض التقديمية الكبيرة واللوحات الإعلانية.",
    icon: "💎"
  },
  {
    title: "سرعة البرق",
    description: "بفضل Gemini Flash، يتم معالجة التصاميم المعقدة في أقل من 5 ثوانٍ وبدقة مذهلة.",
    icon: "🚀"
  }
];

export const GALLERY_ITEMS = [
  "https://img.freepik.com/free-psd/3d-logo-mockup-modern-office-wall_145275-120.jpg",
  "https://img.freepik.com/free-psd/luxury-business-card-mockup_145275-150.jpg",
  "https://img.freepik.com/free-psd/neon-sign-mockup-concrete-wall_145275-288.jpg",
  "https://img.freepik.com/free-psd/shopping-bag-mockup_145275-160.jpg",
  "https://img.freepik.com/free-psd/van-mockup-branding_145275-260.jpg",
  "https://img.freepik.com/free-psd/t-shirt-mockup-isolated_145275-225.jpg"
];

export const FAQS = [
  {
    q: "هل الخدمة مجانية؟",
    a: "نعم، يمكنك تجربة الأداة وإنشاء نماذج أولية (Mockups) مجانًا تماماً خلال الفترة التجريبية الحالية."
  },
  {
    q: "ما هي أنواع الملفات المقبولة؟",
    a: "ندعم ملفات PNG و JPG و WEBP. يفضل استخدام شعارات بخلفية شفافة (PNG) للحصول على أفضل النتائج في الدمج."
  },
  {
    q: "كم يستغرق إنشاء التصميم؟",
    a: "يستغرق الأمر عادةً من 3 إلى 7 ثوانٍ فقط بفضل تكنولوجيا الذكاء الاصطناعي السريعة لدينا."
  },
  {
    q: "هل يمكنني استخدام الصور تجارياً؟",
    a: "بالتأكيد! جميع الصور التي يتم إنشاؤها عبر منصة DLogo AI مملوكة لك بالكامل ويمكن استخدامها في الإعلانات والمواقع."
  }
];
