import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const Chat = ({ onChatClick }) => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "chatRooms"), orderBy("time", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rooms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setChatRooms(rooms);
    }, (error) => console.error("채팅방 로딩 실패:", error));
    return () => unsubscribe();
  }, []);

  const detailRooms = chatRooms.length > 0 ? chatRooms : [
    { id: "room1", userName: "소희", major: "거래 대화", lastMsg: "대화를 시작해보세요." },
    { id: "room2", userName: "미고", major: "문의 대화", lastMsg: "문의 대화를 확인하세요." }
  ];

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-200">채팅</h2>
      <div className="space-y-4">
        {detailRooms.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatClick(chat.id, chat.userName, chat.userName === "미고" ? "question" : "detail")}
            className="bg-white p-5 rounded-[30px] shadow-sm border border-gray-100 flex items-center gap-5 active:bg-gray-50 cursor-pointer"
          >
            <div className="w-16 h-16 bg-[#26ba94] rounded-full flex items-center justify-center text-white font-bold text-xl">
              {chat.userName ? chat.userName[0] : 'U'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold text-lg text-gray-900">{chat.userName}</p>
                <span className="text-sm text-[#26ba94] font-medium">{chat.major}</span>
              </div>
              <p className="text-sm text-gray-400">{chat.lastMsg}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;