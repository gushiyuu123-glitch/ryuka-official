import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero({ isMorning, setIsMorning }) {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // 🫧 泡（香りの粒）
    const bubbles = Array.from({ length: 45 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 5 + 2,
      s: Math.random() * 0.4 + 0.2,
      o: Math.random() * 0.5 + 0.3,
    }));

    let animationFrame;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach((b) => {
        b.y -= b.s;
        if (b.y < -10) {
          b.y = canvas.height + 10;
          b.x = Math.random() * canvas.width;
        }
        const color = isMorning
          ? `hsla(168, 60%, 75%, ${b.o})` // 朝：ミントガラス
          : `hsla(38, 75%, 68%, ${b.o})`; // 夜：琥珀の灯
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 2);
        g.addColorStop(0, color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [isMorning]);

  // 🌫️ GSAP：Hero全体のモード転換エフェクト
  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();
    tl.to(heroRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
    })
      .to(heroRef.current, {
        opacity: 1,
        duration: 1.0,
        ease: "power2.out",
      });
  }, [isMorning]);

  // 🌸 モード切替時の光の波
  const handleModeSwitch = () => {
    const btn = document.getElementById("modeBtn");
    gsap.fromTo(
      btn,
      { scale: 1, filter: "brightness(1)" },
      {
        scale: 1.15,
        filter: "brightness(1.8)",
        duration: 0.4,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      }
    );
    setIsMorning();
  };

  return (
    <section
      ref={heroRef}
      className={`hero ${isMorning ? "day" : "night"}`}
      aria-label="琉香ヒーロー"
    >
      {/* 🫧 泡レイヤー */}
      <canvas ref={canvasRef} id="bubbles" className="hero-bubbles"></canvas>

      {/* 背景画像 */}
      <img
        src="/image/hero-morning1.webp"
        className={`bg morning-bg ${isMorning ? "visible" : ""}`}
        alt="Morning Aroma"
      />
      <img
        src="/image/hero-night1.webp"
        className={`bg night-bg ${!isMorning ? "visible" : ""}`}
        alt="Night Aroma"
      />

      {/* テキスト */}
      <div className="hero-content">
        <h1 className="hero-title">琉香 — RYUKA</h1>
        <h2 className="hero-lead">
          {isMorning
            ? "光の中で、香りが目覚める。"
            : "静寂の中で、香りが語りはじめる。"}
        </h2>
        <p className="hero-sub">
          {isMorning
            ? "Morning Aroma — 琉球の朝、透明な記憶。"
            : "Night Aroma — 灯と香りの余韻。"}
        </p>
        <button id="modeBtn" className="mode-toggle" onClick={handleModeSwitch}>
          {isMorning ? "🌙 灯の香り" : "☀ 光の香り"}
        </button>
      </div>
    </section>
  );
}
