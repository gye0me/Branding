import React from 'react';

const Chat = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">채팅 목록</h2>
      <div className="divide-y">
        {[1, 2].map((i) => (
          <div key={i} className="py-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
            <div className="flex-1">
              <p className="font-bold text-sm">구매 희망자 {i}</p>
              <p className="text-xs text-gray-500">이거 혹시 네고 가능한가요?</p>
            </div>
            <span className="text-[10px] text-gray-400">오후 2:30</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;