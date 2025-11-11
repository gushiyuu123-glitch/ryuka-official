// src/App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";

// ==============================
// 🌿 Core Components
// ==============================
import NavbarIndex from "./components/Navbar";
import NavbarGlobal from "./components/NavbarGlobal";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";

// ==============================
// 💠 Routes
// ==============================
import AppRoutes from "./routes/AppRoutes";

// ==============================
// 🎨 Global Style
// ==============================
import "./style.css";

// ==========================================
// 🌕 App（昼夜と光の制御）
// ==========================================
export default function App() {
  const [isMorning, setIsMorning] = useState(true);     // ☀️ 昼夜切替
  const [transitioning, setTransitioning] = useState(false); // ✨ トランジション中
  const [fadeOut, setFadeOut] = useState(false);        // 🕊 ローダーフェード
  const [showMain, setShowMain] = useState(false);      // 🎬 メイン表示

  // 🌗 昼夜トグル切替
  const handleToggle = () => {
    setTransitioning(true);
    setTimeout(() => setTransitioning(false), 1000);
    setIsMorning((prev) => !prev);
  };

  // 🕊 初回ローディングフェード
  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 3800);
    const showTimer = setTimeout(() => setShowMain(true), 4800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(showTimer);
    };
  }, []);

  return (
    <Router>
      <div style={{ position: "relative" }}>
        {/* 🌕 光のトランジション（琥珀 → 白光） */}
        <div
          className={`light-transition ${isMorning ? "" : "night"} ${
            transitioning ? "active" : ""
          }`}
        ></div>

        {/* 🎬 メインApp本体 */}
        <AppInner
          visible={showMain}
          fadeOut={fadeOut}
          isMorning={isMorning}
          handleToggle={handleToggle}
        />
      </div>
    </Router>
  );
}

// ==========================================
// ✨ AppInner（構造＋アニメ層）
// ==========================================
function AppInner({ visible, fadeOut, isMorning, handleToggle }) {
  const location = useLocation();
  const isIndex = location.pathname === "/";
  const isStory = location.pathname === "/story"; // 🕯 Story専用

  return (
    <>
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 3.5s ease-in-out",
        }}
      >
{/* 🕊 ナビゲーション */}
{!isStory && ( // Storyページでは非表示
  isIndex ? (
    <NavbarIndex isMorning={isMorning} handleToggle={handleToggle} />
  ) : location.pathname === "/boutique" && !isMorning ? null : (
    <NavbarGlobal isMorning={isMorning} />
  )
)}


        {/* 📜 ページ構成 */}
        <ScrollToTop />
        <AppRoutes isMorning={isMorning} handleToggle={handleToggle} />

        {/* 🌿 フッター */}
        {/* 🌿 フッター */}
<Footer isMorning={isMorning} />

      </div>

      {/* 🪶 ローディング */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          pointerEvents: fadeOut ? "none" : "auto",
          transition: "opacity 3.8s ease",
          opacity: fadeOut ? 0 : 1,
          background: "#faf7f4",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    </>
  );
}
