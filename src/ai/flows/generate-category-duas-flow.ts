'use server';
/**
 * @fileOverview A flow to generate a new Dua for a specific category.
 *
 * - generateCategoryDuas - Generates a new Dua.
 * - GenerateCategoryDuasInput - The input type for the function.
 * - GenerateCategoryDuasOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/google-genai';

const GenerateCategoryDuasInputSchema = z.object({
  categoryName: z.string().describe('The name of the category to generate Duas for, in Arabic (e.g., "الرزق").'),
});
export type GenerateCategoryDuasInput = z.infer<typeof GenerateCategoryDuasInputSchema>;

const GenerateCategoryDuasOutputSchema = z.object({
  duas: z.array(z.string()).describe('An array of 3 newly generated, short, and eloquent Arabic Duas for the given category.'),
});
export type GenerateCategoryDuasOutput = z.infer<typeof GenerateCategoryDuasOutputSchema>;

export async function generateCategoryDuas(input: GenerateCategoryDuasInput): Promise<GenerateCategoryDuasOutput> {
  return generateCategoryDuasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCategoryDuasPrompt',
  input: { schema: GenerateCategoryDuasInputSchema },
  output: { schema: GenerateCategoryDuasOutputSchema },
  prompt: `You are an expert in Islamic supplications (Dua).
Your task is to generate 3 unique, new, short, and eloquent Duas in Arabic for the following category: {{{categoryName}}}.
The Duas should be original and not from a well-known list. They should be concise and heartfelt.
Return only an array of strings in JSON format.

Category: {{{categoryName}}}
`,
  model: googleAI.model('gemini-1.5-flash-latest'),
  config: {
    temperature: 0.9,
  },
   output: {
    format: 'json',
    schema: GenerateCategoryDuasOutputSchema,
  },
});

const generateCategoryDuasFlow = ai.defineFlow(
  {
    name: 'generateCategoryDuasFlow',
    inputSchema: GenerateCategoryDuasInputSchema,
    outputSchema: GenerateCategoryDuasOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
