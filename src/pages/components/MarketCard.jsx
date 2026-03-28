import React from 'react';

const MarketCard = ({ category, iconCategory, title, user, price, temp, tag, bgColor, isBest = false }) => {
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

  const displayCategory = iconCategory || category;

  return (
    <>
      <div className={`${bgColor} h-32 w-full flex items-center justify-center relative rounded-t-3xl`}>
        {isBest && <div className="absolute top-2 left-2 bg-black/70 text-white text-[8px] font-bold px-2 py-1 rounded">Best Seller</div>}
        <div className="bg-white p-2.5 rounded-xl shadow-sm"><span className="font-bold text-gray-800 text-2xl">{getCategoryIcon(displayCategory)}</span></div>
      </div>
      <div className="p-4">
        <p className="text-[11px] font-black text-gray-900 mb-0.5 truncate">{title}</p>
        <p className="text-[9px] text-gray-400 mb-2 font-bold">{user}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-black text-gray-950">₩{price.toLocaleString()}</span>
          <span className="text-[10px] text-gray-400 font-bold">{temp}</span>
        </div>
        <div className="inline-block bg-[#E9D758] text-[#827717] text-[8px] font-black px-2 py-0.5 rounded">{tag}</div>
      </div>
    </>
  );
};

export default MarketCard;
