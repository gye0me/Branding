import React from 'react';

const Chat = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold mb-4">채팅</h2>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-300 rounded-full flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-gray-900">유저 clever_cat님과 채팅</p>
              <p className="text-xs text-gray-500 mb-1">[수상작 노션 템플릿]</p>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-black rounded flex items-center justify-center text-white text-[10px]">N</div>
                <p className="text-sm text-gray-700 truncate">안녕하세요! 노션 설정에 대해...</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[11px] text-gray-400">11:45</p>
              <div className="bg-teal-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center ml-auto mt-1">2</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;