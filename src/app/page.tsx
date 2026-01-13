import HeroSection from '@/components/hero-section';
import DuaOfTheDay from '@/components/DuaOfTheDay';
import RamadanReflection from '@/components/ramadan-reflections';
import { dailyDuas } from '@/lib/duas';
import { getRamadanDay, isRamadan } from '@/lib/date-helper';

export default function HomePage() {
  const ramadanDay = getRamadanDay();
  const isRamadanNow = isRamadan();
  
  const duaForToday = isRamadanNow && ramadanDay 
    ? dailyDuas.find(d => d.day === ramadanDay)
    : dailyDuas[0]; // Fallback to day 1 if not ramadan

  return (
    <div className="bg-hero-gradient">
      <HeroSection />
      {duaForToday && <DuaOfTheDay dua={duaForToday} />}
      <RamadanReflection />
    </div>
  );
}
