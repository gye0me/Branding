import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const MarketDetailModal = ({ selectedProduct, onClose, onImageClick, toImagePath }) => {
  const [downloadStats, setDownloadStats] = useState(null);

  const canShowPreview = selectedProduct?.id === 1 || selectedProduct?.id === 2 || selectedProduct?.id === 6;

  // 랜덤 다운로드 통계 생성
  const generateRandomDownloadStats = () => {
    const departments = [
      '컴퓨터공학과',
      '경영학과',
      '영어영문학과',
      '수학과',
      '물리학과',
      '화학과',
      '생물학과',
      '간호학과',
      '심리학과',
      '교육학과'
    ];
    
    // 3-5개 학과를 랜덤으로 선택
    const selectedDepts = [];
    const numDepts = Math.floor(Math.random() * 3) + 3; // 3-5개
    const shuffled = [...departments].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < numDepts; i++) {
      selectedDepts.push({
        department: shuffled[i],
        count: Math.floor(Math.random() * 13) + 2 // 2-14회
      });
    }
    
    return selectedDepts.sort((a, b) => b.count - a.count);
  };

  useEffect(() => {
    if (!selectedProduct?.downloadStats || selectedProduct?.downloadStats.length === 0) {
      setDownloadStats(generateRandomDownloadStats());
    } else {
      setDownloadStats(selectedProduct?.downloadStats);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 transform animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-2xl font-bold text-gray-800">상품 상세</h4>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition-colors">×</button>
        </div>
        <p className="text-sm text-gray-600 mb-4">{selectedProduct.author || selectedProduct.user} · {selectedProduct.academicInfo}</p>
        <h5 className="text-xl font-bold mb-4 text-gray-800">{selectedProduct.title}</h5>
        <p className="text-base text-gray-700 whitespace-pre-wrap leading-relaxed mb-6">{selectedProduct.description || '상세 설명 없음'}</p>

        {canShowPreview && (
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-bold text-gray-800 mb-2">미리보기</p>
              <div className="space-y-3">
                {selectedProduct.previewImages ? (
                  selectedProduct.previewImages.map((image, idx) => (
                    <div key={idx} className="rounded-lg border border-gray-300 bg-white p-2">
                      <img
                        src={toImagePath(image)}
                        alt={`${selectedProduct.title} 미리보기 ${idx + 1}`}
                        onClick={() => onImageClick(toImagePath(image))}
                        className="max-h-96 w-full rounded-md object-contain cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-gray-300 bg-white p-2">
                    <img
                      src={toImagePath(selectedProduct.previewImage)}
                      alt={selectedProduct.title}
                      onClick={() => onImageClick(toImagePath(selectedProduct.previewImage))}
                      className="max-h-96 w-full rounded-md object-contain cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-xs font-semibold text-emerald-700">판매가</p>
              <p className="mt-1 text-2xl font-extrabold text-emerald-700">₩{Number(selectedProduct.price).toLocaleString()}</p>
            </div>

            {selectedProduct.achievements && (
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-sm font-bold text-gray-800 mb-2">판매자 수상이력</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {selectedProduct.achievements.map((achievement, idx) => {
                    // 인증 패턴: 인증, 미인증, 인증 (또는 필요에 따라 수정)
                    const isVerified = idx === 0 || idx === 2;
                    return (
                      <li key={idx} className="flex items-center gap-2">
                        {isVerified ? (
                          <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                        ) : (
                          <XCircle size={16} className="text-gray-400 flex-shrink-0" />
                        )}
                        {achievement}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {downloadStats && downloadStats.length > 0 && (
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm font-bold text-blue-800 mb-3">학교 내 다운로드 현황</p>
                <div className="space-y-2">
                  {downloadStats.map((stat, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-3">
                      <span className="text-sm text-gray-700 font-medium">{stat.department}</span>
                      <span className="text-sm font-bold text-blue-600">{stat.count}회</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-blue-200 flex items-center justify-between">
                  <span className="text-xs text-blue-700 font-semibold">총 다운로드</span>
                  <span className="text-lg font-extrabold text-blue-800">
                    {downloadStats.reduce((sum, stat) => sum + stat.count, 0)}회
                  </span>
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-gray-800">구매자 후기</p>
                <button
                  type="button"
                  className="rounded-full px-3 py-1 text-xs font-bold transition-colors bg-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white"
                >
                  좋아요
                </button>
              </div>
              <p className="mb-3 text-sm text-gray-600">좋아요 {selectedProduct.id === 1 ? 42 : 38}</p>

              <div className="space-y-3">
                {selectedProduct.reviews && selectedProduct.reviews.map((review, idx) => (
                  <div key={idx} className="rounded-xl bg-gray-50 p-3 text-sm text-gray-700 flex gap-3">
                    <div className={`${review.color} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {review.initial}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-800 text-xs mb-1">{review.author}</p>
                      <p className="text-xs text-gray-700">"{review.content}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <p className="text-xs text-gray-500 leading-relaxed">
            본 창작물은 작성자의 저작물입니다. 무단 복제, 배포, 상업적 이용을 금합니다. 본 자료 사용으로 인한 모든 법적 책임은 사용자에게 있습니다.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <button className="w-full px-6 py-3 bg-gradient-to-r from-[#1FBA9E] to-[#2A9D8F] text-white rounded-xl font-semibold hover:from-[#18a088] hover:to-[#1f8078] transition-all duration-300 shadow-lg hover:shadow-xl">구매하기</button>
          <button className="w-full px-6 py-3 bg-white border-2 border-[#1FBA9E] text-[#1FBA9E] rounded-xl font-semibold hover:bg-[#f0fffe] transition-all duration-300">채팅하기</button>
        </div>
      </div>
    </div>
  );
};

export default MarketDetailModal;
