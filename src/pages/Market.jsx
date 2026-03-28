import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { popularKeywords, marketCategories, allProducts } from './data/marketData';
import MarketCard from './components/MarketCard';
import MarketDetailModal from './components/MarketDetailModal';

const Market = ({ setIsModalOpen = () => {}, onModalChange }) => {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setIsModalOpen(!!selectedProduct);
    if (onModalChange) {
      onModalChange(!!selectedProduct || showImageModal);
    }
  }, [selectedProduct, setIsModalOpen, onModalChange, showImageModal]);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowImageModal(true);
  };

  const toImagePath = (image) => {
    if (!image) return '';
    return image.startsWith('/') ? image : `/images/${image}`;
  };

  const filteredProducts = allProducts
    .filter((p) => {
      if (activeCategory === '전체') return true;
      if (activeCategory === '추천') return p.isRecommended;
      return p.category === activeCategory;
    })
    .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="bg-white min-h-screen pb-24 font-sans animate-fadeIn">
      <div className="px-4 pt-6 pb-2">
        <div className="flex items-center border border-gray-200 rounded-full px-4 py-2.5 shadow-sm mb-4">
          <div className="flex items-center gap-1 pr-3 border-r border-gray-100 mr-3 cursor-pointer">
            <ChevronDown size={14} className="text-gray-500" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색어를 입력해주세요"
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-300"
          />

          <button className="bg-[#2D333D] p-1.5 rounded-full text-white ml-2">
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap mb-6">
          <span className="text-xs font-bold text-gray-400">인기 검색어</span>
          {popularKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => setSearchQuery(kw)}
              className="text-xs font-medium text-gray-600 hover:text-[#1FBA9E]"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      <div className="flex border-b border-gray-50 px-2 mb-4 overflow-x-auto no-scrollbar">
        {marketCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-3 text-sm font-bold relative whitespace-nowrap ${activeCategory === cat ? 'text-[#1FBA9E]' : 'text-gray-400'}`}
          >
            {cat}
            {activeCategory === cat && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1FBA9E]" />}
          </button>
        ))}
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-50 relative animate-fadeIn hover:shadow-lg transition-all duration-300 text-left"
            >
              <MarketCard {...product} />
            </button>
          ))
        ) : (
          <div className="col-span-2 py-20 text-center text-gray-300">검색 결과가 없습니다.</div>
        )}
      </div>

      <MarketDetailModal
        selectedProduct={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onImageClick={handleImageClick}
        toImagePath={toImagePath}
      />

      {showImageModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 overflow-auto p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative my-auto">
            <img
              src={selectedImage}
              alt="확대된 이미지"
              className="max-w-full max-h-[90vh] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-10 right-0 text-white text-3xl font-bold hover:text-gray-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Market;
