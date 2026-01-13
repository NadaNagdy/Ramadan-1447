import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { generateReflection } from '@/ai/flows/generate-reflection-flow';

const RamadanReflection = async () => {
  const { reflection } = await generateReflection();

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
                    <p className="text-2xl font-amiri leading-relaxed text-center">
                        {reflection}
                    </p>
                </CardContent>
            </Card>
        </div>
    </section>
  );
};

export default RamadanReflection;
