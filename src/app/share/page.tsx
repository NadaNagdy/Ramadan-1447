'use client';

import React, { useState, useRef } from 'react';
import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';
import { Send, User, Sparkles, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { rephraseDua } from '@/ai/flows/rephrase-dua-flow';
import { useLocalStorage } from '@/hooks/use-local-storage';
import DuaCard from '@/components/dua-card';
import { toPng } from 'html-to-image';

type SavedDua = {
  title: string;
  dua: string;
};

type CommunityDua = {
  id: number;
  author: string;
  text: string;
  amens: number;
};

export default function ShareDuaPage() {
  const [name, setName] = useState('');
  const [dua, setDua] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRephrasing, setIsRephrasing] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const { toast } = useToast();
  const [savedDuas, setSavedDuas] = useLocalStorage<SavedDua[]>('saved_duas', []);
  const [communityDuas, setCommunityDuas] = useLocalStorage<CommunityDua[]>('community_duas_shared', []);
  const duaCardRef = useRef<HTMLDivElement>(null);

  const handleRephrase = async () => {
    if (!dua.trim()) {
      toast({
        variant: 'destructive',
        title: 'خطأ',
        description: 'الرجاء كتابة الدعاء قبل إعادة الصياغة.',
      });
      return;
    }
    setIsRephrasing(true);
    try {
      const result = await rephraseDua({ intention: dua });
      setDua(result.duaText);
      toast({
        title: 'تمت إعادة الصياغة',
        description: 'تم تحسين دعاءك بفضل الذكاء الاصطناعي.',
      });
    } catch (error) {
      console.error('Error rephrasing dua:', error);
      toast({
        variant: 'destructive',
        title: 'خطأ',
        description:
          'حدث خطأ أثناء إعادة صياغة الدعاء. الرجاء المحاولة مرة أخرى.',
      });
    }
    setIsRephrasing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dua.trim()) {
      toast({
        variant: 'destructive',
        title: 'خطأ',
        description: 'الرجاء كتابة الدعاء قبل الإرسال.',
      });
      return;
    }
    setIsSubmitting(true);
    
    const authorName = name.trim() || 'زائر كريم';
    const newDua: CommunityDua = {
        id: Date.now(),
        author: authorName,
        text: dua,
        amens: 0,
    };

    setSavedDuas((prev) => [...prev, { title: 'دعاء شخصي', dua: dua }]);
    setCommunityDuas((prev) => [newDua, ...prev]);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsShared(true);
      toast({
        title: 'تمت المشاركة بنجاح!',
        description: 'شكراً لمساهمتك، جزاك الله خيراً.',
      });
    }, 1000);
  };

  const handleShare = async () => {
    if (duaCardRef.current === null) {
      return;
    }

    const dataUrl = await toPng(duaCardRef.current);

    const link = document.createElement('a');
    link.download = 'dua-card.png';
    link.href = dataUrl;
    link.click();
  };

  if (isShared) {
    return (
        <div className="min-h-screen bg-hero-gradient pt-32 pb-16 px-4 flex flex-col items-center justify-center">
            <FloatingStars />
            <div ref={duaCardRef}>
              <DuaCard title="دعاء من القلب" dua={dua} author={name.trim() || 'زائر كريم'} />
            </div>
            <h1 className="font-amiri text-4xl text-cream mb-4">شكراً لمشاركتك</h1>
            <p className="text-cream/70 text-lg mb-8">
                دعاؤك الآن جزء من مجتمعنا. يمكنك رؤيته في صفحة{' '}
                <a href="/community-duas" className="text-gold font-bold hover:underline">دعاء المشاركين</a>.
            </p>
            <Button onClick={handleShare}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl text-lg mb-4"
            >
                <Share2 className="w-5 h-5 ml-2" />
                مشاركة كصورة
            </Button>
            <Button onClick={() => {
                setIsShared(false);
                setDua('');
                setName('');
            }}
            className="bg-gold hover:bg-gold-light text-navy font-bold py-3 px-6 rounded-xl text-lg"
            >
                مشاركة دعاء آخر
            </Button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-16 px-4">
      <FloatingStars />
      <div className="container mx-auto max-w-2xl text-center animate-fade-in">
        <CrescentMoon className="w-16 h-16 text-gold mx-auto mb-4" />
        <h1 className="font-amiri text-4xl text-cream mb-2">شاركنا دعاءً</h1>
        <p className="text-cream/60 mb-6">
          اكتب دعاءً من قلبك ليكون صدقة جارية، ويؤمّن عليه الآخرون
        </p>
        <DecorativeDivider className="mb-8" />
        <form onSubmit={handleSubmit} className="space-y-6 text-right">
          <div>
            <label
              htmlFor="name"
              className="inline-block mb-2 font-cairo text-cream/80"
            >
              الاسم (اختياري)
            </label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسمك الكريم"
                className="w-full bg-card border border-gold/20 rounded-xl p-4 pr-10 text-cream text-lg font-cairo focus-visible:ring-gold"
                dir="rtl"
                disabled={isSubmitting || isRephrasing}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="dua"
              className="inline-block mb-2 font-cairo text-cream/80"
            >
              نص الدعاء
            </label>
            <Textarea
              id="dua"
              value={dua}
              onChange={(e) => setDua(e.target.value)}
              placeholder="اكتب دعاءك هنا..."
              className="w-full h-48 bg-card border border-gold/20 rounded-2xl p-4 text-cream text-lg font-amiri focus-visible:ring-gold"
              dir="rtl"
              disabled={isSubmitting || isRephrasing}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full bg-transparent border-gold/50 hover:bg-gold/10 text-gold font-bold py-6 rounded-xl text-lg"
              onClick={handleRephrase}
              disabled={isSubmitting || isRephrasing}
            >
              <Sparkles className="w-5 h-5 ml-2" />
              <span>
                {isRephrasing ? 'جار التحسين...' : 'تحسين بالذكاء الاصطناعي'}
              </span>
            </Button>
            <Button
              type="submit"
              className="w-full bg-gold hover:bg-gold-light text-navy font-bold py-6 rounded-xl text-lg"
              disabled={isSubmitting || isRephrasing || !dua.trim()}
            >
              <Send className="w-5 h-5 ml-2" />
              <span>{isSubmitting ? 'جار النشر...' : 'نشر الدعاء'}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
