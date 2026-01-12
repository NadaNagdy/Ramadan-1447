'use server';
/**
 * @fileOverview A flow to generate a new Dua for a specific category.
 *
 * - generateCategoryDua - Generates a new Dua.
 * - GenerateCategoryDuaInput - The input type for the function.
 * - GenerateCategoryDuaOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/google-genai';

const GenerateCategoryDuaInputSchema = z.object({
  categoryName: z.string().describe('The name of the category to generate a Dua for, in Arabic (e.g., "الرزق").'),
});
export type GenerateCategoryDuaInput = z.infer<typeof GenerateCategoryDuaInputSchema>;

const GenerateCategoryDuaOutputSchema = z.object({
  dua: z.string().describe('The newly generated, short, and eloquent Arabic Dua for the given category.'),
});
export type GenerateCategoryDuaOutput = z.infer<typeof GenerateCategoryDuaOutputSchema>;

export async function generateCategoryDua(input: GenerateCategoryDuaInput): Promise<GenerateCategoryDuaOutput> {
  return generateCategoryDuaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCategoryDuaPrompt',
  input: { schema: GenerateCategoryDuaInputSchema },
  output: { schema: GenerateCategoryDuaOutputSchema },
  prompt: `You are an expert in Islamic supplications (Dua).
Your task is to generate a single, new, short, and eloquent Dua in Arabic for the following category: {{{categoryName}}}.
The Dua should be original and not from a well-known list. It should be concise and heartfelt.
Do not add any preamble or explanation, just provide the final Dua.

Category: {{{categoryName}}}
`,
  model: googleAI.model('gemini-1.5-flash-latest'),
  config: {
    temperature: 0.9,
  },
});

const generateCategoryDuaFlow = ai.defineFlow(
  {
    name: 'generateCategoryDuaFlow',
    inputSchema: GenerateCategoryDuaInputSchema,
    outputSchema: GenerateCategoryDuaOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
