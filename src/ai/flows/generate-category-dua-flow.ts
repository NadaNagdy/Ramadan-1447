'use server';

import { chatCompletion, extractJSON } from '@/ai/server-utils';
import { z } from 'zod';

const GenerateCategoryDuaOutputSchema = z.object({
  dua: z.string(),
  transliteration: z.string().optional(),
  meaning: z.string().optional(),
});

export type GenerateCategoryDuaOutput = z.infer<typeof GenerateCategoryDuaOutputSchema>;

export async function generateCategoryDua(category: string): Promise<GenerateCategoryDuaOutput> {
  try {
    const systemPrompt = "أنت خبير في الأدعية الإسلامية من القرآن والسنة.";
    
    const userPrompt = `أعطني دعاء من القرآن أو السنة مناسب لفئة \"${category}\".

قدم النتيجة في شكل JSON:
{
  \"dua\": \"نص الدعاء بالعربية\",
  \"transliteration\": \"النطق بالحروف اللاتينية (اختياري)\",
  \"meaning\": \"المعنى أو الترجمة (اختياري)\"
}`;

    const response = await chatCompletion(systemPrompt, userPrompt, {
      temperature: 0.7,
    });

    const parsed = extractJSON(response);
    
    if (parsed && parsed.dua) {
      return {
        dua: parsed.dua,
        transliteration: parsed.transliteration,
        meaning: parsed.meaning,
      };
    }

    // Fallback
    return {
      dua: response,
      transliteration: undefined,
      meaning: undefined,
    };
  } catch (error) {
    console.error('Generate Category Dua Error:', error);
    throw new Error('فشل في توليد الدعاء');
  }
}