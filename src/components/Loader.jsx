import React, { useEffect, useRef, useState } from "react";
import "../styles/loader.css";

export default function Loader() {
  const canvasRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // 🌸 花びら（やや淡い）
    const colors = [
      "rgba(243, 172, 189, 0.7)", // 桜ピンク
      "rgba(181, 213, 240, 0.65)", // 水色
      "rgba(232, 190, 140, 0.7)", // 金香
    ];

    const flowers = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 18 + 14,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.001,
      driftX: (Math.random() - 0.5) * 0.25,
      driftY: (Math.random() - 0.5) * 0.25,
      opacity: 0,
    }));

    const drawFlower = (f) => {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.angle);
      ctx.globalAlpha = f.opacity;
      ctx.fillStyle = f.color;

      // 🌫️ 少しブラー強化で粒子感を演出（粒なしの代わり）
      ctx.shadowBlur = 7;
      ctx.shadowColor = "rgba(255, 240, 230, 0.35)";

      for (let i = 0; i < 5; i++) {
        const a = (Math.PI * 2 * i) / 5;
        const px = Math.cos(a) * f.r;
        const py = Math.sin(a) * f.r;
        ctx.beginPath();
        ctx.ellipse(px, py, f.r * 0.55, f.r * 0.8, a, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(0, 0, w, h);

      flowers.forEach((f) => {
        f.angle += f.rotSpeed;
        f.x += f.driftX;
        f.y += f.driftY;

        if (f.x < -100) f.x = w + 100;
        if (f.x > w + 100) f.x = -100;
        if (f.y < -100) f.y = h + 100;
        if (f.y > h + 100) f.y = -100;

        f.opacity = Math.min(f.opacity + 0.008, 0.85);
        drawFlower(f);
      });

      requestAnimationFrame(animate);
    };

    animate();

    const timer = setTimeout(() => setFadeOut(true), 5200);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={`loader bloom ${fadeOut ? "fade-out" : ""}`}>
      <canvas ref={canvasRef} className="loader-canvas" />
      <div className="loader-logo">
        <img src="/image/ryuka_logo.png" alt="Ryuka Logo" />
      </div>
    </div>
  );
}
