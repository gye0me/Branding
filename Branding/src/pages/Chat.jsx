import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const Chat = ({ onChatClick }) => { // 💡 { onChatClick } 중괄호 꼭 확인!
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "chatRooms"), orderBy("time", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rooms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChatRooms(rooms);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 bg-gray-50 min-h-screen pb-20">
      <h2 className="text-xl font-bold mb-4">채팅</h2>
      <div className="space-y-3">
        {chatRooms.length === 0 && <p className="text-center text-gray-400 mt-10">내역이 없어요.</p>}
        
        {chatRooms.map((chat) => (
          <div 
            key={chat.id} 
            onClick={() => onChatClick(chat.id)} // 💡 여기서 클릭 시 App.jsx로 ID를 보냄!
            className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 active:bg-gray-100 cursor-pointer"
          >
            <div className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {chat.userName ? chat.userName[0] : 'U'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm text-gray-900">{chat.userName}</p>
                <span className="text-[10px] text-teal-600 font-medium">{chat.major}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{chat.lastMsg}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;