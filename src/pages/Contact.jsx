// Contact.jsx（順序逆転版）
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Contact.module.css";
import { sparkleEffect } from "../utils/gsapEffects";

export default function Contact({ isMorning }) {
  const formRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const inputs = formRef.current?.querySelectorAll("input, textarea");
    inputs?.forEach((input) => {
      const handler = (e) => sparkleEffect(e.target, isMorning);
      input.addEventListener("focus", handler);
      // クリーンアップ
      input.__spark = handler;
    });
    return () => {
      const inputs2 = formRef.current?.querySelectorAll("input, textarea");
      inputs2?.forEach((input) => {
        if (input.__spark) input.removeEventListener("focus", input.__spark);
      });
    };
  }, [isMorning]);

  const faqs = [
    { q: "オンラインで購入はできますか？",
      a: "現在は沖縄本島内の直営店と一部セレクトショップのみですが、オンラインストアを準備中です。" },
    { q: "ギフト包装は対応していますか？",
      a: "はい。無料でオリジナル包装とメッセージカードをご用意します。備考欄にご記入ください。" },
    { q: "香りを試すことはできますか？",
      a: "那覇・首里のアトリエで全香りをお試しいただけます。ご予約なしでも大丈夫です。" },
    { q: "調合体験は予約が必要ですか？",
      a: "体験は事前予約を推奨しています。ご希望日時と人数をメッセージでお知らせください。" },
  ];
  const toggleFAQ = (i) => setOpenIndex(openIndex === i ? null : i);

  // フォームへスムーススクロール
  const scrollToForm = (e) => {
    e.preventDefault();
    document.getElementById("contactForm")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={`${styles.contact} ${isMorning ? styles.day : styles.night}`}>
      {/* Hero */}
      <div className={styles.hero}>
        <h1>Contact</h1>
        <p>香りについて、贈り物について、ゆっくりとお話ししましょう。</p>
      </div>

      {/* F&Q（先に配置） */}
      <div className={styles.faq}>
        <h2>F&Q — よくあるご質問</h2>
        {faqs.map((item, i) => (
          <div key={i} className={styles.faqItem}>
            <button
              className={`${styles.faqQuestion} ${openIndex === i ? styles.active : ""}`}
              onClick={() => toggleFAQ(i)}
            >
              {item.q}
              <span>{openIndex === i ? "−" : "+"}</span>
            </button>
            <div className={`${styles.faqAnswer} ${openIndex === i ? styles.open : ""}`}>
              <p>{item.a}</p>
            </div>
          </div>
        ))}

        {/* F&Qで解決しなかったら → フォームへ */}
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <a href="#contactForm" onClick={scrollToForm} className={styles.sendBtn}>
            解決しない場合はお問い合わせへ
          </a>
        </div>
      </div>

      {/* Info（任意の位置。ここではF&Qとフォームの間に） */}
      <div className={styles.info}>
        <div>
          <h3>Atelier 琉香</h3>
          <p>沖縄県那覇市首里 ○○町 1-2-3</p>
          <p>Open 10:00 – 18:00 / Closed Wed</p>
        </div>
        <div className={styles.sns}>
          <a href="#">Instagram</a> / <a href="#">X</a>
        </div>
      </div>

      {/* Form（最後／アンカー付き） */}
      <form
        id="contactForm"
        ref={formRef}
        action="https://formspree.io/f/xxxxxx"
        method="POST"
        className={styles.form}
      >
        <label>お名前</label>
        <input name="name" type="text" required placeholder="山田 花子" />

        <label>メールアドレス</label>
        <input name="email" type="email" required placeholder="example@gmail.com" />

        <label>メッセージ</label>
        <textarea name="message" required placeholder="お問い合わせ内容をお書きください。"></textarea>

        <button type="submit" className={styles.sendBtn}>送信する</button>
      </form>
    </section>
  );
}
