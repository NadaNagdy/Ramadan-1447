"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { CrescentMoon, FloatingStars, Lantern, DecorativeDivider } from '@/components/islamic-decorations';
import { Calendar, Heart, BookOpen, User, Moon, RefreshCw, Star, Sparkles, MoonStar } from 'lucide-react';
import { getRamadanDay } from '@/lib/date-helper';
import { generateReflection, type GenerateReflectionOutput } from '@/ai/flows/generate-reflection-flow';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [reflection, setReflection] = useState<string>('');
  const [loadingReflection, setLoadingReflection] = useState(true);

  const fetchReflection = useCallback(async () => {
    setLoadingReflection(true);
    try {
      const res: GenerateReflectionOutput = await generateReflection();
      setReflection(res.reflection);
    } catch (err) {
      console.error("Failed to fetch reflection:", err);
      setReflection('رمضان شهر التغيير والتقرب من الله.');
    } finally {
      setLoadingReflection(false);
    }
  }, []);

  useEffect(() => {
    fetchReflection();
  }, [fetchReflection]);

  return (
    <div className="relative min-h-screen bg-hero-gradient overflow-hidden flex flex-col items-center">
      <FloatingStars />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] opacity-5 blur-sm">
          <CrescentMoon className="w-[400px] h-[400px] text-cream/10 rotate-[-15deg]" />
        </div>
        
        <div className="absolute top-0 left-20 h-64 flex flex-col items-center opacity-30 animate-float">
          <div className="h-full w-px bg-gold/20" />
          <Lantern className="w-16 h-24 text-gold -mt-1 lantern-glow" />
        </div>
        
        <div className="absolute top-0 right-20 h-48 flex flex-col items-center opacity-30 animate-float" style={{ animationDelay: '1s' }}>
          <div className="h-full w-px bg-gold/20" />
          <Lantern className="w-16 h-24 text-gold -mt-1 lantern-glow" />
        </div>

        <div className="absolute bottom-0 left-[15%] h-60 flex flex-col-reverse items-center opacity-30 animate-float" style={{ animationDelay: '1.5s' }}>
           <div className="h-full w-px bg-gold/20" />
           <Lantern className="w-20 h-32 text-gold -mb-1 lantern-glow" />
        </div>

        <div className="absolute bottom-0 right-[15%] h-80 flex flex-col-reverse items-center opacity-30 animate-float" style={{ animationDelay: '0.5s' }}>
           <div className="h-full w-px bg-gold/20" />
           <Lantern className="w-20 h-32 text-gold -mb-1 lantern-glow" />
        </div>
      </div>

      <section className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-32 pb-16 text-center animate-fade-in flex flex-col items-center">
        <div className="mb-4">
          <CrescentMoon className="w-28 h-28 text-gold mx-auto glow-gold" />
        </div>
        
        <h1 className="font-amiri text-7xl md:text-9xl font-bold text-cream mb-2 tracking-tight">
          أدعية رمضان
        </h1>
        
        <div className="font-amiri text-3xl md:text-4xl text-gold mb-2">
          ٣٠ يوم
        </div>

        <div className="font-amiri text-2xl text-cream/60 mb-6 italic">
          "الدعاء عبادة"
        </div>

        <DecorativeDivider className="mb-8 w-full max-w-xs opacity-60" />

        <p className="font-cairo text-xl md:text-2xl text-cream/90 mb-10 max-w-xl mx-auto leading-relaxed font-light">
          مساحة هادئة للدعاء والتأمل
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16 w-full max-w-5xl">
          <Link 
            href="/daily-duas" 
            className="group flex flex-col items-center justify-center gap-3 bg-gold text-navy p-6 rounded-[30px] font-bold hover:bg-gold-light transition-all transform hover:scale-105 shadow-xl"
          >
            <Calendar className="w-8 h-8" />
            <span className="text-xl">أدعية الأيام</span>
          </Link>

          <Link 
            href="/laylat-al-qadr" 
            className="group flex flex-col items-center justify-center gap-3 bg-card border border-gold/40 text-gold p-6 rounded-[30px] font-bold hover:bg-gold hover:text-navy transition-all transform hover:scale-105 shadow-xl"
          >
            <MoonStar className="w-8 h-8" />
            <span className="text-xl">ليلة القدر</span>
          </Link>

          <Link 
            href="/prophets-duas" 
            className="group flex flex-col items-center justify-center gap-3 bg-card border border-gold/40 text-gold p-6 rounded-[30px] font-bold hover:bg-gold hover:text-navy transition-all transform hover:scale-105 shadow-xl"
          >
            <User className="w-8 h-8" />
            <span className="text-xl">أدعية الأنبياء</span>
          </Link>

          <Link 
            href="/quranic-duas" 
            className="group flex flex-col items-center justify-center gap-3 bg-card border border-gold/40 text-gold p-6 rounded-[30px] font-bold hover:bg-gold hover:text-navy transition-all transform hover:scale-105 shadow-xl"
          >
            <BookOpen className="w-8 h-8" />
            <span className="text-xl">أدعية قرآنية</span>
          </Link>
          
          <Link 
            href="/ai-dua" 
            className="group flex flex-col items-center justify-center gap-3 border-2 border-gold/20 bg-card/20 text-cream/80 p-6 rounded-[30px] font-bold hover:border-gold transition-all transform hover:scale-105 shadow-xl"
          >
            <Heart className="w-8 h-8 group-hover:fill-gold transition-all" />
            <span className="text-xl">اصنع دعاءك</span>
          </Link>
        </div>

        <div className="max-w-2xl w-full">
           <div className="bg-card/40 border border-gold/10 rounded-[40px] p-8 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                 <Sparkles className="w-24 h-24 text-gold" />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                 <h3 className="font-amiri text-gold text-2xl flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    تأملات رمضانية
                 </h3>
                 <Button 
                  onClick={fetchReflection}
                  disabled={loadingReflection}
                  variant="ghost"
                  size="icon"
                  className="text-gold/50 hover:text-gold transition-colors p-2"
                 >
                    <RefreshCw className={`w-5 h-5 ${loadingReflection ? 'animate-spin' : ''}`} />
                 </Button>
              </div>

              <div className="min-h-[80px] flex items-center justify-center">
                {loadingReflection ? (
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gold rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gold rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-gold rounded-full animate-bounce [animation-delay:-0.3s]" />
                  </div>
                ) : (
                  <p className="font-amiri text-2xl md:text-3xl leading-relaxed text-cream animate-fade-in italic">
                    "{reflection}"
                  </p>
                )}
              </div>
           </div>
        </div>
      </section>

      <div className="relative z-10 mt-auto pb-12 flex flex-col items-center">
        <div className="flex gap-6 mb-4">
           {[...Array(3)].map((_, i) => (
             <Star key={i} className="w-5 h-5 text-gold animate-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
           ))}
        </div>
        <p className="text-cream/30 text-lg tracking-widest font-amiri opacity-60">تقبل الله منا ومنكم صالح الأعمال</p>
      </div>
    </div>
  );
};
