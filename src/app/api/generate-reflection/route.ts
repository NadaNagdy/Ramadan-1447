import { chatCompletion, extractJSON } from '@/ai/server-utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const systemPrompt = 'You are a helpful Islamic reflection assistant.';
    const response = await chatCompletion(systemPrompt, prompt);
    
    return NextResponse.json({ 
      reflection: response 
    });

  } catch (error: any) {
    console.error('Error in generate-reflection:', error);
    return NextResponse.json(
      { error: 'Failed to generate reflection' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
