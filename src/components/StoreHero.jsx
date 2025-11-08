// src/components/StoreHero.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function StoreHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h;
    let waves = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight * 0.9;
      waves = Array.from({ length: 12 }).map((_, i) => ({
        y: Math.random() * h,
        amp: 12 + Math.random() * 30,
        speed: 0.0018 + Math.random() * 0.0025,
        offset: Math.random() * 1000,
        hue: 185 + Math.random() * 15, // 💙 海風トーン
        alpha: 0.18 + Math.random() * 0.08, // 奥行きに応じた透明度
        width: 0.6 + Math.random() * 1.2,
      }));
    };
    window.addEventListener("resize", resize);
    resize();

    const render = (t) => {
      ctx.clearRect(0, 0, w, h);

      // 🌊 背景層：淡いターコイズのベール
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, "rgba(180,220,230,0.15)");
      gradient.addColorStop(1, "rgba(255,255,255,0.05)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // 🌤 波層
      waves.forEach((wave) => {
        ctx.beginPath();
        for (let x = 0; x < w; x += 4) {
          const y =
            h / 2 +
            Math.sin(x * 0.01 + t * wave.speed + wave.offset) * wave.amp +
            Math.cos(x * 0.003 - t * wave.speed * 0.5) * (wave.amp * 0.2);
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `hsla(${wave.hue}, 45%, 70%, ${wave.alpha})`;
        ctx.lineWidth = wave.width;
        ctx.stroke();
      });

      requestAnimationFrame(render);
    };
    render(0);

    // 🌬️ 微妙な“揺らぎ”をGSAPで付与
    gsap.to(canvas, {
      duration: 8,
      scale: 1.01,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    return () => {
      window.removeEventListener("resize", resize);
      gsap.killTweensOf(canvas);
    };
  }, []);

  return (
    <section className="store-hero">
      <canvas ref={canvasRef} className="wave-layer"></canvas>
      <div className="hero-text">
        <h1>琉香 — 海と光のストア</h1>
        <p>Fragrance Born in Okinawa</p>
      </div>
    </section>
  );
}
