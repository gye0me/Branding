import React, { useEffect, useState } from 'react';
import { Settings, ShoppingBag, Heart, LogOut } from 'lucide-react';
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const MyPage = ({ user }) => {
  const [myPosts, setMyPosts] = useState([]);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("로그아웃 성공");
    } catch (error) {
      console.log("에러:", error);
    }
  };

  // 내 글 가져오기
  useEffect(() => {
    if (!user) return;

    const fetchMyPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));

      const allPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // 내 글만 필터링
      const filtered = allPosts.filter(post => post.userId === user.uid);

      setMyPosts(filtered);
    };

    fetchMyPosts();
  }, [user]);

  return (
    <div className="p-6">
      {/* 프로필 */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-2xl">👤</div>
        <div>
          <h2 className="text-lg font-bold text-black">{user?.email}</h2>
          <p className="text-sm text-gray-500 text-black">덕성여자대학교 | 98°C</p>
        </div>
      </div>

      {/* 메뉴 */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl cursor-pointer text-black">
          <ShoppingBag size={20} /> <span>판매 내역</span>
        </div>
        <div className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl cursor-pointer text-black">
          <Heart size={20} /> <span>관심 목록</span>
        </div>
        <div 
          onClick={handleLogout}
          className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl cursor-pointer text-red-500"
        >
          <LogOut size={20} /> <span>로그아웃</span>
        </div>
      </div>

      {/* 내 템플릿 */}
      <div>
        <h3 className="font-bold mb-3 text-black">내 템플릿</h3>

        {myPosts.length === 0 ? (
          <p className="text-gray-400 text-sm">작성한 글이 없습니다</p>
        ) : (
          <div className="space-y-3">
            {myPosts.map(post => (
              <div key={post.id} className="p-4 border rounded-xl">
                <p className="font-bold">{post.title}</p>
                <p className="text-sm text-gray-500">{post.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;