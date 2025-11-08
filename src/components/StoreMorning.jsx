// StoreMorning.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function StoreMorning({ isMorning }) {
  if (!isMorning) return null;

  return (
    <section className="store morning" aria-label="朝の琉香ストア">
      <div className="store-visual">
        <img src="/image/store-morning.webp" alt="RYUKA Morning Store" />
      </div>
      <div className="store-text">
        <h2>Morning Store — 白砂の香り</h2>
        <p>
          柔らかな陽の光がガラスの香りを透かす。<br />
          海の記憶が目を覚ますように。<br />
          清涼な風と泡のような光が広がる、朝の琉香。
        </p>
        {/* ✅ ルートは /stores */}
        <Link to="/stores" className="brand-link">Awaken the Light</Link>
      </div>
    </section>
  );
}
