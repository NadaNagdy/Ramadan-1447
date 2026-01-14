import { chatCompletion, extractJSON } from '@/ai/server-utils';

// Export the type
export type RephraseDuaOutput = {
  duaText: string;
  simplifiedMeaning: string;
  spiritualTouch: string;
};

export async function rephraseDua({ intention }: { intention: string }): Promise<RephraseDuaOutput> {
  const systemPrompt =
    "أنت خبير في صياغة الأدعية الإسلامية. مهمتك إعادة صياغة الأدعية بشكل أفضل وأكثر بلاغة.";
  const userPrompt = `أعد صياغة هذا الدعاء بشكل أفضل وأكثر بلاغة:
"${intention}"
قدم النتيجة في شكل JSON بهذا الشكل بالضبط:
{
  "duaText": "النص المحسن للدعاء",
  "simplifiedMeaning": "المعنى المبسط",
  "spiritualTouch": "اللمسة الروحانية والفوائد"
}`;
  const response = await chatCompletion(systemPrompt, userPrompt, {
    temperature: 0.7,
  });
  const parsed = extractJSON(response);
  if (parsed?.duaText) {
    return {
      duaText: parsed.duaText,
      simplifiedMeaning: parsed.simplifiedMeaning ?? "دعاء محسّن",
      spiritualTouch: parsed.spiritualTouch ?? "جزاك الله خيراً",
    };
  }
  return {
    duaText: response,
    simplifiedMeaning: "دعاء محسّن بفضل الذكاء الاصطناعي",
    spiritualTouch: "جزاك الله خيراً",
  };
}
