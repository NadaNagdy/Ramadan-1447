import { NextRequest, NextResponse } from 'next/server';
import { chatCompletion, extractJSON } from '@/ai/server-utils';

export async function POST(request: NextRequest) {
  try {
    const { duaText, simplifiedMeaning, spiritualTouch, userConsent } = await request.json();
    
    if (!userConsent) {
      return NextResponse.json(
        { error: 'User consent required for public sharing' },
        { status: 400 }
      );
    }

    if (!duaText?.trim()) {
      return NextResponse.json(
        { error: 'Dua text is required' },
        { status: 400 }
      );
    }

    // Step 1: Validate dua is islamically appropriate
    const validationPrompt = `أنت خبير شرعي متخصص في مراجعة الأدعية.
قم بفحص هذا الدعاء وتحديد ما إذا كان:
1. صحيح شرعياً
2. لا يحتوي على شرك أو بدع
3. لا يدعو بالأذى على الأبرياء
4. لا يخالف تعاليم الإسلام

الدعاء المراد فحصه:
"${duaText}"

أجب بـ JSON فقط بهذا الشكل:
{
  "isAllowed": true أو false,
  "reason": "السبب في حال الرفض",
  "category": "دعاء للتوفيق / دعاء للشفاء / دعاء للرزق / إلخ"
}`;

    const validationResponse = await chatCompletion(
      'أنت مراجع شرعي للأدعية الإسلامية.',
      validationPrompt,
      { temperature: 0.3 }
    );

    const validation = extractJSON(validationResponse);

    if (!validation?.isAllowed) {
      return NextResponse.json({
        success: false,
        message: validation?.reason || 'هذا الدعاء لا يمكن نشره للأسف',
        isAllowed: false
      });
    }

    // Step 2: Store in pending status for admin review
    const duaId = `dua_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const publicDua = {
      id: duaId,
      duaText,
      simplifiedMeaning: simplifiedMeaning || '',
      spiritualTouch: spiritualTouch || '',
      category: validation.category || 'عام',
      status: 'pending', // pending, approved, rejected
      createdAt: new Date().toISOString(),
      upvotes: 0,
      reports: 0
    };

    // Store using storage API (shared)
    await fetch('https://api.anthropic.com/storage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: `pending-duas:${duaId}`,
        value: JSON.stringify(publicDua),
        shared: true
      })
    });

    return NextResponse.json({
      success: true,
      message: 'تم إرسال الدعاء للمراجعة. سيظهر بعد الموافقة عليه إن شاء الله.',
      duaId,
      isAllowed: true
    });

  } catch (error: any) {
    console.error('Error submitting public dua:', error);
    return NextResponse.json(
      { error: 'فشل في إرسال الدعاء. حاول مرة أخرى.' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
