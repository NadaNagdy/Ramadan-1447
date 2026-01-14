export interface Reflection {
  id: number;
  day: number;
  title: string;
  verse: string;
  verseReference: string;
  reflection: string;
  dua: string;
}

export const ramadanReflections: Reflection[] = [
  {
    id: 1,
    day: 1,
    title: "The Month of Mercy",
    verse: "O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous",
    verseReference: "Al-Baqarah 2:183",
    reflection: "Ramadan is a blessed month of spiritual renewal and deep reflection.",
    dua: "O Allah, bless us in Rajab and Sha'ban and allow us to reach Ramadan."
  }
];

export function getReflectionByDay(day: number): Reflection | undefined {
  return ramadanReflections.find(r => r.day === day);
}

export function getAllReflections(): Reflection[] {
  return ramadanReflections;
}
