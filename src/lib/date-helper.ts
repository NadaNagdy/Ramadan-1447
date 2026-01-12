// This is a simplified helper. For a production app,
// you would use a robust library to handle Islamic calendar calculations.
const RAMADAN_2026_START_DATE = new Date('2026-02-27T00:00:00Z');

export function getRamadanDay(): number {
  const now = new Date();
  
  // If it's before Ramadan starts, show day 1.
  if (now < RAMADAN_2026_START_DATE) {
    return 1;
  }

  const diffTime = Math.abs(now.getTime() - RAMADAN_2026_START_DATE.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 30) {
    return 30;
  }

  return diffDays;
}
