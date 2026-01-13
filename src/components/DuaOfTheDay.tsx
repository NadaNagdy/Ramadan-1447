import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { dailyDuas } from '@/lib/duas';
import { Button } from './ui/button';
import Link from 'next/link';

interface DuaOfTheDayProps {
  dua: typeof dailyDuas[0];
}

const DuaOfTheDay: React.FC<DuaOfTheDayProps> = ({ dua }) => {
  return (
    <section className="py-20 animate-fade-in">
        <div className="container mx-auto px-4">
            <Card className="bg-card-gradient text-cream rounded-3xl shadow-2xl max-w-3xl mx-auto overflow-hidden border border-gold/20">
                <CardHeader className="flex flex-row items-center justify-between p-6">
                    <CardTitle className="flex items-center gap-3 text-2xl font-cairo text-gold">
                        <Star className="w-7 h-7 text-gold animate-float [animation-duration:5s]" />
                        دعاء اليوم
                    </CardTitle>
                    <span 
                        className="bg-gold/10 text-gold text-sm font-bold px-4 py-1.5 rounded-full"
                    >
                       اليوم {dua.day} من رمضان
                    </span>
                </CardHeader>
                <CardContent className="px-10 pb-10 pt-4">
                    <p className="text-3xl font-amiri leading-relaxed text-center mb-6">
                        {dua.dua}
                    </p>
                    <div className="text-center">
                         <Link href={`/daily-duas/${dua.day}`}>
                            <Button variant="link" className="text-gold/80 hover:text-gold">
                                عرض التفاصيل والاستماع
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    </section>
  );
};

export default DuaOfTheDay;
