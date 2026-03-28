
> 본 프로젝트는 React와 Tailwind CSS를 기반으로 하며, 모바일 퍼스트 디자인으로 제작되었습니다.

---

## 🚀 시작하기 (Getting Started)

이 프로젝트를 처음 클론 받은 팀원분들은 아래 순서대로 실행해 주세요.

### 1. 프로젝트 클론 (Clone)
```bash
git clone [https://github.com/사용자이름/레포지토리이름.git](https://github.com/사용자이름/레포지토리이름.git)
cd 레포지토리이름

```

### 2. 패키지 설치 (Install)

프로젝트에 필요한 모든 라이브러리를 설치합니다.

```bash
npm install

```

### 3. 로컬 서버 실행 (Run)

Vite 개발 서버를 구동합니다.

```bash
npm run dev

```

브라우저에서 `http://localhost:5173` 접속을 확인하세요.

---

## 🛠 기술 스택 (Tech Stack)

| 구분 | 기술 |
| --- | --- |
| **Framework** | React (Vite) |
| **Styling** | Tailwind CSS (v3) |
| **Icons** | Lucide-react |
| **Design** | Figma Based Mobile UI |

---

## 📂 폴더 구조 (Project Structure)

프로젝트는 **Layout 패턴**을 사용하여 구조화되어 있습니다.

```text
src/
├── components/
│   └── Layout.jsx     # 공통 헤더 및 하단 네비게이션 탭 바
├── pages/             # 각 탭 클릭 시 보여지는 실제 페이지 알맹이
│   ├── Home.jsx       # 홈 화면 (인기 자산, 로그)
│   ├── Market.jsx     # 자산 리스트 및 카테고리
│   ├── Write.jsx      # 판매 글쓰기 양식
│   ├── Chat.jsx       # 채팅 목록 및 대화 UI
│   └── MyPage.jsx     # 프로필 및 거래 내역
├── App.jsx            # Layout과 Pages를 조립하는 메인 파일
└── index.css          # Tailwind 설정 및 공통 스타일링

```

---

## 💡 협업 시 주의사항

1. **레이아웃 수정:** 상단 바나 하단 탭 바 디자인을 수정할 때는 `src/components/Layout.jsx`만 건드리면 전 페이지에 적용됩니다.
2. **페이지 추가:** 새로운 기능을 만들 때는 `src/pages/` 폴더에 파일을 만들고 `App.jsx`에서 연결해 주세요.
3. **의존성:** 새로운 라이브러리를 설치하면 반드시 팀원들에게 알려주세요.

---
