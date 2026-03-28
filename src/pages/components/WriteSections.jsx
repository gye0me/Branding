import React from 'react';

export const SubmissionStatus = ({ evidenceStatus }) => (
  <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4">
    <p className="mb-3 text-sm font-semibold text-gray-700">제출 상태</p>
    <div className="flex items-center gap-2">
      <span
        className={`rounded-full px-4 py-2 text-sm font-semibold ${
          evidenceStatus === 'submitted'
            ? 'bg-[#49B49F] text-white'
            : 'bg-gray-100 text-gray-500'
        }`}
      >
        제출
      </span>
      <span className="text-gray-400">/</span>
      <span
        className={`rounded-full px-4 py-2 text-sm font-semibold ${
          evidenceStatus === 'verified'
            ? 'bg-emerald-600 text-white'
            : 'bg-gray-100 text-gray-500'
        }`}
      >
        인증 완료
      </span>
    </div>
  </div>
);

export const EvidencePreviewSection = ({ onEvidenceCheck, onImageClick }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-4">
    <h3 className="mb-2 text-base font-bold text-gray-800">증빙자료 제출</h3>
    <p className="mb-4 text-sm text-gray-500">버튼을 누르면 검증 연출로 제출/인증 완료 상태가 표시됩니다.</p>
    <button
      type="button"
      onClick={onEvidenceCheck}
      className="mb-4 w-full rounded-xl bg-[#49B49F] py-3 font-bold text-white"
    >
      증빙자료 제출 버튼
    </button>

    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-700">증빙자료 업로드 미리보기</p>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          첨부파일 등록 완료
        </span>
      </div>

      <div className="rounded-lg border border-gray-300 bg-white p-2">
        <img
          src="/images/contest.jpg"
          alt="증빙자료 이미지"
          onClick={() => onImageClick('/images/contest.jpg')}
          className="max-h-[32rem] w-full rounded-md object-contain cursor-pointer hover:opacity-80 transition-opacity"
        />
      </div>
    </div>
  </div>
);

export const SalePreviewSection = ({ onImageClick }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-4">
    <h3 className="mb-2 text-base font-bold text-gray-800">판매할 자료</h3>
    <p className="mb-4 text-sm text-gray-500">구매자에게 보여줄 자료 미리보기입니다.</p>

    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-700">판매 자료 미리보기</p>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          HWP 등록 완료
        </span>
      </div>

      <div className="rounded-lg border border-gray-300 bg-white p-2">
        <img
          src="/images/Dwp.png"
          alt="판매할 자료 이미지"
          onClick={() => onImageClick('/images/Dwp.png')}
          className="max-h-[32rem] w-full rounded-md object-contain cursor-pointer hover:opacity-80 transition-opacity"
        />
      </div>
    </div>
  </div>
);

export const FileTypeSection = ({ fileType, onFileTypeChange }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-4">
    <label className="mb-2 block text-sm font-semibold text-gray-800">검증 대상 파일 카테고리</label>
    <p className="mb-3 text-sm text-gray-500">노션, PPT, HWP 중에서 업로드 파일 유형을 선택하세요.</p>
    <select
      value={fileType}
      onChange={(e) => onFileTypeChange(e.target.value)}
      className="w-full p-3 bg-gray-50 rounded-lg outline-none text-black"
    >
      <option value="notion">노션 (N)</option>
      <option value="ppt">PPT (P)</option>
      <option value="hwp">HWP (H)</option>
    </select>
  </div>
);

export const RecommendedPriceCard = ({ recommendedPrice, fileType }) => {
  if (!recommendedPrice) return null;

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
      <p className="mb-2 text-sm font-bold text-amber-800">가격 추천</p>
      <p className="mb-3 text-xs text-amber-700">선택하신 파일 타입을 기준으로 추천 가격을 제시합니다.</p>
      <div className="flex items-center gap-3">
        <div>
          <p className="text-xs font-semibold text-amber-600">추천 가격대</p>
          <p className="text-xl font-extrabold text-amber-900">
            ₩{recommendedPrice.min.toLocaleString()} ~ ₩{recommendedPrice.max.toLocaleString()}
          </p>
        </div>
        <div className="text-right flex-1">
          <p className="text-xs font-semibold text-amber-600">파일 타입</p>
          <p className="text-sm font-bold text-amber-900">
            {fileType === 'notion' ? '노션' : fileType === 'ppt' ? 'PPT' : 'HWP'}
          </p>
        </div>
      </div>
    </div>
  );
};

export const PriceSection = ({ recommendedPrice, price, onPriceChange }) => {
  const renderPriceHint = () => {
    if (!recommendedPrice || !price) return null;

    const avgPrice = Math.round((recommendedPrice.min + recommendedPrice.max) / 2);
    const userPrice = parseInt(price, 10);
    const diff = userPrice - avgPrice;
    const percentDiff = Math.round((Math.abs(diff) / avgPrice) * 100);

    if (diff < 0) {
      return (
        <p className="text-sm text-blue-700">
          <span className="font-semibold">추천 평균(₩{avgPrice.toLocaleString()})보다 {percentDiff}% 낮게 책정했습니다.</span>
          <br />
          <span className="text-xs text-blue-600">더 경쟁력 있는 가격입니다!</span>
        </p>
      );
    }

    if (diff > 0) {
      return (
        <p className="text-sm text-blue-700">
          <span className="font-semibold">추천 평균(₩{avgPrice.toLocaleString()})보다 {percentDiff}% 높게 책정했습니다.</span>
          <br />
          <span className="text-xs text-blue-600">품질에 대한 자신감이 있다면 이 가격도 좋습니다!</span>
        </p>
      );
    }

    return (
      <p className="text-sm text-blue-700">
        <span className="font-semibold">추천 평균(₩{avgPrice.toLocaleString()})과 동일하게 책정했습니다.</span>
        <br />
        <span className="text-xs text-blue-600">적정한 가격입니다!</span>
      </p>
    );
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <label className="mb-2 block text-sm font-semibold text-gray-800">판매 가격</label>
      <p className="mb-3 text-sm text-gray-500">판매할 자료의 가격을 입력하세요.</p>
      <div className="relative flex items-center">
        <span className="absolute left-4 text-gray-700 font-semibold">₩</span>
        <input
          type="number"
          placeholder="가격을 입력하세요 (예: 5000)"
          value={price}
          onChange={(e) => onPriceChange(e.target.value)}
          className="w-full p-3 pl-8 bg-gray-50 rounded-lg outline-none text-black"
        />
      </div>

      {recommendedPrice && price && (
        <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-200">
          {renderPriceHint()}
        </div>
      )}
    </div>
  );
};

export const AiCheckSection = ({
  fileType,
  isAiChecking,
  aiProgress,
  similarity,
  isAiRegistered,
  isSimilarityPass,
  onAiCheck,
}) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-4">
    <h3 className="mb-2 text-base font-bold text-gray-800">AI 진위 여부 체크</h3>
    <p className="mb-3 text-sm text-gray-500">선택한 카테고리 기준으로 유사도를 계산하는 연출입니다.</p>
    <div className="mb-3 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
      선택 카테고리: {fileType.toUpperCase()}
    </div>
    <button
      type="button"
      onClick={onAiCheck}
      disabled={isAiChecking}
      className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white disabled:opacity-60"
    >
      {isAiChecking ? '유사도 분석 중...' : '인공지능 진위여부 체크 버튼'}
    </button>

    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-blue-700">
        <span>검사 진행률</span>
        <span>{aiProgress}%</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-blue-100">
        <div className="h-full bg-blue-600 transition-all duration-100" style={{ width: `${aiProgress}%` }} />
      </div>
    </div>

    <div className="mt-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-800">
      {isAiChecking
        ? 'AI가 파일을 분석 중입니다. 잠시만 기다려 주세요...'
        : similarity !== null
        ? `유사도 ${similarity}%`
        : '유사도 결과가 여기에 표시됩니다.'}
    </div>
    {isAiRegistered && (
      <p className={`mt-2 text-sm font-semibold ${isSimilarityPass ? 'text-emerald-700' : 'text-rose-600'}`}>
        {isSimilarityPass
          ? 'AI 체크 등록 완료: 유사도가 낮아 게시글 업로드가 가능합니다.'
          : '유사도가 높아 업로드할 수 없습니다. 다시 검사해 주세요.'}
      </p>
    )}
  </div>
);
