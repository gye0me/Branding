import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";

const ChatQuestion = ({ roomId, onBack, userName, isSeller }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const defaultMessages = [
    { id: 'q1', sender: userName, text: `안녕하세요! 올려주신 상품에 대해 궁금한 게 있어요.` },
    { id: 'a1', sender: '소희', text: "네, 안녕하세요! 무엇을 도와드릴까요?" },
    { id: 'q2', sender: userName, text: "설명에 적힌 데이터 연동 방법이 초보자도 가능한 수준인가요?" },
    { id: 'a2', sender: '소희', text: "그럼요! 사진 가이드가 있어서 금방 따라하실 거예요. :)" }
  ];

  useEffect(() => {
    if (!roomId) return;
    const q = query(collection(db, "chatRooms", roomId, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;
    try {
      await addDoc(collection(db, "chatRooms", roomId, "messages"), {
        text: inputText,
        createdAt: serverTimestamp(),
        sender: "소희" 
      });
      setInputText("");
    } catch (err) { console.error(err); }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="p-4 border-b flex items-center gap-4 bg-white sticky top-0 z-10">
        <button onClick={onBack} className="text-2xl text-black">←</button>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1">
            <span className="font-bold text-black text-lg">{userName || "문의자"}</span>
            {isSeller && <span className="text-[12px] text-gray-500 font-medium">(판매자)</span>}
          </div>
          <span className="text-[11px] text-teal-600 font-medium">상품 문의 중</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {defaultMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "소희" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 px-4 rounded-2xl max-w-[80%] text-[15px] shadow-sm ${
              msg.sender === "소희" ? "bg-[#00bfa5] text-white rounded-tr-none" : "bg-white border border-gray-200 text-black rounded-tl-none"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "소희" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 px-4 rounded-2xl max-w-[80%] text-[15px] shadow-sm ${
              msg.sender === "소희" ? "bg-[#00bfa5] text-white rounded-tr-none" : "bg-white border border-gray-200 text-black rounded-tl-none"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t bg-white flex gap-2 pb-10">
        <input value={inputText} onChange={(e) => setInputText(e.target.value)} className="flex-1 border border-gray-300 rounded-full px-5 py-2 outline-none" placeholder="답변을 입력하세요..." />
        <button type="submit" className="bg-[#00bfa5] text-white px-5 py-2 rounded-full font-bold">전송</button>
      </form>
    </div>
  );
};

export default ChatQuestion;