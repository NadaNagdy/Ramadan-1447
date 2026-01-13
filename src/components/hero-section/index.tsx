'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { CrescentMoon } from '@/components/islamic-decorations';
import { FloatingStars } from '@/components/islamic-decorations';

export default function HeroSection() {
    return (
        <section className="relative text-white text-center py-28 md:py-40 px-4 overflow-hidden">
            <FloatingStars />
            <div className="relative z-10 animate-fade-in">
                <CrescentMoon className="w-24 h-24 text-gold mx-auto mb-6 glow-gold animate-float" />
                <h1 className="font-amiri text-5xl md:text-7xl font-bold mb-4">أدعية رمضان</h1>
                <p className="text-xl text-cream/80 max-w-2xl mx-auto mb-10">
                    مساحة هادئة للتأمل والدعاء والمشاركة في الشهر الفضيل.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link href="/ai-dua" passHref>
                        <Button 
                            size="lg"
                            className="bg-gold hover:bg-gold-light text-navy font-cairo font-bold text-lg rounded-xl shadow-lg shadow-gold/20 transform hover:scale-105 transition-transform w-full sm:w-auto"
                        >
                            <Sparkles className="ml-2 w-5 h-5" />
                            اصنع دعاءك بالذكاء الاصطناعي
                        </Button>
                    </Link>
                    <Link href="/daily-duas" passHref>
                        <Button 
                            size="lg" 
                            variant="outline"
                            className="text-cream border-cream/30 hover:bg-white/10 hover:text-white font-cairo font-bold text-lg rounded-xl w-full sm:w-auto"
                        >
                            تصفح أدعية الأيام
                            <ArrowLeft className="mr-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
