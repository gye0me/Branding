import React from 'react';

const Market = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">캠퍼스 마켓</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* 상품 카드 예시 */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-300">이미지</div>
            <div className="p-3">
              <p className="text-sm font-bold">자산 이름 {i}</p>
              <p className="text-teal-600 font-bold">₩10,000</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;