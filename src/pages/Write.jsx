import React, { useState } from 'react';

const Write = ({ user }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = () => {
    const newPost = {
      title: title,
      description: desc,
      userId: user.uid, 
    };

    console.log("저장될 데이터:", newPost);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">판매 노션 등록</h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="w-full p-3 bg-gray-50 rounded-lg outline-none text-black"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="자산에 대한 설명을 적어주세요"
          className="w-full p-3 bg-gray-50 rounded-lg h-40 outline-none text-black"
          onChange={(e) => setDesc(e.target.value)}
        />

        <button
          className="w-full py-4 bg-[#49B49F] text-white rounded-xl font-bold"
          onClick={handleSubmit}
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default Write;