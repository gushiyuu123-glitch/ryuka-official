import React, { useEffect, useRef } from "react";
import "../styles/epilogue.css";

export default function Epilogue({ isMorning }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

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

    // ☀️ 朝粒子（淡い水色＋白光）
    const colorsDay = [
      "rgba(150, 220, 255, 0.9)", // 水色
      "rgba(180, 240, 255, 0.85)", // 明るい空色
      "rgba(255, 255, 255, 0.7)",  // 白の反射
    ];

    // 🌙 夜粒子
    const colorNight = "rgba(255, 210, 150, 0.45)";

    const particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.5 + 0.5,
      speedY: Math.random() * 0.2 + 0.05,
      color: colorsDay[Math.floor(Math.random() * colorsDay.length)],
    }));

    const draw = () => {
      // 背景フェード（朝は透明度をかなり弱くする）
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = isMorning
        ? "rgba(255, 255, 255, 0.04)" // 朝：ほぼ透明な薄膜
        : "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 粒子の合成（朝でもちゃんと見える）
      ctx.globalCompositeOperation = isMorning ? "overlay" : "lighter";

      particles.forEach((p) => {
        const color = isMorning ? p.color : colorNight;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        g.addColorStop(0, color);
        g.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.globalAlpha = p.alpha;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // 上昇（ゆるやか）
        p.y -= p.speedY;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isMorning]);

  return (
    <section className={`epilogue ${isMorning ? "day" : "night"}`}>
      <canvas ref={canvasRef} id="epilogueLight"></canvas>
      <div className="epilogue-inner">
        <img
          src="image/ryuka_logo.png"
          className="epilogue-logo"
          alt="Ryuka Logo"
        />
        <p className="epilogue-text">
          香りは、あなたの記憶の奥で静かに息づく。<br />
          そしていつか、また光として蘇る。
        </p>
        <div className="epilogue-credit">
          
        </div>
      </div>
    </section>
  );
}
