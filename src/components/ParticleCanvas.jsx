import React, { useEffect, useRef } from "react";

export default function ParticleCanvas({ className = "", aromaType = "琉海" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // ✅ サイズを明示的にセット（親要素のrectから取得）
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize(); // 初回リサイズ実行
    window.addEventListener("resize", resize);

    // 💫 粒子カラー（香りごとに変化）
    const colorMap = {
      琉海: "rgba(160, 220, 210, ALPHA)", // 淡いミントブルー
      月白: "rgba(230, 230, 250, ALPHA)", // 月光の白
      金香: "rgba(232, 179, 126, ALPHA)", // 琥珀の金
      紅花: "rgba(230, 130, 130, ALPHA)", // 夕焼けの赤
      黒檀: "rgba(120, 110, 100, ALPHA)", // 煙のような灰褐
    };
    const colorBase = colorMap[aromaType] || colorMap["琉海"];

    // 🌿 粒子生成
    const particles = Array.from({ length: 70 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.5 + 0.25,
    }));

    let rafId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // 画面外へ出たらループ
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // ✨ 光粒描画
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
        grad.addColorStop(0, colorBase.replace("ALPHA", p.a.toFixed(2)));
        grad.addColorStop(1, colorBase.replace("ALPHA", "0"));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [aromaType]);

  return <canvas ref={ref} className={className} />;
}
