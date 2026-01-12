"use client";

import React, { useState } from 'react';
import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function ShareDuaPage() {
  const [dua, setDua] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "تم الإرسال",
        description: "شكراً لمشاركتك، سيتم مراجعة دعائك.",
      });
      setDua('');
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
        <form onSubmit={handleSubmit}>
          <Textarea
            value={dua}
            onChange={(e) => setDua(e.target.value)}
            placeholder="اكتب دعاءك هنا..."
            className="w-full h-48 bg-card border border-gold/20 rounded-2xl p-4 text-cream text-lg font-amiri focus-visible:ring-gold"
            dir="rtl"
            disabled={isSubmitting}
          />
          <Button 
            type="submit"
            className="mt-8 w-full bg-gold hover:bg-gold-light text-navy font-bold py-6 rounded-xl text-lg"
            disabled={isSubmitting}
          >
            <Send className="w-5 h-5 ml-2" /> 
            <span>{isSubmitting ? 'جار الإرسال...' : 'إرسال'}</span>
          </Button>
        </form>
      </div>
    </div>
  );
};
