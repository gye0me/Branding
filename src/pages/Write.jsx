import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Write = ({ user }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [fileType, setFileType] = useState("notion"); // notion, ppt, hwp
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [evidenceStatus, setEvidenceStatus] = useState("submitted");
  const [showEvidenceToast, setShowEvidenceToast] = useState(false);
  const [similarity, setSimilarity] = useState(null);
  const [isAiChecking, setIsAiChecking] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [isAiRegistered, setIsAiRegistered] = useState(false);
  const [isSimilarityPass, setIsSimilarityPass] = useState(false);
  const [price, setPrice] = useState("");

  const getRecommendedPrice = () => {
    if (fileType === 'notion') {
      return { min: 4000, max: 8000 };
    } else if (fileType === 'ppt') {
      return { min: 5000, max: 10000 };
    } else if (fileType === 'hwp') {
      return { min: 3000, max: 7000 };
    }
    return null;
  };

  const isContentSufficient = title.trim().length >= 5 && desc.trim().length >= 100;
  const recommendedPrice = getRecommendedPrice();

  const handleSubmit = async () => {
    if (!user) {
      alert("로그인이 필요합니다");
      return;
    }

    if (!title.trim() || !desc.trim()) {
      alert("제목과 설명을 입력하세요");
      return;
    }

    if (!isSimilarityPass) {
      alert("AI 유사도 검사를 통과해야 게시글을 올릴 수 있습니다");
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
        price: price ? parseInt(price) : null,
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
      setPrice("");
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

  const handleEvidenceCheck = () => {
    setEvidenceStatus("verified");
    setShowEvidenceToast(true);

    setTimeout(() => {
      setShowEvidenceToast(false);
    }, 2200);
  };

  const handleAiCheck = () => {
    if (isAiChecking) return;

    setIsAiChecking(true);
    setAiProgress(0);
    setSimilarity(null);
    setIsAiRegistered(false);
    setIsSimilarityPass(false);

    const timer = setInterval(() => {
      setAiProgress((prev) => {
        const next = Math.min(prev + 5, 100);

        if (next === 100) {
          clearInterval(timer);
          const randomSimilarity = Math.floor(Math.random() * 26) + 5; // 5~30%
          setSimilarity(randomSimilarity);
          setIsAiRegistered(true);
          setIsAiChecking(false);
          setIsSimilarityPass(randomSimilarity <= 30);
        }

        return next;
      });
    }, 80);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">게시글 작성</h2>

      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4">
        <p className="mb-3 text-sm font-semibold text-gray-700">제출 상태</p>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              evidenceStatus === "submitted"
                ? "bg-[#49B49F] text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            제출
          </span>
          <span className="text-gray-400">/</span>
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              evidenceStatus === "verified"
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            인증 완료
          </span>
        </div>
      </div>

      {showEvidenceToast && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
          증빙자료 제출이 완료되어 인증 상태로 변경되었습니다.
        </div>
      )}

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

        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <h3 className="mb-2 text-base font-bold text-gray-800">증빙자료 제출</h3>
          <p className="mb-4 text-sm text-gray-500">버튼을 누르면 검증 연출로 제출/인증 완료 상태가 표시됩니다.</p>
          <button
            type="button"
            onClick={handleEvidenceCheck}
            className="mb-4 w-full rounded-xl bg-[#49B49F] py-3 font-bold text-white"
          >
            증빙자료 제출 버튼
          </button>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">증빙자료 업로드 미리보기</p>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                첨부파일 등록 완료
              </span>
            </div>

            <div className="rounded-lg border border-gray-300 bg-white p-2">
              <img
                src="/contest.jpg"
                alt="증빙자료 이미지"
                className="max-h-[32rem] w-full rounded-md object-contain"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <h3 className="mb-2 text-base font-bold text-gray-800">판매할 자료</h3>
          <p className="mb-4 text-sm text-gray-500">구매자에게 보여줄 자료 미리보기입니다.</p>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">판매 자료 미리보기</p>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                HWP 등록 완료
              </span>
            </div>

            <div className="rounded-lg border border-gray-300 bg-white p-2">
              <img
                src="/Dwp.png"
                alt="판매할 자료 이미지"
                className="max-h-[32rem] w-full rounded-md object-contain"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <label className="mb-2 block text-sm font-semibold text-gray-800">검증 대상 파일 카테고리</label>
          <p className="mb-3 text-sm text-gray-500">노션, PPT, HWP 중에서 업로드 파일 유형을 선택하세요.</p>
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

        {recommendedPrice && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="mb-2 text-sm font-bold text-amber-800">💡 가격 추천</p>
            <p className="mb-3 text-xs text-amber-700">선택하신 파일 타입을 기준으로 추천 가격을 제시합니다.</p>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-xs font-semibold text-amber-600">추천 가격대</p>
                <p className="text-xl font-extrabold text-amber-900">
                  ₩{recommendedPrice.min.toLocaleString()} ~ ₩{recommendedPrice.max.toLocaleString()}
                </p>
              </div>
              <div className="text-right flex-1">
                <p className="text-xs font-semibold text-amber-600">파일 타입</p>
                <p className="text-sm font-bold text-amber-900">
                  {fileType === 'notion' ? '노션' : fileType === 'ppt' ? 'PPT' : 'HWP'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <label className="mb-2 block text-sm font-semibold text-gray-800">판매 가격</label>
          <p className="mb-3 text-sm text-gray-500">판매할 자료의 가격을 입력하세요.</p>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-gray-700 font-semibold">₩</span>
            <input
              type="number"
              placeholder="가격을 입력하세요 (예: 5000)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 pl-8 bg-gray-50 rounded-lg outline-none text-black"
            />
          </div>

          {recommendedPrice && price && (
            <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-200">
              {(() => {
                const avgPrice = Math.round((recommendedPrice.min + recommendedPrice.max) / 2);
                const userPrice = parseInt(price);
                const diff = userPrice - avgPrice;
                const percentDiff = Math.round((Math.abs(diff) / avgPrice) * 100);

                if (diff < 0) {
                  return (
                    <p className="text-sm text-blue-700">
                      <span className="font-semibold">추천 평균(₩{avgPrice.toLocaleString()})보다 {percentDiff}% 낮게 책정했습니다.</span>
                      <br />
                      <span className="text-xs text-blue-600">더 경쟁력 있는 가격입니다!</span>
                    </p>
                  );
                } else if (diff > 0) {
                  return (
                    <p className="text-sm text-blue-700">
                      <span className="font-semibold">추천 평균(₩{avgPrice.toLocaleString()})보다 {percentDiff}% 높게 책정했습니다.</span>
                      <br />
                      <span className="text-xs text-blue-600">품질에 대한 자신감이 있다면 이 가격도 좋습니다!</span>
                    </p>
                  );
                } else {
                  return (
                    <p className="text-sm text-blue-700">
                      <span className="font-semibold">추천 평균(₩{avgPrice.toLocaleString()})과 동일하게 책정했습니다.</span>
                      <br />
                      <span className="text-xs text-blue-600">적정한 가격입니다!</span>
                    </p>
                  );
                }
              })()}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <h3 className="mb-2 text-base font-bold text-gray-800">AI 진위 여부 체크</h3>
          <p className="mb-3 text-sm text-gray-500">선택한 카테고리 기준으로 유사도를 계산하는 연출입니다.</p>
          <div className="mb-3 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            선택 카테고리: {fileType.toUpperCase()}
          </div>
          <button
            type="button"
            onClick={handleAiCheck}
            disabled={isAiChecking}
            className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white disabled:opacity-60"
          >
            {isAiChecking ? "유사도 분석 중..." : "인공지능 진위여부 체크 버튼"}
          </button>

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-blue-700">
              <span>검사 진행률</span>
              <span>{aiProgress}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-blue-100">
              <div
                className="h-full bg-blue-600 transition-all duration-100"
                style={{ width: `${aiProgress}%` }}
              />
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-800">
            {isAiChecking
              ? "AI가 파일을 분석 중입니다. 잠시만 기다려 주세요..."
              : similarity !== null
              ? `유사도 ${similarity}%`
              : "유사도 결과가 여기에 표시됩니다."}
          </div>
          {isAiRegistered && (
            <p className={`mt-2 text-sm font-semibold ${isSimilarityPass ? "text-emerald-700" : "text-rose-600"}`}>
              {isSimilarityPass
                ? "AI 체크 등록 완료: 유사도가 낮아 게시글 업로드가 가능합니다."
                : "유사도가 높아 업로드할 수 없습니다. 다시 검사해 주세요."}
            </p>
          )}
        </div>

        <button
          className="w-full py-4 bg-[#49B49F] text-white rounded-xl font-bold disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading || !isSimilarityPass}
        >
          {loading ? "등록 중..." : !isSimilarityPass ? "AI 유사도 통과 후 등록 가능" : "등록하기"}
        </button>
      </div>
    </div>
  );
};

export default Write;