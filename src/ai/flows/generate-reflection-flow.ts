'use server';
/**
 * @fileOverview A flow to generate a short, inspiring Ramadan reflection.
 *
 * - generateReflection - Generates a new reflection.
 * - GenerateReflectionOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/google-genai';

const GenerateReflectionOutputSchema = z.object({
  reflection: z.string().describe('A short, eloquent, and inspiring spiritual reflection about Ramadan in Arabic.'),
});
export type GenerateReflectionOutput = z.infer<typeof GenerateReflectionOutputSchema>;

export async function generateReflection(): Promise<GenerateReflectionOutput> {
  return generateReflectionFlow();
}

const generateReflectionFlow = ai.defineFlow(
  {
    name: 'generateReflectionFlow',
    outputSchema: GenerateReflectionOutputSchema,
  },
  async () => {
    const randomTopics = ["الصبر", "الامتنان", "التقوى", "الرحمة", "التسامح", "الإخلاص", "بر الوالدين", "قيام الليل"];
    const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];

    const prompt = ai.definePrompt({
      name: 'generateReflectionPrompt',
      output: { schema: GenerateReflectionOutputSchema },
      prompt: `أعطني تأملاً روحانياً قصيراً وملهماً عن ${randomTopic} في شهر رمضان المبارك باللغة العربية. اجعل النص عميقاً ومؤثراً ولا يتجاوز ٢٠٠ حرف.`,
      model: googleAI.model('gemini-1.5-flash-latest'),
      config: {
        temperature: 0.9,
      },
    });

    const { output } = await prompt();
    return output!;
  }
);
