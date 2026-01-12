import Link from 'next/link';
import { CrescentMoon, FloatingStars, Lantern, DecorativeDivider } from '@/components/islamic-decorations';
import { Calendar, Heart } from 'lucide-react';
import DuaCard from '@/components/dua-card';
import { dailyDuas } from '@/lib/duas';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const today = 1; 
  const todayDua = dailyDuas.find(d => d.day === today) || dailyDuas[0];
  const heroImage = PlaceHolderImages.find(p => p.id === 'ramadan-hero');

  return (
    <div className="flex flex-col">
      <div className="fixed inset-0 bg-cover bg-center -z-20" style={{ backgroundImage: `url(${heroImage?.imageUrl})` }} data-ai-hint={heroImage?.imageHint} />
      <div className="fixed inset-0 bg-background/80 -z-10" />
      <FloatingStars />
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4">
        <div className="absolute top-24 right-8 opacity-20 hidden md:block">
          <Lantern className="w-16 h-16 text-gold animate-float lantern-glow" />
        </div>
        <div className="absolute bottom-24 left-8 opacity-20 hidden md:block">
          <Lantern className="w-12 h-12 text-gold animate-float [animation-delay:-3s] lantern-glow" />
        </div>
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <CrescentMoon className="w-20 h-20 text-gold mx-auto mb-6 glow-gold animate-float [animation-duration:8s]" />
          <h1 className="font-amiri text-4xl md:text-6xl text-cream mb-4">أدعية رمضان – 30 يوم</h1>
          <p className="font-amiri text-xl md:text-2xl text-gold/80 mb-8">مساحة هادئة للتأمل والدعاء والمشاركة</p>
          <DecorativeDivider className="my-8" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/daily-duas/${today}`} className="flex items-center gap-3 bg-gold hover:bg-gold-light text-primary-foreground px-8 py-3 rounded-full font-bold transition-transform hover:scale-105 shadow-lg">
              <Calendar className="w-5 h-5" /> <span>دعاء اليوم</span>
            </Link>
            <Link href="/share" className="flex items-center gap-3 border-2 border-gold/50 hover:bg-gold/10 hover:border-gold text-gold px-8 py-3 rounded-full font-bold transition-transform hover:scale-105">
              <Heart className="w-5 h-5" /> <span>شارك دعاءك</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-purple-deep/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-amiri text-3xl text-center text-cream mb-8">دعاء اليوم</h2>
          <DuaCard day={todayDua.day} title={todayDua.arabicTitle} dua={todayDua.dua} audioUrl={todayDua.audioUrl} />
        </div>
      </section>
    </div>
  );
};
