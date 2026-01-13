'use server';

import { chatCompletion, extractJSON } from '@/ai/server-utils';
import { z } from 'zod';

const DuaSchema = z.object({
  dua: z.string(),
  transliteration: z.string().optional(),
  meaning: z.string().optional(),
  source: z.string().optional(),
});

const GenerateCategoryDuasOutputSchema = z.object({
  duas: z.array(DuaSchema),
});

export type GenerateCategoryDuasOutput = z.infer<typeof GenerateCategoryDuasOutputSchema>;

export async function generateCategoryDuas(
  category: string,
  count: number = 5
): Promise<GenerateCategoryDuasOutput> {
  try {
    const systemPrompt = "أنت خبير في الأدعية الإسلامية من القرآن والسنة النبوية الشريفة.";
    
    const userPrompt = `أعطني ${count} أدعية من القرآن أو السنة مناسبة لفئة \"${category}\".

قدم النتيجة في شكل JSON:
{
  \"duas\": [
    {
      \"dua\": \"نص الدعاء بالعربية\",
      \"transliteration\": \"النطق بالحروف اللاتينية\",
      \"meaning\": \"المعنى\",
      \"source\": \"المصدر (قرآن أو حديث)\"
    }
  ]
}`;

    const response = await chatCompletion(systemPrompt, userPrompt, {
      temperature: 0.7,
      maxTokens: 2048,
    });

    const parsed = extractJSON(response);
    
    if (parsed && parsed.duas && Array.isArray(parsed.duas)) {
      return { duas: parsed.duas };
    }

    // Fallback: try to create a single dua from response
    return {
      duas: [
        {
          dua: response,
          transliteration: undefined,
          meaning: undefined,
          source: undefined,
        }
      ]
    };
  } catch (error) {
    console.error('Generate Category Duas Error:', error);
    throw new Error('فشل في توليد الأدعية');
  }
}