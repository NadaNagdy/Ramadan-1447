import { NextResponse } from 'next/server';
import { chatCompletion } from '@/ai/server-utils';

export async function GET() {
  try {
    const systemPrompt = "أنت خبير في التأملات الإسلامية الروحانية.";
    const userPrompt = "اكتب تأملاً قصيراً وعميقاً عن شهر رمضان المبارك (جملة أو جملتين فقط)";

    const reflection = await chatCompletion(systemPrompt, userPrompt, {
      temperature: 0.9,
      maxTokens: 150,
    });

    return NextResponse.json({ reflection });
  } catch (error) {
    console.error('Error generating reflection:', error);
    return NextResponse.json(
      { error: 'Failed to generate reflection' },
      { status: 500 }
    );
  }
}
