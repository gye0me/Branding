import React from 'react';

const MarketDetailModal = ({ selectedProduct, onClose, onImageClick, toImagePath }) => {
  if (!selectedProduct) return null;

  const canShowPreview = selectedProduct.id === 1 || selectedProduct.id === 2 || selectedProduct.id === 6;

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
                  {selectedProduct.achievements.map((achievement, idx) => (
                    <li key={idx}>• {achievement}</li>
                  ))}
                </ul>
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

        <div className="mt-8 space-y-3">
          <button className="w-full px-6 py-3 bg-gradient-to-r from-[#1FBA9E] to-[#2A9D8F] text-white rounded-xl font-semibold hover:from-[#18a088] hover:to-[#1f8078] transition-all duration-300 shadow-lg hover:shadow-xl">구매하기</button>
          <button className="w-full px-6 py-3 bg-white border-2 border-[#1FBA9E] text-[#1FBA9E] rounded-xl font-semibold hover:bg-[#f0fffe] transition-all duration-300">채팅하기</button>
        </div>
      </div>
    </div>
  );
};

export default MarketDetailModal;
