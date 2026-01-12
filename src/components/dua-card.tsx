"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Share2, Heart, Play, Pause, RotateCcw, Image as ImageIcon, Loader2, Trash2 } from 'lucide-react';
import { DecorativeDivider } from './islamic-decorations';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { textToSpeech } from '@/ai/flows/tts-flow';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface DuaCardProps {
  day?: number;
  title: string;
  dua: string;
  audioUrl?: string;
  showActions?: boolean;
  showShareImageButton?: boolean;
  isInitiallySaved?: boolean;
  onSaveToggle?: () => void;
}

const DuaCard: React.FC<DuaCardProps> = ({ 
  day, 
  title, 
  dua, 
  audioUrl, 
  showActions = true, 
  showShareImageButton = false,
  isInitiallySaved = false,
  onSaveToggle 
}) => {
  const [savedDuas, setSavedDuas] = useLocalStorage<any[]>('saved_duas', []);
  const isDuaSaved = isInitiallySaved || savedDuas.some(savedDua => savedDua.dua === dua);
  const [isSaved, setIsSaved] = useState(isDuaSaved);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsSaved(isInitiallySaved || savedDuas.some(savedDua => savedDua.dua === dua));
  }, [savedDuas, dua, isInitiallySaved]);

  const handleSave = () => {
    if (onSaveToggle) {
        onSaveToggle();
        setIsSaved(false); // Optimistically update UI
        toast({
          title: "تم الحذف",
          description: "تم حذف الدعاء من قائمة أدعيتك.",
        });
        return;
    }

    if (isSaved) {
      setSavedDuas(savedDuas.filter(d => d.dua !== dua));
      toast({
        title: "تم الحذف",
        description: "تم حذف الدعاء من قائمة أدعيتك.",
      });
    } else {
      setSavedDuas([...savedDuas, { title, dua }]);
      toast({
        title: "تم الحفظ",
        description: "تم حفظ الدعاء في قائمة أدعيتك.",
      });
    }
    setIsSaved(!isSaved);
  };

  const effectiveAudioUrl = generatedAudioUrl || audioUrl;

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

  const generateAndPlayAudio = useCallback(async () => {
    if (isGeneratingAudio) return null;
    setIsGeneratingAudio(true);
    try {
      const { audioDataUri } = await textToSpeech({ text: dua });
      setGeneratedAudioUrl(audioDataUri);
      return audioDataUri;
    } catch (error) {
      console.error("Audio generation failed:", error);
      toast({
        variant: "destructive",
        title: "خطأ في توليد الصوت",
        description: "لم نتمكن من تحويل النص إلى صوت حاليًا.",
      });
      return null;
    } finally {
      setIsGeneratingAudio(false);
    }
  }, [dua, toast, isGeneratingAudio]);

  const togglePlay = async () => {
    if (isGeneratingAudio) return;
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      if (effectiveAudioUrl) {
        if(audio.src !== effectiveAudioUrl) {
          audio.src = effectiveAudioUrl;
        }
        audio.play().catch(e => console.error("Audio play failed", e));
      } else {
         const newAudioUrl = await generateAndPlayAudio();
         if (newAudioUrl && audio) {
           audio.src = newAudioUrl;
           audio.play().catch(e => console.error("Audio play failed", e));
         }
      }
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

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    const updateProgress = () => {
      if (audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    // Reset state if dua changes
    setIsPlaying(false);
    setProgress(0);
    setGeneratedAudioUrl(null);
    if(audio.src) {
      audio.pause();
      audio.removeAttribute('src');
    }

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [dua]);

  const showAudioPlayer = showActions && (audioUrl || true); // Always show if showActions is true

  return (
    <div className="group relative bg-card-gradient rounded-3xl p-6 md:p-8 border border-gold/20 hover:border-gold/40 transition-all duration-300 shadow-lg">
      {day && (
        <div className="absolute -top-4 right-6 bg-gold text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-md">
          {title}
        </div>
      )}
      <h3 className={cn("font-amiri text-2xl lg:text-3xl text-gold mb-4 text-center", day ? "mt-4" : "")}>{day ? `دعاء اليوم ${day}` : title}</h3>
      <DecorativeDivider className="my-4" />
      <p className="font-amiri text-cream text-lg md:text-xl leading-relaxed text-center whitespace-pre-line">{dua}</p>
      
      <audio ref={audioRef} preload="metadata" />

      {showAudioPlayer && (
        <div className="mt-6 pt-6 border-t border-gold/10">
          <div className="flex items-center justify-center gap-4">
            <Button variant="ghost" onClick={togglePlay} disabled={isGeneratingAudio} className="text-gold hover:text-gold-light transition-colors p-2 rounded-full bg-gold/10 hover:bg-gold/20 w-10 h-10">
              {isGeneratingAudio 
                ? <Loader2 className="w-6 h-6 animate-spin" />
                : isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />
              }
            </Button>
            <div className="w-full max-w-xs bg-navy/50 rounded-full h-2 overflow-hidden">
              <div className="bg-gold h-full" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }} />
            </div>
            <Button variant="ghost" onClick={resetAudio} className="text-gold hover:text-gold-light transition-colors p-2 rounded-full bg-gold/10 hover:bg-gold/20 w-10 h-10">
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {(showActions || showShareImageButton) && (
        <div className={cn("flex items-center justify-center gap-4 flex-wrap", showAudioPlayer ? "mt-6" : "mt-6 pt-6 border-t border-gold/10")}>
          {showActions && (
            <>
              <Button variant="ghost" onClick={handleShare} className="flex items-center gap-2 text-cream/60 hover:text-gold transition-colors">
                <Share2 className="w-5 h-5" /> <span>مشاركة النص</span>
              </Button>
              <Button variant="ghost" onClick={handleSave} className={`flex items-center gap-2 transition-colors ${isSaved ? 'text-gold' : 'text-cream/60 hover:text-gold'}`}>
                {isInitiallySaved 
                  ? <><Trash2 className="w-5 h-5"/> <span>حذف</span></>
                  : <><Heart className={`w-5 h-5 transition-all ${isSaved ? 'fill-current' : ''}`} /> <span>{isSaved ? 'تم الحفظ' : 'حفظ'}</span></>
                }
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
