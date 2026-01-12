import { categoryDuas } from '@/lib/duas';
import DuaCard from '@/components/dua-card';
import { FloatingStars, DecorativeDivider, CrescentMoon } from '@/components/islamic-decorations';

export default function QuranicDuasPage() {
  const duas = categoryDuas['quranic-duas'] || [];

  return (
    <div className="min-h-screen bg-hero-gradient pt-24 pb-16 px-4">
      <FloatingStars />
      <div className="container mx-auto max-w-4xl text-center animate-fade-in">
        <CrescentMoon className="w-16 h-16 text-gold mx-auto mb-4" />
        <h1 className="font-amiri text-4xl text-cream mb-4">أدعية قرآنية</h1>
        <DecorativeDivider className="mb-12" />
        <div className="space-y-6 text-left">
          {duas.map((dua, index) => (
            <DuaCard
              key={index}
              title={`دعاء قرآني ${index + 1}`}
              dua={dua}
              showActions={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}