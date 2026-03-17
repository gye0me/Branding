import React from 'react';

const Mypage = () => {
  return (
    <div className="bg-white min-h-screen animate-fadeIn pb-24 text-gray-900 font-sans">
      <div className="p-6">
        
        {/* 상단 제목 */}
        <h1 className="text-lg font-bold text-center mb-8">내 브랜딩</h1>

        {/* 프로필 섹션 (이미지 + 전문가 뱃지) */}
        <div className="flex flex-col items-center mb-8 relative">
          <div className="w-20 h-20 bg-orange-200 rounded-full flex items-center justify-center border-4 border-orange-100 shadow-sm overflow-hidden">
            {/* 사진의 일러스트 느낌을 위해 이모지를 썼지만, 실제 이미지가 있다면 <img> 태그를 쓰세요 */}
            <span className="text-5xl">👩‍💼</span> 
          </div>
          {/* 전문가 뱃지 */}
          <span className="absolute -bottom-2.5 bg-[#1FBA9E] text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-md z-10">
            전문가
          </span>
        </div>

        {/* 판매액 및 점수 요약 박스 */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-10 shadow-sm grid grid-cols-2 divide-x divide-gray-100">
          <div className="text-center pr-4">
            <p className="text-xs text-gray-500 mb-1.5">총 판매액 :</p>
            <p className="text-2xl font-black text-gray-900 leading-none">₩450,000</p>
          </div>
          <div className="text-center pl-4">
            <p className="text-xs text-gray-500 mb-1.5">종합 전문성 점수</p>
            <p className="text-2xl font-black text-gray-900 leading-none">99.5°C</p>
          </div>
        </div>

        {/* 내 자산 섹션 */}
        <section>
          <h2 className="text-base font-extrabold mb-4">내 자산</h2>
          
          {/* 카테고리 탭 */}
          <div className="flex gap-2 mb-6">
            <TabItem label="콘텐츠" active />
            <TabItem label="노션" />
            <TabItem label="예약" />
          </div>

          {/* 자산 리스트 (그리드) */}
          <div className="grid grid-cols-2 gap-4">
            <AssetCard 
              title="노션 템플릿" 
              user="user123" 
              price="₩12,000" 
              temp="98°C" 
              showLogo={true} 
            />
            <AssetCard 
              title="공모전 수상 노션 템플릿" 
              user="user123" 
              price="₩12,000" 
              temp="98°C" 
              showLogo={false} 
            />
             {/* 스크린샷 하단의 빈 공간 표현 */}
            <div className="col-span-2 border border-gray-100 rounded-2xl h-28 bg-gray-50/50 mt-2"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

// --- 보조 컴포넌트 (내부 사용) ---

// 1. 카테고리 탭 아이템
const TabItem = ({ label, active = false }) => (
  <button 
    className={`px-5 py-2 rounded-full text-xs font-bold transition-colors ${
      active 
        ? 'bg-[#1FBA9E] text-white shadow-sm' 
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    {label}
  </button>
);

// 2. 자산 카드
const AssetCard = ({ title, user, price, temp, showLogo = false }) => (
  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:border-[#1FBA9E]/30 transition-colors">
    {/* 이미지 영역 */}
    <div className="bg-orange-300 h-28 w-full flex items-center justify-center relative">
      {showLogo && (
        <div className="bg-white p-2.5 rounded shadow-sm border border-gray-100">
          <span className="font-bold text-blue-600">N</span>
        </div>
      )}
    </div>
    
    {/* 텍스트 영역 */}
    <div className="p-3">
      <p className="text-xs font-bold text-gray-900 mb-1 truncate">{title}</p>
      <p className="text-[10px] text-gray-400 mb-1 font-medium">{user}</p>
      <div className="flex justify-between items-center mt-1.5">
        <span className="text-sm font-black text-gray-900">{price}</span>
        <span className="text-[10px] text-[#1FBA9E] font-bold">{temp}</span>
      </div>
    </div>
  </div>
);

export default Mypage;