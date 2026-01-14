'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { ramadanReflections, type Reflection } from '@/lib/reflections';

const RamadanReflection = () => {
  const [reflection, setReflection] = useState<Reflection | null>(null);

  useEffect(() => {
    // Pick a random reflection on mount (client-side only)
    const randomIndex = Math.floor(Math.random() * ramadanReflections.length);
    setReflection(ramadanReflections[randomIndex]);
  }, []);

  if (!reflection) {
    return null; // Or a loading skeleton
  }

  return (
    <section className="py-20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <div className="container mx-auto px-4">
        <Card className="bg-card-gradient text-cream rounded-3xl shadow-2xl max-w-3xl mx-auto overflow-hidden border border-gold/20">
          <CardHeader className="flex flex-row items-center justify-between p-6">
            <CardTitle className="flex items-center gap-3 text-2xl font-cairo text-gold">
              <Sparkles className="w-7 h-7 text-gold animate-pulse" />
              تأملات رمضانية
            </CardTitle>
          </CardHeader>
          <CardContent className="px-10 pb-10 pt-4">
            <div className="space-y-6">
              <h3 className="text-3xl font-amiri text-gold text-center">{reflection.title}</h3>
              
              <div className="bg-cream/5 p-6 rounded-xl">
                <p className="text-xl font-amiri leading-relaxed text-center italic">
                  "{reflection.verse}"
                </p>
                <p className="text-sm text-gold/80 text-center mt-2">
                  {reflection.verseReference}
                </p>
              </div>

              <p className="text-lg font-amiri leading-relaxed">
                {reflection.reflection}
              </p>

              <div className="bg-gold/10 p-4 rounded-xl">
                <p className="text-lg font-amiri leading-relaxed italic">
                  {reflection.dua}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RamadanReflection;
