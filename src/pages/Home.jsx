import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      console.log("에러:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getFileTypeIcon = (fileType) => {
    const icons = {
      notion: { text: 'N', bg: 'bg-blue-100', color: 'text-blue-600' },
      ppt: { text: 'P', bg: 'bg-red-100', color: 'text-red-600' },
      hwp: { text: 'H', bg: 'bg-purple-100', color: 'text-purple-600' }
    };
    return icons[fileType] || icons.notion;
  };

  const PostCard = ({ post, onClick }) => {
    const icon = getFileTypeIcon(post.fileType);
    const createdDate = post.createdAt?.toDate?.() ? new Date(post.createdAt.toDate()).toLocaleDateString('ko-KR') : '방금';

    return (
      <div className="border border-gray-200 rounded-2xl p-4 bg-white hover:shadow-md transition cursor-pointer" onClick={() => onClick(post)}>
        <div className="flex items-start gap-3">
          {/* 파일 분류 아이콘 */}
          <div className={`${icon.bg} ${icon.color} w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0`}>
            {icon.text}
          </div>

          {/* 게시글 내용 */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 truncate">{post.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
              <span className="font-medium">{post.fileName || '파일 없음'}</span>
              <span>•</span>
              <span className="font-medium text-blue-600">{post.authorName}</span>
              <span>•</span>
              <span>{createdDate}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="animate-fadeIn bg-white min-h-screen">
        {/* 검색창 */}
        <div className="px-4 py-3 sticky top-0 bg-white z-10 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="검색: 제목, 작성자..." 
              className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>

        {/* 상단 배너 */}
        <div className="px-4 py-4">
          <div className="bg-[#49B49F] rounded-2xl p-6 text-white flex justify-between items-center relative overflow-hidden shadow-sm">
            <div>
              <h2 className="text-xl font-bold mb-1">공유된 자산들</h2>
              <p className="text-sm opacity-90">다양한 파일을 찾아보세요</p>
            </div>
            <div className="bg-orange-400 p-3 rounded-full shadow-inner text-2xl">📁</div>
          </div>
        </div>

        {/* 게시글 목록 */}
        <section className="px-4 pb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">전체 게시글 ({posts.length})</h3>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">불러오는 중...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">게시글이 없습니다</div>
          ) : (
            <div>
              {posts.map(post => (
                <PostCard key={post.id} post={post} onClick={setSelectedPost} />
              ))}
            </div>
          )}
        </section>

        {/* 게시글 상세 모달 */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                {/* 모달 헤더 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const icon = getFileTypeIcon(selectedPost.fileType);
                      return (
                        <div className={`${icon.bg} ${icon.color} w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg`}>
                          {icon.text}
                        </div>
                      );
                    })()}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedPost.title}</h2>
                      <p className="text-sm text-gray-500">
                        {selectedPost.authorName} • {selectedPost.createdAt?.toDate?.() ? new Date(selectedPost.createdAt.toDate()).toLocaleDateString('ko-KR') : '방금'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {/* 게시글 내용 */}
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedPost.description}</p>
                </div>

                {/* 파일 정보 */}
                {selectedPost.fileName && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      📎 첨부 파일: {selectedPost.fileName}
                    </p>
                  </div>
                )}

                {/* 닫기 버튼 */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;