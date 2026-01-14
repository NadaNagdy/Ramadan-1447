'use server';

import { chatCompletion, extractJSON } from '@/ai/dev';
import { z } from 'zod';

const GenerateReflectionOutputSchema = z.object({
  reflection: z.string(),
});

export type GenerateReflectionOutput = z.infer<typeof GenerateReflectionOutputSchema>;

export async function generateReflection(): Promise<GenerateReflectionOutput> {
  try {
    const randomTopics = [
      "الصبر", "الامتنان", "التقوى", "الرحمة", "التسامح", 
      "الإخلاص", "بر الوالدين", "قيام الليل", "الصدقة", 
      "ذكر الله", "التوبة", "الدعاء"
    ];
    
    const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];

    const systemPrompt = "أنت كاتب روحاني متخصص في كتابة تأملات إسلامية عميقة وملهمة عن رمضان.";
    
    const userPrompt = `أعطني تأملاً روحانياً قصيراً وملهماً عن ${randomTopic} في شهر رمضان المبارك باللغة العربية. 

المتطلبات:
- عميق ومؤثر
- لا يتجاوز 200 حرف
- يلامس القلب
- بليغ وفصيح

قدم الناتج في شكل JSON:
{
  "reflection": "النص هنا"
}`;

    const response = await chatCompletion(systemPrompt, userPrompt, {
      temperature: 0.9,
      maxTokens: 500,
    });

    const parsed = extractJSON(response);
    
    if (parsed && parsed.reflection) {
      return { reflection: parsed.reflection };
    }

    const cleanText = response
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    return {
      reflection: cleanText || `في رمضان، نجد فرصة للتقرب إلى الله والتأمل في ${randomTopic}.`
    };
  } catch (error) {
    console.error('Generate Reflection Error:', error);
    
    return {
      reflection: "رمضان شهر الرحمة والمغفرة، فرصة لتجديد النفس والتقرب إلى الله بالعبادة والذكر."
 };
  }
}
