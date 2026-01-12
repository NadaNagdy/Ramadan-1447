"use client";

import React, { useState } from 'react';
import { categories, categoryDuas as initialCategoryDuas } from '@/lib/duas';
import { FloatingStars, DecorativeDivider, CrescentMoon } from '@/components/islamic-decorations';
import DuaCard from '@/components/dua-card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';
import { generateCategoryDuas } from '@/ai/flows/generate-category-duas-flow';
import { useToast } from '@/hooks/use-toast';

const categoryLinks: Record<string, string> = {
  'laylat-al-qadr': '/laylat-al-qadr',
  'prophets-duas': '/prophets-duas',
  'quranic-duas': '/quranic-duas'
}

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(categories[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [categoryDuas, setCategoryDuas] = useState(initialCategoryDuas);
  const { toast } = useToast();

  const handleGenerateDua = async () => {
    if (!activeCategory || categoryLinks[activeCategory]) return;

    const currentCategory = categories.find(c => c.id === activeCategory);
    if (!currentCategory) return;
    
    setIsGenerating(true);
    try {
      const { duas } = await generateCategoryDuas({ categoryName: currentCategory.arabicName });
      
      setCategoryDuas(prev => ({
        ...prev,
        [activeCategory]: [...duas, ...(prev[activeCategory] || [])]
      }));

      toast({
        title: "تم إنشاء أدعية جديدة",
        description: `تمت إضافة أدعية جديدة لقسم "${currentCategory.arabicName}".`,
      });

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "لم نتمكن من إنشاء أدعية جديدة. يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

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
        <Link href={link} key={cat.id} className={buttonClasses} onClick={() => setActiveCategory(cat.id)}>
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

  const activeCategoryInfo = categories.find(c => c.id === activeCategory);

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

        {activeCategoryInfo && !categoryLinks[activeCategoryInfo.id] && (
          <div className="text-center mb-8">
            <Button onClick={handleGenerateDua} disabled={isGenerating} className="bg-gold/10 text-gold hover:bg-gold/20">
              {isGenerating ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Wand2 className="ml-2 h-4 w-4" />}
              اكتشف أدعية جديدة لهذا القسم
            </Button>
          </div>
        )}

        {activeCategory && !categoryLinks[activeCategory] && (
          <div className="space-y-6 text-left">
            <h2 className="font-amiri text-2xl text-gold text-center mb-4">
              {categories.find(c => c.id === activeCategory)?.arabicName}
            </h2>
            {categoryDuas[activeCategory]?.map((dua, index) => (
              <DuaCard 
                key={`${activeCategory}-${index}`} 
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
