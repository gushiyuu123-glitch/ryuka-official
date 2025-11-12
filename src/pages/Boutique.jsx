import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import styles from "../styles/Boutique.module.css";


export default function Boutique({ isMorning, handleToggle }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const boutiqueRef = useRef(null);
  const location = useLocation();
// 💎 既存 Boutique 関数の中に追記
useEffect(() => {
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) {
      setTimeout(() => {
        // フェードインスクロール
        target.scrollIntoView({ behavior: "smooth", block: "center" });

        // ✨ 光の呼吸アニメーション
        gsap.fromTo(
          target,
          { boxShadow: "0 0 0px rgba(255, 230, 180, 0)" },
          {
            boxShadow: "0 0 25px rgba(255, 230, 180, 0.8)",
            duration: 1.2,
            yoyo: true,
            repeat: 3,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.to(target, {
                boxShadow: "0 0 0px rgba(255, 230, 180, 0)",
                duration: 1.2,
              });
            },
          }
        );
      }, 400);
    }
  }
}, [location]);
  // 🪔 商品データ
 const products = {
  morning: [
    {
      id: "ryukai",
      name: "Ryukai — 琉海",
      price: "¥4,800",
      img: "/image/morning1_1.webp",
      desc: "透明な海のように清らかな香り。ミントとホワイトティーの繊細な調和が、穏やかな朝を呼び覚ます。",
    },
    {
      id: "tsukishiro",
      name: "Tsukishiro — 月白",
      price: "¥4,700",
      img: "/image/morning1_2.webp",
      desc: "月明かりのように柔らかく静かな香り。ホワイトムスクが心を包み込み、静けさをもたらす。",
    },
    {
      id: "kinko",
      name: "Kinkō — 金香",
      price: "¥4,900",
      img: "/image/morning1_3.webp",
      desc: "金色の光のように温かい香り。バニラとアンバーの甘さが、やさしく寄り添う。",
    },
    {
      id: "benibana",
      name: "Benibana — 紅花",
      price: "¥5,000",
      img: "/image/morning1_4.webp",
      desc: "鮮やかな紅花の香りが生命力を感じさせる。少しスパイシーで、前向きな一日を始める香り。",
    },
    {
      id: "kokutan",
      name: "Kokutan — 黒檀",
      price: "¥5,200",
      img: "/image/morning1_5.webp",
      desc: "木々の深い呼吸を感じるような落ち着いた香り。琉球杉と白檀の温もりが心を整える。",
    },
    {
      id: "gettō",
      name: "Gettō Whisper — 月桃の囁き",
      price: "¥5,200",
      img: "/image/morning1_6.webp",
      desc: "清らかでスパイシーな月桃の香り。穏やかで感性豊かな人に寄り添うアロマ。",
    },
  ],
  night: [
    {
      id: "ryukai",
      name: "Ryukai Night — 琉海の余韻",
      price: "¥5,200",
      img: "/image/night1_1.webp",
      desc: "月夜に照らされる海の香り。アンバーとマリンの柔らかい残香が、夜の静寂を包み込む。",
    },
    {
      id: "tsukishiro",
      name: "Tsukishiro Noir — 月白ノワール",
      price: "¥5,600",
      img: "/image/night1_2.webp",
      desc: "白い月光の中に漂う甘い夜気。ジャスミンとムスクの調べが、静かな夜を彩る。",
    },
    {
      id: "kinko",
      name: "Kinkō Amber — 金香アンバー",
      price: "¥5,800",
      img: "/image/night1_3.webp",
      desc: "金色の灯のような深い甘さ。アンバーとサンダルウッドが、心を落ち着かせる夜の香り。",
    },
    {
      id: "benibana",
      name: "Benibana Rouge — 紅花ルージュ",
      price: "¥5,400",
      img: "/image/night1_4.webp",
      desc: "夜に咲く紅花。情熱と静寂のあわいを表現する、妖艶で華やかな香り。",
    },
    {
      id: "kokutan",
      name: "Kokutan Deep — 黒檀ディープ",
      price: "¥5,800",
      img: "/image/night1_5.webp",
      desc: "黒檀の深みがもたらす神秘の香り。孤独の中に美を見出す人へ。",
    },
    {
      id: "gettō",
      name: "Silent Gettō — 静寂の月桃",
      price: "¥5,600",
      img: "/image/night1_6.webp",
      desc: "月光に照らされる月桃の葉。スモーキーで落ち着いた余韻が、夜の静けさとともに残る。",
    },
  ],
};


  const line = isMorning ? "morning" : "night";

  // 🌗 GSAPアニメーション
  useEffect(() => {
    const hero = boutiqueRef.current?.querySelector(`.${styles.heroImg}`);
    const cards = boutiqueRef.current?.querySelectorAll(`.${styles.productCard}`);
    const tl = gsap.timeline();
    tl.fromTo(hero, { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" })
      .fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.06, ease: "power2.out" }, "-=0.3");
  }, [isMorning]);

  // 🔗 診断結果アンカーへ自動スクロール
  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          gsap.fromTo(target, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power2.out" });
        }, 400);
      }
    }
  }, [location]);
// 🔑 キーボード: ← → Esc ／ ✨ 画像に呼吸の光
useEffect(() => {
  if (!selectedProduct) return;

  const onKey = (e) => {
    if (e.key === "Escape") setSelectedProduct(null);
    if (e.key === "ArrowRight") {
      const i = products[line].findIndex(p => p.id === selectedProduct.id);
      setSelectedProduct(products[line][(i + 1) % products[line].length]);
    }
    if (e.key === "ArrowLeft") {
      const i = products[line].findIndex(p => p.id === selectedProduct.id);
      setSelectedProduct(products[line][(i - 1 + products[line].length) % products[line].length]);
    }
  };
  window.addEventListener("keydown", onKey);

  // ✨ 呼吸の光（画像の縁がふっと光る）
  gsap.fromTo(
    `.${styles.lightboxImg}`,
    { boxShadow: "0 0 0 rgba(255,220,160,0)" },
    {
      boxShadow: "0 0 28px rgba(255,220,160,0.55)",
      duration: 0.8,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    }
  );

  return () => window.removeEventListener("keydown", onKey);
}, [selectedProduct, line]);

  return (
    <main ref={boutiqueRef} className={`${styles.boutique} ${isMorning ? styles.day : styles.night}`}>

      {/* 🌅/🌙 Hero */}
      <section className={styles.hero}>
        <img
          src={isMorning ? "/image/boutique_morning.webp" : "/image/boutique_night.webp"}
          alt="Ryuka Boutique Hero"
          className={styles.heroImg}
        />
        <div className={styles.heroText}>
          <h1>{isMorning ? "Morning Boutique" : "Night Boutique"}</h1>
          <p>{isMorning ? "光と香りが交差する、静寂の朝。" : "灯と余韻が漂う、深い夜。"}</p>
        </div>
      </section>

      {/* 🛍️ 商品一覧 */}
      <section className={styles.productSection}>
        <h2>{isMorning ? "🌅 Morning Line — 朝の香り" : "🌙 Night Line — 夜の香り"}</h2>
        <p className={styles.heroHint}>💡 商品をクリックすると香りの説明が表示されます</p><br />

        <div className={styles.productGrid}>
          {products[line].map((item) => (
            <div
              key={item.id}
              id={item.id} // 🆕 ← 診断結果アンカー対応
              className={styles.productCard}
              onClick={() => setSelectedProduct(item)}
            >
              <img src={item.img} alt={item.name} loading="lazy" />
              <div className={styles.productOverlay}>
                <h3>{item.name}</h3>
                <p>{item.price}</p>
                <span className={styles.clickLabel}>Click for details</span>
              </div>
            </div>
          ))}
        </div>

        {/* 🔮 香り診断リンク */}
        <div className={styles.diagnosisLinkArea}>
          <Link to="/diagnosis" className={styles.diagnosisLink}>
             あなたに合う香りを診断する
          </Link>
        </div>
      </section>
{selectedProduct && (
  <div
    className={styles.lightbox}
    onClick={(e) => {
      // 背景（黒幕）クリックのみ閉じる
      if (e.target === e.currentTarget) setSelectedProduct(null);
    }}
  >
    {/* ← 左矢印 */}
    <button
      className={`${styles.navArrow} ${styles.navPrev}`}
      aria-label="前へ"
      onClick={(e) => {
        e.stopPropagation();
        const currentIndex = products[line].findIndex(p => p.id === selectedProduct.id);
        const prevIndex = (currentIndex - 1 + products[line].length) % products[line].length;
        setSelectedProduct(products[line][prevIndex]);
      }}
    >
      ‹
    </button>

    {/* → 右矢印 */}
    <button
      className={`${styles.navArrow} ${styles.navNext}`}
      aria-label="次へ"
      onClick={(e) => {
        e.stopPropagation();
        const currentIndex = products[line].findIndex(p => p.id === selectedProduct.id);
        const nextIndex = (currentIndex + 1) % products[line].length;
        setSelectedProduct(products[line][nextIndex]);
      }}
    >
      ›
    </button>

    {/* 💎 本体 */}
    <div
      className={styles.lightboxContent}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className={styles.closeBtn}
        onClick={() => setSelectedProduct(null)}
        aria-label="閉じる"
      >
        ✕
      </button>

      <img
        src={selectedProduct.img}
        alt={selectedProduct.name}
        className={styles.lightboxImg}
      />
      <div className={styles.lightboxText}>
        <h2>{selectedProduct.name}</h2>
        <p className={styles.lightboxPrice}>{selectedProduct.price}</p>
        <p className={styles.lightboxDesc}>{selectedProduct.desc}</p>
      </div>
    </div>
  </div>
)}



      <div className={styles.backLink}>
        <Link to="/gift"> Giftページへ戻る</Link>
      </div>

      <footer className={styles.footer}>
        <p>© 2025 Ryuka — 光と香りの記憶</p>
      </footer>
    </main>
  );
}
