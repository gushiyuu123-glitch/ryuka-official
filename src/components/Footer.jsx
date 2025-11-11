import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer({ isMorning }) {
  const location = useLocation();
  const navigate = useNavigate();
  const current = location.pathname;

  // 🕊 Homeクリック → トップページへスムース遷移
  const handleHomeClick = (e) => {
    e.preventDefault();

    if (current === "/") {
      // すでにホームにいる場合：スクロールトップ
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // 他ページからの遷移：ナビゲート後に軽いスクロールアニメ
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <footer
      className={`${styles.footer} ${isMorning ? styles.day : styles.night}`}
    >
      <p className={styles.logo}>琉香 — Ryuka Fragrance</p>

      <nav className={styles.nav}>
        {/* 🏠 ホーム */}
        <button
          onClick={handleHomeClick}
          className={`${styles.home} ${current === "/" ? styles.current : ""}`}
        >
          ホーム
        </button>

        {/* 🕯 商品一覧 */}
        <Link
          to="/boutique"
          className={`${styles.link} ${
            current === "/boutique" ? styles.current : ""
          }`}
        >
          商品一覧
        </Link>

        {/* 🔮 香り診断 */}
        <Link
          to="/diagnosis"
          className={`${styles.link} ${
            current === "/diagnosis" ? styles.current : ""
          }`}
        >
          香り診断
        </Link>

        {/* 🎁 ギフト */}
        <Link
          to="/gift"
          className={`${styles.link} ${
            current === "/gift" ? styles.current : ""
          }`}
        >
          ギフトページ
        </Link>

        {/* 💌 お問い合わせ */}
        <Link
          to="/contact"
          className={`${styles.touch} ${
            current === "/contact" ? styles.current : ""
          }`}
        >
          香りのご相談
        </Link>
      </nav>

      <p className={styles.credit}>© 2025 Ryuka Fragrance</p>
    </footer>
  );
}
