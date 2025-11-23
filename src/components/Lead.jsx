import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Lead({ isMorning }) {
  const leadRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null); // ← ★ 必須

  useEffect(() => {
    const lead = leadRef.current;
    const text = textRef.current;
    const title = titleRef.current; // ← ★ 参照ポイント

    if (!lead || !text || !title) return;

    // ============================
    // Fade In
    // ============================
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            lead.classList.add("visible");
            gsap.to(lead, {
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power2.out",
            });
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(lead);

    // ============================
    // Scroll shimmer（タイトルだけ光）
    // ============================
    const onScroll = () => {
      const scrollPos = window.scrollY * 0.002;

    gsap.to(title.querySelectorAll("span"), {
  filter: `brightness(${1 + Math.sin(scrollPos) * 0.08})`,
  duration: 1.2,
  ease: "sine.inOut",
});

    };
    window.addEventListener("scroll", onScroll);

    // ============================
    // Mouse sway（titleのみ）
    // ============================
    const onMove = (e) => {
      const rect = title.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(title, {
        rotationX: y * 6,
        rotationY: x * 6,
        duration: 1.2,
        ease: "power3.out",
        transformPerspective: 800,
      });
    };
    title.addEventListener("mousemove", onMove);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      title.removeEventListener("mousemove", onMove);
    };
  }, [isMorning]);

  // wrap
  const wrapText = (text) =>
    text.split("").map((ch, i) => (
      <span key={i} style={{ display: "inline-block" }}>
        {ch}
      </span>
    ));

  return (
    <section className={`lead ${isMorning ? "day" : "night"}`} ref={leadRef}>
      <div className="lead-inner" ref={textRef}>
        <h2 ref={titleRef}>
          {wrapText("記憶を香りに変える、琉球の時間。")}
        </h2>

        <p>
          光がゆっくりと空気を染め、<br />
          その中に香りが生まれる。<br />
          それは、風と記憶の境界にある、もうひとつの琉球。
        </p>
      </div>
    </section>
  );
}
