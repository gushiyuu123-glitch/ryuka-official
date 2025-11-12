// ===============================
// Gift.jsx — 琉香 ギフトページ（完全版）
// ===============================
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/gift.css";

gsap.registerPlugin(ScrollTrigger);

export default function Gift({ isMorning }) {
  const canvasRef = useRef(null);

  // 🌤 Hero 光のゆらぎエフェクト
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const t = Date.now() * 0.0002;
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, `rgba(255,240,210,${0.1 + 0.05 * Math.sin(t)})`);
      grad.addColorStop(1, `rgba(255,255,255,${0.05 + 0.04 * Math.cos(t * 1.5)})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(render);
    };
    render();

    return () => window.removeEventListener("resize", resize);
  }, []);

  // 🎞 スクロールアニメーション（特典セクション）
  useEffect(() => {
    gsap.utils.toArray(".bonus-item").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section className={`gift ${isMorning ? "day" : "night"}`}>
      {/* ----------------------------
          🎁 Hero Section
      ---------------------------- */}
      <div className="gift-hero">
        <canvas id="giftLight" ref={canvasRef}></canvas>
        <img
          src="/image/gift_hero.webp"
          alt="琉香ギフト"
          className="gift-hero-img"
          loading="eager"
        />
        <div className="gift-hero-overlay"></div>


        <div className="gift-hero-content">
          <h1>香りで、沖縄を贈る。</h1>
          <p>
            琉球ガラスのきらめきと、島の花の余韻を。
            <br />
            誕生日・記念日・お礼に、心を込めて。
          </p>
        </div>
      </div>

      {/* ----------------------------
          🌸 Gift Features
      ---------------------------- */}
      <div className="gift-feature">
        <h2>Gift Benefits</h2>
        <p>
          琉香のギフトは、香りとともに沖縄の空気を届けます。
          <br />
          すべてのギフトには、<span>ポストカード</span>と
          <span>アロマの小瓶</span>をプレゼント。
        </p>
      </div>

      {/* ----------------------------
          🎀 Gift Sets
      ---------------------------- */}
      <div className="gift-sets">
        <h2>おすすめギフトセット</h2>
        <div className="gift-cards">
          {/* --- セット1 --- */}
          <div className="gift-card">
            <img src="/image/gift_set1.webp" alt="海風ブレンドギフト" loading="lazy" />
            <div className="gift-card-inner">
              <h3>海風ブレンドギフト</h3>
              <ul className="set-info">
                <li>ハイビスカスキャンドル S</li>
                <li>月桃ミスト 50ml</li>
                <li>ミニ琉球ガラス皿</li>
              </ul>
              <p className="set-desc">
                朝の海を思わせる透明感ある香り。
                <br />
                爽やかな潮風と花の甘さがほどける定番セット。
              </p>
              <div className="price-tag">¥4,980（税込）</div>
            </div>
          </div>

          {/* --- セット2 --- */}
          <div className="gift-card">
            <img src="/image/gift_set2.webp" alt="琉球ガラス アロマデュオ" loading="lazy" />
            <div className="gift-card-inner">
              <h3>琉球ガラス アロマデュオ</h3>
              <ul className="set-info">
                <li>透青ガラスベース</li>
                <li>アロマオイル 10ml ×2（ハイビスカス / 月桃）</li>
              </ul>
              <p className="set-desc">
                光を受けて香りが揺れる。
                <br />
                インテリアとしても美しい、上品なデュオセット。
              </p>
              <div className="price-tag">¥6,980（税込）</div>
            </div>
          </div>

          {/* --- セット3 --- */}
          <div className="gift-card">
            <img src="/image/gift_set3.webp" alt="島時間 リラックスセット" loading="lazy" />
            <div className="gift-card-inner">
              <h3>島時間 リラックスセット</h3>
              <ul className="set-info">
                <li>月桃キャンドル M</li>
                <li>黒糖ティーライト ×3</li>
                <li>ミニ香立て</li>
              </ul>
              <p className="set-desc">
                夜の琉球に沈むような穏やかな香り。
                <br />
                心を落ち着かせるリラックスタイムに。
              </p>
              <div className="price-tag">¥5,480（税込）</div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------
          🌺 Gift Bonus Section
      ---------------------------- */}
      <div className="gift-bonus">
        <h2>購入者特典 — あなたへ、もうひとつの香りを。</h2>
        <div className="bonus-wrapper">
          <div className="bonus-item">
            <img src="/image/gift_postcard.webp" alt="ポストカード特典" loading="lazy" />
            <div className="bonus-text">
              <h3>琉香オリジナル ポストカード</h3>
              <p>
                琉球ガラスの光をモチーフにした限定デザイン。
                <br />
                香りの余韻とともに、大切な言葉を添えて。
              </p>
            </div>
          </div>

          <div className="bonus-item">
            <img src="/image/gift_bottle.webp" alt="小瓶アロマ特典" loading="lazy" />
            <div className="bonus-text">
              <h3>小瓶アロマ（非売品）</h3>
              <p>
                琉香の人気ブレンドを少量ボトルに。
                <br />
                手首やハンカチにひと滴、香りの記憶を持ち歩けます。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------
          💌 Scene Guide
      ---------------------------- */}
      <div className="gift-guide">
        <h2>贈るシーンから選ぶ</h2>
        <div className="guide-list">
          <div className="guide-item">
            <h3>🌸 誕生日に</h3>
            <p>「おめでとう」の言葉に、香りの花束を添えて。</p>
          </div>
          <div className="guide-item">
            <h3>🌙 お礼・感謝に</h3>
            <p>月桃の香りで“ありがとう”を静かに伝える。</p>
          </div>
          <div className="guide-item">
            <h3>🌿 沖縄の想い出に</h3>
            <p>旅の光と風を小瓶に閉じ込めて贈る。</p>
          </div>
        </div>
      </div>

      {/* ----------------------------
          🌅 CTA Section
      ---------------------------- */}
      <div className="gift-cta">
        <h2>香りで、記憶に残る時間を。</h2>
        <Link to="/boutique">Boutiqueを見る</Link>
      </div>

      {/* ----------------------------
          ✨ Philosophy Line
      ---------------------------- */}
      <div className="gift-philosophy">
        <p>香りは、記憶のかけら。— 琉香</p>
      </div>
    </section>
  );
}
