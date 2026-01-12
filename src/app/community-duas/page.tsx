import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';

export default function CommunityDuasPage() {
  return (
    <div className="min-h-screen bg-hero-gradient pt-32 px-4 text-center">
      <FloatingStars />
      <div className="container mx-auto max-w-2xl animate-fade-in">
        <CrescentMoon className="w-16 h-16 text-gold mx-auto mb-4" />
        <h1 className="font-amiri text-4xl text-cream mb-4">دعاء المشاركين</h1>
        <DecorativeDivider className="my-8" />
        <div className="font-amiri text-cream/80 text-xl max-w-lg mx-auto space-y-4">
          <p>
            هنا ستجدون الأدعية التي يشاركها إخوانكم وأخواتكم.
          </p>
          <p>
            قريباً بإذن الله.
          </p>
        </div>
      </div>
    </div>
  );
}
