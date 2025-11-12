import React, { useEffect } from "react";
import "../styles/workshop.css";
import { Link, useLocation } from "react-router-dom";


export default function Workshop() {
  const location = useLocation();

  useEffect(() => {
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = document.querySelectorAll(".fade-in");
    if (prefersReduce) {
      items.forEach((el) => el.classList.add("show"));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5%" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="workshop-page">



      {/* 🌿 Hero */}
      <section className="workshop-hero">
        <div className="overlay"></div>
        <div className="hero-text">
          <h1>香りを、灯す時間。</h1>
          <p>琉球ガラスと香りの工房 — Ryuka Atelier</p>
        </div>
      </section>

      {/* ✨ Concept */}
      <section className="concept fade-in">
        <div className="concept-inner">
          <h2>光を閉じ込め、香りを解き放つ。</h2>
          <p>
            琉香の香りは、読谷の小さな工房から生まれます。<br />
            再生ガラスを溶かし、手作業で器を作り、天然の香料を注ぐ。<br />
            光と香りが交わる瞬間、記憶が形を持つように香りが立ち上がります。
          </p>
        </div>
      </section>

      {/* 🪞 Experience */}
      <section className="experience fade-in">
        <div className="experience-image">
          <img src="/image/workshop_glass.webp" alt="ガラスを吹く職人の手元" />
        </div>
        <div className="experience-content">
          <h2>香りが生まれる瞬間を、あなたの手で。</h2>
          <p>
            ガラスの温もり、アロマの揺らぎ、灯る光。<br />
            琉香のアトリエでは、五感をひらいて“香りを創る”時間を体験できます。<br />
            香料を選び、色を混ぜ、器を選ぶ。完成した香りは、あなたの記憶そのものです。
          </p>
          <a href="#reserve" className="btn reserve-btn">
            あなたの香りをつくる →
          </a>
        </div>
      </section>

      {/* 🕊 Gallery */}
      <section className="gallery fade-in">
        <h2>Atelier Gallery</h2>
        <div className="gallery-grid">
          <img src="/image/workshop_candle.webp" alt="キャンドル制作" />
          <img src="/image/workshop_hand.webp" alt="手作業の様子" />
          <img src="/image/workshop_flame.webp" alt="灯る琉香キャンドル" />
          <img src="/image/workshop_people.webp" alt="体験を楽しむ人々" />
        </div>
      </section>

      {/* 💰 Price */}
      <section className="price fade-in">
        <h2>体験について</h2>
        <p>
          所要時間は約60〜90分。<br />
          キャンドルまたは香水を、香り・色・ガラス容器を選びながら制作します。<br />
          完成した香りはそのままお持ち帰りいただけます。
        </p>
        <p className="small-note">※ 料金目安 ¥4,800〜¥6,800（税込）</p>
      </section>

      {/* 📝 Reservation */}
      <section id="reserve" className="reservation fade-in">
        <h2>予約フォーム</h2>
        <form className="reserve-form">
          <label>
            お名前：
            <input type="text" name="name" placeholder="山田 花子" required />
          </label>
          <label>
            メールアドレス：
            <input type="email" name="email" placeholder="example@email.com" required />
          </label>
          <label>
            参加希望日：
            <input type="date" name="date" required />
          </label>
          <label>
            コース：
            <select name="course" required>
              <option value="">選択してください</option>
              <option value="candle">キャンドル制作</option>
              <option value="perfume">香水調香</option>
            </select>
          </label>
          <label>
            ご要望（任意）：
            <textarea name="message" placeholder="香りの好みや希望時間帯など"></textarea>
          </label>
          <button type="submit" className="btn submit-btn">
            送信する →
          </button>
        </form>
      </section>

      {/* 🌿 Access（仮マップ画像） */}
      <section className="access fade-in">
        <h2>アクセス</h2>
        <p>
          琉香 読谷アトリエ<br />
          沖縄県中頭郡読谷村座喜味2748-1<br />
          駐車場あり・完全予約制
        </p>

        <div className="map-frame">
          <img src="/image/map_yomitan_mock.png" alt="琉香 読谷アトリエ 地図" />
        </div>
      </section>

      {/* Footer */}
      <footer className="workshop-footer">
        <p>© 2025 Ryuka Fragrance — Made in Yomitan</p>
        <Link to="/stores" className="back-link">
          ← ストアページに戻る
        </Link>
      </footer>
    </main>
  );
}
