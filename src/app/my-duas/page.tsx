
"use client";

import React, { useState, useEffect } from 'react';
import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';
import { useLocalStorage } from '@/hooks/use-local-storage';
import DuaCard from '@/components/dua-card';
import { BookMarked } from 'lucide-react';
import Link from 'next/link';

export default function MyDuasPage() {
  const [savedDuas, setSavedDuas] = useLocalStorage<any[]>('saved_duas', []);

  const handleRemoveDua = (duaToRemove: any) => {
    setSavedDuas(savedDuas.filter(dua => dua.dua !== duaToRemove.dua));
  };

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4">
      <FloatingStars />
      <div className="max-w-3xl mx-auto relative z-10 animate-fade-in">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gold/10 rounded-full mb-4">
            <BookMarked className="w-10 h-10 text-gold" />
          </div>
          <h1 className="font-amiri text-4xl md:text-5xl font-bold text-gold mb-4">أدعيتي المحفوظة</h1>
          <p className="text-cream/70 text-lg">
            هنا تجد جميع الأدعية التي قمت بحفظها للرجوع إليها لاحقاً.
          </p>
        </div>
        
        <DecorativeDivider className="mb-12" />

        {savedDuas.length > 0 ? (
          <div className="space-y-6">
            {savedDuas.map((dua, index) => (
              <DuaCard 
                key={index}
                title={dua.title || `دعاء محفوظ ${index + 1}`}
                dua={dua.dua}
                showActions={true}
                isInitiallySaved={true}
                onSaveToggle={() => handleRemoveDua(dua)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center bg-card-gradient border border-gold/20 rounded-3xl p-12">
            <h3 className="font-amiri text-2xl text-cream mb-4">لم تقم بحفظ أي دعاء بعد</h3>
            <p className="text-cream/60 mb-6">
              يمكنك حفظ الأدعية من <Link href="/daily-duas" className="text-gold hover:underline">أدعية الأيام</Link> أو <Link href="/categories" className="text-gold hover:underline">أدعية النية</Link>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
