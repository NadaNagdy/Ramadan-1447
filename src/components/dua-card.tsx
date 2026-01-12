"use client";

import React, { useState } from 'react';
import { Share2, Heart } from 'lucide-react';
import { DecorativeDivider } from './islamic-decorations';
import { useToast } from "@/hooks/use-toast";

interface DuaCardProps {
  day?: number;
  title: string;
  dua: string;
  showActions?: boolean;
}

const DuaCard: React.FC<DuaCardProps> = ({ day, title, dua, showActions = true }) => {
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

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

  return (
    <div className="group relative bg-card-gradient rounded-2xl p-6 md:p-8 border border-gold/20 hover:border-gold/40 transition-all duration-300 shadow-lg">
      {day && (
        <div className="absolute -top-4 right-6 bg-gold text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-md">
          اليوم {day}
        </div>
      )}
      <h3 className="font-amiri text-2xl lg:text-3xl text-gold mb-4 mt-2">{title}</h3>
      <DecorativeDivider className="my-4" />
      <p className="font-amiri text-cream text-lg md:text-xl leading-relaxed text-center whitespace-pre-line">{dua}</p>
      {showActions && (
        <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gold/10">
          <button onClick={handleShare} className="flex items-center gap-2 text-cream/60 hover:text-gold transition-colors">
            <Share2 className="w-5 h-5" /> <span>مشاركة</span>
          </button>
          <button onClick={() => setIsSaved(!isSaved)} className={`flex items-center gap-2 transition-colors ${isSaved ? 'text-gold' : 'text-cream/60 hover:text-gold'}`}>
            <Heart className={`w-5 h-5 transition-all ${isSaved ? 'fill-current' : ''}`} /> <span>{isSaved ? 'تم الحفظ' : 'حفظ'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DuaCard;
