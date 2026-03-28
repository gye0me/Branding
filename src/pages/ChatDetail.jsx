import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";

const ChatDetail = ({ roomId, userName, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const displayUserName = userName || "소희";
  const myId = "sangsong0734";
  const productName = "공모전우승작 노션탬플릿";

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
          <span className="font-bold text-black text-lg leading-tight">{displayUserName}</span>
          <span className="text-[11px] text-[#26ba94] font-medium">거래 대화</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <div className="bg-white border border-gray-100 p-6 rounded-[30px] shadow-sm mb-6 flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-[#26ba94] rounded-full flex items-center justify-center mb-4 shadow-sm text-2xl">👜</div>
          <h4 className="font-bold text-gray-900 text-lg mb-2">바로구매로 물품을 구매했어요</h4>
          <p className="text-sm text-gray-500 leading-relaxed mb-5">
            <span className="font-semibold text-gray-800">{displayUserName}</span>님이 {myId}님의 <br/>
            <span className="font-semibold text-gray-800">[{productName}]</span>을 바로 구매하였어요!
          </p>
          <button className="w-full bg-gray-50 border border-gray-100 py-2.5 rounded-xl text-sm font-medium text-gray-700">자세히 보기</button>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "소희" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 px-4 rounded-2xl max-w-[75%] text-sm shadow-sm ${msg.sender === "소희" ? "bg-[#26ba94] text-white rounded-tr-none" : "bg-white border border-gray-100 text-black rounded-tl-none"}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t bg-white flex gap-2 pb-10">
        <input value={inputText} onChange={(e) => setInputText(e.target.value)} className="flex-1 border border-gray-300 rounded-full px-5 py-2.5 outline-none text-[15px]" placeholder="메시지를 입력하세요..." />
        <button type="submit" className="bg-[#26ba94] text-white px-6 py-2 rounded-full font-bold">전송</button>
      </form>
    </div>
  );
};

export default ChatDetail;