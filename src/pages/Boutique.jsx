import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Boutique.css";

export default function Boutique({ isMorning, handleToggle }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // 商品データ（名前・価格）
  const products = {
    morning: [
      { id: "m1", name: "Hibiscus Dawn",     price: "¥4,800", img: "/image/morning_1.webp" },
      { id: "m2", name: "Citrus Breeze",     price: "¥4,500", img: "/image/morning_2.webp" },
      { id: "m3", name: "Sugarcane Mist",    price: "¥4,800", img: "/image/morning_3.webp" },
      { id: "m4", name: "Ryukyu Bloom",      price: "¥4,800", img: "/image/morning_4.webp" },
      { id: "m5", name: "Gettō Whisper",     price: "¥5,200", img: "/image/morning_5.webp" },
      { id: "m6", name: "Coral White",       price: "¥4,900", img: "/image/morning_6.webp" },
    ],
    night: [
      { id: "n1", name: "Moonlight Amber",   price: "¥5,800", img: "/image/night_1.webp" },
      { id: "n2", name: "Night Hibiscus",    price: "¥5,500", img: "/image/night_2.webp" },
      { id: "n3", name: "Okinawa Noir",      price: "¥5,800", img: "/image/night_3.webp" },
      { id: "n4", name: "Island Musk",       price: "¥5,400", img: "/image/night_4.webp" },
      { id: "n5", name: "Sea Glass Drift",   price: "¥5,200", img: "/image/night_5.webp" },
      { id: "n6", name: "Silent Gettō",      price: "¥5,600", img: "/image/night_6.webp" },
    ],
  };

  const line = isMorning ? "morning" : "night";
  const heroSrc = isMorning ? "/image/boutique_morning.webp" : "/image/boutique_night.webp";

  // ページ入場・朝夜切替のトランジション
  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      // Hero
      gsap.fromTo(
        ".boutique .boutique-hero-img",
        { opacity: 0, scale: 1.03 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
      );
      // カード群
      gsap.fromTo(
        ".boutique .product-card",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.05, delay: 0.1 }
      );
    })();
  }, [isMorning]);

  // Lightbox: ESCで閉じる
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelectedImage(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className={`boutique ${isMorning ? "day" : "night"}`}>
      {/* 🌗 朝夜トグル（Appの状態を操作） */}
      <div className="mode-toggle-area">
        <button className="mode-btn" onClick={handleToggle}>
          {isMorning ? "🌙 Night" : "🌅 Morning"}
        </button>
      </div>

      {/* 🌅/🌙 Hero */}
<section className="boutique-hero">
  <img src={isMorning ? "/image/boutique_morning.webp" : "/image/boutique_night.webp"} alt="Ryuka Boutique Hero" className="boutique-hero-img" />
  <div className="boutique-hero-text">
    <h1>{isMorning ? "Morning Boutique" : "Night Boutique"}</h1>
    <p>{isMorning ? "光と香りが交差する、静寂の朝。" : "灯と余韻が漂う、深い夜。"}</p>
  </div>
</section>


      {/* 🛍️ 商品 */}
      <section className="product-section">
        <h2>{isMorning ? "🌅 Morning Line — 朝の香り" : "🌙 Night Line — 夜の香り"}</h2>
        <div className="product-grid">
          {products[line].map((item) => (
            <div
              key={item.id}
              className="product-card"
              onClick={() => setSelectedImage(item.img)}
            >
              <div className="product-overlay">
                <h3>{item.name}</h3>
                <p>{item.price}</p>
              </div>
              <img src={item.img} alt={item.name} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* 💌 ポストカード特典 */}
      <section className="postcard-section">
        <h2>💌 ポストカード特典サービス</h2>
        <p>
          ご購入の皆さまへ、琉球の風景と香りをテーマにした
          <br />
          <strong>オリジナルポストカード</strong>を同封いたします。
          手書きメッセージ代筆も承ります（無料）。
        </p>
        <img src="/image/postcard_sample.webp" alt="Postcard Sample" className="postcard-img" />
      </section>

      {/* 🎁 Giftへ */}
      <div className="back-link">
        <Link to="/gift">🎁 Giftページへ戻る</Link>
      </div>

      {/* 🔍 Lightbox */}
      {selectedImage && (
        <div className="lightbox visible" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Expanded" />
        </div>
      )}

      <footer className="boutique-footer">
        <p>© 2025 Ryuka — 光と香りの記憶</p>
      </footer>
    </main>
  );
}
