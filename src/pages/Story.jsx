import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Story.module.css";

export default function Story({ isMorning, handleToggle }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);
/* ===============================
   🌬 奇跡の香粉アニメーション — 超軽量GPUフレンドリー版（修正版）
=============================== */
useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  // 🌿 粒子生成
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

  // 💫 合成設定を一度だけ
  ctx.globalCompositeOperation = isMorning ? "screen" : "lighter";

  let frame = 0;
  const draw = () => {
    frame++;

    // 🔹 背景を完全に塗りつぶさない（透明維持）
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      const light = isMorning ? 80 : 60;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

      ctx.fillStyle = `hsla(${p.hue}, 100%, ${light}%, ${p.o})`;
      ctx.shadowBlur = isMorning ? 6 : 4;
      ctx.shadowColor = isMorning
        ? "hsla(170, 100%, 90%, 0.6)"
        : "hsla(35, 80%, 70%, 0.4)";
      ctx.fill();

      // 🫧 軽量な移動式
      p.y += p.dy;
      p.x += p.dx + Math.sin(frame / 400 + p.y * 0.03) * 0.05;
      if (p.y > h + 10) p.y = -10;
    }

    requestAnimationFrame(draw);
  };

  draw();

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  return () => window.removeEventListener("resize", resize);
}, [isMorning]);
// 🌊 スクロール光オーバーレイ（朝夜対応版）
useEffect(() => {
  const layer = document.createElement("div");
  layer.className = styles.scrollLight;
  document.body.appendChild(layer);

  // 朝と夜で色を切り替え
  const setGradient = () => {
    layer.style.background = isMorning
      ? `linear-gradient(
          180deg,
          rgba(255, 240, 200, 0.06) 0%,
          rgba(255, 255, 255, 0.12) 25%,
          rgba(255, 230, 170, 0.08) 60%,
          rgba(255, 255, 255, 0.03) 100%
        )`
      : `linear-gradient(
          180deg,
          rgba(232, 179, 126, 0.05) 0%,
          rgba(200, 160, 110, 0.08) 25%,
          rgba(140, 100, 70, 0.05) 60%,
          rgba(60, 40, 20, 0.02) 100%
        )`;
  };

  setGradient();

  const handleScroll = () => {
    const scrollY = window.scrollY || 0;
    const move = (scrollY * 0.3) % window.innerHeight;
    layer.style.backgroundPosition = `center ${move}px`;
    layer.style.opacity = Math.min(0.6, 0.4 + scrollY / 2000);
  };

  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
    layer.remove();
  };
}, [isMorning]);

// 🌸 Philosophyフェードイン制御
useEffect(() => {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.showPhilosophy);
        }
      });
    },
    { threshold: 0.4 }
  );

  const targets = document.querySelectorAll(`.${styles.philosophyFade}`);
  targets.forEach((el) => io.observe(el));

  return () => io.disconnect();
}, []);

/* ===============================
   🎧 動画サウンド制御（完全安定版）
=============================== */
useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  // 音設定
  video.muted = !soundOn;

  // 夜・朝の切り替え時に正しく再生されるようにする
  const handleCanPlay = () => {
    // load完了してからplay開始（←重要）
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // ブラウザが自動再生をブロックした場合の救済措置
        console.warn("Autoplay blocked — waiting for user interaction");
      });
    }
  };

  // 一度ロードしてから再生する
  video.load();
  video.addEventListener("canplay", handleCanPlay);

  return () => {
    video.removeEventListener("canplay", handleCanPlay);
  };
}, [soundOn, isMorning]);

  /* ===============================
     ✨ フェードイン制御
  =============================== */
  useEffect(() => {
    window.scrollTo(0, 0);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.show);
        });
      },
      { threshold: 0.2 }
    );
    rootRef.current
      ?.querySelectorAll(`.${styles.reveal}`)
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
/* ===============================
   💫 文字に粉がふりかかる演出
=============================== */
useEffect(() => {
  const textEls = rootRef.current?.querySelectorAll(`.${styles.reveal}`);
  if (!textEls) return;

  textEls.forEach((el, i) => {
    el.addEventListener("transitionend", () => {
      // 光がふりかかるエフェクトを付与
      el.classList.add(styles.glow);
      setTimeout(() => el.classList.remove(styles.glow), 2000 + i * 100);
    });
  });
}, []);

  const videoSrc = isMorning
    ? "image/story-bg-morning.webm"
    : "image/story-bg-night.webm";

  return (
    <main
      ref={rootRef}
      className={`${styles.story} ${isMorning ? styles.day : styles.night}`}
    >
      {/* ✨ 奇跡の粉 */}
      <canvas ref={canvasRef} className={styles.lightCanvas}></canvas>

      {/* 🎞️ Hero */}
      <section className={styles.hero}>
        <video
          key={videoSrc}
          ref={videoRef}
          className={styles.bgVideo}
          src={videoSrc}
          autoPlay
          loop
          playsInline
          muted={!soundOn}
        ></video>

        <div
          className={`${styles.overlay} ${
            isMorning ? styles.overlayDay : styles.overlayNight
          }`}
        ></div>

        <div className={styles.heroInner}>
          <p className={styles.catch}>光が砕け、香りが生まれた。</p> {/* ←追加 */}
          <h1 className={styles.title}>Story</h1>
          <p className={`${styles.lead} ${styles.reveal}`}>
            光は、記憶を照らす。<br />
            そして香りは、その記憶を呼び覚ます。
          </p>

          <button className={styles.toggleBtn} onClick={handleToggle}>
            {isMorning ? "🌙 夜の物語へ" : "☀️ 朝の物語へ"}
          </button>

          <button
            className={styles.soundBtn}
            onClick={() => setSoundOn(!soundOn)}
          >
            {soundOn ? "🔇 サウンドOFF" : "🔊 サウンドON"}
          </button>
        </div>
      </section>

      {/* 🕯 Story本文 */}
      <section className={styles.section}>
        <div className={`${styles.block} ${styles.reveal}`}>
          <h2 className={styles.h2}>Awakening — 光の再生</h2>
          <p className={styles.text}>
            砕けた琉球ガラスの欠片が、朝の光に再び目を覚ます。<br />
            香りは、記憶を閉じ込める器。<br />
            光が割れた時、香りは生まれる。
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`}>
        <div className={`${styles.block} ${styles.reveal}`}>
          <h2 className={styles.h2}>Breath — 手が記憶を磨く</h2>
          <p className={styles.text}>
            手の温度、波の記憶、風のリズム。<br />
            職人の呼吸とともに、香りが形を得る。<br />
            琉球の風を封じたガラスの欠片が、香りという魂を宿していく。
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.full} ${styles.reveal}`}>
          <h2 className={styles.h2}>Memory — 奇跡の香粉</h2>
          <p className={styles.phrase}>
            香りは再び光になる。<br />
            それは、過去を浄化し、未来へ続く奇跡の証。
          </p>
        </div>
      </section>
{/* ============================= */}
{/* 🌿 Philosophy — ブランド理念 */}
{/* ============================= */}
<section className={`${styles.philosophy} ${styles.reveal}`}>
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
        <span> — 壊れたものの中に、再び命を見出す。</span>
      </li>
      <li>
        <strong>Harmony</strong>
        <span> — 自然と人、光と香りの調和を重んじる。</span>
      </li>
      <li>
        <strong>Silence</strong>
        <span> — 静寂の中にこそ、真の美が宿る。</span>
      </li>
      <li>
        <strong>Sincerity</strong>
        <span> — 沖縄の自然と文化への敬意を忘れない。</span>
      </li>
      <li>
        <strong>Artistry</strong>
        <span> — 香りも、光も、空間も、すべてが芸術である。</span>
      </li>
    </ul>

    <p className={styles.philosophyQuote}>
      “Beauty is not found in perfection,<br />but in revival.”
    </p>

    <div className={styles.lightLayer}></div>
  </div>
</section>

    <section className={styles.epilogue}>
  <p className={styles.epiText}>
    光と香りは、同じ記憶を共有している。
  </p>
  <p className={styles.epilogueQuote}>
    “You saw the world upside down.<br />
    But maybe that was the only way to see the truth.”
  </p>
</section>

    </main>
  );
}
