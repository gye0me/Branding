import React from "react";
import { Star } from "lucide-react";

const PopularTemplates = ({ posts, getFileTypeColor, getFileTypeText, onPostClick }) => {
  return (
    <div className="px-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">지금 인기 (우리 학교)</h3>
        <button className="text-sm text-[#1FBA9E] hover:text-[#0d8b78] font-bold transition-colors">See all ›</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {posts.slice(0, 6).map((post) => (
          <div key={post.id} className={`relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border cursor-pointer ${
            post.isPremium 
              ? 'border-amber-300 shadow-lg' 
              : 'border-gray-100'
          }`} onClick={() => onPostClick(post)}>
            {post.isPremium && (
              <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-amber-600">PREMIUM</span>
              </div>
            )}
            <div className={`h-32 ${getFileTypeColor(post.fileType)} flex items-center justify-center text-4xl border-b border-gray-100 ${
              post.isPremium ? 'ring-2 ring-amber-300 ring-inset' : ''
            }`}>
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full text-white font-bold text-2xl bg-white/10">
                {getFileTypeText(post.fileType)}
              </span>
            </div>
            <div className="p-4">
              <p className="text-base font-bold truncate text-gray-800">{post.title || '무제 게시글'}</p>
              <p className="text-sm text-gray-500 mt-2">{post.userName || post.authorName || '익명'}</p>
              <div className="text-lg font-bold text-[#1FBA9E] mt-2">₩{post.price ? Number(post.price).toLocaleString() : '0'}</div>
              <span className={`inline-block mt-2 text-xs font-bold px-2 py-1 rounded-full ${
                post.isPremium
                  ? 'bg-amber-400 text-white'
                  : 'bg-[#E9D758] text-gray-800'
              }`}>
                {post.isPremium ? '🔥 HOT' : '인기'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTemplates;
