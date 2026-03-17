import React, { useState } from 'react';
import Layout from './components/Layout';
// 각각의 페이지들
import HomeContent from "./pages/Home";
import Market from './pages/Market';
import Write from './pages/Write';
import Chat from './pages/Chat';
import Mypage from './pages/Mypage';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  // 현재 탭에 맞는 컴포넌트를 선택
  const renderPage = () => {
    switch (activeTab) {
      case 'home': return <HomeContent />;
      case 'market': return <Market />;
      case 'write': return <Write />;
      case 'chat': return <Chat />;
      case 'profile': return <Mypage />;
      default: return <HomeContent />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderPage()}
    </Layout>
  );
}

export default App;