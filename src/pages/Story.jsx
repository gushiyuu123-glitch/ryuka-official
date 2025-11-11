import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Story.module.css";

export default function Story({ isMorning, handleToggle }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);

/* ===============================
   🫧 奇跡の香粉アニメーション（朝の粒が見えるver）
=============================== */
useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 0.6,
    dy: Math.random() * 0.3 + 0.1,
    dx: (Math.random() - 0.5) * 0.2,
    o: Math.random() * 0.5 + 0.4,
  }));

  const draw = () => {
    ctx.clearRect(0, 0, w, h);

    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

      // 🌅 朝と🌙 夜の色を強化
      const color = isMorning
        ? `hsla(170, 100%, ${80 + Math.random() * 10}%, 0.8)` // ミントブルー強調
        : `hsla(35, 90%, ${60 + Math.random() * 10}%, 0.4)`; // 琥珀光

      ctx.fillStyle = color;

      // ✨ 発光感アップ：朝だけ明るくグロー
      ctx.shadowBlur = isMorning ? 18 + Math.random() * 6 : 10;
      ctx.shadowColor = isMorning
        ? `hsla(170, 100%, 90%, 1)` // 白寄りのミント発光
        : color;

      ctx.globalAlpha = p.o;

      // 🪞 描画モード：朝はscreenで明るさを加算
      if (isMorning) ctx.globalCompositeOperation = "screen";
      else ctx.globalCompositeOperation = "lighter";

      ctx.fill();

      // 🫧 動き
      p.y += p.dy;
      p.x += p.dx + Math.sin(Date.now() / 600 + p.y * 0.05) * 0.05;
      if (p.y > h + 10) p.y = -10;
    });

    ctx.globalCompositeOperation = "source-over"; // reset
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

  /* ===============================
     🎧 動画サウンド制御
  =============================== */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !soundOn;
    video.load();
    video.play().catch(() => {});
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

      <section className={styles.epilogue}>
        <p className={`${styles.epiText} ${styles.reveal}`}>
          光と香りは、同じ記憶を共有している。
        </p>
      </section>
    </main>
  );
}
