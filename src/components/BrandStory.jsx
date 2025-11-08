import React, { useEffect, useRef } from "react";
import "../styles/brandStory.css";

export default function BrandStory({ isMorning }) {
  const storyRef = useRef(null);
  const canvasRef = useRef(null);

  /* ===============================
     🕊️ フェードイン制御（確実発火版）
  =============================== */
  useEffect(() => {
    const container = storyRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".fade-item");

    // マウント時：すべて即表示（安全策）
    elements.forEach((el) => el.classList.add("show"));

    // スクロール時にも発火
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ===============================
     🌫️ 香りの粒アニメーション（統合版）
  =============================== */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const color = isMorning
      ? "rgba(168,216,209,0.28)" // 朝：ミント
      : "rgba(232,179,126,0.28)"; // 夜：琥珀

    // 🪶 Storeへ流れる香りパターン
    let particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 0.6,
      dx: (Math.random() - 0.5) * 0.15,
      dy: Math.random() * 0.2 + 0.05, // ゆっくり下方向へ
      opacity: Math.random() * 0.6 + 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        // 動き
        p.x += p.dx;
        p.y += p.dy;

        // 端リセット
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }
      });
    };

    let id;
    const loop = () => {
      draw();
      id = requestAnimationFrame(loop);
    };
    loop();

    // リサイズ対応
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMorning]);

  /* ===============================
     🌗 朝夜の詩
  =============================== */
  const storyText = isMorning
    ? {
        lead: (
          <>
            香りは記憶を閉じ込める器。<br />
            砕けた琉球ガラスが、朝の光に再び目を覚ます。
          </>
        ),
      }
    : {
        lead: (
          <>
            香りは、時を超えて息づく光。<br />
            廃材となったガラスが、再び命を宿すように。
          </>
        ),
      };

  /* ===============================
     🌸 Render
  =============================== */
  return (
    <section
      className={`brand-story fade-item ${isMorning ? "" : "night"}`}
      ref={storyRef}
    >
      {/* 🌫️ 香りの粒 */}
      <canvas id="storyParticles" ref={canvasRef}></canvas>

      {/* 💎 浮遊するガラス */}
      <div className="floating-glass">
        <img src="image/glass1.png" alt="Glass layer 1" />
        <img src="image/glass2.png" alt="Glass layer 2" />
        <img src="image/glass3.png" alt="Glass layer 3" />
        <img src="image/glass4.png" alt="Glass layer 4" />
      </div>

      {/* 📖 本文 */}
      <div className="story-inner">
        <h2 className="story-title fade-item">琉香の記憶</h2>
        <p className="story-lead fade-item">{storyText.lead}</p>

        <div className="story-body fade-item">
          <p>
            廃材のガラスをもう一度灯す。<br />
            それは、海の記憶を香りに変える行為。
          </p>
          <p>
            琉香のボトルは、琉球ガラスの欠片から生まれました。<br />
            一つひとつが手仕事の痕跡を宿し、<br />
            香りとともに“再生の物語”を語ります。
          </p>
        </div>

        {/* 📸 画像 */}
        <div className="story-images fade-item">
          <img
            src="image/recycled_glass1.jpg"
            alt="再生された琉球ガラス"
            loading="lazy"
          />
          <img
            src="image/artisan_hands.jpg"
            alt="職人の手仕事"
            loading="lazy"
          />
        </div>

        {/* 💫 ボタン */}
        <div className="story-cta fusion fade-item">

     {/* 💫 ボタン */}
<div className="story-cta fusion fade-item">
  <p className="cta-text">— 香りの奥にある、琉香の物語をもっと知る —</p>
  <a
    href="#"
    className="cta-button brand-link"
    onMouseMove={(e) => {
      const rect = e.target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      e.target.style.setProperty("--x", `${x}%`);
      e.target.style.setProperty("--y", `${y}%`);
    }}
  >
    About RYUKA
  </a>
</div>

        </div>
      </div>
    </section>
  );
}
