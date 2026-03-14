import React from 'react';
import { Search, User, MessageCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="animate-fadeIn">
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

      {/* 2. 상단 배너 */}
      <div className="px-4 mb-6">
        <div className="bg-[#49B49F] rounded-2xl p-6 text-white flex justify-between items-center relative overflow-hidden shadow-sm">
          <div>
            <h2 className="text-xl font-bold mb-1">치트키로 시작하기!</h2>
            <p className="text-sm opacity-90">공모전 준비를 위한</p>
          </div>
          <div className="bg-orange-400 p-3 rounded-full shadow-inner text-2xl">🎓</div>
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
          <div className="bg-orange-400 h-32 rounded-xl mb-3 w-full opacity-80"></div>
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

// --- 내부에서만 쓰이는 보조 컴포넌트 ---
const ProductCard = ({ title, price, user, temp }) => (
  <div className="min-w-[160px] bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:border-teal-200 transition">
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