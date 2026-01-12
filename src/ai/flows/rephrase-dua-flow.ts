'use server';
/**
 * @fileOverview A flow to rephrase a user's intention into an eloquent Arabic Dua.
 *
 * - rephraseDua - A function that handles the rephrasing process.
 * - RephraseDuaInput - The input type for the rephraseDua function.
 * - RephraseDuaOutput - The return type for the rephraseDua function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/google-genai';

const RephraseDuaInputSchema = z.object({
  intention: z.string().describe("The user's intention or what they want to pray for. This will be in Arabic."),
});
export type RephraseDuaInput = z.infer<typeof RephraseDuaInputSchema>;

const RephraseDuaOutputSchema = z.object({
  duaText: z.string().describe('The final, eloquent, and beautiful Arabic Dua, crafted in the style of traditional "ad\'iyah ma\'thurah".'),
  simplifiedMeaning: z.string().describe('A simple, one-sentence explanation of what the Dua means in Arabic.'),
  spiritualTouch: z.string().describe("A short, uplifting spiritual reminder or reflection related to the Dua, in Arabic."),
});
export type RephraseDuaOutput = z.infer<typeof RephraseDuaOutputSchema>;

export async function rephraseDua(input: RephraseDuaInput): Promise<RephraseDuaOutput> {
  return rephraseDuaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rephraseDuaPrompt',
  input: { schema: RephraseDuaInputSchema },
  output: { schema: RephraseDuaOutputSchema },
  prompt: `You are an expert in Islamic supplications (Dua) and a master of the Arabic language.
Your task is to take a user's intention, written in everyday Arabic, and transform it into a beautiful, eloquent, and religiously appropriate Dua in the style of "ad'iyah ma'thurah".
You must also provide a simple explanation of its meaning and a brief, uplifting spiritual reflection related to it.
Output MUST be valid JSON.

User's Intention: {{{intention}}}
`,
  model: googleAI.model('gemini-1.5-flash-latest'),
  config: {
    temperature: 0.8,
  },
  output: {
    format: 'json',
    schema: RephraseDuaOutputSchema,
  },
});

const rephraseDuaFlow = ai.defineFlow(
  {
    name: 'rephraseDuaFlow',
    inputSchema: RephraseDuaInputSchema,
    outputSchema: RephraseDuaOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
