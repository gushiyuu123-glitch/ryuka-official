// ===============================
// 🌅 Ryuka — Index Page (Complete Optimized Version)
// ===============================
import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Lead from "../components/Lead";
import StoreMorning from "../components/StoreMorning";
import StoreNight from "../components/StoreNight";
import Exhibit from "../components/Exhibit";
import BrandStory from "../components/BrandStory";
import Epilogue from "../components/Epilogue";
import "../styles/base.css";

export default function Index({ isMorning }) {
  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const fadeSettings = isMorning
        ? { duration: 1.6, ease: "power2.out", y: 45 }
        : { duration: 2.0, ease: "power1.out", y: 65 };

      // ⭐ 全セクションのフェードイン（Hero を除外）
      gsap.utils.toArray("section[data-animate]").forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0, y: fadeSettings.y },
          {
            opacity: 1,
            y: 0,
            duration: fadeSettings.duration,
            ease: fadeSettings.ease,
            scrollTrigger: {
              trigger: sec,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    })();
  }, [isMorning]);

  return (
    <div className={`index-page ${isMorning ? "day" : "night"}`}>
      <main>

        {/* ===============================
            🌅 HERO — 完全独立
        =============================== */}
        <div id="top-anchor"></div>
        <Hero isMorning={isMorning} />

        {/* ===============================
            🌿 LEAD
        =============================== */}
        <section id="lead" data-animate>
          <Lead isMorning={isMorning} />
        </section>

        {/* ===============================
            🛍 STORE（Morning / Night）
        =============================== */}
        {isMorning ? (
          <section id="store" data-animate>
            <StoreMorning isMorning={isMorning} />
          </section>
        ) : (
          <section id="store-night" data-animate>
            <StoreNight isMorning={isMorning} />
          </section>
        )}

        {/* ===============================
            💎 EXHIBIT
        =============================== */}
        <section id="exhibit" data-animate>
          <Exhibit isMorning={isMorning} />
        </section>

        {/* ===============================
            📖 STORY
        =============================== */}
        <section id="story" data-animate>
          <BrandStory isMorning={isMorning} />
        </section>

        {/* ===============================
            🌕 EPILOGUE
        =============================== */}
        <section id="epilogue" data-animate>
          <Epilogue isMorning={isMorning} />
        </section>

      </main>
    </div>
  );
}
