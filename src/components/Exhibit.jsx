import React, { useEffect, useRef } from "react";
import "../styles/exhibit.css";

export default function Exhibit({ isMorning }) {
  const exhibitRef = useRef(null);

  useEffect(() => {
    const items = exhibitRef.current?.querySelectorAll(".exhibit-item");
    if (!items) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.25 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const products = [
    {
      name: "Gōya Mist",
      desc: `朝露のゴーヤーを思わせる爽やかなグリーンノート。<br />ミントとシークヮーサーの清涼が、心を静かに整える。`,
      img: "/image/Goya.webp",
      link: "https://ryuka.shop/goya",
      btn: "Breathe in the Morning",
    },
    {
      name: "Hibiscus Candle",
      desc: "南風に揺れる花びらのように、静かな情熱を灯す。フローラルの余韻が、夜の静けさに溶けていく。",
      img: "/image/Hibiscus.webp",
      link: "https://ryuka.shop/hibiscus",
      btn: "Light the Silence",
    },
    {
      name: "Gettō Perfume",
      desc: "古くから『守りの香り』として愛されてきた月桃。ベルガモットの光が、記憶の奥に静かに息づく。",
      img: "/image/Getto.webp",
      link: "https://ryuka.shop/getto",
      btn: "Touch the Memory",
    },
    {
      name: "Sea Glass Diffuser",
      desc: "琉球の海色を閉じ込めたディフューザー。ホワイトティーと潮風の香りが、心を浄化する。",
      img: "/image/Sea.webp",
      link: "https://ryuka.shop/sea",
      btn: "Feel the Sea",
    },
    {
      name: "Sugar Cane Candle",
      desc: "黒糖のような甘く香ばしいトーン。炎の揺らぎが、島の夜を思い出させる。",
      img: "/image/Sugar.webp",
      link: "https://ryuka.shop/sugar",
      btn: "Warm the Night",
    },
  ];

  return (
    <section
      className={`exhibit ${isMorning ? "morning" : "night"}`}
      ref={exhibitRef}
      aria-label="香りの展示空間"
    >
      <video
        key={isMorning ? "morning-video" : "night-video"}
        className={`product-bg ${isMorning ? "morning" : "night"}`}
        autoPlay
        muted
        loop
        playsInline
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

      <h2 className="exhibit-title">
        Fragrance Exhibition<br />
        <span>— 香りの記憶をたどる旅 —</span>
      </h2>

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
              <img src={item.img} alt={`${item.name} の香り`} />
            </div>
          </div>
        ))}

        <div className="exhibit-item postcard">
          <div className="mist-layer"></div>
          <div className="image">
            <img src="/image/Postcard.webp" alt="Gift from Ryuka" />
          </div>
          <div className="caption">
            <h3>Exhibit No.6 — Gift from Ryuka</h3>
            <p>
              香りを封じ込めたポストカード。<br />
              光と香の余韻を、あなたの手のひらへ。
            </p>
            <span>For you, from Ryuka.</span><br /><br />
            <a href="https://ryuka.shop/postcard" className="brand-link">
              Send with Scent
            </a>
          </div>
        </div>
      </div>

      <p className="exhibit-end">MADE IN OKINAWA — RYUKA Aroma & Candle</p>
    </section>
  );
}
