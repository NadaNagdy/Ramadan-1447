import { defineNextHandler } from '@genkit-ai/next';
import { ai } from '@/ai/genkit';
import '@/ai/dev'; // Make sure flows are registered

export const { GET, POST } = defineNextHandler({ ai });
