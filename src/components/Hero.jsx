import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "../styles/hero.css";

export default function Hero({ isMorning, setIsMorning }) {
  const canvasRef = useRef(null);
  const scentRef = useRef(null);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const [showText, setShowText] = useState(false);

  // 🌫️ 香りの泡（下層）
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

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
          ? `hsla(168, 60%, 75%, ${b.o})`
          : `hsla(38, 80%, 68%, ${b.o})`; // 夜は金色寄り
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

  // 🌤️ 光に溶ける香り（上層）
  useEffect(() => {
    const canvas = scentRef.current;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.9,
      r: Math.random() * 1.8 + 0.8,
      o: Math.random() * 0.2 + 0.2,
      c: isMorning
        ? `hsla(${Math.random() * 40 + 160}, 70%, 80%, 0.6)` // 朝：ミント×白光
        : `hsla(${Math.random() * 20 + 35}, 80%, 70%, 0.55)`, // 夜：琥珀金
    }));

    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.o;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // ゆるく右上へ
        p.x += 0.03;
        p.y -= 0.06;
        p.o -= 0.001;
        if (p.y < -10 || p.x > canvas.width + 10 || p.o <= 0) {
          p.x = Math.random() * canvas.width * 0.6;
          p.y = canvas.height * 0.9;
          p.o = Math.random() * 0.4 + 0.3;
        }
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [isMorning]);

  // 🌕 テキスト表示タイミング
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 2.6, ease: "power2.out" }
      );
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // ☀️ モード切替光波
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
useEffect(() => {
  const hero = document.querySelector(".hero");
  hero.style.minHeight = window.innerHeight + "px";
}, []);
useEffect(() => {
  const hero = heroRef.current;
  const fixHeight = () => {
    hero.style.height = window.innerHeight + "px";
  };
  fixHeight();
  window.addEventListener("resize", fixHeight);
  return () => window.removeEventListener("resize", fixHeight);
}, []);

  return (
    <section
      ref={heroRef}
      className={`hero ${isMorning ? "day" : "night"} ${
        showText ? "loaded" : ""
      }`}
      aria-label="琉香ヒーロー"
    >
      {/* 泡（下層） */}
      <canvas ref={canvasRef} className="hero-bubbles"></canvas>

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

      {/* 光の香り（上層） */}
      <canvas ref={scentRef} className="hero-scent"></canvas>

      {/* テキスト */}
      <div ref={textRef} className={`hero-content ${showText ? "show" : ""}`}>
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
