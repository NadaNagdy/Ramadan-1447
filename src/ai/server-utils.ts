// Helper utilities for AI operations (no 'use server' needed)

import Groq from 'groq-sdk';

// Initialize Groq client only on server-side
let groqInstance: Groq | null = null;

function getGroqClient() {
  if (typeof window !== 'undefined') {
    throw new Error('Groq can only be used on the server side');
  }
  
  if (!groqInstance) {
    groqInstance = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  
  return groqInstance;
}

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
  const groq = getGroqClient();
  
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: userPrompt
      }
    ],
    model: options?.model || "llama-3.3-70b-versatile",
    temperature: options?.temperature || 0.7,
    max_tokens: options?.maxTokens || 1024,
  });

  return completion.choices[0]?.message?.content || '';
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
