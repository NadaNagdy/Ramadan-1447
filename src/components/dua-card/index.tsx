'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Share2, Volume2, Save, Check, Printer, Heart, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface DuaCardProps {
  day?: number;
  title: string;
  dua: string;
  audioUrl?: string;
  showActions?: boolean;
  isInitiallySaved?: boolean;
  onSaveToggle?: () => void;
  author?: string;
}

const DuaCard: React.FC<DuaCardProps> = ({ 
  day,
  title, 
  dua, 
  audioUrl,
  showActions = true,
  isInitiallySaved = false,
  onSaveToggle,
  author,
}) => {
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [savedDuas, setSavedDuas] = useLocalStorage<any[]>('saved_duas', []);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const isSaved = isInitiallySaved || savedDuas.some(savedDua => savedDua.dua === dua);
  
  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(dua);
    toast({ title: 'تم نسخ الدعاء' });
  };

  const handlePlayPause = () => {
    // If there's a custom audio URL, use it
    if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      return;
    }

    // Otherwise, use text-to-speech
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        // Create speech utterance
        const utterance = new SpeechSynthesisUtterance(dua);
        
        // Try to find an Arabic voice
        const arabicVoice = voices.find(voice => 
          voice.lang.startsWith('ar') || 
          voice.lang === 'ar-SA' || 
          voice.lang === 'ar-EG'
        );
        
        if (arabicVoice) {
          utterance.voice = arabicVoice;
        }
        
        utterance.lang = 'ar-SA'; // Arabic (Saudi)
        utterance.rate = 0.75; // Slower for better clarity and reverence
        utterance.pitch = 1.0; // Normal pitch
        utterance.volume = 1.0; // Full volume
        
        // Update state when speech ends
        utterance.onend = () => {
          setIsPlaying(false);
        };
        
        utterance.onerror = (event) => {
          console.error('Speech error:', event);
          setIsPlaying(false);
          toast({
            variant: "destructive",
            title: "خطأ",
            description: "لم نتمكن من قراءة الدعاء. جرّب متصفحاً آخر.",
          });
        };
        
        // Small delay to ensure voices are loaded
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
          setIsPlaying(true);
        }, 100);
      }
    } else {
      toast({
        variant: "destructive",
        title: "غير مدعوم",
        description: "المتصفح لا يدعم قراءة النصوص. جرّب Chrome أو Safari.",
      });
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isPlaying) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying]);
  
  const handleSave = () => {
    if (onSaveToggle) {
        onSaveToggle();
        return;
    }
    if (isSaved) {
      setSavedDuas(savedDuas.filter(d => d.dua !== dua));
      toast({ title: 'تمت الإزالة من أدعيتك' });
    } else {
      setSavedDuas([...savedDuas, { title, dua }]);
      toast({ title: 'تم الحفظ في أدعيتك' });
    }
  };

  const shareLink = `/generate-card?title=${encodeURIComponent(title)}&dua=${encodeURIComponent(dua)}`;

  return (
    <Card className="bg-card-gradient text-white border-gold/30 rounded-3xl shadow-2xl font-amiri overflow-hidden">
      <CardHeader className="text-center">
        <CardTitle className="text-gold text-2xl">{title}</CardTitle>
        {author && <p className="text-cream/70 text-sm mt-1">بواسطة: {author}</p>}
      </CardHeader>
      <CardContent className="text-center text-3xl leading-loose px-6 sm:px-12 py-8">
        <p>{dua}</p>
      </CardContent>
      {showActions && (
        <CardFooter className="bg-black/20 p-4 flex justify-center items-center gap-6">
          <button onClick={handleCopy} className="flex items-center gap-2 text-[#f8f1e7]/60 hover:text-[#d4af37] transition-colors" title="نسخ">
            <Copy className="w-5 h-5" />
            <span className="text-xs">نسخ</span>
          </button>
          <Link href={shareLink} legacyBehavior>
            <a className="flex items-center gap-2 text-[#f8f1e7]/60 hover:text-[#d4af37] transition-colors" title="مشاركة كصورة">
              <Share2 className="w-5 h-5" />
              <span className="text-xs">مشاركة</span>
            </a>
          </Link>
          <button onClick={handleSave} className="flex items-center gap-2 text-[#f8f1e7]/60 hover:text-[#d4af37] transition-colors" title="حفظ">
             <Heart className={cn("w-5 h-5", isSaved && "fill-current text-gold")} />
            <span className="text-xs">حفظ</span>
          </button>
          
          <button 
            onClick={handlePlayPause} 
            className="flex items-center gap-2 text-[#f8f1e7]/60 hover:text-[#d4af37] transition-colors" 
            title={isPlaying ? "إيقاف" : "استماع"}
          >
            {isPlaying ? (
              <VolumeX className="w-5 h-5 text-green-400 animate-pulse" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
            <span className="text-xs">{isPlaying ? 'إيقاف' : 'استماع'}</span>
          </button>
          
          {audioUrl && <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />}
        </CardFooter>
      )}
    </Card>
  );
};

export default DuaCard;
