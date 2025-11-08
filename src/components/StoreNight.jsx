// StoreNight.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function StoreNight({ isMorning }) {
  if (isMorning) return null;

  return (
    <section className="store night" aria-label="夜の琉香ストア">
      <div className="store-text">
        <h2>Night Store — 灯す香り</h2>
        <p>
          琉球ガラスの灯が夜に香りを落とす。<br />
          静かな情熱が影の中で揺らめく。<br />
          炎と琥珀の余韻が、心を包み込む夜の琉香。
        </p>
        {/* ✅ ルートは /stores */}
        <Link to="/stores" className="brand-link">Embrace the Flame</Link>
      </div>
      <div className="store-visual">
        <img src="/image/store-night.webp" alt="RYUKA Night Store" />
      </div>
    </section>
  );
}
