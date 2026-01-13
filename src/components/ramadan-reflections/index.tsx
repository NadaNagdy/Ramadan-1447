import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

const reflections = [
    {
        title: "نية الصيام",
        text: "جدد نيتك كل ليلة، فالنية هي أساس العمل. استشعر أن صيامك ليس فقط امتناعًا عن الطعام والشراب، بل هو قربة إلى الله وتهذيب للنفس."
    },
    {
        title: "فضل قراءة القرآن",
        text: "رمضان هو شهر القرآن، فاجعل لك وردًا يوميًا لا تتنازل عنه. كل حرف بحسنة، والحسنة بعشر أمثالها. تدبر الآيات واجعلها نورًا لقلبك."
    },
    {
        title: "ليلة القدر",
        text: "تحرّ ليلة القدر في العشر الأواخر، فهي خير من ألف شهر. أكثر من الدعاء فيها، خاصة دعاء \"اللهم إنك عفو تحب العفو فاعف عني\""
    },
    {
        title: "صدقة رمضان",
        text: "تصدق في رمضان، فإن أجر الصدقة فيه مضاعف. تفقد المحتاجين من حولك، وساهم في إفطار صائم، فلك مثل أجره."
    }
];

export default function RamadanReflections() {
    return (
        <section className="py-12 bg-gray-100/50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-amiri text-center font-bold text-gray-800 mb-8">تأملات رمضانية</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reflections.map((reflection, index) => (
                        <Card key={index} className="bg-white hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
                            <CardHeader className="bg-green-50">
                                <CardTitle className="flex items-center gap-3 text-green-800 font-cairo">
                                    <Star className="w-5 h-5 text-yellow-500" />
                                    {reflection.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-gray-600 leading-relaxed font-amiri">{reflection.text}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}