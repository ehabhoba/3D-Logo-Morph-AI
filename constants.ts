import { StyleOption } from './types';

export const MAX_FILE_SIZE_MB = 5;

export const STYLE_OPTIONS: StyleOption[] = [
  // --- Wall Mockups ---
  {
    id: 'wall-blue-glossy',
    name: 'جدار أزرق فاخر',
    description: 'شعار 3D لامع على جدار أزرق داكن مع إضاءة استوديو',
    promptModifier: 'Create a high-end 3D office mockup. Place the logo on a dark blue smooth wall. The logo should be glossy, 3D, and reflective (glass/plastic finish). Cinematic studio lighting, soft shadows, slight side angle perspective.',
    icon: '✨',
    previewColor: 'from-blue-700 to-slate-900'
  },
  {
    id: 'wall-wood-gold',
    name: 'خشب وذهب',
    description: 'شعار ذهبي بارز على جدار خشبي عصري',
    promptModifier: 'Luxury interior mockup. The logo is a premium gold metal 3D sign mounted on a dark horizontal wood slat wall. Warm interior lighting, realistic reflection, perspective view from the right.',
    icon: '🪵',
    previewColor: 'from-amber-700 to-yellow-600'
  },
  {
    id: 'wall-grey-metal',
    name: 'معدن على رمادي',
    description: 'شعار فضي معدني على جدار رمادي مودرن',
    promptModifier: 'Modern architectural mockup. Silver metallic 3D logo mounted on a dark grey matte wall. Cool lighting, brushed steel finish, minimalist corporate lobby style.',
    icon: '🏢',
    previewColor: 'from-slate-500 to-slate-700'
  },
  {
    id: 'wall-building-facade',
    name: 'واجهة خارجية',
    description: 'لافتة خارجية مجسمة على واجهة مبنى حجرية',
    promptModifier: 'Outdoor building signage mockup. Transform the logo into a large 3D white sign mounted on a dark textured stone facade of a modern building. Natural sunlight, realistic shadows, photorealistic.',
    icon: '🏛️',
    previewColor: 'from-gray-800 to-black'
  },
  {
    id: 'wall-concrete-spotlight',
    name: 'خرسانة وإضاءة',
    description: 'شعار محفور أو بارز على خرسانة مع سبوت',
    promptModifier: 'Industrial chic mockup. The logo is a metal cutout mounted on a dark grunge concrete wall. A single dramatic spotlight shines from above directly on the logo. High contrast, moody atmosphere.',
    icon: '🔦',
    previewColor: 'from-gray-600 to-stone-800'
  },
  {
    id: 'wall-white-acrylic',
    name: 'أكريليك ملون',
    description: 'شعار ملون بارز على جدار أبيض ناصع',
    promptModifier: 'Creative agency interior mockup. Place the logo as a colorful, thick acrylic 3D element on a pristine white wall. Soft diffuse lighting, clean minimalist aesthetic, modern glass office background.',
    icon: '🎨',
    previewColor: 'from-white to-gray-100'
  },

  // --- Merchandise & Print ---
  {
    id: 'print-bag',
    name: 'حقيبة تسوق',
    description: 'طباعة الشعار على حقيبة تسوق ورقية',
    promptModifier: 'Product photography mockup. A premium red paper shopping bag standing on a surface. The logo is printed clearly in white on the side of the bag. Realistic paper texture, studio lighting.',
    icon: '🛍️',
    previewColor: 'from-red-500 to-red-700'
  },
  {
    id: 'print-bottle',
    name: 'زجاجة مياه',
    description: 'طباعة الشعار على زجاجة مياه رياضية',
    promptModifier: 'Merchandise mockup. Matte finish aluminum water bottle (red or white) lying on a clean surface. The logo is printed vertically on the bottle. High-end product shot, soft shadows.',
    icon: '🧴',
    previewColor: 'from-slate-200 to-red-500'
  },
  {
    id: 'print-flag',
    name: 'علم يرفرف',
    description: 'شعار مطبوع على علم قماشي في الهواء',
    promptModifier: 'Realistic fabric mockup. A white fabric flag waving in the wind with the logo printed on it. Detailed cloth folds, texture, and shading. Dark grey background.',
    icon: '🏳️',
    previewColor: 'from-gray-100 to-gray-300'
  },
  {
    id: 'stationery-grid',
    name: 'هوية بصرية',
    description: 'مجموعة قرطاسية وكروت عمل',
    promptModifier: 'Branding identity mockup. Overhead view of business cards, letterhead, and envelopes arranged on a desk. The logo is applied to the stationery items. Professional, organized, clean design.',
    icon: '📇',
    previewColor: 'from-gray-200 to-gray-400'
  },

  // --- Digital ---
  {
    id: 'digital-phone',
    name: 'تطبيق هاتف',
    description: 'عرض الشعار داخل شاشة هاتف محمول',
    promptModifier: 'Lifestyle mockup. A hand holding a modern smartphone. The screen displays the logo clearly on a clean app interface background. Blurred office background, high depth of field.',
    icon: '📱',
    previewColor: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'digital-devices',
    name: 'عرض تقني',
    description: 'مجموعة أجهزة عائمة تعرض الشعار',
    promptModifier: 'Tech showcase mockup. Floating 3D composition of digital devices (laptop, tablet, phone) displaying the logo on their screens. Red and white color theme, futuristic, high-tech vibe.',
    icon: '💻',
    previewColor: 'from-red-600 to-black'
  }
];

export const HERO_TITLE = "صانع الموك-أب واللوجوهات ثلاثية الأبعاد";
export const HERO_SUBTITLE = "حول شعارك إلى تصاميم واقعية، مطبوعات، ولافتات إعلانية باستخدام الذكاء الاصطناعي.";