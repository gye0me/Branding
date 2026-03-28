import React from "react";
import { Trash2 } from "lucide-react";

const RecentPosts = ({ posts, loading, getFileTypeColor, getFileTypeText, onPostClick, onDeletePost, isPostOwner }) => {
  return (
    <div className="px-6 pb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">최신 로그</h3>
      {loading ? (
        <div className="text-center py-12 text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1FBA9E] mx-auto mb-4"></div>
          불러오는 중...
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-2xl shadow-sm">
          게시글이 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {posts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              onClick={() => onPostClick(post)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onPostClick(post);
                }
              }}
              role="button"
              tabIndex={0}
              className="w-full text-left bg-white rounded-3xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#1FBA9E]"
            >
              <div className="flex justify-between items-center">
                <div className="inline-flex items-center gap-2">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${getFileTypeColor(post.fileType)}`}>
                    {getFileTypeText(post.fileType)}
                  </span>
                  <p className="text-base font-bold text-gray-800">{post.userName || post.authorName || '익명'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1FBA9E]">₩{post.price ? Number(post.price).toLocaleString() : '0'}</span>
                  {isPostOwner(post) && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePost(post.id);
                      }}
                      onKeyDown={(e) => e.stopPropagation()}
                      className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="삭제"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-2 text-lg font-semibold text-gray-800">{post.title || '제목 없음'}</p>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">{post.description || '설명이 없습니다.'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentPosts;
