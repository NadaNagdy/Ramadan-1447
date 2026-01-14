import { NextRequest, NextResponse } from 'next/server';
import { chatCompletion, extractJSON } from '@/ai/server-utils';

export async function POST(request: NextRequest) {
  try {
    const { intention } = await request.json();
    
    if (!intention?.trim()) {
      return NextResponse.json(
        { error: 'Intention is required' },
        { status: 400 }
      );
    }

    const systemPrompt =
      "أنت خبير في صياغة الأدعية الإسلامية. مهمتك إعادة صياغة الأدعية بشكل أفضل وأكثر بلاغة.";
    
    const userPrompt = `أعد صياغة هذا الدعاء بشكل أفضل وأكثر بلاغة:
"${intention}"
قدم النتيجة في شكل JSON بهذا الشكل بالضبط:
{
  "duaText": "النص المحسن للدعاء",
  "simplifiedMeaning": "المعنى المبسط",
  "spiritualTouch": "اللمسة الروحانية والفوائد"
}`;

    const response = await chatCompletion(systemPrompt, userPrompt, {
      temperature: 0.7,
    });

    const parsed = extractJSON(response);
    
    if (parsed?.duaText) {
      return NextResponse.json({
        duaText: parsed.duaText,
        simplifiedMeaning: parsed.simplifiedMeaning ?? "دعاء محسّن",
        spiritualTouch: parsed.spiritualTouch ?? "جزاك الله خيراً",
      });
    }

    return NextResponse.json({
      duaText: response,
      simplifiedMeaning: "دعاء محسّن بفضل الذكاء الاصطناعي",
      spiritualTouch: "جزاك الله خيراً",
    });
  } catch (error) {
    console.error('Error in rephrase-dua API:', error);
    return NextResponse.json(
      { error: 'Failed to generate dua' },
      { status: 500 }
    );
  }
}
