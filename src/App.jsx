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
  const [selectedUserName, setSelectedUserName] = useState(""); // ★ 상대방 이름 저장용 추가
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
          // 미고일 때 (Question 뷰)
          if (selectedChatView === "question") {
            return (
              <ChatQuestion
                roomId={selectedRoomId}
                onBack={() => {
                  setSelectedRoomId(null);
                  setSelectedChatView("detail");
                }}
                userName={selectedUserName} // ★ 선택된 이름 전달
                isSeller={true}
              />
            );
          }
          // 소희나 일반 대화일 때 (Detail 뷰)
          return (
            <ChatDetail
              roomId={selectedRoomId}
              userName={selectedUserName} // ★ 선택된 이름 전달
              onBack={() => setSelectedRoomId(null)}
            />
          );
        }
        // 채팅 목록 페이지
        return (
          <Chat
            onChatClick={(id, name, view) => { // ★ 인자 3개(ID, 이름, 뷰타입)를 받음
              setSelectedRoomId(id);
              setSelectedUserName(name);
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