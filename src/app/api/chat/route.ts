import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [] } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 1024,
      },
    });

    // Build conversation history
    const systemPrompt = `أنت مساعد روحاني متخصص في الأدعية الإسلامية وشهر رمضان المبارك. 
ساعد المستخدمين في:
- اختيار الأدعية المناسبة لحالاتهم
- شرح معاني الأدعية
- تقديم نصائح روحانية
- الإجابة عن أسئلة حول رمضان والعبادات

كن لطيفاً ومحترماً واستخدم اللغة العربية الفصحى.`;

    let conversationText = systemPrompt + '\n\n';
    
    history.forEach((msg: any) => {
      conversationText += `${msg.role === 'user' ? 'المستخدم' : 'المساعد'}: ${msg.content}\n`;
    });
    
    conversationText += `المستخدم: ${message}\nالمساعد:`;

    const result = await model.generateContent(conversationText);
    const response = await result.response;
    
    return NextResponse.json({ reply: response.text() });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
