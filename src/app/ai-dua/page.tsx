"use client";

import React, { useState } from 'react';
import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';
import { Wand2, Loader2, Copy, Sparkles, BookOpen, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { rephraseDua, type RephraseDuaOutput } from '@/ai/flows/rephrase-dua-flow';
import { Card, CardContent } from '@/components/ui/card';

export default function AiDuaPage() {
  const [intention, setIntention] = useState('');
  const [generatedDua, setGeneratedDua] = useState<RephraseDuaOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intention.trim()) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "الرجاء كتابة نيتك أولاً.",
      });
      return;
    }
    setIsGenerating(true);
    setGeneratedDua(null);
    try {
      const result = await rephraseDua({ intention });
      setGeneratedDua(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "لم نتمكن من إنشاء الدعاء، يرجى التأكد من إعدادات مفتاح API والمحاولة مرة أخرى.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedDua) return;
    navigator.clipboard.writeText(generatedDua.duaText).then(() => {
      toast({
        title: "تم النسخ",
        description: "تم نسخ نص الدعاء إلى الحافظة.",
      });
    });
  };

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-16 px-4">
      <FloatingStars />
      <div className="container mx-auto max-w-2xl text-center animate-fade-in">
        <CrescentMoon className="w-16 h-16 text-gold mx-auto mb-4" />
        <h1 className="font-amiri text-4xl text-cream mb-2">دعاء بالذكاء الاصطناعي</h1>
        <p className="text-cream/60 mb-6">اكتب نيتك ودع الذكاء الاصطناعي يصوغ لك دعاءً بليغاً ومؤثراً</p>
        <DecorativeDivider className="mb-8" />
        
        <form onSubmit={handleGenerate} className="space-y-6 text-right">
          <div>
            <Label htmlFor="intention" className="inline-block mb-2 font-cairo text-cream/80">نيتك أو طلبك</Label>
            <Textarea
              id="intention"
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="مثال: أتمنى الشفاء العاجل لأمي وأن يحفظها الله..."
              className="w-full h-36 bg-card border border-gold/20 rounded-2xl p-4 text-cream text-lg font-cairo focus-visible:ring-gold"
              dir="rtl"
              disabled={isGenerating}
              required
            />
          </div>
          
          <Button 
            type="submit"
            className="mt-4 w-full bg-gold hover:bg-gold-light text-navy font-bold py-6 rounded-xl text-lg"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 ml-2 animate-spin" /> 
                <span>جاري الصياغة...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 ml-2" /> 
                <span>صياغة الدعاء</span>
              </>
            )}
          </Button>
        </form>

        {isGenerating && !generatedDua && (
           <div className="mt-12">
            <div className="flex items-center justify-center h-48 bg-card-gradient border-gold/20 text-cream rounded-2xl">
                <Loader2 className="w-8 h-8 text-gold/50 animate-spin" />
            </div>
          </div>
        )}

        {generatedDua && (
          <div className="mt-12 space-y-4 text-right">
             <Card className="bg-card-gradient border-gold/20 text-cream text-xl md:text-2xl font-amiri leading-relaxed text-center">
              <CardContent className="p-6">
                <p className="whitespace-pre-line">{generatedDua.duaText}</p>
                 <div className="mt-6 pt-4 border-t border-gold/10 flex justify-center">
                  <Button variant="ghost" onClick={handleCopy} className="flex items-center gap-2 text-cream/70 hover:text-gold transition-colors">
                    <Copy className="w-5 h-5" />
                    <span>نسخ الدعاء</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-gold/10">
                <CardContent className="p-4">
                  <h3 className="font-amiri text-lg text-gold flex items-center gap-2 justify-end mb-2"><BookOpen className="w-5 h-5" /><span>المعنى المبسط</span></h3>
                  <p className="font-cairo text-cream/80">{generatedDua.simplifiedMeaning}</p>
                </CardContent>
            </Card>

             <Card className="bg-card/50 border-gold/10">
                <CardContent className="p-4">
                  <h3 className="font-amiri text-lg text-gold flex items-center gap-2 justify-end mb-2"><Sparkles className="w-5 h-5" /><span>لمسة روحانية</span></h3>
                  <p className="font-cairo text-cream/80">{generatedDua.spiritualTouch}</p>
                </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
