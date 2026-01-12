import Link from 'next/link';
import { CrescentMoon } from '@/components/islamic-decorations';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-hero-gradient text-cream pt-24">
      <div className="text-center animate-fade-in">
        <CrescentMoon className="w-24 h-24 text-gold/50 mx-auto mb-8" />
        <h1 className="text-6xl font-amiri text-gold">404</h1>
        <h2 className="text-2xl font-cairo mt-4 mb-8">الصفحة غير موجودة</h2>
        <Link href="/" className="bg-gold text-navy px-6 py-3 rounded-full font-bold hover:bg-gold-light transition-colors">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
