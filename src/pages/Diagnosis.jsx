import React from "react";
import "../styles/page-temp.css";

export default function Diagnosis({ isMorning }) {
  return (
    <section className={`page-temp ${isMorning ? "day" : "night"}`}>
      <div className="inner">
        <h1>Find Your Aroma</h1>
        <p>ここは香り診断ページです。<br />あなたに合う香りを見つけるコンテンツを制作予定。</p>
      </div>
    </section>
  );
}
