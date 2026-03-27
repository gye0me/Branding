import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const Chat = ({ onChatClick }) => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "chatRooms"), orderBy("time", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const rooms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setChatRooms(rooms);
      },
      (error) => {
        console.error("채팅방 목록 로딩 실패:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const detailRooms = chatRooms.length > 0
    ? chatRooms
    : [
        {
          id: "default-room",
          userName: "소희",
          major: "거래 대화",
          lastMsg: "대화를 시작해보세요."
        }
      ];

  const questionRoomId = detailRooms[0]?.id || "default-room";

  return (
    <div className="p-4 bg-gray-50 min-h-screen pb-20">
      <h2 className="text-xl font-bold mb-4">채팅</h2>
      <div className="space-y-3">
        {detailRooms.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatClick(chat.id, "detail")}
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
              <p className="text-sm text-gray-500 truncate">{chat.lastMsg || '대화를 시작해보세요.'}</p>
            </div>
          </div>
        ))}

        <div
          onClick={() => onChatClick(questionRoomId, "question")}
          className="bg-white p-4 rounded-3xl shadow-sm border border-teal-200 flex items-center gap-4 active:bg-teal-50 cursor-pointer"
        >
          <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            문
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-bold text-sm text-gray-900">문의 내역</p>
              <span className="text-[10px] text-emerald-600 font-medium">Question</span>
            </div>
            <p className="text-sm text-gray-500 truncate">문의 대화를 확인하세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;