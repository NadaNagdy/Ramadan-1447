'use client';
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Share2, Volume2, Save, Check, Printer } from 'lucide-react';
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

  const isSaved = isInitiallySaved || savedDuas.some(savedDua => savedDua.dua === dua);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(dua);
    toast({ title: 'تم نسخ الدعاء' });
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
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
        <CardFooter className="bg-black/20 p-4 flex justify-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" onClick={handleCopy} className="text-gold hover:bg-gold/10" title="نسخ"><Copy className="w-6 h-6" /></Button>
          
          <Link href={shareLink}>
            <Button variant="ghost" size="icon" className="text-gold hover:bg-gold/10" title="مشاركة كصورة">
              <Share2 className="w-6 h-6" />
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" onClick={handleSave} className="text-gold hover:bg-gold/10" title={isSaved ? "إلغاء الحفظ" : "حفظ"}>
            {isSaved ? <Check className="w-6 h-6 text-green-400" /> : <Save className="w-6 h-6" />}
          </Button>

          {audioUrl && (
            <>
              <Button variant="ghost" size="icon" onClick={handlePlayPause} className="text-gold hover:bg-gold/10" title="استماع">
                <Volume2 className={cn("w-6 h-6", isPlaying && "text-green-400 animate-pulse")} />
              </Button>
              <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default DuaCard;
