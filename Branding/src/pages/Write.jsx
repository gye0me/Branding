import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Write = ({ user }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [fileType, setFileType] = useState("notion"); // notion, ppt, hwp
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      alert("로그인이 필요합니다");
      return;
    }

    if (!title.trim() || !desc.trim()) {
      alert("제목과 설명을 입력하세요");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    try {
      console.log("📝 게시글 저장 중...");
      // Firestore에 게시글 저장 (파일 없이)
      const postsCollection = collection(db, 'posts');
      const docRef = await addDoc(postsCollection, {
        title: title,
        description: desc,
        fileType: fileType,
        fileUrl: null, // 파일 없음
        fileName: null, // 파일 없음
        userId: user.uid,
        authorName: user.displayName || user.email || '익명', // 작성자 이름 추가
        createdAt: serverTimestamp(),
      });
      console.log("✅ 게시글 저장 완료! ID:", docRef.id);

      setErrorMsg("✅ 게시글이 등록되었습니다!");
      alert("게시글이 등록되었습니다!");
      setTitle("");
      setDesc("");
      setFileType("notion");
      
      setTimeout(() => {
        setErrorMsg("");
      }, 2000);
    } catch (error) {
      console.error("❌ 에러 발생:", error);
      console.error("에러 코드:", error.code);
      console.error("에러 메시지:", error.message);
      setErrorMsg(`❌ ${error.code}: ${error.message}`);
      alert("등록 실패: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">게시글 작성</h2>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm">
          {errorMsg}
        </div>
      )}

      <div className="space-y-4">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="w-full p-3 bg-gray-50 rounded-lg outline-none text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="내용을 입력하세요"
          className="w-full p-3 bg-gray-50 rounded-lg h-40 outline-none text-black"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        {/* 파일 분류 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">파일 분류 (나중에 파일 업로드 시 사용)</label>
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="w-full p-3 bg-gray-50 rounded-lg outline-none text-black"
          >
            <option value="notion">노션 (N)</option>
            <option value="ppt">PPT (P)</option>
            <option value="hwp">HWP (H)</option>
          </select>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            id="confirmCreation"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <label htmlFor="confirmCreation" className="text-sm text-gray-600 cursor-pointer">
            본인 창작물임을 확인합니다
          </label>
        </div>

        <button
          className="w-full py-4 bg-[#49B49F] text-white rounded-xl font-bold disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading || !isConfirmed}
        >
          {loading ? "등록 중..." : !isConfirmed ? "창작물 확인 후 등록 가능" : "등록하기"}
        </button>
      </div>
    </div>
  );
};

export default Write;