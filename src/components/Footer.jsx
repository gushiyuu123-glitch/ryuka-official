import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/footer.css";

export default function Footer({ isMorning }) {
  const location = useLocation();
  const navigate = useNavigate();
  const current = location.pathname;

  // 🕊 Homeクリック → トップページへスムース遷移
  const handleHomeClick = (e) => {
    e.preventDefault();
    // すでにHomeならスクロールのみ、それ以外ならナビゲート
    if (current === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/"); // ← トップページへ遷移
    }
  };

  return (
    <footer className={`footer ${isMorning ? "day" : "night"}`}>
      <div className="footer-inner">
        {/* 🌸 ブランドロゴ（控えめな存在感） */}
        <p className="footer-logo">琉香 — Ryuka Fragrance</p>

        {/* 🌿 最小限で上品なナビゲーション */}
        <nav className="footer-nav">
          {/* 🏠 Home（トップページへ戻る） */}
          <a href="/" onClick={handleHomeClick} className="footer-home">
            Home
          </a>

          {/* 🕯 Collection（商品一覧） */}
          {current !== "/boutique" && (
            <Link to="/boutique" className="footer-link">
              Collection
            </Link>
          )}

          {/* 🔮 Diagnosis（香り診断） */}
          {current !== "/diagnosis" && (
            <Link to="/diagnosis" className="footer-link">
              Diagnosis
            </Link>
          )}

          {/* 💌 香りのご相談（日本語トーン） */}
          {current !== "/contact" && (
            <Link to="/contact" className="footer-touch">
              香りのご相談
            </Link>
          )}
        </nav>

        {/* 🪞 クレジット */}
        <p className="footer-credit">© 2025 Ryuka Fragrance</p>
      </div>
    </footer>
  );
}
