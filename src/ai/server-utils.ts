// Helper utilities for AI operations (no 'use server' needed)
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Helper function for chat completion
export async function chatCompletion(
  systemPrompt: string,
  userPrompt: string,
  options?: {
    temperature?: number;
    maxTokens?: number;
    model?: string;
  }
) {
  const model = genAI.getGenerativeModel({ 
    model: options?.model || "gemini-1.5-flash",
    generationConfig: {
      temperature: options?.temperature || 0.7,
      maxOutputTokens: options?.maxTokens || 1024,
    },
  });

  const prompt = `${systemPrompt}\n\n${userPrompt}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  
  return response.text();
}

// Helper function to extract JSON from response
export function extractJSON(text: string): any | null {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error('Failed to parse JSON:', error);
  }
  return null;
}
