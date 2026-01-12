"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Share2, Heart, Play, Pause, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { DecorativeDivider } from './islamic-decorations';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface DuaCardProps {
  day?: number;
  title: string;
  dua: string;
  audioUrl?: string;
  showActions?: boolean;
  showShareImageButton?: boolean;
}

const DuaCard: React.FC<DuaCardProps> = ({ day, title, dua, audioUrl, showActions = true, showShareImageButton = false }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleShare = () => {
    const shareText = `${title}\n\n${dua}`;
    if (navigator.share) {
      navigator.share({ title: title, text: shareText }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        toast({
          title: "تم النسخ",
          description: "تم نسخ الدعاء إلى الحافظة بنجاح.",
        });
      });
    }
  };

  const handleShareImage = () => {
    const encodedDua = encodeURIComponent(dua);
    const encodedTitle = encodeURIComponent(title);
    router.push(`/generate-card?dua=${encodedDua}&title=${encodedTitle}`);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setProgress(0);
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="group relative bg-card-gradient rounded-2xl p-6 md:p-8 border border-gold/20 hover:border-gold/40 transition-all duration-300 shadow-lg">
      {day && (
        <div className="absolute -top-4 right-6 bg-gold text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-md">
          {title}
        </div>
      )}
      <h3 className={cn("font-amiri text-2xl lg:text-3xl text-gold mb-4", day ? "mt-4" : "")}>{day ? `دعاء اليوم ${day}` : title}</h3>
      <DecorativeDivider className="my-4" />
      <p className="font-amiri text-cream text-lg md:text-xl leading-relaxed text-center whitespace-pre-line">{dua}</p>
      
      {audioUrl && (
        <>
          <audio ref={audioRef} src={audioUrl} preload="none" />
          <div className="mt-6 pt-6 border-t border-gold/10">
            <div className="flex items-center justify-center gap-4">
              <button onClick={togglePlay} className="text-gold hover:text-gold-light transition-colors p-2 rounded-full bg-gold/10 hover:bg-gold/20">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <div className="w-full max-w-xs bg-navy/50 rounded-full h-2 overflow-hidden">
                <div className="bg-gold h-full" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }} />
              </div>
              <button onClick={resetAudio} className="text-gold hover:text-gold-light transition-colors p-2 rounded-full bg-gold/10 hover:bg-gold/20">
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}

      {(showActions || showShareImageButton) && (
        <div className={cn("flex items-center justify-center gap-4 flex-wrap", audioUrl ? "mt-6" : "mt-6 pt-6 border-t border-gold/10")}>
          {showActions && (
            <>
              <Button variant="ghost" onClick={handleShare} className="flex items-center gap-2 text-cream/60 hover:text-gold transition-colors">
                <Share2 className="w-5 h-5" /> <span>مشاركة النص</span>
              </Button>
              <Button variant="ghost" onClick={() => setIsSaved(!isSaved)} className={`flex items-center gap-2 transition-colors ${isSaved ? 'text-gold' : 'text-cream/60 hover:text-gold'}`}>
                <Heart className={`w-5 h-5 transition-all ${isSaved ? 'fill-current' : ''}`} /> <span>{isSaved ? 'تم الحفظ' : 'حفظ'}</span>
              </Button>
            </>
          )}
          {showShareImageButton && (
            <Button onClick={handleShareImage} className="bg-gold/10 text-gold hover:bg-gold/20 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" /> <span>مشاركة كبطاقة</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default DuaCard;
