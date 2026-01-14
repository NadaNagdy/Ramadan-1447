import { notFound } from 'next/navigation';
import Link from 'next/link';
import { dailyDuas } from '@/lib/duas';
import DuaCard from '@/components/dua-card';
import { FloatingStars } from '@/components/islamic-decorations';
import { ArrowRight } from 'lucide-react';

// Add this function here
export async function generateStaticParams() {
  // Generate params for all 30 days of Ramadan
  return Array.from({ length: 30 }, (_, i) => ({
    id: String(i + 1),
  }));
}

type Props = {
  params: Promise<{ id: string }>; // Changed to Promise
};

export default async function DuaDetailPage({ params }: Props) {
  const { id } = await params; // Await the params
  const day = Number(id);
  const dua = dailyDuas.find(d => d.day === day);
  
  if (!dua) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-hero-gradient pt-24 pb-16 px-4">
      <FloatingStars />
      <div className="container mx-auto max-w-3xl animate-fade-in">
        <div className="flex justify-between items-center mb-8 text-cream">
          <Link href="/daily-duas" className="flex items-center gap-2 text-cream/70 hover:text-gold transition-colors">
            <ArrowRight className="w-4 h-4" />
            <span>عودة للقائمة</span>
          </Link>
          <span className="font-cairo text-gold">{dua.arabicTitle}</span>
        </div>
        <DuaCard day={dua.day} title={dua.arabicTitle} dua={dua.dua} audioUrl={dua.audioUrl} />
      </div>
    </div>
  );
}
