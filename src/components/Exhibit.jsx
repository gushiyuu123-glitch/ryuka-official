import React, { useEffect, useRef, useState } from "react";
import "../styles/exhibit.css";
import { Link } from "react-router-dom";

export default function Exhibit({ isMorning }) {
  const exhibitRef = useRef(null);
  const videoRef = useRef(null);
  const [videoVisible, setVideoVisible] = useState(false);

  // 🔹 スクロール時にアイテムをフェードイン
  useEffect(() => {
    const items = exhibitRef.current?.querySelectorAll(".exhibit-item");
    if (!items) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.3 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 🎥 動画の再生を「見えてる時だけ」に制御
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVideoVisible(entry.isIntersecting);
          if (entry.isIntersecting) video.play();
          else video.pause();
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isMorning]);

  const products = [
    {
      name: "Gōya Mist",
      desc: `朝露のゴーヤーを思わせる爽やかなグリーンノート。<br />ミントとシークヮーサーの清涼が、心を静かに整える。`,
      img: "/image/Goya.webp",
      link: "/collection/goya",
      btn: "Breathe in the Morning",
    },
    {
      name: "Hibiscus Candle",
      desc: "南風に揺れる花びらのように、静かな情熱を灯す。フローラルの余韻が、夜の静けさに溶けていく。",
      img: "/image/Hibiscus.webp",
      link: "/collection/hibiscus",
      btn: "Light the Silence",
    },
    {
      name: "Gettō Perfume",
      desc: "古くから『守りの香り』として愛されてきた月桃。ベルガモットの光が、記憶の奥に静かに息づく。",
      img: "/image/Getto.webp",
      link: "/collection/getto",
      btn: "Touch the Memory",
    },
    {
      name: "Sea Glass Diffuser",
      desc: "琉球の海色を閉じ込めたディフューザー。ホワイトティーと潮風の香りが、心を浄化する。",
      img: "/image/Sea.webp",
      link: "/collection/seaglass",
      btn: "Feel the Sea",
    },
    {
      name: "Sugar Cane Candle",
      desc: "黒糖のような甘く香ばしいトーン。炎の揺らぎが、島の夜を思い出させる。",
      img: "/image/Sugar.webp",
      link: "/collection/sugar",
      btn: "Warm the Night",
    },
  ];

  return (
    <section
      className={`exhibit ${isMorning ? "day" : "night"}`}
      ref={exhibitRef}
      aria-label="香りの展示空間"
    >
      {/* 🎥 背景動画（見えてる時だけ再生） */}
      <video
        ref={videoRef}
        key={isMorning ? "morning-video" : "night-video"}
        className={`product-bg ${isMorning ? "morning" : "night"}`}
        muted
        loop
        playsInline
        preload="none"
      >
        <source
          src={
            isMorning
              ? "/image/ryuka-morning.mp4"
              : "/image/ryuka-night1.mp4"
          }
          type="video/mp4"
        />
      </video>

      {/* 🕯️ タイトル */}
      <h2 className="exhibit-title">
        Fragrance Exhibition
        <br />
        <span>— 香りの記憶をたどる旅 —</span>
      </h2>

      {/* 💐 商品展示 */}
      <div className="exhibit-list">
        {products.map((item, i) => (
          <div
            key={item.name}
            className={`exhibit-item ${i % 2 === 1 ? "reverse" : ""}`}
            data-dir={i % 2 === 0 ? "right" : "left"}
          >
            <div className="caption">
              <h3>{item.name}</h3>
              <p dangerouslySetInnerHTML={{ __html: item.desc }}></p>
              <a href={item.link} className="brand-link">
                {item.btn}
              </a>
            </div>
            <div className="image">
              <img
                src={item.img}
                alt={`${item.name} の香り`}
                loading="lazy" // ←★これだけで体感軽くなる
              />
            </div>
          </div>
        ))}

        {/* 💌 Gift Section */}
        <div className="exhibit-item postcard">
          <div className="mist-layer"></div>
          <div className="image">
            <img
              src="/image/Postcard1.webp"
              alt="Gift Collection"
              loading="lazy"
            />
          </div>
          <div className="caption">
            <h3>Gift Collection — 香りを贈る</h3>
            <p>
              琉香の香りを、大切な人へ。<br />
              ポストカードやキャンドル、ディフューザーを<br />
              ギフトボックスに込めてお届けします。
            </p>
            <span>— For someone you cherish —</span>
            <br />
            <br />
            <Link to="/gift" className="brand-link">
              View Gift Page →
            </Link>
          </div>
        </div>

        {/* 🌿 Fragrance Navigation Section */}
        <div className="fragrance-nav">
          <p>香りの旅を、もう少しだけ進みますか。</p>
          <div className="nav-links">
            <a href="/collection" className="nav-link">
              View Collection
            </a>
            <a href="/diagnosis" className="nav-link">
              Find Your Scent
            </a>
          </div>
        </div>
      </div>

      {/* 🪞 サイン */}
      <p className="exhibit-end">MADE IN OKINAWA — RYUKA Aroma & Candle</p>
    </section>
  );
}
