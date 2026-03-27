import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";

const ChatDetail = ({ roomId, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

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
    } catch (err) { 
      console.error(err); 
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="p-4 border-b flex items-center gap-4 bg-white sticky top-0">
        <button onClick={onBack} className="text-2xl text-black">←</button>
        <span className="font-bold text-black">대화창</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "소희" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 px-4 rounded-2xl max-w-[75%] text-sm shadow-sm ${
              msg.sender === "소희" 
                ? "bg-teal-500 text-white" 
                : "bg-white border border-gray-200 text-black"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t bg-white flex gap-2 pb-10">
        <input 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 border border-gray-300 rounded-full px-5 py-2.5 outline-none bg-white text-black placeholder-gray-400"
          placeholder="메시지를 입력하세요..."
        />
        <button type="submit" className="bg-teal-500 text-white px-5 py-2 rounded-full font-bold">전송</button>
      </form>
    </div>
  );
};

export default ChatDetail;