import React from "react";
import "../styles/footer.css";

export default function Footer({ isMorning }) {
  // 🌬️ ページ内スムーススクロール
  const handleFooterClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className={`footer ${isMorning ? "day" : "night"}`}>
      <div className="footer-inner">
        <p className="footer-logo">琉香 – Ryuka Fragrance</p>

        <nav className="footer-nav">
          <a href="#store" onClick={(e) => handleFooterClick(e, "store")}>
            Store
          </a>
          <a href="#exhibit" onClick={(e) => handleFooterClick(e, "exhibit")}>
            Exhibit
          </a>
          <a href="#story" onClick={(e) => handleFooterClick(e, "story")}>
            Story
          </a>
          <a href="#contact" onClick={(e) => handleFooterClick(e, "contact")}>
            Contact
          </a>
        </nav>

        <p className="footer-credit">© 2025 Ryuka Fragrance</p>
      </div>
    </footer>
  );
}
