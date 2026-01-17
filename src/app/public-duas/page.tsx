'use client';

import { useState, useEffect } from 'react';
import { Heart, BookOpen, Share2, Filter } from 'lucide-react';

export default function PublicDuasPage() {
  const [duas, setDuas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [likedDuas, setLikedDuas] = useState(new Set());

  const categories = [
    { id: 'all', name: 'الكل', icon: '📚' },
    { id: 'توفيق', name: 'التوفيق', icon: '✨' },
    { id: 'شفاء', name: 'الشفاء', icon: '💚' },
    { id: 'رزق', name: 'الرزق', icon: '💰' },
    { id: 'علم', name: 'العلم', icon: '📖' },
    { id: 'أهل', name: 'الأهل', icon: '👨‍👩‍👧‍👦' },
  ];

  useEffect(() => {
    fetchDuas();
  }, [selectedCategory]);

  const fetchDuas = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/get-public-duas?category=${selectedCategory}`);
      const data = await response.json();
      if (data.success) {
        setDuas(data.duas);
      }
    } catch (error) {
      console.error('Error fetching duas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (duaId) => {
    const newLiked = new Set(likedDuas);
    if (newLiked.has(duaId)) {
      newLiked.delete(duaId);
    } else {
      newLiked.add(duaId);
    }
    setLikedDuas(newLiked);
    
    // Update likes count in backend
    try {
      await fetch('/api/like-dua', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ duaId, action: newLiked.has(duaId) ? 'like' : 'unlike' })
      });
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('تم نسخ الدعاء ✅');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4">
            🤲 أدعية المسلمين
          </h1>
          <p className="text-lg text-emerald-700">
            أدعية مشاركة من إخوانك في الإسلام، مراجعة شرعياً
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-3 pb-4 min-w-max justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-lg scale-105'
                    : 'bg-white text-emerald-700 hover:bg-emerald-50 shadow'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            <p className="mt-4 text-emerald-700">جاري التحميل...</p>
          </div>
        )}

        {/* Duas Grid */}
        {!loading && duas.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <BookOpen className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
            <p className="text-xl text-emerald-700">لا توجد أدعية في هذا القسم حالياً</p>
            <p className="text-emerald-600 mt-2">كن أول من يشارك دعاءً هنا!</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {duas.map((dua) => (
            <div
              key={dua.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border-2 border-emerald-100 hover:border-emerald-300"
            >
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {dua.category}
                </span>
              </div>

              {/* Dua Text */}
              <div className="mb-4">
                <p className="text-xl font-semibold text-emerald-900 leading-relaxed text-right" dir="rtl">
                  {dua.duaText}
                </p>
              </div>

              {/* Simplified Meaning */}
              {dua.simplifiedMeaning && (
                <div className="mb-4 p-3 bg-emerald-50 rounded-lg">
                  <p className="text-sm text-emerald-700 text-right" dir="rtl">
                    💡 {dua.simplifiedMeaning}
                  </p>
                </div>
              )}

              {/* Spiritual Touch */}
              {dua.spiritualTouch && (
                <div className="mb-4 p-3 bg-teal-50 rounded-lg">
                  <p className="text-sm text-teal-700 text-right" dir="rtl">
                    ✨ {dua.spiritualTouch}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
                <button
                  onClick={() => handleLike(dua.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    likedDuas.has(dua.id)
                      ? 'bg-rose-100 text-rose-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-rose-50'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${likedDuas.has(dua.id) ? 'fill-current' : ''}`}
                  />
                  <span className="font-semibold">{dua.upvotes || 0}</span>
                </button>

                <button
                  onClick={() => copyToClipboard(dua.duaText)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="font-semibold">نسخ</span>
                </button>
              </div>

              {/* Date */}
              <div className="mt-3 text-xs text-gray-500 text-center">
                {new Date(dua.createdAt).toLocaleDateString('ar-EG')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
