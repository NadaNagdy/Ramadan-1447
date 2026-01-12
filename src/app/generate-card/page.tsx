"use client";

import React, { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Download, Share2, Loader2, ArrowRight } from 'lucide-react';
import { FloatingStars, CrescentMoon } from '@/components/islamic-decorations';
import Link from 'next/link';

function CardGenerator() {
  const searchParams = useSearchParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const dua = searchParams.get('dua') || 'اللهم بلغنا رمضان';
  const title = searchParams.get('title') || 'دعاء';
  const siteLink = "ramadan-duas.app"; // This will be the live domain name

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1080;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;

    // Background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#0a0f2c'); // Navy
    gradient.addColorStop(1, '#1a1f44'); // Deep purple
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Decorative Gold Lines
    ctx.strokeStyle = 'hsl(35, 55%, 55%)';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5;
    ctx.strokeRect(40, 40, width - 80, height - 80);
    ctx.strokeRect(50, 50, width - 100, height - 100);
    ctx.globalAlpha = 1;

    // Dua Text
    ctx.textAlign = 'center';
    ctx.fillStyle = 'hsl(45, 30%, 92%)'; // Cream
    
    // Title
    ctx.font = '700 60px Amiri';
    ctx.fillText(title, width / 2, 200);

    // Dua
    ctx.font = '400 52px Amiri';
    const maxLineWidth = width - 240;
    let text = dua;
    let lines = [];
    let currentLine = '';
    const words = text.split(' ');

    for (let i = 0; i < words.length; i++) {
        let testLine = currentLine + words[i] + ' ';
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxLineWidth && i > 0) {
            lines.push(currentLine);
            currentLine = words[i] + ' ';
        } else {
            currentLine = testLine;
        }
    }
    lines.push(currentLine);

    const lineHeight = 80;
    const startY = (height - (lines.length * lineHeight)) / 2 + 40;

    lines.forEach((line, index) => {
        ctx.fillText(line.trim(), width / 2, startY + (index * lineHeight));
    });

    // Site Link
    ctx.font = '400 32px Cairo';
    ctx.fillStyle = 'hsl(35, 55%, 55%)'; // Gold
    ctx.fillText(siteLink, width / 2, height - 80);

    // Convert to image
    const url = canvas.toDataURL('image/png');
    setImageUrl(url);
    setIsLoading(false);
  }, [dua, title]);

  const handleShare = async () => {
    if (!navigator.canShare) {
      alert("متصفحك لا يدعم المشاركة.");
      return;
    }
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'dua-card.png', { type: 'image/png' });

        if (navigator.canShare({ files: [file] })) {
             await navigator.share({
                files: [file],
                title: 'بطاقة دعاء',
                text: `${title}\n${siteLink}`,
            });
        } else {
             alert("لا يمكن مشاركة الملفات على هذا المتصفح.");
        }
    } catch(err) {
        console.error("Share failed:", err);
        alert("فشلت المشاركة.");
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient pt-24 pb-16 px-4">
      <FloatingStars />
      <div className="container mx-auto max-w-xl text-center animate-fade-in">
        <div className="flex justify-between items-center mb-8 text-cream">
            <Link href="/" className="flex items-center gap-2 text-cream/70 hover:text-gold transition-colors">
                <ArrowRight className="w-4 h-4" />
                <span>عودة للرئيسية</span>
            </Link>
        </div>
        <CrescentMoon className="w-16 h-16 text-gold mx-auto mb-4" />
        <h1 className="font-amiri text-3xl text-cream mb-2">بطاقة الدعاء جاهزة</h1>
        <p className="text-cream/70 mb-8">يمكنك الآن مشاركة هذه البطاقة أو تحميلها.</p>

        <div className="relative w-full aspect-square max-w-lg mx-auto rounded-2xl overflow-hidden border-2 border-gold/30 shadow-2xl">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-card">
              <Loader2 className="w-12 h-12 text-gold animate-spin" />
              <p className="sr-only">جاري إنشاء البطاقة...</p>
            </div>
          )}
          <canvas ref={canvasRef} className="w-full h-full" style={{ display: isLoading ? 'none' : 'block' }} />
          {!isLoading && <img src={imageUrl} alt="بطاقة دعاء" className="absolute inset-0 w-full h-full object-cover" />}
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={handleShare}
            disabled={isLoading}
            className="bg-gold hover:bg-gold-light text-navy font-bold py-6 px-8 rounded-xl text-lg w-full sm:w-auto"
          >
            <Share2 className="ml-2" />
            مشاركة
          </Button>
          <a href={imageUrl} download="dua-card.png">
            <Button
              variant="outline"
              disabled={isLoading}
              className="border-gold/50 text-gold hover:bg-gold/10 hover:text-gold-light font-bold py-6 px-8 rounded-xl text-lg w-full sm:w-auto"
            >
              <Download className="ml-2" />
              تحميل
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function GenerateCardPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 className="w-12 h-12 text-gold animate-spin" /></div>}>
            <CardGenerator />
        </Suspense>
    )
}
