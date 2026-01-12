import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-hero-gradient pt-32 px-4 text-center">
      <FloatingStars />
      <div className="container mx-auto max-w-2xl animate-fade-in">
        <CrescentMoon className="w-16 h-16 text-gold mx-auto mb-4" />
        <h1 className="font-amiri text-4xl text-cream mb-4">عن الموقع</h1>
        <DecorativeDivider className="my-8" />
        <div className="font-amiri text-cream/80 text-xl max-w-lg mx-auto space-y-4">
          <p>
            بسم الله الرحمن الرحيم
          </p>
          <p>
            هذا الموقع تم تطويره ليكون رفيقاً للمسلمين في شهر رمضان المبارك، يجمع أدعية مختارة لكل يوم من أيام الشهر الفضيل، بالإضافة إلى أدعية مصنفة حسب النية.
          </p>
          <p>
            نسأل الله أن يتقبل منا ومنكم صالح الأعمال، وأن يجعل هذا العمل صدقة جارية.
          </p>
        </div>
      </div>
    </div>
  );
}
