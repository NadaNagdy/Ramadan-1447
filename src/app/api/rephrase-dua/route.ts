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

    const systemPrompt = `أنت خبير في الأدعية الإسلامية وعالم شرعي متخصص في صياغة الأدعية المأثورة.

مهمتك:
1. التحقق من أن الدعاء المطلوب صحيح شرعياً وجائز
2. صياغة دعاء بليغ وصحيح لغوياً
3. الاستعانة بأدعية من القرآن والسنة عند الإمكان
4. إذا كان الطلب غير جائز أو مخالف للشرع، ترفض بأدب وتشرح السبب

قواعد مهمة:
- لا تصيغ أدعية فيها شرك أو دعاء غير الله
- لا تصيغ أدعية بالأذى على أحد إلا الظالمين
- تأكد من صحة اللغة العربية والإعراب
- استخدم ألفاظ جميلة ومناسبة
- اجعل الدعاء متوافقاً مع آداب الدعاء في الإسلام`;
    
    const userPrompt = `المطلوب: ${intention}

قم بما يلي:
1. تحقق أولاً: هل هذا الطلب جائز شرعاً؟
2. إذا كان جائزاً: صُغ دعاءً بليغاً وصحيحاً
3. إذا كان غير جائز: اشرح السبب بأدب واقترح بديلاً إن أمكن

قدم النتيجة في شكل JSON بهذا الشكل بالضبط:
{
  "isValid": true أو false,
  "duaText": "النص المحسن للدعاء (أو رسالة الرفض)",
  "simplifiedMeaning": "المعنى المبسط",
  "spiritualTouch": "اللمسة الروحانية والفوائد (أو سبب الرفض إن وُجد)"
}

ملاحظات:
- إذا كان isValid: false، ضع في duaText رسالة مهذبة توضح أن الطلب غير مناسب
- تأكد من الدقة اللغوية والشرعية
- استخدم أدعية مأثورة عند الإمكان`;

    const response = await chatCompletion(systemPrompt, userPrompt, {
      temperature: 0.7,
    });

    const parsed = extractJSON(response);
    
    if (parsed?.duaText) {
      // إذا كان الدعاء غير صحيح شرعياً
      if (parsed.isValid === false) {
        return NextResponse.json({
          duaText: parsed.duaText || "عذراً، لا يمكننا صياغة هذا الدعاء لأسباب شرعية.",
          simplifiedMeaning: parsed.simplifiedMeaning || "نرجو مراعاة آداب الدعاء الإسلامية",
          spiritualTouch: parsed.spiritualTouch || "يمكنك إعادة صياغة طلبك بما يتوافق مع الشريعة الإسلامية",
          isValid: false
        });
      }

      // إذا كان الدعاء صحيح
      return NextResponse.json({
        duaText: parsed.duaText,
        simplifiedMeaning: parsed.simplifiedMeaning ?? "دعاء محسّن بإذن الله",
        spiritualTouch: parsed.spiritualTouch ?? "جزاك الله خيراً على حرصك على الدعاء",
        isValid: true
      });
    }

    // في حالة عدم القدرة على parse الـ JSON
    return NextResponse.json({
      duaText: response,
      simplifiedMeaning: "دعاء محسّن بإذن الله",
      spiritualTouch: "تقبل الله دعاءك",
      isValid: true
    });
  } catch (error) {
    console.error('Error in rephrase-dua API:', error);
    return NextResponse.json(
      { error: 'Failed to generate dua' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
