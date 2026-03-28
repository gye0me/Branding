import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, ChevronDown, ArrowRight } from 'lucide-react';

const Market = ({ setIsModalOpen = () => {}, onModalChange }) => {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // 모달 상태 변경 시 Layout의 하단 바 투명도 조절
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

  const popularKeywords = ["공모전", "템플릿", "수상", "장학금"];

  const allProducts = [
    // 카테고리별 상품들
    { 
      id: 1, 
      category: '자소서', 
      title: "공모전 수상 자소서 템플릿", 
      user: "김소희", 
      author: "김소희",
      price: 8000, 
      temp: "98.0°C", 
      tag: "Best", 
      bgColor: "bg-[#F4A261]", 
      isBest: true, 
      isRecommended: true,
      description: "의상학과 전공 공모전에 제출하여 최우수상을 수상한 자소서 템플릿입니다. 창의적인 디자인 철학과 실제 프로젝트 사례를 담았으며, 심사위원들의 높은 평가를 받은 구성입니다. 의상 관련 공모전뿐 아니라 디자인 분야 모든 공모전에 활용 가능합니다.",
      academicInfo: "덕성여자대학교 의상디자인학과 4학년",
      previewImage: "hwp_b.png",
      achievements: [
        "제18회 서울 패션위크 공모전 최우수상",
        "한국패션협회 학생 창의디자인 공모전 우수상",
        "교내 의류디자인 경진대회 1등상"
      ],
      reviews: [
        { author: "김민지", initial: "M", color: "bg-blue-400", content: "의상학과 공모전 준비할 때 이 자소서를 참고해서 제출했는데 3차 면접까지 갔어요! 정말 도움이 됐습니다." },
        { author: "이서은", initial: "S", color: "bg-purple-400", content: "구성이 깔끔하고 창의적인 관점이 담겨있어서 제 자소서를 쓸 때 큰 영감을 얻었어요. 강력 추천합니다!" },
        { author: "이하연", initial: "H", color: "bg-rose-400", content: "가격 대비 정말 가치 있는 자료입니다. 디자인 철학이 탄탄해서 어떤 공모전에도 응용할 수 있을 것 같아요." }
      ]
    },
    { 
      id: 2, 
      category: 'PPT', 
      title: "PPT 극대화 노하우", 
      user: "최지훈", 
      author: "최지훈",
      price: 10000, 
      temp: "92.4°C", 
      tag: "인기", 
      bgColor: "bg-[#1FBA9E]", 
      isRecommended: true,
      description: "기업 프레젠테이션부터 학술 발표까지 모든 상황에서 청중의 집중력을 사로잡는 PPT 제작 비법을 공개합니다. 색상 배치, 폰트 조합, 레이아웃 구성의 기본 원칙부터 고급 애니메이션 활용법까지 단계별로 설명합니다. 실제 프로젝트 사례와 피드백을 통해 당신의 프레젠테이션 실력을 한 단계 업그레이드할 수 있습니다.",
      academicInfo: "덕성여자대학교 시각디자인학과 3학년",
      previewImages: ["ppt_bb.png", "ppt_b.png"],
      achievements: [
        "2024 마이크로소프트 오피스 마스터 인증",
        "대학생 프레젠테이션 공모전 대상",
        "기업 PT 디자인 프로젝트 50+ 완료"
      ],
      reviews: [
        { author: "이준영", initial: "J", color: "bg-indigo-400", content: "발표가 너무 불안해서 이 자료를 구입했는데, 실무 팁들이 정말 유용했어요. 프레젠테이션이 훨씬 전문적으로 보여요!" },
        { author: "박민서", initial: "M", color: "bg-green-400", content: "색상과 폰트 조합이 왜 중요한지 이해하게 됐어요. 같은 내용도 이렇게 다르게 표현되는군요. 대만족합니다!" },
        { author: "유승현", initial: "S", color: "bg-amber-400", content: "애니메이션 활용법을 배웠더니 청중의 반응이 달라졌어요. 임직원 교육 PPT도 훨씬 효과적으로 만들 수 있었습니다." }
      ]
    },
    
    // PPT 카테고리
    { id: 3, category: 'PPT', title: "비즈니스 프레젠테이션 템플릿", user: "ppt_master", price: 8000, temp: "94.2°C", tag: "추천", bgColor: "bg-[#E76F51]" },
    { id: 4, category: 'PPT', title: "발표회 전문 디자인 팩", user: "slide_design", price: 10000, temp: "93.8°C", tag: "인기", bgColor: "bg-[#2A9D8F]" },
    { id: 5, category: 'PPT', title: "학술발표 PPT 양식", user: "academic_pro", price: 6000, temp: "91.5°C", tag: "신규", bgColor: "bg-[#F4A261]" },
    
    // 노션 카테고리
    {
      id: 6, 
      category: '노션', 
      title: "대학생활 완전정복: 전과목 A+ 학습 관리 템플릿", 
      user: "이지은",
      author: "이지은",
      price: 6000, 
      temp: "98.2°C", 
      tag: "Best", 
      bgColor: "bg-[#1FBA9E]", 
      isBest: true, 
      isRecommended: true,
      description: "단순한 자료 저장이 아닙니다. 강의 노트, 과제, 시험 일정을 유기적으로 연결하여 '공부하는 뇌'를 만들어주는 시스템입니다. 에빙하우스 망각곡선을 기반으로 한 복습 주기 알림, 데이터베이스 관계형 기능을 활용한 과목별 핵심 요약, 그리고 학점 계산기까지 대학 생활에 필요한 모든 학습 영역을 체계적으로 구현했습니다. 초보자도 바로 적용할 수 있도록 상세 가이드를 포함하고 있습니다.",
      academicInfo: "덕성여자대학교 문헌정보학과 4학년",
      previewImage: "notion_b.png", // 이미지 파일명도 변경 제안
      achievements: [
        "4년 연속 전과목 A+ (평점 4.5/4.5) 달성", // 구체적인 개인 성과
        "교내 '우수 학습법 경진대회' 대상 수상", // 인증된 성과
        "노션 기반 지식 관리 시스템(PKM) 구축 관련 특허 출원 중", // 전문성 강조
        "대학생 대상 노션 학습법 워크숍 100회 이상 진행 (누적 5,000명)" // 지도 경험 구체화
      ],
      reviews: [
        { author: "정우재", initial: "W", color: "bg-cyan-400", content: "강의 노트를 여기에 정리하니 복습 알림이 알아서 떠서 정말 편해요. 시험 기간에 당황하지 않고 요약본만 보고도 A+ 받았습니다!" },
        { author: "이윤아", initial: "Y", color: "bg-teal-400", content: "장황했던 과제와 논문 자료들이 데이터베이스로 깔끔하게 정리되었어요. 자료 검색 시간이 줄어드니 논문 퀄리티가 올라갔습니다. 필수 템플릿이에요." },
        { author: "강동현", initial: "D", color: "bg-blue-400", content: "단순 메모장이 아니에요. 관계형 기능으로 과목 간 개념을 연결해서 공부할 수 있어서 통찰력이 길러집니다. 덕분에 전공 학점이 획기적으로 올랐습니다." },
        { author: "한서연", initial: "S", color: "bg-purple-400", content: "처음에는 노션이 어려웠는데, 함께 제공되는 가이드대로 따라 하니 금방 익숙해졌어요. 학점 계산기 기능까지 있어서 학기 말 관리에 딱입니다." } // 후기 하나 추가
      ]
    },
    { id: 7, category: '노션', title: "시험기간용 플래너", user: "notion_pro", price: 5000, temp: "96.2°C", tag: "인기", bgColor: "bg-[#E76F51]" },
    { id: 8, category: '노션', title: "일정관리 데이터베이스", user: "db_expert", price: 7000, temp: "94.1°C", tag: "추천", bgColor: "bg-[#2A9D8F]" },
    
    // 자소서 카테고리
    { id: 9, category: '자소서', title: "자소서 작성 가이드 + 예제", user: "essay_master", price: 11000, temp: "97.3°C", tag: "필독", bgColor: "bg-[#F4A261]" },
    { id: 10, category: '자소서', title: "합격 자소서 50개 모음", user: "hr_consultant", price: 13000, temp: "98.7°C", tag: "Best", bgColor: "bg-[#E76F51]", isBest: true },
    { id: 11, category: '자소서', title: "자기소개 작성법 특강", user: "writing_coach", price: 10000, temp: "95.8°C", tag: "인기", bgColor: "bg-[#1FBA9E]" },
    
    // 인스타그램 카테고리
    { id: 12, category: '인스타그램', iconCategory: '노션', title: "인스타 포스트 디자인 템플릿", user: "insta_designer", price: 8500, temp: "93.4°C", tag: "추천", bgColor: "bg-[#2A9D8F]" },
    { id: 13, category: '인스타그램', iconCategory: '자소서', title: "릴스 제작 가이드", user: "content_creator", price: 7500, temp: "92.1°C", tag: "인기", bgColor: "bg-[#F4A261]" },
    { id: 14, category: '인스타그램', iconCategory: '노션', title: "브랜딩 스토리 템플릿", user: "brand_guru", price: 9500, temp: "94.6°C", tag: "신규", bgColor: "bg-[#1FBA9E]" },
  ];

  // 검색어와 카테고리에 따른 필터링 로직
  const filteredProducts = allProducts
    .filter(p => {
      if (activeCategory === '전체') return true;
      if (activeCategory === '추천') return p.isRecommended;
      return p.category === activeCategory;
    })
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="bg-white min-h-screen pb-24 font-sans animate-fadeIn">
      
      {/* --- 상단 검색 섹션 (사진 UI 완벽 재현) --- */}
      <div className="px-4 pt-6 pb-2">
        <div className="flex items-center border border-gray-200 rounded-full px-4 py-2.5 shadow-sm mb-4">
          {/* 왼쪽 드롭다운 부분 */}
          <div className="flex items-center gap-1 pr-3 border-r border-gray-100 mr-3 cursor-pointer">
            {/* <span className="text-sm font-bold text-gray-800">중고거래</span> */}
            <ChevronDown size={14} className="text-gray-500" />
          </div>
          
          {/* 입력창 부분 */}
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색어를 입력해주세요" 
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-300"
          />
          
          {/* 오른쪽 화살표 버튼 */}
          <button className="bg-[#2D333D] p-1.5 rounded-full text-white ml-2">
            <ArrowRight size={16} />
          </button>
        </div>

        {/* 인기 검색어 횡스크롤 (사진 하단 텍스트들) */}
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

      {/* --- 카테고리 탭 (전체/추천 등) --- */}
      <div className="flex border-b border-gray-50 px-2 mb-4 overflow-x-auto no-scrollbar">
        {['전체', '추천', 'PPT', '노션', '자소서', '인스타그램'].map((cat) => (
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

      {/* --- 상품 목록 리스트 --- */}
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

      {/* --- 상품 디테일 모달 --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 transform animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-2xl font-bold text-gray-800">상품 상세</h4>
              <button onClick={() => setSelectedProduct(null)} className="text-gray-500 hover:text-gray-800 text-2xl hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition-colors">×</button>
            </div>
            <p className="text-sm text-gray-600 mb-4">{selectedProduct.author || selectedProduct.user} · {selectedProduct.academicInfo}</p>
            <h5 className="text-xl font-bold mb-4 text-gray-800">{selectedProduct.title}</h5>
            <p className="text-base text-gray-700 whitespace-pre-wrap leading-relaxed mb-6">{selectedProduct.description || '상세 설명 없음'}</p>

            {(selectedProduct.id === 1 || selectedProduct.id === 2 || selectedProduct.id === 6) && (
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm font-bold text-gray-800 mb-2">미리보기</p>
                  <div className="space-y-3">
                    {selectedProduct.previewImages ? (
                      selectedProduct.previewImages.map((image, idx) => (
                        <div key={idx} className="rounded-lg border border-gray-300 bg-white p-2">
                          <img
                            src={`/${image}`}
                            alt={`${selectedProduct.title} 미리보기 ${idx + 1}`}
                            onClick={() => handleImageClick(`/${image}`)}
                            className="max-h-96 w-full rounded-md object-contain cursor-pointer hover:opacity-80 transition-opacity"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="rounded-lg border border-gray-300 bg-white p-2">
                        <img
                          src={`/${selectedProduct.previewImage}`}
                          alt={selectedProduct.title}
                          onClick={() => handleImageClick(`/${selectedProduct.previewImage}`)}
                          className="max-h-96 w-full rounded-md object-contain cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-xs font-semibold text-emerald-700">판매가</p>
                  <p className="mt-1 text-2xl font-extrabold text-emerald-700">
                    ₩{Number(selectedProduct.price).toLocaleString()}
                  </p>
                </div>

                {selectedProduct.achievements && (
                  <div className="rounded-2xl border border-gray-200 bg-white p-4">
                    <p className="text-sm font-bold text-gray-800 mb-2">판매자 수상이력</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {selectedProduct.achievements.map((achievement, idx) => (
                        <li key={idx}>• {achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold text-gray-800">구매자 후기</p>
                    <button
                      type="button"
                      className="rounded-full px-3 py-1 text-xs font-bold transition-colors bg-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white"
                    >
                      좋아요
                    </button>
                  </div>
                  <p className="mb-3 text-sm text-gray-600">좋아요 {selectedProduct.id === 1 ? 42 : 38}</p>

                  <div className="space-y-3">
                    {selectedProduct.reviews && selectedProduct.reviews.map((review, idx) => (
                      <div key={idx} className="rounded-xl bg-gray-50 p-3 text-sm text-gray-700 flex gap-3">
                        <div className={`${review.color} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                          {review.initial}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 text-xs mb-1">{review.author}</p>
                          <p className="text-xs text-gray-700">"{review.content}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 space-y-3">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-[#1FBA9E] to-[#2A9D8F] text-white rounded-xl font-semibold hover:from-[#18a088] hover:to-[#1f8078] transition-all duration-300 shadow-lg hover:shadow-xl">구매하기</button>
              <button className="w-full px-6 py-3 bg-white border-2 border-[#1FBA9E] text-[#1FBA9E] rounded-xl font-semibold hover:bg-[#f0fffe] transition-all duration-300">채팅하기</button>
            </div>
          </div>
        </div>
      )}

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

// --- 마켓 카드 컴포넌트 ---
const MarketCard = ({ category, iconCategory, title, user, price, temp, tag, bgColor, isBest = false }) => {
  // 카테고리별 아이콘 결정
  const getCategoryIcon = (cat) => {
    const iconMap = {
      '노션': 'N',
      'PPT': 'P',
      '자소서': 'H',
      '추천': '★',
      '인스타그램': 'I'
    };
    return iconMap[cat] || cat.charAt(0);
  };

  // iconCategory가 있으면 그것을 사용, 없으면 category 사용
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

export default Market;