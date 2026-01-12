"use client";

import React, { useState } from 'react';
import { categories, categoryDuas } from '@/lib/duas';
import { FloatingStars, DecorativeDivider, CrescentMoon } from '@/components/islamic-decorations';
import DuaCard from '@/components/dua-card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const categoryLinks: Record<string, string> = {
  'laylat-al-qadr': '/laylat-al-qadr',
  'prophets-duas': '/prophets-duas',
  'quranic-duas': '/quranic-duas'
}

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(categories[0].id);

  const renderCategoryButton = (cat: typeof categories[0]) => {
    const link = categoryLinks[cat.id];
    const buttonContent = (
      <>
        <span className="text-4xl block mb-2">{cat.icon}</span>
        <span className="font-cairo text-sm text-center">{cat.arabicName}</span>
      </>
    );

    const buttonClasses = cn(
      "p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all",
      activeCategory === cat.id 
        ? 'bg-gold text-navy font-bold border-gold shadow-lg scale-105' 
        : 'bg-card text-cream border-gold/20 hover:border-gold/50 hover:bg-card/50'
    );

    if (link) {
      return (
        <Link href={link} key={cat.id} className={buttonClasses}>
          {buttonContent}
        </Link>
      );
    }

    return (
      <button 
        key={cat.id} 
        onClick={() => setActiveCategory(cat.id)} 
        className={buttonClasses}
      >
        {buttonContent}
      </button>
    );
  }

  return (
    <div className="min-h-screen bg-hero-gradient pt-24 pb-16 px-4">
      <FloatingStars />
      <div className="container mx-auto max-w-4xl text-center animate-fade-in">
        <CrescentMoon className="w-16 h-16 text-gold mx-auto mb-4" />
        <h1 className="font-amiri text-4xl text-cream mb-4">أدعية بالنية</h1>
        <DecorativeDivider className="mb-12" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.map(renderCategoryButton)}
        </div>

        {activeCategory && !categoryLinks[activeCategory] && (
          <div className="space-y-6 text-left">
            <h2 className="font-amiri text-2xl text-gold text-center mb-4">
              {categories.find(c => c.id === activeCategory)?.arabicName}
            </h2>
            {categoryDuas[activeCategory]?.map((dua, index) => (
              <DuaCard 
                key={index} 
                title={`${categories.find(c => c.id === activeCategory)?.arabicName || ''} ${index + 1}`} 
                dua={dua}
                showActions={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
