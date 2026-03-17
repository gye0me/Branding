import React, { useState, useEffect } from 'react';
import { Search, User, MessageCircle } from 'lucide-react';

const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  // 자동 슬라이드 광고 데이터
  const banners = [
    { id: 1, title: "치트키로 시작하기!", sub: "공모전 준비를 위한", color: "bg-[#49B49F]", icon: "🎓" },
    { id: 2, title: "이번 주 인기 템플릿", sub: "다운로드 TOP 5 확인하기", color: "bg-[#F4A261]", icon: "🔥" },
    { id: 3, title: "과제 제출 1시간 전?", sub: "빠르게 끝내는 요약 가이드", color: "bg-[#4A90E2]", icon: "⏰" },
  ];

  // 3초마다 배너 변경 로직
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="animate-fadeIn pb-10">
      {/* 1. 검색창 (홈 화면 상단 전용) */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="검색: 템플릿, 가이드 . . ." 
            className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-teal-500 outline-none"
          />
        </div>
      </div>

      {/* 2. 자동 슬라이드 상단 배너 */}
      <div className="px-4 mb-6">
        <div className="relative h-32 overflow-hidden rounded-2xl shadow-sm">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 w-full h-full p-6 text-white flex justify-between items-center transition-all duration-700 ease-in-out ${
                index === currentBanner ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              } ${banner.color}`}
            >
              <div>
                <h2 className="text-xl font-bold mb-1">{banner.title}</h2>
                <p className="text-sm opacity-90">{banner.sub}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full text-2xl shadow-inner">
                {banner.icon}
              </div>
            </div>
          ))}
          
          {/* 하단 도트(인디케이터) */}
          <div className="absolute bottom-3 left-6 flex gap-1.5">
            {banners.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all ${
                  i === currentBanner ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                }`} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. 지금 인기 섹션 */}
      <section className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800">지금 인기 ( 우리 학교 )</h3>
          <button className="text-xs text-gray-400 hover:text-gray-600">See all &gt;</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          <ProductCard title="공모전 수상 노션 템플릿" price="12,000" user="user123" temp="98°C" />
          <ProductCard title="기획서 당선 피치덱" price="15,000" user="creative_cat" temp="96°C" />
          <ProductCard title="중간고사 요약본" price="3,000" user="exam_king" temp="94°C" />
        </div>
      </section>

      {/* 4. 최신 로그 섹션 */}
      <section className="px-4">
        <h3 className="font-bold text-gray-800 mb-3">최신 로그</h3>
        <div className="border border-gray-200 rounded-2xl p-4 shadow-sm bg-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={20} className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-bold">My Branding Log</p>
              <p className="text-xs text-gray-400">Updated my UX design template!</p>
            </div>
          </div>
          <div className="bg-orange-400 h-32 rounded-xl mb-3 w-full opacity-80 flex items-center justify-center">
             <span className="text-white font-bold opacity-50 italic">Preview Image</span>
          </div>
          <div className="flex gap-4 text-gray-500">
            <button className="flex items-center gap-1 text-xs hover:text-red-500 transition">
              <span className="text-lg">♡</span> 12
            </button>
            <button className="flex items-center gap-1 text-xs hover:text-teal-600 transition">
              <MessageCircle size={16} /> 5
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- 보조 컴포넌트 ---
const ProductCard = ({ title, price, user, temp }) => (
  <div className="min-w-[160px] bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:border-teal-200 transition cursor-pointer active:scale-95">
    <div className="bg-orange-300 h-28 w-full flex items-center justify-center">
      <div className="bg-white p-2 rounded shadow-sm">
        <span className="font-bold text-blue-600">N</span>
      </div>
    </div>
    <div className="p-3">
      <p className="text-xs font-bold mb-1 truncate">{title}</p>
      <p className="text-[10px] text-gray-400 mb-1">{user}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm font-black">₩{price}</span>
        <span className="text-[10px] text-teal-600 font-bold">{temp}</span>
      </div>
    </div>
  </div>
);

export default Home;