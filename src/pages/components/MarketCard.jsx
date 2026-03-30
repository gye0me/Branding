import React from 'react';
import { Star } from 'lucide-react';

const MarketCard = ({ category, iconCategory, title, user, price, temp, tag, bgColor, isBest = false, isPremium = false }) => {
  const getCategoryIcon = (cat) => {
    const iconMap = {
      '노션': 'N',
      'PPT': 'P',
      '자소서': 'H',
      '추천': '★',
      '인스타그램': 'I',
    };
    return iconMap[cat] || cat.charAt(0);
  };

  const getTagStyle = (tagName) => {
    switch(tagName) {
      case '신규':
        return 'bg-green-500 text-white';
      case '인기':
        return 'bg-red-500 text-white';
      case '추천':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-[#E9D758] text-[#827717]';
    }
  };

  const displayCategory = iconCategory || category;

  return (
    <div className={`flex flex-col overflow-hidden rounded-3xl shadow-sm ${isPremium ? 'border-2 border-amber-300' : 'border border-gray-50'}`}>
      {/* 상단 영역 */}
      <div className={`${bgColor} h-32 w-full flex items-center justify-center relative`}>
        {isPremium && (
          <div className="absolute top-2.5 right-2.5 flex items-center gap-0.5 bg-amber-400 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm">
            <Star size={9} className="fill-current" />
            PREMIUM
          </div>
        )}
        <div className="bg-white p-2.5 rounded-xl shadow-sm">
          <span className="font-bold text-gray-800 text-2xl">{getCategoryIcon(displayCategory)}</span>
        </div>
      </div>

      <div className="p-4 h-32 flex flex-col justify-between bg-white">
        <div>
          <h3 className="text-[13px] font-black text-gray-900 mb-0.5 line-clamp-1">
            {title}
          </h3>
          <p className="text-[10px] text-gray-400 font-bold">{user}</p>
        </div>

        <div className="flex justify-between items-end mt-auto">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-black text-gray-950">
              ₩{price.toLocaleString()}
            </span>
            {tag && (
              <div className={`w-fit text-[10px] font-black px-2 py-0.5 rounded ${getTagStyle(tag)}`}>
                {tag}
              </div>
            )}
          </div>
          <span className="text-[10px] text-gray-400 font-bold mb-0.5">{temp}</span>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;