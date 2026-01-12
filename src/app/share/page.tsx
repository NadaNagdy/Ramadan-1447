'use client';

import React, { useState } from 'react';
import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';
import { Send, User, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { rephraseDua } from '@/ai/flows/rephrase-dua-flow';

export default function ShareDuaPage() {
  const [name, setName] = useState('');
  const [dua, setDua] = useState('');
  const [type, setType] = useState('public');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRephrasing, setIsRephrasing] = useState(false);
  const { toast } = useToast();

  const handleRephrase = async () => {
    if (!dua.trim()) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "الرجاء كتابة الدعاء قبل إعادة الصياغة.",
      });
      return;
    }
    setIsRephrasing(true);
    try {
      const result = await rephraseDua({ intention: dua });
      setDua(result.dua);
      toast({
        title: "تمت إعادة الصياغة",
        description: "تم تحسين دعاءك بفضل الذكاء الاصطناعي.",
      });
    } catch (error) {
      console.error("Error rephrasing dua:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء إعادة صياغة الدعاء. الرجاء المحاولة مرة أخرى.",
      });
    }
    setIsRephrasing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dua.trim()) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "الرجاء كتابة الدعاء قبل الإرسال.",
      });
      return;
    }
    setIsSubmitting(true);
    // Here you would typically send the data to a backend or Google Form via an API
    console.log({ name, dua, type });

    setTimeout(() => {
      toast({
        title: "تم الإرسال",
        description: "شكراً لمشاركتك، جزاك الله خيراً.",
      });
      setName('');
      setDua('');
      setType('public');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-16 px-4">
      <FloatingStars />
      <div className="container mx-auto max-w-2xl text-center animate-fade-in">
        <CrescentMoon className="w-16 h-16 text-gold mx-auto mb-4" />
        <h1 className="font-amiri text-4xl text-cream mb-2">شارك دعاءك</h1>
        <p className="text-cream/60 mb-6">شارك بدعاء لتكون صدقة جارية لك</p>
        <DecorativeDivider className="mb-8" />
        <form onSubmit={handleSubmit} className="space-y-6 text-right">
          <div>
            <Label htmlFor="name" className="inline-block mb-2 font-cairo text-cream/80">الاسم (اختياري)</Label>
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
            <Label htmlFor="dua" className="inline-block mb-2 font-cairo text-cream/80">نص الدعاء</Label>
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
          <div>
             <Label className="inline-block mb-3 font-cairo text-cream/80">نوع الدعاء</Label>
            <RadioGroup dir="rtl" value={type} onValueChange={setType} className="flex justify-center gap-8">
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="public" id="public" className="text-gold border-gold/50" />
                <Label htmlFor="public" className="text-cream/80">عام (للعرض على الموقع)</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="private" id="private" className="text-gold border-gold/50" />
                <Label htmlFor="private" className="text-cream/80">خاص</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button 
              type="button"
              className="w-full bg-navy border border-gold/50 hover:bg-navy-light text-gold font-bold py-6 rounded-xl text-lg"
              onClick={handleRephrase}
              disabled={isSubmitting || isRephrasing}
            >
              <Sparkles className="w-5 h-5 ml-2" /> 
              <span>{isRephrasing ? 'جار التحسين...' : 'تحسين بالذكاء الاصطناعي'}</span>
            </Button>
            <Button 
              type="submit"
              className="w-full bg-gold hover:bg-gold-light text-navy font-bold py-6 rounded-xl text-lg"
              disabled={isSubmitting || isRephrasing}
            >
              <Send className="w-5 h-5 ml-2" /> 
              <span>{isSubmitting ? 'جار الإرسال...' : 'إرسال الدعاء'}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
