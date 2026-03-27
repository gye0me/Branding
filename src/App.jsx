import { useState, useEffect } from "react";
import { auth } from "./firebase";
import Login from "./Login";
import Signup from "./Signup";
import Layout from "./components/layout.jsx";

import Home from "./pages/Home";
import Market from "./pages/Market";
import Write from "./pages/Write";
import Chat from "./pages/Chat";
import ChatDetail from "./pages/ChatDetail";
import ChatQuestion from "./pages/ChatQuestion";
import Mypage from "./pages/Mypage";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");
  const [activeTab, setActiveTab] = useState("home");
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedChatView, setSelectedChatView] = useState("detail");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        setActiveTab("home");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="p-10 text-center">로딩중...</div>;

  // 1. 로그인이 안 된 상태
  if (!user) {
    return (
      <Layout activeTab="home" setActiveTab={() => {}}>
        {page === "signup" ? (
          <Signup setPage={setPage} />
        ) : (
          <Login setPage={setPage} />
        )}
      </Layout>
    );
  }

  // 2. 로그인 된 상태에서 탭별 페이지 선택
  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <Home user={user} />;
      case "market":
        return <Market />;
      case "write":
        return <Write user={user} />;
      case "chat":
        if (selectedRoomId) {
          if (selectedChatView === "question") {
            return (
              <ChatQuestion
                roomId={selectedRoomId}
                onBack={() => setSelectedChatView("detail")}
                userName={user?.email?.split("@")[0] || "문의자"}
                isSeller
              />
            );
          }

          return (
            <ChatDetail
              onBack={() => setSelectedRoomId(null)}
            />
          );
        }
        return (
          <Chat
            onChatClick={(id, view = "detail") => {
              setSelectedRoomId(id);
              setSelectedChatView(view);
            }}
          />
        );
      case "profile":
        return <Mypage user={user} />;
      default:
        return <Home user={user} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={(tab) => {
        setActiveTab(tab);
        setSelectedRoomId(null);
        setSelectedChatView("detail");
      }}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;

