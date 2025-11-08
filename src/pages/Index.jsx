// src/pages/Index.jsx
import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Lead from "../components/Lead";
import StoreMorning from "../components/StoreMorning";
import StoreNight from "../components/StoreNight";
import ResponsiveWrapper from "../components/ResponsiveWrapper";
import Exhibit from "../components/Exhibit";
import BrandStory from "../components/BrandStory";
import Epilogue from "../components/Epilogue";
import Footer from "../components/Footer"; // ✅ 追加
import "../styles/base.css";

export default function Index({ isMorning }) {
  useEffect(() => {
    // 🌿 ページ初回ロード時フェード演出（軽量GSAP）
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const fadeSettings = isMorning
        ? { duration: 1.8, ease: "power2.out", y: 50 }
        : { duration: 2.2, ease: "power1.out", y: 70 };

      gsap.utils.toArray("main > section").forEach((sec) => {
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
              start: "top 90%",
              toggleActions: "play none none none",
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
        <ResponsiveWrapper
          mobile={
            <>
              <section id="top"><Hero isMorning={isMorning} /></section>
              <section id="lead"><Lead isMorning={isMorning} /></section>
              <section id="store"><StoreMorning isMorning={isMorning} /></section>
              <section id="store-night"><StoreNight isMorning={isMorning} /></section>
              <section id="exhibit"><Exhibit isMorning={isMorning} /></section>
              <section id="story"><BrandStory isMorning={isMorning} /></section>

              {/* 🌕 Epilogue – 光の余香 */}
              <section id="epilogue"><Epilogue isMorning={isMorning} /></section>
            </>
          }
          desktop={
            <>
              <section id="top"><Hero isMorning={isMorning} /></section>
              <section id="lead"><Lead isMorning={isMorning} /></section>
              <section id="store"><StoreMorning isMorning={isMorning} /></section>
              <section id="store-night"><StoreNight isMorning={isMorning} /></section>
              <section id="exhibit"><Exhibit isMorning={isMorning} /></section>
              <section id="story"><BrandStory isMorning={isMorning} /></section>

              {/* 🌕 Epilogue – 光の余香 */}
              <section id="epilogue"><Epilogue isMorning={isMorning} /></section>
            </>
          }
        />
      </main>

      {/* 🌸 Footer（文字だけのボタン＋スラッシュ区切り） */}
      <Footer isMorning={isMorning} /> 
    </div>
  );
}
