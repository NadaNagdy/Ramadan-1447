import Link from 'next/link';
import { dailyDuas } from '@/lib/duas';
import { FloatingStars, DecorativeDivider, CrescentMoon } from '@/components/islamic-decorations';

export default function DailyDuasPage() {
  return (
    <div className="min-h-screen bg-hero-gradient pt-24 pb-16 px-4">
      <FloatingStars />
      <div className="container mx-auto max-w-6xl text-center animate-fade-in">
        <CrescentMoon className="w-16 h-16 text-gold mx-auto mb-4" />
        <h1 className="font-amiri text-4xl text-cream mb-4">أدعية الأيام</h1>
        <DecorativeDivider className="mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dailyDuas.map((dua) => (
            <Link 
              key={dua.id} 
              href={`/daily-duas/${dua.day}`} 
              className="block bg-card-gradient border border-gold/20 rounded-2xl p-6 hover:border-gold/60 hover:scale-105 transition-all shadow-lg"
            >
              <h2 className="font-amiri text-2xl text-gold mb-3">{dua.arabicTitle}</h2>
              <p className="font-amiri text-cream/80 line-clamp-3">{dua.dua}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
