import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";

const ChatQuestion = ({ roomId, onBack, userName }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const defaultMessages = [
    { id: 'q1', sender: userName, text: "소희님 안녕하세요! 보내주신 템플릿 복제해서 사용 중인데, 궁금한 게 생겨서 연락드려요. 😊" },
    { id: 'a1', sender: '소희', text: "아 네, 미고님! 잘 사용하고 계신가요? 어떤 부분이 궁금하신가요?" },
    { id: 'q2', sender: userName, text: "그 '위클리 대시보드' 섹션에서 DB 연동되는 컨셉이 제가 생각한 거랑 좀 달라서요." },
    { id: 'a2', sender: '소희', text: "아! 그 부분은 위클리 페이지 하단의 'Relation' 속성을 이용한 거예요." },
    { id: 'q3', sender: userName, text: "아하, 자동으로 연결되는 구조였군요! 컨셉이 똑똑하네요. 감사합니다!" },
    { id: 'a3', sender: '소희', text: "네! 열공하세요! 🔥" }
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
          <span className="font-bold text-black text-lg leading-tight">{userName || "미고"}</span>
          <span className="text-[11px] text-[#26ba94] font-medium">문의 대화</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {defaultMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "소희" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 px-4 rounded-2xl max-w-[80%] text-[15px] shadow-sm ${msg.sender === "소희" ? "bg-[#26ba94] text-white rounded-tr-none" : "bg-white border border-gray-200 text-black rounded-tl-none"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "소희" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 px-4 rounded-2xl max-w-[80%] text-[15px] shadow-sm ${msg.sender === "소희" ? "bg-[#26ba94] text-white rounded-tr-none" : "bg-white border border-gray-200 text-black rounded-tl-none"}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t bg-white flex gap-2 pb-10">
        <input value={inputText} onChange={(e) => setInputText(e.target.value)} className="flex-1 border border-gray-300 rounded-full px-5 py-2 outline-none text-[15px]" placeholder="답변을 입력하세요..." />
        <button type="submit" className="bg-[#26ba94] text-white px-5 py-2 rounded-full font-bold">전송</button>
      </form>
    </div>
  );
};

export default ChatQuestion;