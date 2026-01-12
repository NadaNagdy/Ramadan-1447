import {genkit, GenerationCommonConfig} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {z} from 'zod';

// Define a sample schema for mock data
const RephraseDuaOutputSchema = z.object({
  duaText: z.string(),
  simplifiedMeaning: z.string(),
  spiritualTouch: z.string(),
});

const GenerateCategoryDuasOutputSchema = z.object({
  duas: z.array(z.string()),
});

const GenerateReflectionOutputSchema = z.object({
  reflection: z.string(),
});

const TextToSpeechOutputSchema = z.object({
  audioDataUri: z.string(),
});


export const ai = genkit({
  plugins: [
    googleAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY }),
  ],
});
