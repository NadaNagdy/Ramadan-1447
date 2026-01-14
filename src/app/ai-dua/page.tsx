const handleGenerate = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!intention.trim()) {
    toast({
      variant: "destructive",
      title: "خطأ",
      description: "الرجاء كتابة نيتك أولاً.",
    });
    return;
  }
  
  setIsGenerating(true);
  setGeneratedDua(null);
  
  try {
    const response = await fetch('/api/rephrase-dua', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ intention }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate dua');
    }

    const result = await response.json();
    setGeneratedDua(result);
  } catch (error) {
    console.error(error);
    toast({
      variant: "destructive",
      title: "حدث خطأ",
      description: "لم نتمكن من إنشاء الدعاء، يرجى التأكد من إعدادات مفتاح API والمحاولة مرة أخرى.",
    });
  } finally {
    setIsGenerating(false);
  }
};
