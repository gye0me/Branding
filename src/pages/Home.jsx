import React, { useState, useEffect } from "react";
import { Search, Megaphone, Sparkles, BadgePercent, Rocket, Gem, Trash2 } from "lucide-react";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const Home = ({ user, setIsModalOpen = () => {} }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [iconTick, setIconTick] = useState(0);
  const [likedPosts, setLikedPosts] = useState({});
  const [likeCounts, setLikeCounts] = useState({ test1: 24 });

  // 모달 상태 변경 시 Layout의 하단 바 투명도 조절
  useEffect(() => {
    setIsModalOpen(!!selectedPost);
  }, [selectedPost, setIsModalOpen]);
  const banners = [
    {
      id: 1,
      title: "치트키로 시작하기!",
      sub: "대학생 포트폴리오의 모든 것",
      gradient: "bg-gradient-to-r from-[#F4A261] via-[#E9C46A] to-[#E76F51]",
      iconColors: ["#FFE7C2", "#FFF3D6", "#FFD9B4", "#FFE2CC"],
    },
    {
      id: 2,
      title: "이번 주 인기 템플릿",
      sub: "선배들의 합격 비결 확인하기",
      gradient: "bg-gradient-to-r from-[#1FBA9E] via-[#2A9D8F] to-[#264653]",
      iconColors: ["#D7FFF7", "#BFEDE6", "#A9E8DD", "#E0FFFA"],
    },
    {
      id: 3,
      title: "PDF/이력서 완성",
      sub: "빠르게 템플릿 완성하기",
      gradient: "bg-gradient-to-r from-[#E76F51] via-[#F4A261] to-[#E9D758]",
      iconColors: ["#FFE1D7", "#FFE9C8", "#FFF3BD", "#FFD2C3"],
    },
  ];

  const movingIcons = [
    { id: 1, Icon: Megaphone, y: 22, speed: 0.8, size: 20, delay: 0 },
    { id: 2, Icon: Sparkles, y: 36, speed: 1.05, size: 18, delay: 23 },
    { id: 3, Icon: BadgePercent, y: 52, speed: 0.9, size: 22, delay: 41 },
    { id: 4, Icon: Rocket, y: 68, speed: 1.2, size: 20, delay: 57 },
    { id: 5, Icon: Gem, y: 80, speed: 0.95, size: 18, delay: 76 },
  ];

  // 카테고리 아이콘 데이터
  const categories = [
    { id: 1, name: "전체", icon: "🔍" },
    { id: 2, name: "추천", icon: "🌟" },
    { id: 3, name: "노션", icon: "📝" },
    { id: 4, name: "PPT", icon: "📊" },
    { id: 5, name: "PDF", icon: "📄" },
  ];

  const getFileTypeColor = (fileType) => {
    if (fileType === 'notion') return 'bg-[#1FBA9E]';
    if (fileType === 'ppt') return 'bg-[#F4A261]';
    return 'bg-[#E76F51]';
  };

  const getFileTypeText = (fileType) => {
    if (fileType === 'notion') return 'N';
    if (fileType === 'ppt') return 'P';
    return 'H';
  };

  const normalizeTitle = (title) => (title || '').trim().toLowerCase();

  const getLikeKey = (post) => {
    if (normalizeTitle(post?.title) === 'test1') return 'test1';
    return post?.id;
  };

  const test1PreviewImage = '/Dwp_b.png';

  const handleToggleLike = (post) => {
    const likeKey = getLikeKey(post);
    if (!likeKey) return;

    const isLikedNow = !!likedPosts[likeKey];

    setLikedPosts((prev) => ({
      ...prev,
      [likeKey]: !isLikedNow,
    }));

    setLikeCounts((prev) => ({
      ...prev,
      [likeKey]: Math.max((prev[likeKey] ?? 0) + (isLikedNow ? -1 : 1), 0),
    }));
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    
    try {
      await deleteDoc(doc(db, "posts", postId));
      setSelectedPost(null);
      setPosts(posts.filter(p => p.id !== postId));
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const isPostOwner = (post) => {
    if (!user) return false;
    return post.userId === user.uid;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  useEffect(() => {
    const iconTimer = setInterval(() => {
      setIconTick((prev) => (prev + 1) % 10000);
    }, 45);
    return () => clearInterval(iconTimer);
  }, []);

  useEffect(() => {
    const postsCollection = collection(db, "posts");
    const q = query(postsCollection, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // 더미 데이터 추가
      const dummyPosts = [
        { id: 'dummy1', title: '포트폴리오 템플릿 1', userName: '고냥이', price: 5000, fileType: 'notion', description: '대학생 포트폴리오용 템플릿', createdAt: new Date() },
        { id: 'dummy2', title: '이력서 템플릿', userName: '성문동', price: 3000, fileType: 'pdf', description: '깔끔한 이력서 디자인', createdAt: new Date() },
        { id: 'dummy3', title: '프레젠테이션 템플릿', userName: '김예시', price: 7000, fileType: 'ppt', description: '프로젝트 발표용 PPT', createdAt: new Date() },
        { id: 'dummy4', title: '스터디 노트', userName: '김덕성', price: 2000, fileType: 'notion', description: '공부 정리용 템플릿', createdAt: new Date() },
        { id: 'dummy5', title: '프로젝트 보고서', userName: '이덕새', price: 6000, fileType: 'pdf', description: '팀 프로젝트 보고서 양식', createdAt: new Date() },
        { id: 'dummy6', title: '포트폴리오 템플릿 2', userName: '도본구', price: 8000, fileType: 'notion', description: '디자인 전공 포트폴리오', createdAt: new Date() },
      ];

      setPosts([...postsData, ...dummyPosts]);
      setLoading(false);
    }, (error) => {
      console.error("사용자 게시글 로드 실패", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F2F2] pb-10 font-sans">

      {/* 2. 메인 배너 + 검색창 */}
      <div className="relative w-full h-80 overflow-hidden shadow-lg">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 flex flex-col items-center justify-center text-center px-6 text-white ${banner.gradient} ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {movingIcons.map((icon, iconIndex) => {
                const x = ((iconTick * icon.speed + icon.delay) % 140) - 20;
                const drift = Math.sin((iconTick + icon.delay) / 28) * 8;
                const rotate = Math.sin((iconTick + icon.delay) / 36) * 10;
                const IconComp = icon.Icon;

                return (
                  <div
                    key={`${banner.id}-${icon.id}`}
                    className="absolute transition-transform duration-75"
                    style={{
                      left: `${x}%`,
                      top: `${icon.y + drift}%`,
                      transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                      color: banner.iconColors[iconIndex % banner.iconColors.length],
                      opacity: 0.42,
                    }}
                  >
                    <IconComp size={icon.size} strokeWidth={2.2} />
                  </div>
                );
              })}
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_56%)] pointer-events-none" />
            <h2 className="text-4xl font-extrabold mb-2 drop-shadow-lg">{banner.title}</h2>
            <p className="text-lg opacity-95 mb-10 drop-shadow-md">{banner.sub}</p>

            <div className="w-full max-w-lg flex items-center bg-white/15 backdrop-blur-md rounded-full px-6 py-4 shadow-2xl border border-white/30">
              <Search className="text-white mr-3" size={20} />
              <input
                type="text"
                placeholder="검색: 템플릿, 가이드..."
                className="flex-1 bg-transparent text-white placeholder-white/80 outline-none text-base"
              />
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/40'}`} />
          ))}
        </div>
      </div>

      {/* 3. 카테고리 아이콘 */}
      <div className="grid grid-cols-5 gap-4 px-6 py-10">
        {categories.map((cat) => (
          <div key={cat.id} className="flex flex-col items-center gap-3 cursor-pointer group">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 border border-gray-200">
              {cat.icon}
            </div>
            <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* 4. 지금 인기 (템플릿 카드) */}
      <div className="px-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">지금 인기 (우리 학교)</h3>
          <button className="text-sm text-[#1FBA9E] hover:text-[#0d8b78] font-bold transition-colors">See all ›</button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {posts.slice(0, 6).map((post) => (
            <div key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className={`h-32 ${getFileTypeColor(post.fileType)} flex items-center justify-center text-4xl border-b border-gray-100`}>
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full text-white font-bold text-2xl bg-white/10">
                  {getFileTypeText(post.fileType)}
                </span>
              </div>
              <div className="p-4">
                <p className="text-base font-bold truncate text-gray-800">{post.title || '무제 게시글'}</p>
                <p className="text-sm text-gray-500 mt-2">{post.userName || post.authorName || '익명'}</p>
                <div className="text-lg font-bold text-[#1FBA9E] mt-2">₩{post.price ? Number(post.price).toLocaleString() : '0'}</div>
                <span className="inline-block mt-2 text-xs font-bold text-white bg-[#E9D758] px-2 py-1 rounded-full">인기</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. 최신 로그 */}
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
                onClick={() => setSelectedPost(post)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedPost(post);
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
                          handleDeletePost(post.id);
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

      {/* 6. 게시글 디테일 모달 */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 transform animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-2xl font-bold text-gray-800">게시글 상세</h4>
              <div className="flex items-center gap-2">
                {isPostOwner(selectedPost) && (
                  <button
                    onClick={() => handleDeletePost(selectedPost.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xl rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                    title="삭제"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
                <button onClick={() => setSelectedPost(null)} className="text-gray-500 hover:text-gray-800 text-2xl hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition-colors">×</button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{selectedPost.userName || selectedPost.authorName || '익명'} · {new Date(selectedPost.createdAt?.toDate?.() || new Date()).toLocaleString('ko-KR')}</p>
            <h5 className="text-xl font-bold mb-4 text-gray-800">{selectedPost.title || '제목 없음'}</h5>
            <p className="text-base text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedPost.description || '내용 없음'}</p>

            {normalizeTitle(selectedPost.title) === 'test1' && (
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm font-bold text-gray-800 mb-2">미리보기</p>
                  <div className="rounded-lg border border-gray-300 bg-white p-2">
                    <img
                      src={test1PreviewImage}
                      alt="test1 자료 미리보기"
                      className="max-h-96 w-full rounded-md object-contain"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-xs font-semibold text-emerald-700">판매가</p>
                  <p className="mt-1 text-2xl font-extrabold text-emerald-700">
                    ₩{Number(selectedPost.price || 12000).toLocaleString()}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <p className="text-sm font-bold text-gray-800 mb-2">판매자 수상이력</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>성덕여자대학교 제2회 웹개발 챌린지 최우수상</li>
                    <li>교내 창업 아이디어 경진대회 우수상</li>
                    <li>캡스톤디자인 전시회 인기상</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold text-gray-800">구매자 후기</p>
                    <button
                      type="button"
                      onClick={() => handleToggleLike(selectedPost)}
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
                        <p className="text-xs text-gray-700">"실제 제출 템플릿 그대로라 수정해서 바로 쓸 수 있었어요. 만족합니다!"</p>
                      </div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3 text-sm text-gray-700 flex gap-3">
                      <div className="bg-purple-400 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        S
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-xs mb-1">이서은</p>
                        <p className="text-xs text-gray-700">"자료 퀄리티가 높고 설명이 깔끔해서 과제 제출할 때 큰 도움됐습니다."</p>
                      </div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3 text-sm text-gray-700 flex gap-3">
                      <div className="bg-rose-400 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        H
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-xs mb-1">이하연</p>
                        <p className="text-xs text-gray-700">"공모전/자소서 구조를 한 번에 정리할 수 있어서 처음 준비하는 사람에게 특히 좋아요."</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button onClick={() => setSelectedPost(null)} className="mt-8 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;