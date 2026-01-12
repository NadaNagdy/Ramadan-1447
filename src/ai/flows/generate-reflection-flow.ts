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

const prompt = ai.definePrompt({
  name: 'generateReflectionPrompt',
  output: { schema: GenerateReflectionOutputSchema },
  prompt: `You are a wise and eloquent spiritual guide.
Your task is to generate a single, short (about 2-3 sentences), and inspiring spiritual reflection about Ramadan in Arabic.
The reflection should be heartfelt, uplifting, and encourage contemplation.
Do not add any preamble or explanation, just provide the final reflection.
`,
  model: googleAI.model('gemini-1.5-flash-latest'),
  config: {
    temperature: 0.9,
  },
});

const generateReflectionFlow = ai.defineFlow(
  {
    name: 'generateReflectionFlow',
    outputSchema: GenerateReflectionOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    return output!;
  }
);
