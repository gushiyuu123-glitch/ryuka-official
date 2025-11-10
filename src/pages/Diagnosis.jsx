import React, { useEffect, useMemo, useState } from "react";
import styles from "../styles/Diagnosis.module.css";
import { Link } from "react-router-dom";
import ParticleCanvas from "../components/ParticleCanvas";

export default function Diagnosis({ isMorning }) {
  const [bgIndex, setBgIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [aiMessage, setAiMessage] = useState("");
  const [displayedMsg, setDisplayedMsg] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // ==========================
  // 🌅 背景画像
  // ==========================
  const bgImages = useMemo(
    () => [
      "/image/diag_bg1.webp",
      "/image/diag_bg2.webp",
      "/image/diag_bg3.webp",
      "/image/diag_bg4.webp",
      "/image/diag_bg5.webp",
    ],
    []
  );

  useEffect(() => {
    const id = setInterval(() => setBgIndex((i) => (i + 1) % bgImages.length), 8000);
    return () => clearInterval(id);
  }, [bgImages.length]);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  // ==========================
  // 💬 質問データ
  // ==========================
  const questions = [
    { q: "いまのあなたの気分に一番近い言葉は？", options: ["穏やか", "静か", "情熱的", "優しい", "孤独"] },
    { q: "一日の終わりに求めるのは？", options: ["光", "静けさ", "温もり", "刺激", "解放"] },
    { q: "あなたにとって“香り”とは？", options: ["記憶を呼び戻すもの", "自分を整えるもの", "感情を表すもの", "誰かを想うもの", "ただの癒し"] },
    { q: "沖縄の風景で惹かれるのは？", options: ["透明な海", "夕暮れの街", "夜の森", "花咲く丘", "古い石畳の路地"] },
  ];

  // ==========================
  // 🔗 商品リンク
  // ==========================
  const productLinks = {
    琉海: "/boutique#ryukai",
    月白: "/boutique#tsukishiro",
    金香: "/boutique#kinko",
    紅花: "/boutique#benibana",
    黒檀: "/boutique#kokutan",
  };

  // ==========================
  // ✨ 結果テンプレ
  // ==========================
  const aromaResults = {
    琉海: {
      title: "琉海 — Ryukai",
      catch: "「心は自由な波。あなたは静寂の中に光を見つける。」",
      image: "/image/product_ryu.webp",
    },
    月白: {
      title: "月白 — Tsukishiro",
      catch: "「夜にやさしい光を灯す人。」",
      image: "/image/product_tuki.webp",
    },
    金香: {
      title: "金香 — Kinkō",
      catch: "「温もりは、あなたから始まる。」",
      image: "/image/product_kin.webp",
    },
    紅花: {
      title: "紅花 — Benibana",
      catch: "「燃える心は、世界を照らす。」",
      image: "/image/product_beni.webp",
    },
    黒檀: {
      title: "黒檀 — Kokutan",
      catch: "「闇を恐れず、そこに美を見出す人。」",
      image: "/image/product_koku.webp",
    },
  };

  // ==========================
  // 🧠 詩的コメント生成
  // ==========================
  async function generateAIComment(type, answers) {
    const text = answers.join("・");
    const poeticTemplates = {
      琉海: `あなたの中に流れる静かな海。${text}──その全てが、穏やかな光に変わっていく。`,
      月白: `月のように柔らかく、夜を包む優しさ。${text}、それは心の灯。`,
      金香: `温もりの香りがあなたの中に宿る。${text}──その手のぬくもりが、世界を照らす。`,
      紅花: `燃える想いが光となり、${text}を照らす。あなたの情熱は香りと共に舞い上がる。`,
      黒檀: `孤独を恐れず、美を見出すあなた。${text}の静寂が、深い夜に響く。`,
    };
    setAiMessage(poeticTemplates[type]);
  }

  // ==========================
  // 🪞 タイピング演出
  // ==========================
  useEffect(() => {
    if (aiMessage) {
      let i = 0;
      setDisplayedMsg("");
      const timer = setInterval(() => {
        setDisplayedMsg((prev) => prev + aiMessage[i]);
        i++;
        if (i >= aiMessage.length) clearInterval(timer);
      }, 35);
      return () => clearInterval(timer);
    }
  }, [aiMessage]);

  // ==========================
  // 🧭 回答 → 結果決定
  // ==========================
  const determineResult = (answers) => {
    const map = {
      琉海: ["穏やか", "光", "記憶を呼び戻すもの", "透明な海"],
      月白: ["静か", "静けさ", "誰かを想うもの", "夜の森"],
      金香: ["優しい", "温もり", "自分を整えるもの", "夕暮れの街"],
      紅花: ["情熱的", "刺激", "感情を表すもの", "花咲く丘"],
      黒檀: ["孤独", "解放", "ただの癒し", "古い石畳の路地"],
    };
    for (const [k, words] of Object.entries(map)) {
      if (words.some((w) => answers.includes(w))) return k;
    }
    return "月白";
  };

  const handleSelect = (opt) => {
    const next = [...answers, opt];
    setAnswers(next);
    if (next.length === questions.length) {
      const type = determineResult(next);
      setResult(aromaResults[type]);
      generateAIComment(type, next);
    } else {
      setStep((s) => s + 1);
    }
  };

  // ==========================
  // 🎨 Render
  // ==========================
  return (
    <main className={`${styles.diagnosis} ${isMorning ? styles.day : styles.night} ${isLoaded ? styles.show : ""}`}>
      {/* 🌫 背景フェード */}
      <div className={styles.bgWrapper}>
        {bgImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`bg${i}`}
            className={`${styles.bgImage} ${i === bgIndex ? styles.active : ""}`}
          />
        ))}
      </div>

      {/* 💨 パーティクル */}
      {result && (
        <ParticleCanvas
          className={styles.particles}
          aromaType={result.title.split("—")[0].trim()}
        />
      )}

      <div className={styles.inner}>
        {!result ? (
          // 🧭 質問フェーズ
          <div className={styles.questionBox}>
            <h1 className={styles.title}>Find Your Aroma</h1>
            <p className={styles.subtitle}>
              香りで知る、自分の内なる琉球。
              <br />
              あなたの心に寄り添う一本を見つけましょう。
            </p>

            <div className={styles.questionCard}>
              <h2>{questions[step].q}</h2>
              <div className={styles.options}>
                {questions[step].options.map((opt, i) => (
                  <button key={i} onClick={() => handleSelect(opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // ✨ 結果フェーズ
          <div className={styles.resultBox}>
            <h2 className={styles.resultTitle}>{result.title}</h2>
            <p className={styles.resultCatch}>{result.catch}</p>
            <p className={styles.aiText}>{displayedMsg}</p>

            {/* 🌿 おすすめ香りカード */}
            <div className={styles.recommendCard}>
              <img
                src={result.image}
                alt={result.title}
                className={styles.resultImage}
              />
              <p className={styles.recommendLabel}>あなたに寄り添う香り</p>
            </div>

            {/* 🔗 行動導線 */}
            <div className={styles.links}>
              <Link
                to={productLinks[result.title.split("—")[0].trim()]}
                className={styles.btnPrimary}
              >
                🕯 Boutiqueで香りを見る
              </Link>
              <Link to="/contact" className={styles.btnGhost}>
                🌿 香りのご相談へ
              </Link>
              <button
                className={styles.btnGhost}
                onClick={() => {
                  setStep(0);
                  setAnswers([]);
                  setResult(null);
                  setAiMessage("");
                  setDisplayedMsg("");
                }}
              >
                もう一度診断する
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
