import React, { useEffect, useRef, useState } from "react";
import "../styles/exhibit.css";
import { Link } from "react-router-dom";

export default function Exhibit({ isMorning }) {
  const exhibitRef = useRef(null);
  const videoRef = useRef(null);
  const navRef = useRef(null); // 🌿 Fragrance Navigation 用
  const canvasRef = useRef(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const [lightboxData, setLightboxData] = useState(null); // 🪞 Lightbox 状態管理

  /* =============================
     ✨ 商品フェードイン制御
  ============================= */
  useEffect(() => {
    const items = exhibitRef.current?.querySelectorAll(".exhibit-item");
    if (!items) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.25 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
/* =============================
   🎥 背景動画制御（朝・夜どちらも動画／裏は完全停止）
============================= */
useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  // まず一旦すべての再生を止めて安全リセット
  video.pause();

  // ソース切り替え
  const sourceWebm = isMorning
    ? "/image/ryuka-morning1.webm"
    : "/image/ryuka-night2.webm";
  const sourceMp4 = isMorning
    ? "/image/ryuka-morning1.mp4"
    : "/image/ryuka-night1.mp4";

  // 一度srcをリセットして再読み込み（メモリ解放）
  video.innerHTML = `
    <source src="${sourceWebm}" type="video/webm" />
    <source src="${sourceMp4}" type="video/mp4" />
  `;
  video.load();

  // スクロール範囲にあるときだけ再生
  const observer = new IntersectionObserver(
    ([entry]) => {
      const visible = entry.isIntersecting;
      setVideoVisible(visible);
      if (visible) {
        video.play().catch(() => {}); // 再生エラー回避
      } else {
        video.pause();
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(video);
  return () => observer.disconnect();
}, [isMorning]);

  /* =============================
     🌠 Fragrance Navigation 粒子アニメーション
  ============================= */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const particles = [];

    const color = isMorning
      ? ["rgba(255,255,240,0.6)", "rgba(180,230,220,0.4)"]
      : ["rgba(240,200,150,0.4)", "rgba(80,100,140,0.25)"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 300;
    };
    window.addEventListener("resize", resize);
    resize();

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: Math.random() * 0.3 + 0.2,
        color: color[Math.floor(Math.random() * color.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y > canvas.height) p.y = -10;
        if (p.x > canvas.width || p.x < 0) p.dx *= -1;
      }
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("resize", resize);
  }, [isMorning]);

  /* =============================
     📦 商品データ配列
  ============================= */
  const products = [
    {
      name: "Gōya Mist",
      desc: `朝露のゴーヤーを思わせる爽やかなグリーンノート。<br />
             ミントとシークヮーサーの清涼が、心を静かに整える。`,
      img: "/image/Goya.webp",
      btn: "Breathe in the Morning",
      details:
        "内容量 50ml ／ シークヮーサー果皮油・ミント精油・ゴーヤーエキス配合。朝の光に包まれるような清らかな香りで、日常の始まりを穏やかに整えます。",
      price: "¥3,200（税込）",
    },
    {
      name: "Hibiscus Candle",
      desc: "南風に揺れる花びらのように、静かな情熱を灯す。フローラルの余韻が、夜の静けさに溶けていく。",
      img: "/image/Hibiscus.webp",
      btn: "Light the Silence",
      details:
        "燃焼時間 約40時間 ／ ソイワックス・ハイビスカスエッセンス使用。赤い花のような穏やかな甘さで、夜をやさしく包み込みます。",
      price: "¥4,500（税込）",
    },
    {
      name: "Gettō Perfume",
      desc: "古くから『守りの香り』として愛されてきた月桃。ベルガモットの光が、記憶の奥に静かに息づく。",
      img: "/image/Getto.webp",
      btn: "Touch the Memory",
      details:
        "内容量 30ml ／ 月桃葉エキス・ベルガモット果皮油配合。瑞々しい青さと安らぎをあわせ持つ香りで、心を静かに落ち着かせます。",
      price: "¥6,800（税込）",
    },
    {
      name: "Sea Glass Diffuser",
      desc: "琉球の海色を閉じ込めたディフューザー。ホワイトティーと潮風の香りが、心を浄化する。",
      img: "/image/Sea.webp",
      btn: "Feel the Sea",
      details:
        "内容量 100ml ／ 香調：ホワイトティー＆マリン。透明な海のように澄んだ香りが、空間をやさしく包みます。",
      price: "¥5,600（税込）",
    },
    {
      name: "Sugar Cane Candle",
      desc: "黒糖のような甘く香ばしいトーン。炎の揺らぎが、島の夜を思い出させる。",
      img: "/image/Sugar.webp",
      btn: "Warm the Night",
      details:
        "燃焼時間 約35時間 ／ ソイワックス・黒糖エッセンス配合。温かみのある甘さが、ゆるやかな幸福感を灯します。",
      price: "¥4,200（税込）",
    },
  ];

  /* =============================
     🌿 JSX構成
  ============================= */
  return (
    <section
      ref={exhibitRef}
      className={`exhibit ${isMorning ? "day" : "night"}`}
      aria-label="香りの展示空間"
    >
      {/* 🎥 背景動画 */}
      <video
        ref={videoRef}
        key={isMorning ? "morning-video" : "night-video"}
        className={`product-bg ${isMorning ? "morning" : "night"}`}
        muted
        loop
        playsInline
        preload="auto"
        poster={isMorning ? "/image/ryuka-morning.webp" : "/image/ryuka-night1.webp"}
      >
        <source
          src={isMorning ? "/image/ryuka-morning1.webm" : "/image/ryuka-night2.webm"}
          type="video/webm"
        />
        <source
          src={isMorning ? "/image/ryuka-morning1.mp4" : "/image/ryuka-night1.mp4"}
          type="video/mp4"
        />
      </video>

      {/* 🕯️ タイトル */}
      <h2 className="exhibit-title">
        Fragrance Exhibition
        <br />
        <span>— 香りの記憶をたどる旅 —</span>
      </h2>

      {/* 💐 商品展示リスト */}
      <div className="exhibit-list">
        {products.map((item, i) => (
          <div
            key={item.name}
            className={`exhibit-item ${i % 2 === 1 ? "reverse" : ""}`}
            data-dir={i % 2 === 0 ? "right" : "left"}
          >
            <div className="caption">
              <h3>{item.name}</h3>
              <p dangerouslySetInnerHTML={{ __html: item.desc }} />
              <button
                className="brand-link"
                onClick={() => setLightboxData(item)}
              >
                {item.btn}
              </button>
            </div>
            <div className="image">
              <img src={item.img} alt={`${item.name} の香り`} loading="lazy" />
            </div>
          </div>
        ))}

        {/* 💌 Gift セクション */}
        <div className="exhibit-item postcard">
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

        {/* 🌿 Fragrance Navigation */}
        <div className="fragrance-nav" ref={navRef}>
          <canvas ref={canvasRef} className="nav-canvas"></canvas>
          <p>香りの旅を、もう少しだけ進みますか。</p>
          <div className="nav-links">
            <Link to="/boutique" className="nav-link">
              香りに出会う
            </Link>
            <Link to="/diagnosis" className="nav-link">
              あなたに合う香りを診断する
            </Link>
          </div>
        </div>
      </div>

      {/* 🪞 ライトボックス */}
      {lightboxData && (
        <div className="lightbox" onClick={() => setLightboxData(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxData.img} alt={lightboxData.name} />
            <div className="lightbox-text">
              <h3>{lightboxData.name}</h3>
              <p>{lightboxData.details}</p>
              <p className="price subtle">
                価格：<span>{lightboxData.price}</span>
              </p>
              <button
                className="close-btn"
                onClick={() => setLightboxData(null)}
              >
                ✕ 閉じる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🪞 サイン */}
      <p className="exhibit-end">MADE IN OKINAWA — RYUKA Aroma & Candle</p>
    </section>
  );
}
