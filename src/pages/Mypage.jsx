import React, { useState, useEffect } from 'react';
import { Settings, ShoppingBag, Heart, LogOut, PlusCircle, ChevronRight, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { db, auth } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth";

const Mypage = ({ user }) => {
  const [activeTab, setActiveTab] = useState('전체');
  const [showDetailChart, setShowDetailChart] = useState(false);
  const [myPosts, setMyPosts] = useState([]);

  const monthlyData = [
    { month: '25.01', profit: 210000, count: 14 },
    { month: '25.03', profit: 350000, count: 22 },
    { month: '25.06', profit: 280000, count: 18 },
    { month: '25.09', profit: 420000, count: 30 },
    { month: '25.12', profit: 510000, count: 35 },
    { month: '26.03', profit: 450000, count: 28 },
  ];

  const handleLogout = async () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      try {
        await signOut(auth);
        console.log("로그아웃 성공");
      } catch (error) {
        console.error("에러:", error);
      }
    }
  };

  useEffect(() => {
    if (!user) return;
    const fetchMyPosts = async () => {
      try {
        const q = query(collection(db, "posts"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const filtered = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMyPosts(filtered);
      } catch (error) {
        console.error("글 불러오기 에러:", error);
      }
    };
    fetchMyPosts();
  }, [user]);

  return (
    <div className="p-6 bg-white min-h-screen pb-24 font-sans text-gray-900 flex flex-col">
      <div className="flex justify-end mb-2">
        <Settings size={20} className="text-gray-400 cursor-pointer hover:text-gray-600" />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-2xl border border-teal-50">👤</div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#008485] text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold shadow-sm whitespace-nowrap">
            전문가
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-black">{user?.email?.split('@')[0] || "김덕새"}</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#008485] h-full" style={{ width: '99.5%' }}></div>
            </div>
            <span className="text-[11px] font-bold text-[#008485]">99.5°C</span>
          </div>
        </div>
      </div>

      <div 
        className="mb-8 bg-gray-50 rounded-2xl p-5 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-all"
        onClick={() => setShowDetailChart(!showDetailChart)}
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter flex items-center gap-1">
            <BarChart3 size={12} /> 판매 수익 리포트
          </h3>
          <ChevronRight size={14} className={`text-gray-400 transition-transform ${showDetailChart ? 'rotate-90' : ''}`} />
        </div>
        <p className="text-2xl font-black text-gray-900">₩450,000</p>
        <p className="text-[10px] text-teal-600 font-bold">누적 에셋 판매 추이 보기 ↑</p>

        {showDetailChart && (
          <div className="h-48 w-full mt-4 pt-4 border-t border-gray-200">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#008485" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#008485" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="month" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="profit" stroke="#008485" fillOpacity={1} fill="url(#colorProfit)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="mb-8 flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-sm text-black">내 템플릿 관리</h2>
          <PlusCircle size={18} className="text-[#008485] cursor-pointer" />
        </div>

        <div className="flex gap-4 border-b border-gray-100 mb-4 text-sm font-medium">
          {['전체', '판매중', '거래완료'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`pb-2 px-1 ${activeTab === tab ? 'border-b-2 border-[#008485] text-[#008485]' : 'text-gray-400'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {myPosts.length === 0 ? (
            <p className="text-gray-400 text-xs text-center py-10">등록된 템플릿이 없습니다.</p>
          ) : (
            myPosts.map(post => (
              <div key={post.id} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center gap-3 shadow-sm">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center font-bold text-orange-600 text-xs">
                  {post.title?.charAt(0) || 'P'}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-xs text-black">{post.title}</p>
                  <p className="text-[10px] text-gray-400 line-clamp-1">{post.description}</p>
                </div>
                <span className="text-[10px] bg-teal-50 text-[#008485] px-2 py-1 rounded font-bold">판매중</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="space-y-1 border-t border-gray-100 pt-4 bg-white mt-auto">
        <div className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl cursor-pointer">
          <ShoppingBag size={20} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700 text-black">구매한 에셋</span>
        </div>
        <div onClick={handleLogout} className="flex items-center gap-3 p-4 hover:bg-red-50 rounded-xl cursor-pointer text-red-500">
          <LogOut size={20} />
          <span className="text-sm font-medium">로그아웃</span>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
