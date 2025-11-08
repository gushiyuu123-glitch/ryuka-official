// src/App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Hero from "./components/Hero";
import Lead from "./components/Lead";
import StoreMorning from "./components/StoreMorning";
import StoreNight from "./components/StoreNight";
import Exhibit from "./components/Exhibit";
import BrandStory from "./components/BrandStory";
import Epilogue from "./components/Epilogue";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop"; // ✅ ページトップ制御
import NavbarIndex from "./components/Navbar.jsx";
import NavbarGlobal from "./components/NavbarGlobal.jsx";

// 🏪 下層ページ群
import Store from "./pages/Store.jsx";
import StoreDetail from "./pages/StoreDetail.jsx";
import Workshop from "./pages/Workshop.jsx";

import "./style.css";

// ================================================
// 💠 ページ構成本体
// ================================================
function AppContent() {
  const [isMorning, setIsMorning] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const location = useLocation();
  const isIndex = location.pathname === "/";

  // 🌗 朝夜トグル
  const handleToggle = () => {
    setTransitioning(true);
    setTimeout(() => setTransitioning(false), 1000);
    setIsMorning((prev) => !prev);
  };

  // 🌬️ スクロール演出＋スムーススクロール
  useEffect(() => {
    let triggers = [];
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const fadeSettings = isMorning
        ? { duration: 1.8, ease: "power2.out", y: 50 }
        : { duration: 2.2, ease: "power1.out", y: 70 };

      triggers = gsap.utils.toArray("main > section").map((sec) =>
        gsap.fromTo(
          sec,
          { opacity: 0, y: fadeSettings.y },
          {
            opacity: 1,
            y: 0,
            duration: fadeSettings.duration,
            ease: fadeSettings.ease,
            scrollTrigger: {
              trigger: sec,
              start: "top 90%",
              end: "bottom 70%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        )
      );

      // スムーススクロール（index専用）
      if (isIndex) {
        document.querySelectorAll('a[href^="#"]').forEach((link) => {
          const handleClick = (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          };
          link.removeEventListener("click", handleClick);
          link.addEventListener("click", handleClick);
        });
      }
    })();

    return () => {
      try {
        triggers.forEach((t) => t.scrollTrigger?.kill());
      } catch {}
    };
  }, [isMorning, isIndex]);

  // ================================================
  // 🌺 JSXレンダリング
  // ================================================
  return (
    <>
      {/* 💫 トランジション */}
      <div
        className={`light-transition ${isMorning ? "" : "night"} ${
          transitioning ? "active" : ""
        }`}
      ></div>

      {/* 🩵 ナビゲーション切替 */}
      {isIndex ? (
        <NavbarIndex isMorning={isMorning} handleToggle={handleToggle} />
      ) : (
        <NavbarGlobal isMorning={isMorning} />
      )}

      {/* ✅ ページ遷移時にトップへ戻る */}
      <ScrollToTop />

      {/* 🪞 ページ構成 */}
      <Routes>
        {/* 🏝 トップページ */}
        <Route
          path="/"
          element={
            <main>
              <section id="top">
                <Hero isMorning={isMorning} />
              </section>

              <section id="lead">
                <Lead isMorning={isMorning} />
              </section>

              {/* 🏪 朝／夜ストア切替 */}
              {isMorning ? (
                <section id="store">
                  <StoreMorning isMorning={isMorning} />
                </section>
              ) : (
                <section id="store-night">
                  <StoreNight isMorning={isMorning} />
                </section>
              )}

              <section id="exhibit">
                <Exhibit isMorning={isMorning} />
              </section>

              <section id="story">
                <BrandStory isMorning={isMorning} />
              </section>

              <section id="epilogue">
                <Epilogue isMorning={isMorning} />
              </section>
            </main>
          }
        />

        {/* 🏬 店舗一覧ページ（複数形） */}
        <Route path="/stores" element={<Store isMorning={isMorning} />} />

        {/* 🏬 店舗詳細 */}
        <Route path="/store/:id" element={<StoreDetail isMorning={isMorning} />} />

        {/* 🧪 読谷アトリエ体験ページ */}
        <Route path="/workshop" element={<Workshop isMorning={isMorning} />} />
      </Routes>

      {/* 🌅 共通フッター */}
      <Footer isMorning={isMorning} />
    </>
  );
}

// ================================================
// 🧭 Router 全体
// ================================================
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
