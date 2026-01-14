'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';

const RamadanReflection = () => {
  const [reflection, setReflection] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // جلب تأمل جديد من الـ API في كل مرة
    fetch('/api/generate-reflection')
      .then(res => res.json())
      .then(data => {
        setReflection(data.reflection);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching reflection:', error);
        setReflection('رمضان شهر الرحمة والمغفرة، فلنستغل كل لحظة فيه للتقرب من الله.');
        setIsLoading(false);
      });
  }, []);

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
            {isLoading ? (
              <div className="flex items-center justify-center gap-3 py-4">
                <Loader2 className="w-6 h-6 text-gold animate-spin" />
                <p className="text-xl font-amiri text-gold/70">جارٍ إنشاء تأمل جديد...</p>
              </div>
            ) : (
              <p className="text-2xl font-amiri leading-relaxed text-center">
                {reflection}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RamadanReflection;
