
"use client";

import React from 'react';
import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';
import { communityDuas as initialDuas } from '@/lib/duas';
import { useLocalStorage } from '@/hooks/use-local-storage';
import CommunityDuaCard from '@/components/community-dua-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Feather } from 'lucide-react';

export default function CommunityDuasPage() {
  const [communityDuas, setCommunityDuas] = useLocalStorage('community_duas_shared', []);
  const allDuas = [...communityDuas, ...initialDuas];
  
  // Create a unique set of duas based on their ID or text to avoid duplicates
  const uniqueDuas = Array.from(new Map(allDuas.map(dua => [dua.id || dua.text, dua])).values());

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4">
      <FloatingStars />
      <div className="container mx-auto max-w-3xl text-center animate-fade-in">
        <CrescentMoon className="w-16 h-16 text-gold mx-auto mb-4" />
        <h1 className="font-amiri text-4xl text-cream mb-2">مجتمع الدعاء</h1>
        <p className="text-cream/60 mb-6">
          أدعية يشاركها إخوة وأخوات لك. أمّن على دعائهم وشارك بدعاء لك.
        </p>
        <DecorativeDivider className="mb-8" />

        <div className="text-center mb-12">
            <Link href="/share">
                <Button className="bg-gold text-navy font-bold py-6 px-8 rounded-2xl text-lg hover:bg-gold-light shadow-lg shadow-gold/20 transform hover:scale-105 transition-transform">
                    <Feather className="ml-3" />
                    شارك بدعاءٍ ليؤمِّن عليه غيرُك
                </Button>
            </Link>
        </div>

        <div className="space-y-6">
            {uniqueDuas.map((dua) => (
                <CommunityDuaCard key={dua.id} dua={dua} />
            ))}
        </div>
      </div>
    </div>
  );
}
