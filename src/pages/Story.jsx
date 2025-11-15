// src/pages/Story.jsx
import React, { useEffect, useRef } from "react";
import styles from "../styles/Story.module.css";

export default function Story({ isMorning, handleToggle }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  /* ===============================
     🌬 奇跡の香粉アニメーション
  =============================== */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particleCount = 36;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.6,
      dy: Math.random() * 0.2 + 0.05,
      dx: (Math.random() - 0.5) * 0.1,
      hue: isMorning ? 170 : 35,
      o: Math.random() * 0.5 + 0.4,
    }));

    ctx.globalCompositeOperation = isMorning ? "screen" : "lighter";

    let frame = 0;
    let rafId;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,${
          isMorning ? 80 : 60
        }%,${p.o})`;
        ctx.shadowBlur = isMorning ? 6 : 4;
        ctx.shadowColor = isMorning
          ? "hsla(170,100%,90%,0.6)"
          : "hsla(35,80%,70%,0.4)";
        ctx.fill();

        p.y += p.dy;
        p.x += p.dx + Math.sin(frame / 400 + p.y * 0.03) * 0.05;
        if (p.y > h + 10) p.y = -10;
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [isMorning]);

  /* ===============================
      🌊 スクロール光
  =============================== */
  useEffect(() => {
    const layer = document.createElement("div");
    layer.className = styles.scrollLight;
    document.body.appendChild(layer);

    const setGradient = () => {
      layer.style.background = isMorning
        ? `linear-gradient(
            180deg,
            rgba(255,240,200,0.06) 0%,
            rgba(255,255,255,0.12) 25%,
            rgba(255,230,170,0.08) 60%,
            rgba(255,255,255,0.03) 100%
          )`
        : `linear-gradient(
            180deg,
            rgba(232,179,126,0.05) 0%,
            rgba(200,160,110,0.08) 25%,
            rgba(140,100,70,0.05) 60%,
            rgba(60,40,20,0.02) 100%
          )`;
    };

    setGradient();

    const handleScroll = () => {
      const move = (window.scrollY * 0.3) % window.innerHeight;
      layer.style.backgroundPosition = `center ${move}px`;
      layer.style.opacity = Math.min(0.6, 0.4 + window.scrollY / 2000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      layer.remove();
    };
  }, [isMorning]);

  /* ===============================
      🌸 Philosophy フェード
  =============================== */
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting)
            entry.target.classList.add(styles.showPhilosophy);
        });
      },
      { threshold: 0.4 }
    );

    const target = document.querySelector(`.${styles.philosophyInner}`);
    if (target) io.observe(target);

    return () => io.disconnect();
  }, []);

  /* ===============================
      ✨ Reveal（共通）
  =============================== */
  useEffect(() => {
    window.scrollTo(0, 0);
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add(styles.show);
        });
      },
      { threshold: 0.2 }
    );

    const reveals = root.querySelectorAll(`.${styles.reveal}`);
    reveals.forEach(el => io.observe(el));

    const handleEnd = e => {
      const el = e.currentTarget;
      el.classList.add(styles.glow);
      setTimeout(() => el.classList.remove(styles.glow), 2000);
    };
    reveals.forEach(el =>
      el.addEventListener("transitionend", handleEnd, { once: true })
    );

    return () => {
      io.disconnect();
      reveals.forEach(el =>
        el.removeEventListener("transitionend", handleEnd)
      );
    };
  }, []);

  return (
<main
  ref={rootRef}
  className={`${styles.story} ${isMorning ? styles.day : styles.night}`}
>
  <canvas ref={canvasRef} className={styles.lightCanvas}></canvas>

      {/* ===========================
          🎞 HERO
      ============================ */}
      <section className={styles.hero}>
        <div
          className={styles.heroBg}
          style={{
            backgroundImage: `url(${
              isMorning
                ? "image/story_morning_glass1.webp"
                : "image/story_night_glass3.webp"
            })`,
          }}
        />
        <div
          className={`${styles.overlay} ${
            isMorning ? styles.overlayDay : styles.overlayNight
          }`}
        />
        <div className={styles.heroInner}>
          <p className={styles.catch}>光が砕け、香りが生まれた。</p>
          <h1 className={styles.title}>Story</h1>
          <p className={`${styles.lead} ${styles.reveal}`}>
            光は、記憶を照らす。<br />
            そして香りは、その記憶を呼び覚ます。
          </p>
          <button className={styles.toggleBtn} onClick={handleToggle}>
            {isMorning ? "🌙 夜の物語へ" : "☀️ 朝の物語へ"}
          </button>
        </div>
      </section>
{/* ===========================
    Chapter 1 — Awakening
=========================== */}
<section className={`${styles.section} ${styles.chapter1}`}>

  {/* ゆらめく固定ガラスレイヤー（背景） */}
  <div className={styles.chapterGlassLayer1}></div>
  <div className={styles.chapterGlassLayer2}></div>
  <div className={styles.chapterGlassLayer3}></div>
  <div className={styles.chapterGlassLayer4}></div>

  {/* Falling Glass（Chapter1 専用） */}
{/* Falling Glass Layer — 中央に偏らせる完全版 */}
<div className={styles.fallingGlass}>
  {Array.from({ length: 6 }).map((_, i) => {
    // 🎯 中央寄せロジック（50% ± 15%）
    const centerBias = 50 + (Math.random() - 0.5) * 30;

    return (
      <span
        key={i}
        style={{
          "--x": `${(Math.random() - 0.5) * 40}px`,     // 横揺れ幅は控えめ
          "--s": `${0.7 + Math.random() * 1.1}`,        // サイズばらけ
          left: `${centerBias}%`,                       // ★中央寄せ
          animationDuration: `${18 + Math.random() * 14}s`,
          animationDelay: `${-(Math.random() * 24)}s`,  // ★重なり防止のためランダム遅延
        }}
      />
    );
  })}
</div>


  <div className={`${styles.block} ${styles.reveal}`}>
    <p className={styles.chapter}>Chapter 1 — Awakening</p>
    <h2 className={styles.h2}>Awakening — 光の再生</h2>
    <p className={styles.text}>
      砕けた琉球ガラスの欠片が、朝の光に再び目を覚ます。<br />
      香りは、記憶を閉じ込める器。<br />
      光が割れた時、香りは生まれる。
    </p>
  </div>

  <div className={`${styles.visual} ${styles.reveal}`}>
    <div className={`${styles.visualFrame} ${styles.visualAwakening}`} />
  </div>
</section>


{/* ===========================
    Chapter 2 — Breath
=========================== */}
<section className={`${styles.section} ${styles.alt} ${styles.chapter2}`}>

  <div className={styles.chapterGlassLayer1}></div>
  <div className={styles.chapterGlassLayer2}></div>
  <div className={styles.chapterGlassLayer3}></div>
  <div className={styles.chapterGlassLayer4}></div>

  {/* Falling Glass（Chapter2 は温度感を強めに） */}
{/* Falling Glass Layer — 中央に偏らせる完全版 */}
<div className={styles.fallingGlass}>
  {Array.from({ length: 6 }).map((_, i) => {
    // 🎯 中央寄せロジック（50% ± 15%）
    const centerBias = 25+ (Math.random() - 0.5) * 20;

    return (
      <span
        key={i}
        style={{
          "--x": `${(Math.random() - 0.5) * 40}px`,     // 横揺れ幅は控えめ
          "--s": `${0.7 + Math.random() * 1.1}`,        // サイズばらけ
          left: `${centerBias}%`,                       // ★中央寄せ
          animationDuration: `${18 + Math.random() * 14}s`,
          animationDelay: `${-(Math.random() * 24)}s`,  // ★重なり防止のためランダム遅延
        }}
      />
    );
  })}
</div>



  <div className={`${styles.block} ${styles.reveal}`}>
    <p className={styles.chapter}>Chapter 2 — Breath</p>
    <h2 className={styles.h2}>Breath — 手が記憶を磨く</h2>
    <p className={styles.text}>
      手の温度、波の記憶、風のリズム。<br />
      職人の呼吸とともに、香りが形を得る。<br />
      琉球の風を封じたガラスの欠片が、香りという魂を宿していく。
    </p>
  </div>

  <div className={`${styles.visual} ${styles.reveal}`}>
    <div className={`${styles.visualFrame} ${styles.visualBreath}`} />
  </div>
</section>

{/* ===========================
    Chapter 3 — Memory
=========================== */}
<section className={`${styles.section} ${styles.chapter3}`}>

  <div className={styles.chapterGlassLayer1}></div>
  <div className={styles.chapterGlassLayer2}></div>
  <div className={styles.chapterGlassLayer3}></div>
  <div className={styles.chapterGlassLayer4}></div>

  {/* Falling Glass（Chapter3 は最も深く、量多め） */}
{/* Falling Glass Layer — 中央に偏らせる完全版 */}
<div className={styles.fallingGlass}>
  {Array.from({ length: 6 }).map((_, i) => {
    // 🎯 中央寄せロジック（50% ± 15%）
    const centerBias = 50 + (Math.random() - 0.5) * 30;

    return (
      <span
        key={i}
        style={{
          "--x": `${(Math.random() - 0.5) * 40}px`,     // 横揺れ幅は控えめ
          "--s": `${0.7 + Math.random() * 1.1}`,        // サイズばらけ
          left: `${centerBias}%`,                       // ★中央寄せ
          animationDuration: `${18 + Math.random() * 14}s`,
          animationDelay: `${-(Math.random() * 24)}s`,  // ★重なり防止のためランダム遅延
        }}
      />
    );
  })}
</div>



  <div className={`${styles.full} ${styles.reveal}`}>
    <p className={styles.chapter}>Chapter 3 — Memory</p>
    <h2 className={styles.h2}>Memory — 奇跡の香粉</h2>
    <p className={styles.phrase}>
      香りは再び光になる。<br />
      それは、過去を浄化し、未来へ続く奇跡の証。
    </p>
  </div>
</section>


      {/* ===========================
          Philosophy
      ============================ */}
      <section className={`${styles.philosophy} ${styles.reveal}`}>
        
  {/* 落下ガラス（哲学セクションは落ち着いた少なめ） */}
<div className={styles.fallingGlass}>
  {Array.from({ length: 6 }).map((_, i) => {
    // 🎯 中央寄せロジック（50% ± 15%）
    const centerBias = 25+ (Math.random() - 0.5) * 40;

    return (
      <span
        key={i}
        style={{
          "--x": `${(Math.random() - 0.5) * 40}px`,     // 横揺れ幅は控えめ
          "--s": `${0.7 + Math.random() * 1.1}`,        // サイズばらけ
          left: `${centerBias}%`,                       // ★中央寄せ
          animationDuration: `${18 + Math.random() * 14}s`,
          animationDelay: `${-(Math.random() * 24)}s`,  // ★重なり防止のためランダム遅延
        }}
      />
    );
  })}
</div>

        <canvas id="philosophyParticles"></canvas>
        <div className={styles.philosophyInner}>
          <h2 className={`${styles.philosophyTitle} ${styles.philosophyFade}`}>
            Philosophy <span>— 光と香りの再生</span>
          </h2>

          <p className={`${styles.philosophyLead} ${styles.philosophyFade}`}>
            琉香（Ryuka）は、<strong>“再生の美”</strong>を核にしたブランドです。<br />
            割れた琉球ガラスの欠片に、もう一度光を灯し、<br />
            香りを通して、人の心に“静かな希望”を届ける。<br />
            それが、私たちが信じる <em>Art of Rebirth</em> — 再生の芸術です。
          </p>

          <ul className={styles.values}>
            <li>
              <strong>Rebirth</strong>
              <span> — 壊れたものの中に命を見出す。</span>
            </li>
            <li>
              <strong>Harmony</strong>
              <span> — 自然と人の調和。</span>
            </li>
            <li>
              <strong>Silence</strong>
              <span> — 静寂に宿る美。</span>
            </li>
            <li>
              <strong>Sincerity</strong>
              <span> — 沖縄への敬意。</span>
            </li>
            <li>
              <strong>Artistry</strong>
              <span> — 光と香りの芸術。</span>
            </li>
          </ul>

          <p className={styles.philosophyQuote}>
            “Beauty is not found in perfection,<br />
            but in revival.”
          </p>

          <div className={styles.lightLayer}></div>
        </div>
      </section>

      {/* ===========================
          Epilogue
      ============================ */}
      <section className={styles.epilogue}>
        <p className={styles.epiText}>光と香りは、同じ記憶を共有している。</p>
        <p className={styles.epilogueQuote}>
          “You saw the world upside down.<br />
          But maybe that was the only way to see the truth.”
        </p>
      </section>
    </main>
  );
}
