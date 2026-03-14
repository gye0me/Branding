import React from 'react';
import { Home, ShoppingBag, PlusSquare, MessageCircle, User, Bell } from 'lucide-react';

const Layout = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative shadow-lg">
        
        {/* 고정 상단 헤더 */}
        <header className="p-4 flex justify-between items-center bg-white border-b border-gray-50 sticky top-0 z-10">
          <div className="flex items-center gap-1">
            <span className="text-red-700 text-2xl font-bold italic">B:</span>
            <span className="text-sm font-semibold text-gray-800">캠퍼스 자산 마켓 [ 대학교 ]</span>
          </div>
          <Bell size={20} className="text-gray-600 cursor-pointer" />
        </header>

        {/* 페이지 내용 (Home, Market 등이 들어가는 자리) */}
        <div className="flex-1 overflow-y-auto pb-20">
          {children}
        </div>

        {/* 고정 하단 탭 바 */}
        <nav className="absolute bottom-0 w-full bg-white border-t border-gray-100 flex justify-around py-3 z-50">
          <NavItem icon={<Home size={22} />} label="홈" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<ShoppingBag size={22} />} label="마켓" active={activeTab === 'market'} onClick={() => setActiveTab('market')} />
          <NavItem icon={<PlusSquare size={22} />} label="글쓰기" active={activeTab === 'write'} onClick={() => setActiveTab('write')} />
          <NavItem icon={<MessageCircle size={22} />} label="채팅" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
          <NavItem icon={<User size={22} />} label="내 정보" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </nav>
      </div>
    </div>
  );
};

// 탭 버튼 아이템 컴포넌트
const NavItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 ${active ? 'text-teal-600' : 'text-gray-400'}`}>
    {icon}
    <span className="text-[10px] font-bold">{label}</span>
  </button>
);

export default Layout;