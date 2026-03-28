import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import HomeBanner from "./components/HomeBanner";
import CategoryIcons from "./components/CategoryIcons";
import PopularTemplates from "./components/PopularTemplates";
import RecentPosts from "./components/RecentPosts";
import PostDetailModal from "./components/PostDetailModal";
import ImageModal from "./components/ImageModal";

const Home = ({ user, setIsModalOpen = () => {}, onModalChange }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [likeCounts, setLikeCounts] = useState({ test1: 24 });
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const test1PreviewImage = '/images/Dwp_b.png';

  // 모달 상태 변경 시 Layout의 하단 바 투명도 조절
  useEffect(() => {
    setIsModalOpen(!!selectedPost);
    if (onModalChange) {
      onModalChange(!!selectedPost || showImageModal);
    }
  }, [selectedPost, setIsModalOpen, onModalChange, showImageModal]);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowImageModal(true);
  };

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
    const postsCollection = collection(db, "posts");
    const q = query(postsCollection, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // 더미 데이터 추가
      const dummyPosts = [
        { id: 'dummy1', title: '포트폴리오 템플릿 1', userName: '고냥이', price: 5000, fileType: 'notion', description: '대학생 포트폴리오용 템플릿', createdAt: new Date(), isDummy: true },
        { id: 'dummy2', title: '이력서 템플릿', userName: '성문동', price: 3000, fileType: 'pdf', description: '깔끔한 이력서 디자인', createdAt: new Date(), isDummy: true },
        { id: 'dummy3', title: '프레젠테이션 템플릿', userName: '김예시', price: 7000, fileType: 'ppt', description: '프로젝트 발표용 PPT', createdAt: new Date(), isDummy: true },
        { id: 'dummy4', title: '스터디 노트', userName: '김덕성', price: 2000, fileType: 'notion', description: '공부 정리용 템플릿', createdAt: new Date(), isDummy: true },
        { id: 'dummy5', title: '프로젝트 보고서', userName: '이덕새', price: 6000, fileType: 'pdf', description: '팀 프로젝트 보고서 양식', createdAt: new Date(), isDummy: true },
        { id: 'dummy6', title: '포트폴리오 템플릿 2', userName: '도본구', price: 8000, fileType: 'notion', description: '디자인 전공 포트폴리오', createdAt: new Date(), isDummy: true },
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
      <HomeBanner />
      <CategoryIcons />
      <PopularTemplates 
        posts={posts} 
        getFileTypeColor={getFileTypeColor}
        getFileTypeText={getFileTypeText}
        onPostClick={setSelectedPost}
      />
      <RecentPosts
        posts={posts}
        loading={loading}
        getFileTypeColor={getFileTypeColor}
        getFileTypeText={getFileTypeText}
        onPostClick={setSelectedPost}
        onDeletePost={handleDeletePost}
        isPostOwner={isPostOwner}
      />
      <PostDetailModal
        selectedPost={selectedPost}
        onClose={() => setSelectedPost(null)}
        onDelete={handleDeletePost}
        isPostOwner={isPostOwner}
        onImageClick={handleImageClick}
        onToggleLike={handleToggleLike}
        getLikeKey={getLikeKey}
        likedPosts={likedPosts}
        likeCounts={likeCounts}
        test1PreviewImage={test1PreviewImage}
      />
      <ImageModal
        showImageModal={showImageModal}
        selectedImage={selectedImage}
        onClose={() => setShowImageModal(false)}
      />
    </div>
  );
};

export default Home;