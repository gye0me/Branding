import React from 'react';
import { Settings, ShoppingBag, Heart, LogOut } from 'lucide-react';

const Mypage = () => {
  return (
    <div className="p-6 bg-white min-h-screen pb-24 font-sans">
      {/* 1. 상단 프로필 (이름: 덕새 반영) */}
      <div className="flex items-center gap-4 mb-6 pt-4">
        <div className="relative">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-2xl">👤</div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#008485] text-white text-[9px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap shadow-sm">
            전문가
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">덕새</h2>
          <p className="text-sm text-gray-500 font-medium">덕성여자대학교</p>
        </div>
      </div>

      {/* 2. 판매액 & 점수 섹션 */}
      <div className="mb-8 bg-white rounded-2xl shadow-md flex divide-x divide-gray-100 py-5 border border-gray-50">
        <div className="flex-1 text-center">
          <p className="text-[10px] text-gray-400 mb-1 font-bold">총 판매액</p>
          <p className="text-base font-extrabold text-gray-900">₩450,000</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-[10px] text-gray-400 mb-1 font-bold">전문성 점수</p>
          <p className="text-base font-extrabold text-[#008485]">99.5°C</p>
        </div>
      </div>

      {/* 3. 내 자산 섹션 */}
      <div className="mb-8 px-1">
        <h2 className="font-bold text-sm text-gray-900 mb-4">내 자산</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <div className="min-w-[130px] bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
            <div className="w-10 h-10 bg-orange-50 rounded-lg mb-2 flex items-center justify-center font-black text-gray-800 text-lg">N</div>
            <p className="font-bold text-xs text-gray-900 truncate">노션 템플릿</p>
            <p className="text-[10px] text-[#008485] font-bold">₩15,000</p>
          </div>
        </div>
      </div>

      {/* 4. 기존 메뉴 목록 (팀원 코드 유지) */}
      <div className="space-y-2 border-t border-gray-50 pt-4 px-1">
        <div className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl cursor-pointer">
          <ShoppingBag size={20} className="text-gray-500" /> 
          <span className="text-sm font-medium text-gray-700">판매 내역</span>
        </div>
        <div className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl cursor-pointer">
          <Heart size={20} className="text-gray-500" /> 
          <span className="text-sm font-medium text-gray-700">관심 목록</span>
        </div>
        <div className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl cursor-pointer text-red-500">
          <LogOut size={20} /> 
          <span className="text-sm font-medium">로그아웃</span>
        </div>
      </div>
    </div>
  );
};

export default Mypage;