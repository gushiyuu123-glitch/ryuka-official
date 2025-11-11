import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/brandStory.css";

export default function BrandStory({ isMorning }) {
  const storyRef = useRef(null);
  const canvasRef = useRef(null);

  /* ===============================
     🕊️ フェードイン制御（確実発火＋軽量）
  =============================== */
  useEffect(() => {
    const container = storyRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".fade-item");
    elements.forEach((el) => el.classList.add("show"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ===============================
     🌫️ 香りの粒アニメーション（軽量・静寂ver）
  =============================== */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const color = isMorning
      ? "rgba(168,216,209,0.25)" // 朝：ミント
      : "rgba(232,179,126,0.25)"; // 夜：琥珀

    let particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 0.8,
      dx: (Math.random() - 0.5) * 0.1,
      dy: Math.random() * 0.15 + 0.04,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
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

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, [isMorning]);

  /* ===============================
     🌗 朝夜テキスト
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

        {/* 💫 CTA */}
        <div className="story-cta fade-item">
          <p className="cta-text">— 琉香の物語をもっと読む —</p>
          <Link
            to="/story"
            className="cta-button"
            onMouseMove={(e) => {
              const rect = e.target.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              e.target.style.setProperty("--x", `${x}%`);
              e.target.style.setProperty("--y", `${y}%`);
            }}
          >
            ブランドストーリーを見る
          </Link>
        </div>
      </div>
    </section>
  );
}
