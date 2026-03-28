import React from "react";
import { Trash2 } from "lucide-react";

const PostDetailModal = ({ selectedPost, onClose, onDelete, isPostOwner, onImageClick, onToggleLike, getLikeKey, likedPosts, likeCounts, test1PreviewImage }) => {
  if (!selectedPost) return null;

  const toImagePath = (image) => {
    if (!image) return '';
    return image.startsWith('/') ? image : `/images/${image}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 transform animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-2xl font-bold text-gray-800">게시글 상세</h4>
          <div className="flex items-center gap-2">
            {isPostOwner(selectedPost) && (
              <button
                onClick={() => onDelete(selectedPost.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xl rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                title="삭제"
              >
                <Trash2 size={20} />
              </button>
            )}
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition-colors">×</button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">{selectedPost.userName || selectedPost.authorName || '익명'} · {new Date(selectedPost.createdAt?.toDate?.() || new Date()).toLocaleString('ko-KR')}</p>
        <h5 className="text-xl font-bold mb-4 text-gray-800">{selectedPost.title || '제목 없음'}</h5>
        <p className="text-base text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedPost.description || '내용 없음'}</p>

        {!selectedPost.isDummy && (
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-bold text-gray-800 mb-2">미리보기</p>
              <div className="space-y-3">
                {selectedPost.previewImages ? (
                  selectedPost.previewImages.map((image, idx) => (
                    <div key={idx} className="rounded-lg border border-gray-300 bg-white p-2">
                      <img
                        src={toImagePath(image)}
                        alt={`${selectedPost.title} 미리보기 ${idx + 1}`}
                        onClick={() => onImageClick(toImagePath(image))}
                        className="max-h-96 w-full rounded-md object-contain cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-gray-300 bg-white p-2">
                    <img
                      src={toImagePath(selectedPost.previewImage || test1PreviewImage)}
                      alt={selectedPost.title}
                      onClick={() => onImageClick(toImagePath(selectedPost.previewImage || test1PreviewImage))}
                      className="max-h-96 w-full rounded-md object-contain cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                )}
              </div>
            </div>
            {selectedPost.price && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-xs font-semibold text-emerald-700">판매가</p>
                <p className="mt-1 text-2xl font-extrabold text-emerald-700">
                  ₩{Number(selectedPost.price).toLocaleString()}
                </p>
              </div>
            )}

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="text-sm font-bold text-gray-800 mb-2">판매자 수상이력</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>덕성여자대학교 우수 교육 활동 인증서</li>
                <li>교내 우수 프로젝트 완료</li>
                <li>학생 추천 템플릿</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-gray-800">구매자 후기</p>
                <button
                  type="button"
                  onClick={() => onToggleLike(selectedPost)}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                    likedPosts[getLikeKey(selectedPost)]
                      ? 'bg-rose-600 text-white'
                      : 'bg-rose-100 text-rose-600'
                  }`}
                >
                  {likedPosts[getLikeKey(selectedPost)] ? '좋아요 취소' : '좋아요'}
                </button>
              </div>
              <p className="mb-3 text-sm text-gray-600">좋아요 {likeCounts[getLikeKey(selectedPost)] ?? 0}</p>

              <div className="space-y-3">
                <div className="rounded-xl bg-gray-50 p-3 text-sm text-gray-700 flex gap-3">
                  <div className="bg-blue-400 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    M
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-xs mb-1">김민지</p>
                    <p className="text-xs text-gray-700">"정말 유용한 자료네요. 바로 사용할 수 있어서 좋습니다!"</p>
                  </div>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 text-sm text-gray-700 flex gap-3">
                  <div className="bg-purple-400 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    S
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-xs mb-1">이서은</p>
                    <p className="text-xs text-gray-700">"이 자료 덕분에 시간을 많이 절약했습니다. 감사합니다!"</p>
                  </div>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 text-sm text-gray-700 flex gap-3">
                  <div className="bg-rose-400 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    H
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-xs mb-1">이하연</p>
                    <p className="text-xs text-gray-700">"퀄리티 좋은 자료입니다. 다음에도 구매하고 싶어요!"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <button onClick={onClose} className="mt-8 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">닫기</button>
      </div>
    </div>
  );
};

export default PostDetailModal;
