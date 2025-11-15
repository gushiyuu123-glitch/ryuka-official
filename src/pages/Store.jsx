// src/pages/Store.jsx
import React, { useEffect } from "react";
import "../styles/store.css";
import { Link } from "react-router-dom";

import StoreHero from "../components/StoreHero"; // ← 追加

export default function Store() {
  const stores = [
    {
      id: "miyako",
      title: "宮古島店 — 光と潮の香り",
      image: "/image/store_miyako.webp",
      product: "/image/product_coralsun.png",
      productName: "Coral Sun — オードパルファム",
      description:
        "南国の陽光と潮風に包まれた宮古島店。珊瑚の砂とガラスが溶け合う空間で、琉香の原点となる『Coral Sun』シリーズが香ります。",
      products: "香水・キャンドル『Coral Sun』シリーズ",
      hours: "10:00〜19:00（水曜定休）",
      address: "沖縄県宮古島市平良字下里1-9-3 Ryuka Miyako Lounge",
    },
    {
      id: "airport",
      title: "那覇空港店 — 旅の記憶を香りに",
      image: "/image/store_airport1.webp",
      product: "/image/product_travel.png",
      productName: "トラベルライン — オードトワレ",
      description:
        "出発前のひとときに、沖縄の香りを。小瓶のオードトワレやポストカードなど、旅の余韻を持ち帰るギフトラインを展開しています。",
      products: "ポストカード『Gift from Ryuka』、トラベルサイズ香水",
      hours: "8:00〜20:00（年中無休）",
      address: "沖縄県那覇市鏡水150 国内線ターミナル2F",
    },
    {
      id: "kokusaidori",
      title: "国際通り店 — 灯と香りのリラックス空間",
      image: "/image/store_kokusaidori.webp",
      product: "/image/product_yukuruba.png",
      productName: "ゆくる場 — キャンドル",
      description:
        "琉球ランプの灯がゆらめく夜の店舗。キャンドル『ゆくる場』シリーズを中心に、香りと光の深い癒しをお届けします。",
      products: "キャンドル・ディフューザー『ゆくる場』シリーズ",
      hours: "11:00〜21:00（火曜定休）",
      address: "沖縄県那覇市牧志2-5-8 国際通りRyuka Annex",
    },
    {
      id: "chatan",
      title: "北谷美浜店 — 海と風の香りラウンジ",
      image: "/image/store_chatan.webp",
      product: "/image/product_seawhisper.png",
      productName: "Sea Whisper — ディフューザー",
      description:
        "海辺の風と香りが出会うリゾートラウンジ。ミントとサンダルウッドを基調にした香りで、波音のように穏やかな時間を演出します。",
      products: "『Sea Whisper』シリーズ（ディフューザー・ハンドミスト）",
      hours: "11:00〜20:00（年中無休）",
      address: "沖縄県中頭郡北谷町美浜9-12 Seaside Ryuka Lounge",
    },
  ];

  // スクロールアニメーション
  useEffect(() => {
    const scenes = document.querySelectorAll(".scene");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const delay = index * 60;
            setTimeout(() => entry.target.classList.add("show"), delay);
          }
        });
      },
      { threshold: 0.2 }
    );
    scenes.forEach((s) => observer.observe(s));
    return () => scenes.forEach((s) => observer.unobserve(s));
  }, []);

  return (
    <main className="store-page">

      <StoreHero /> {/* ← ここで海風ヒーローを呼び出す */}

      {/* 🗺️ 香りの地図 */}
      <section className="store-map-nav">
        <h2 className="map-title">香りの地図 — Explore Ryuka</h2>
        <div className="map-links">
          <a href="#miyako" className="map-item" data-label="宮古島店">☀️</a>
          <a href="#airport" className="map-item" data-label="空港店">✈️</a>
          <a href="#kokusaidori" className="map-item" data-label="国際通り">🕯️</a>
          <a href="#chatan" className="map-item" data-label="北谷美浜">🌊</a>
          <a href="#yomitan-atelier" className="map-item" data-label="読谷工房">🏺</a>
        </div>
      </section>

      {stores.map((store) => (
        <section key={store.id} id={store.id} className="scene">
          <img src={store.image} alt={store.title} className="scene-bg" />
          <div className="product-card">
            <img
              src={store.product}
              alt={store.productName}
              className="product-bottle"
            />
            <div className="product-meta">
              <h3>{store.title}</h3>
              <p>{store.description}</p>
              <p>
                <strong>取扱商品：</strong>{store.products}<br />
                <strong>営業時間：</strong>{store.hours}<br />
                <strong>住所：</strong>{store.address}
              </p>
            </div>
          </div>
        </section>
      ))}

      <section id="yomitan-atelier" className="atelier-section scene">
        <div className="atelier-image">
          <img src="/image/recycled_glass1.webp" alt="読谷アトリエ" />
        </div>
        <div className="atelier-content">
          <h2>読谷アトリエ — 香りを創る工房</h2>
          <p>
            再生ガラスと香りの工房。職人の指導のもと、キャンドル制作や調香体験ができます。<br />
            琉香の香りはこのアトリエで生まれ、すべての店舗へと旅立ちます。
          </p>
          <ul>
            <li>体験時間：60〜90分</li>
            <li>開催日：金曜〜日曜（要予約）</li>
            <li>料金：¥4,800（税込・材料費込）</li>
          </ul>
          <Link to="/workshop" className="btn atelier-btn">
            工房体験ページへ →
          </Link>
        </div>
      </section>

      <footer className="store-footer">
        <p>MADE IN OKINAWA — RYUKA Aroma & Candle</p>
      </footer>
    </main>
  );
}
