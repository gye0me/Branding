import React, { useState } from 'react';
import { Search, ArrowLeft, ChevronDown, ArrowRight } from 'lucide-react';

const Market = () => {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 인기 검색어 목록 (사진 하단 태그들)
  const popularKeywords = ["공모전", "템플릿", "수상", "장학금"];

  const allProducts = [
    { id: 1, category: '노션', title: "공모전 수상 노션 템플릿", user: "user123", price: 12000, temp: "98.0°C", tag: "1등 수상", bgColor: "bg-[#F4A261]" },
    { id: 2, category: '노션', title: "시험기간용 플래너", user: "notion_king", price: 5000, temp: "95.5°C", tag: "인기", bgColor: "bg-[#1FBA9E]" },
    { id: 3, category: '추천', title: "장학금 따는 법 PDF", user: "scholar", price: 8000, temp: "99.2°C", tag: "필독", bgColor: "bg-[#E76F51]" },
    { id: 4, category: '추천', title: "PPT 템플릿 팩", user: "designer_choi", price: 15000, temp: "92.4°C", tag: "Best", bgColor: "bg-[#F4A261]", isBest: true },
  ];

  // 검색어와 카테고리에 따른 필터링 로직
  const filteredProducts = allProducts
    .filter(p => (activeCategory === '전체' || p.category === activeCategory))
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="bg-white min-h-screen pb-24 font-sans animate-fadeIn">
      
      {/* --- 상단 검색 섹션 (사진 UI 완벽 재현) --- */}
      <div className="px-4 pt-6 pb-2">
        <div className="flex items-center border border-gray-200 rounded-full px-4 py-2.5 shadow-sm mb-4">
          {/* 왼쪽 드롭다운 부분 */}
          <div className="flex items-center gap-1 pr-3 border-r border-gray-100 mr-3 cursor-pointer">
            {/* <span className="text-sm font-bold text-gray-800">중고거래</span> */}
            <ChevronDown size={14} className="text-gray-500" />
          </div>
          
          {/* 입력창 부분 */}
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색어를 입력해주세요" 
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-300"
          />
          
          {/* 오른쪽 화살표 버튼 */}
          <button className="bg-[#2D333D] p-1.5 rounded-full text-white ml-2">
            <ArrowRight size={16} />
          </button>
        </div>

        {/* 인기 검색어 횡스크롤 (사진 하단 텍스트들) */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap mb-6">
          <span className="text-xs font-bold text-gray-400">인기 검색어</span>
          {popularKeywords.map((kw) => (
            <button 
              key={kw} 
              onClick={() => setSearchQuery(kw)}
              className="text-xs font-medium text-gray-600 hover:text-[#1FBA9E]"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      {/* --- 카테고리 탭 (전체/추천 등) --- */}
      <div className="flex border-b border-gray-50 px-2 mb-4">
        {['전체', '추천', '노션', 'PDF 가이드', '디자인 자산'].map((cat) => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-3 text-sm font-bold relative ${activeCategory === cat ? 'text-[#1FBA9E]' : 'text-gray-400'}`}
          >
            {cat}
            {activeCategory === cat && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1FBA9E]" />}
          </button>
        ))}
      </div>

      {/* --- 상품 목록 리스트 --- */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <MarketCard key={product.id} {...product} />
          ))
        ) : (
          <div className="col-span-2 py-20 text-center text-gray-300">검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

// --- 마켓 카드 컴포넌트 ---
const MarketCard = ({ title, user, price, temp, tag, bgColor, isBest = false }) => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-50 relative animate-fadeIn">
    <div className={`${bgColor} h-32 w-full flex items-center justify-center relative`}>
      {isBest && <div className="absolute top-2 left-2 bg-black/70 text-white text-[8px] font-bold px-2 py-1 rounded">Best Seller</div>}
      <div className="bg-white p-2.5 rounded-xl shadow-sm"><span className="font-bold text-gray-800 text-2xl">N</span></div>
    </div>
    <div className="p-4">
      <p className="text-[11px] font-black text-gray-900 mb-0.5 truncate">{title}</p>
      <p className="text-[9px] text-gray-400 mb-2 font-bold">{user}</p>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-black text-gray-950">₩{price.toLocaleString()}</span>
        <span className="text-[10px] text-gray-400 font-bold">{temp}</span>
      </div>
      <div className="inline-block bg-[#E9D758] text-[#827717] text-[8px] font-black px-2 py-0.5 rounded">{tag}</div>
    </div>
  </div>
);

export default Market;