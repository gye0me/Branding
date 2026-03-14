import React from 'react';
import { Settings, ShoppingBag, Heart, LogOut } from 'lucide-react';

const MyPage = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-2xl">👤</div>
        <div>
          <h2 className="text-lg font-bold">Heegu Kim</h2>
          <p className="text-sm text-gray-500">덕성여자대학교 | 98°C</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl cursor-pointer">
          <ShoppingBag size={20} /> <span>판매 내역</span>
        </div>
        <div className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl cursor-pointer">
          <Heart size={20} /> <span>관심 목록</span>
        </div>
        <div className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl cursor-pointer text-red-500">
          <LogOut size={20} /> <span>로그아웃</span>
        </div>
      </div>
    </div>
  );
};

export default MyPage;