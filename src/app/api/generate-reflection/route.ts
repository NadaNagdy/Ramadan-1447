import { NextResponse } from 'next/server';
import { chatCompletion } from '@/ai/server-utils';

export async function GET() {
  try {
    const systemPrompt = "أنت خبير في التأملات الإسلامية الروحانية. اكتب تأملات عميقة ومؤثرة عن رمضان.";
    
    const userPrompt = `اكتب تأملاً روحانياً جديداً وعميقاً عن شهر رمضان المبارك.
    
التأمل يجب أن يكون:
- من جملة إلى جملتين فقط
- مؤثر وعميق
- يلامس القلب
- باللغة العربية الفصحى
- مختلف في كل مرة

أمثلة على الأسلوب:
"رمضان فرصة لتجديد القلب وتطهير النفس، فلنجعل كل لحظة فيه خطوة نحو الله."
"في رمضان، دعواتك مستجابة وأبواب الجنة مفتوحة، فلا تضيع هذه اللحظات الثمينة."

اكتب تأملاً جديداً الآن:`;

    const reflection = await chatCompletion(systemPrompt, userPrompt, {
      temperature: 0.9, // عالية للحصول على تنوع أكبر
      maxTokens: 200,
    });

    return NextResponse.json({ reflection: reflection.trim() });
  } catch (error) {
    console.error('Error generating reflection:', error);
    
    // في حالة الخطأ، نرجع تأمل افتراضي
    return NextResponse.json({ 
      reflection: 'رمضان شهر الرحمة والمغفرة، فلنستغل كل لحظة فيه للتقرب من الله.' 
    });
  }
}

// إضافة revalidate للتأكد من أن الـ API يعمل في كل مرة
export const dynamic = 'force-dynamic';
export const revalidate = 0;
