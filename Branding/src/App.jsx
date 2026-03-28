import { useState, useEffect } from "react";
import { auth } from "./firebase";
import Login from "./Login";
import Signup from "./Signup";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Market from "./pages/Market";
import Write from "./pages/Write";
import Chat from "./pages/Chat";
import ChatDetail from "./pages/ChatDetail";
import Mypage from "./pages/Mypage";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");
  const [activeTab, setActiveTab] = useState("home");
  const [selectedRoomId, setSelectedRoomId] = useState(null);
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

  if (loading) return <div>로딩중...</div>;

  // 로그인 안 된 상태
  if (!user) {
  return (
    <Layout activeTab="home" setActiveTab={() => {}}>
      {page === "signup" ? (
        <Signup />
      ) : (
        <Login setPage={setPage} />
      )}
    </Layout>
  );
}

  // 탭별 페이지 선택
  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <Home user={user} />;
      case "market":
        return <Market />;
      case "write":
        return <Write user={user} />; // user 전달
      case "chat":
        if (selectedRoomId) {
          return <ChatDetail roomId={selectedRoomId} onBack={() => setSelectedRoomId(null)} />;
        }
        return <Chat onChatClick={(id) => setSelectedRoomId(id)} />;
      case "profile":
        return <Mypage user={user}/>;
      default:
        return <Home user={user} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={(tab) => {
      setActiveTab(tab);
      setSelectedRoomId(null);
    }}>
      {renderPage()}
    </Layout>
  );
}

export default App;

