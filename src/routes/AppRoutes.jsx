// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// =============================
// 🌸 Components
// =============================
import Hero from "../components/Hero";
import Lead from "../components/Lead";
import StoreMorning from "../components/StoreMorning";
import StoreNight from "../components/StoreNight";
import Exhibit from "../components/Exhibit";
import BrandStory from "../components/BrandStory";
import Epilogue from "../components/Epilogue";

// =============================
// 🌿 Pages
// =============================
import Store from "../pages/Store";
import Workshop from "../pages/Workshop";
import Gift from "../pages/Gift";
import Boutique from "../pages/Boutique";
import Diagnosis from "../pages/Diagnosis";
import Contact from "../pages/Contact"; // ✅ 追加
import Story from "../pages/Story"; // ← 追加
// =============================================
// 💠 AppRoutes（主要ルーティング構成）
// =============================================
export default function AppRoutes({ isMorning, handleToggle }) {
  return (
    <Routes>
      {/* 🏠 トップページ */}
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

            {/* ☀️ 朝 / 🌙 夜 で切り替え */}
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

      {/* 🕯 商品一覧 */}
      <Route
        path="/boutique"
        element={<Boutique isMorning={isMorning} handleToggle={handleToggle} />}
      />
      <Route path="/story" element={<Story isMorning={isMorning} handleToggle={handleToggle} />} />
      {/* 🛠 工房・体験 */}
      <Route path="/workshop" element={<Workshop isMorning={isMorning} />} />

      {/* 🎁 ギフトページ */}
      <Route path="/gift" element={<Gift isMorning={isMorning} />} />

      {/* 🔮 香り診断 */}
      <Route path="/diagnosis" element={<Diagnosis isMorning={isMorning} />} />

      {/* 🏬 店舗情報など */}
      <Route path="/stores" element={<Store isMorning={isMorning} />} />

      {/* 💌 お問い合わせ */}
      <Route path="/contact" element={<Contact isMorning={isMorning} />} /> {/* ✅ 追加 */}
      <Route path="/story" element={<Story isMorning={isMorning} />} />
    </Routes>
  );
}
