import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import ImageModal from './components/ImageModal';
import {
  SubmissionStatus,
  EvidencePreviewSection,
  SalePreviewSection,
  FileTypeSection,
  RecommendedPriceCard,
  PriceSection,
  AiCheckSection,
} from './components/WriteSections';

const Write = ({ user, onModalChange = () => {} }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [fileType, setFileType] = useState('notion');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [evidenceStatus, setEvidenceStatus] = useState('submitted');
  const [showEvidenceToast, setShowEvidenceToast] = useState(false);
  const [similarity, setSimilarity] = useState(null);
  const [isAiChecking, setIsAiChecking] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [isAiRegistered, setIsAiRegistered] = useState(false);
  const [isSimilarityPass, setIsSimilarityPass] = useState(false);
  const [price, setPrice] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const getRecommendedPrice = () => {
    if (fileType === 'notion') return { min: 4000, max: 8000 };
    if (fileType === 'ppt') return { min: 5000, max: 10000 };
    if (fileType === 'hwp') return { min: 3000, max: 7000 };
    return null;
  };

  const recommendedPrice = getRecommendedPrice();

  useEffect(() => {
    onModalChange(showImageModal);
  }, [showImageModal, onModalChange]);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowImageModal(true);
  };

  const handleSubmit = async () => {
    if (!user) {
      alert('로그인이 필요합니다');
      return;
    }

    if (!title.trim() || !desc.trim()) {
      alert('제목과 설명을 입력하세요');
      return;
    }

    if (!isSimilarityPass) {
      alert('AI 유사도 검사를 통과해야 게시글을 올릴 수 있습니다');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const postsCollection = collection(db, 'posts');
      await addDoc(postsCollection, {
        title,
        description: desc,
        fileType,
        price: price ? parseInt(price, 10) : null,
        fileUrl: null,
        fileName: null,
        previewImage: '/images/Dwp_b.png',
        userId: user.uid,
        authorName: user.displayName || user.email || '익명',
        createdAt: serverTimestamp(),
      });

      setErrorMsg('✅ 게시글이 등록되었습니다!');
      alert('게시글이 등록되었습니다!');
      setTitle('');
      setDesc('');
      setPrice('');
      setFileType('notion');

      setTimeout(() => {
        setErrorMsg('');
      }, 2000);
    } catch (error) {
      setErrorMsg(`❌ ${error.code}: ${error.message}`);
      alert('등록 실패: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEvidenceCheck = () => {
    setEvidenceStatus('verified');
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
          const randomSimilarity = Math.floor(Math.random() * 26) + 5;
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

      <SubmissionStatus evidenceStatus={evidenceStatus} />

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

        <EvidencePreviewSection onEvidenceCheck={handleEvidenceCheck} onImageClick={handleImageClick} />
        <SalePreviewSection onImageClick={handleImageClick} />
        <FileTypeSection fileType={fileType} onFileTypeChange={setFileType} />
        <RecommendedPriceCard recommendedPrice={recommendedPrice} fileType={fileType} />
        <PriceSection recommendedPrice={recommendedPrice} price={price} onPriceChange={setPrice} />

        <AiCheckSection
          fileType={fileType}
          isAiChecking={isAiChecking}
          aiProgress={aiProgress}
          similarity={similarity}
          isAiRegistered={isAiRegistered}
          isSimilarityPass={isSimilarityPass}
          onAiCheck={handleAiCheck}
        />

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
          disabled={loading || !isSimilarityPass || !isConfirmed}
        >
          {loading ? '등록 중...' : !isSimilarityPass ? 'AI 유사도 통과 후 등록 가능' : !isConfirmed ? '창작물 확인 후 등록 가능' : '등록하기'}
        </button>
      </div>

      <ImageModal
        showImageModal={showImageModal}
        selectedImage={selectedImage}
        onClose={() => setShowImageModal(false)}
      />
    </div>
  );
};

export default Write;
