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
import ScrollToTop from "./components/ScrollToTop";
import NavbarIndex from "./components/Navbar.jsx";
import NavbarGlobal from "./components/NavbarGlobal.jsx";
import Loader from "./components/Loader";

import Store from "./pages/Store.jsx";
import StoreDetail from "./pages/StoreDetail.jsx";
import Workshop from "./pages/Workshop.jsx";

import "./style.css";

// ================================================
// 💠 ページ構成本体
// ================================================
function AppContent({ visible }) {
  const [isMorning, setIsMorning] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const location = useLocation();
  const isIndex = location.pathname === "/";

  const handleToggle = () => {
    setTransitioning(true);
    setTimeout(() => setTransitioning(false), 1000);
    setIsMorning((prev) => !prev);
  };

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
    })();

    return () => {
      try {
        triggers.forEach((t) => t.scrollTrigger?.kill());
      } catch {}
    };
  }, [isMorning]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 3.5s ease-in-out",
      }}
    >
      <div
        className={`light-transition ${isMorning ? "" : "night"} ${
          transitioning ? "active" : ""
        }`}
      ></div>

      {isIndex ? (
        <NavbarIndex isMorning={isMorning} handleToggle={handleToggle} />
      ) : (
        <NavbarGlobal isMorning={isMorning} />
      )}

      <ScrollToTop />

      <Routes>
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
        <Route path="/stores" element={<Store isMorning={isMorning} />} />
        <Route path="/store/:id" element={<StoreDetail isMorning={isMorning} />} />
        <Route path="/workshop" element={<Workshop isMorning={isMorning} />} />
      </Routes>

      <Footer isMorning={isMorning} />
    </div>
  );
}

// ================================================
// 🧭 Router + Loader連動フェード
// ================================================
export default function App() {
  const [fadeOut, setFadeOut] = useState(false);
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    // 🕰 Loader表示期間
    const fadeTimer = setTimeout(() => setFadeOut(true), 4000); // ← 花が咲く時間
    const showTimer = setTimeout(() => setShowMain(true), 5000); // ← 裏を遅らせて表示
    // ローダー消えるのを少し早める（Heroとのクロスフェード）
const timer = setTimeout(() => setFadeOut(true), 4700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(showTimer);
    };
  }, []);

  return (
    <Router>
      <div style={{ position: "relative" }}>
        {/* 🌸 AppContentは裏で待機してフェードイン */}
        <AppContent visible={showMain} />

        {/* 🌺 Loaderは最前面で完全にフェードする */}
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
      </div>
    </Router>
  );
}
