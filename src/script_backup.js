document.addEventListener("DOMContentLoaded", () => {

  /* ==================================
     🌅 朝 / 🌙 夜 モード切替
  ================================== */
  const btn = document.getElementById('modeBtn');
  const hero = document.querySelector('.hero');
  const heroLead = document.querySelector('.hero-lead');
  const heroSub  = document.querySelector('.hero-sub');
  const morningStore = document.querySelector('.store.morning');
  const nightStore   = document.querySelector('.store.night');

  let isMorning = true;
  let bubbleTone = "morning"; // 泡のトーン制御

  (function autoInit(){
    const hour = new Date().getHours();
    hour >= 17 || hour <= 5 ? setNight() : setMorning();
  })();

  btn.addEventListener('click', () => {
    isMorning ? setNight() : setMorning();
  });

  function setMorning(){
    isMorning = true;
    bubbleTone = "morning";
    hero.classList.remove('night');
    morningStore.style.display = 'flex';
    nightStore.style.display = 'none';
    btn.textContent = '☀ 光の香り';
    heroLead.textContent = heroLead.dataset.morning;
    heroSub.textContent  = heroSub.dataset.morning;
  }

  function setNight(){
    isMorning = false;
    bubbleTone = "night";
    hero.classList.add('night');
    morningStore.style.display = 'none';
    nightStore.style.display = 'flex';
    btn.textContent = '🌙 灯の香り';
    heroLead.textContent = heroLead.dataset.night;
    heroSub.textContent  = heroSub.dataset.night;
  }

  /* ==================================
     🌫️ 香りの道（中央ラインを明瞭化）
  ================================== */
  const exhibit = document.querySelector(".exhibit");
  const pathCanvas = document.createElement("canvas");
  pathCanvas.className = "aroma-path";
  exhibit.prepend(pathCanvas);
  const ctx = pathCanvas.getContext("2d");

  function resizeCanvas() {
    pathCanvas.width = window.innerWidth;
    pathCanvas.height = exhibit.scrollHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // 粒子を少し増やし・明るめ
  const particles = Array.from({ length: 180 }).map(() => ({
    x: Math.random() * pathCanvas.width,
    y: Math.random() * pathCanvas.height,
    size: Math.random() * 3 + 1.2,
    speed: Math.random() * 0.5 + 0.3,
    hue: Math.random() * 40 + 40,
    alpha: Math.random() * 0.6 + 0.5
  }));

  function drawPath() {
    ctx.clearRect(0, 0, pathCanvas.width, pathCanvas.height);
    particles.forEach(p => {
      const centerY = pathCanvas.height / 2 + Math.sin(p.x * 0.004) * 80;
      p.y += (centerY - p.y) * 0.08;
      p.x += p.speed * 2.8;
      if (p.x > pathCanvas.width + 20) p.x = -20;

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 12);
      const color = isMorning
        ? `hsla(168, 60%, 75%, ${p.alpha})` // 朝：ミント
        : `hsla(38, 75%, 68%, ${p.alpha})`; // 夜：琥珀
      grad.addColorStop(0, color);
      grad.addColorStop(0.5, "rgba(255,255,255,0.4)");
      grad.addColorStop(1, "transparent");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 8, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(drawPath);
  }
  drawPath();

  /* ==================================
     🕊️ Exhibit商品フェード & 局所香り
  ================================== */
  const items = document.querySelectorAll(".exhibit-item");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.25 });
  items.forEach(item => observer.observe(item));

  // 各展示に香りを追加（偶数インデックス）
  items.forEach((item, i) => {
    if (i % 2 === 0) {
      const miniCanvas = document.createElement("canvas");
      miniCanvas.className = "mini-aroma";
      item.appendChild(miniCanvas);
      const c = miniCanvas.getContext("2d");
      miniCanvas.width = item.offsetWidth;
      miniCanvas.height = item.offsetHeight;

      const localParticles = Array.from({ length: 40 }).map(() => ({
        x: Math.random() * miniCanvas.width,
        y: Math.random() * miniCanvas.height,
        r: Math.random() * 2 + 0.8,
        s: Math.random() * 0.3 + 0.1,
        a: Math.random() * 0.4 + 0.4
      }));

      function animateMini() {
        c.clearRect(0, 0, miniCanvas.width, miniCanvas.height);
        localParticles.forEach(p => {
          p.y -= p.s;
          if (p.y < -10) {
            p.y = miniCanvas.height + 10;
            p.x = Math.random() * miniCanvas.width;
          }
          const color = isMorning
            ? `hsla(168, 60%, 75%, ${p.a})`
            : `hsla(38, 75%, 68%, ${p.a})`;
          const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
          g.addColorStop(0, color);
          g.addColorStop(1, "transparent");
          c.fillStyle = g;
          c.beginPath();
          c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          c.fill();
        });
        requestAnimationFrame(animateMini);
      }
      animateMini();
    }
  });

  /* ==================================
     ✨ ポストカード特別演出
  ================================== */
  const postcard = document.querySelector(".exhibit-item.postcard");
  if (postcard) {
    const glow = document.createElement("div");
    glow.className = "postcard-glow";
    postcard.appendChild(glow);
    let angle = 0;
    function animateGlow() {
      angle += 0.015;
      const x = Math.cos(angle) * 20 + 50;
      const y = Math.sin(angle) * 20 + 50;
      glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(198,166,122,0.18), transparent 70%)`;
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  /* ==================================
     🫧 Hero 泡（位置固定で色トーンのみ切替）
  ================================== */
  const canvas = document.getElementById("bubbles");
  const ctxB = canvas.getContext("2d");

  function resizeBubbles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeBubbles();
  window.addEventListener("resize", resizeBubbles);

  const bubbles = Array.from({ length: 60 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 2,
    s: Math.random() * 0.5 + 0.2,
    o: Math.random() * 0.5 + 0.3
  }));

  function animateBubbles() {
    ctxB.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach(b => {
      b.y -= b.s;
      if (b.y < -10) {
        b.y = canvas.height + 10;
        b.x = Math.random() * canvas.width;
      }

      const color =
        bubbleTone === "morning"
          ? `hsla(168, 60%, 75%, ${b.o})`
          : `hsla(38, 70%, 68%, ${b.o})`;

      const g = ctxB.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 2);
      g.addColorStop(0, color);
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctxB.fillStyle = g;
      ctxB.beginPath();
      ctxB.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctxB.fill();
    });
    requestAnimationFrame(animateBubbles);
  }
  animateBubbles();
});
// 💨 Postcardに香気のゆらぎ（canvas）
const card = document.querySelector(".exhibit-item.postcard");
if (card) {
  const mistCanvas = document.createElement("canvas");
  mistCanvas.className = "mist-layer";
  card.appendChild(mistCanvas);
  const c = mistCanvas.getContext("2d");
  mistCanvas.width = card.offsetWidth;
  mistCanvas.height = card.offsetHeight;

  const mist = Array.from({ length: 40 }).map(() => ({
    x: Math.random() * mistCanvas.width,
    y: Math.random() * mistCanvas.height,
    r: Math.random() * 2 + 1,
    a: Math.random() * 0.2 + 0.1
  }));

  function drawMist() {
    c.clearRect(0, 0, mistCanvas.width, mistCanvas.height);
    mist.forEach(m => {
      m.y -= 0.1;
      if (m.y < -10) {
        m.y = mistCanvas.height + 10;
        m.x = Math.random() * mistCanvas.width;
      }
      const grad = c.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 6);
      grad.addColorStop(0, `hsla(38,75%,68%,${m.a})`);
      grad.addColorStop(1, "transparent");
      c.fillStyle = grad;
      c.beginPath();
      c.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      c.fill();
    });
    requestAnimationFrame(drawMist);
  }
  drawMist();
}
/* ===============================
   🎬 朝／夜モード切替 + Exhibit動画連動制御 + ボタントーン統合
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("modeBtn");
  const hero = document.querySelector(".hero");
  const heroLead = document.querySelector(".hero-lead");
  const heroSub = document.querySelector(".hero-sub");
  const morningStore = document.querySelector(".store.morning");
  const nightStore = document.querySelector(".store.night");
  const morningVideo = document.querySelector(".product-bg.morning");
  const nightVideo = document.querySelector(".product-bg.night");
  const exhibitLinks = document.querySelectorAll(".brand-link");

  let isMorning = true;

  /* ===============================
     初期モード判定（時間ベース）
  =============================== */
  const hour = new Date().getHours();
  if (hour >= 17 || hour <= 5) setNight(false);
  else setMorning(false);

  /* ===============================
     トグルボタン
  =============================== */
  btn.addEventListener("click", () => {
    isMorning ? setNight(true) : setMorning(true);
  });

  /* ===============================
     ☀ 朝モード設定
  =============================== */
  function setMorning(withTransition = true) {
    isMorning = true;
    hero.classList.remove("night");

    // Hero
    heroLead.textContent = heroLead.dataset.morning;
    heroSub.textContent = heroSub.dataset.morning;

    // Store切替
    morningStore.style.display = "flex";
    nightStore.style.display = "none";

    // ボタン
    btn.textContent = "🌙 灯の香り";

    // Exhibit動画切替
    fadeVideo(morningVideo, nightVideo, withTransition);

    // ブランドリンク（ミントトーン）
    exhibitLinks.forEach(link => {
      link.style.transition = "all 1.4s ease";
      link.style.color = "#2f2f2f";
      link.style.borderColor = "rgba(168,216,209,0.45)";
      link.style.background = "rgba(255,255,255,0.25)";
      link.style.boxShadow = "0 6px 24px rgba(168,216,209,0.25)";
    });
  }

  /* ===============================
     🌙 夜モード設定
  =============================== */
  function setNight(withTransition = true) {
    isMorning = false;
    hero.classList.add("night");

    // Hero
    heroLead.textContent = heroLead.dataset.night;
    heroSub.textContent = heroSub.dataset.night;

    // Store切替
    morningStore.style.display = "none";
    nightStore.style.display = "flex";

    // ボタン
    btn.textContent = "☀ 光の香り";

    // Exhibit動画切替
    fadeVideo(nightVideo, morningVideo, withTransition);

    // ブランドリンク（金香トーン）
    exhibitLinks.forEach(link => {
      link.style.transition = "all 1.4s ease";
      link.style.color = "#EDEBE8";
      link.style.borderColor = "rgba(232,179,126,0.45)";
      link.style.background = "rgba(40,28,18,0.35)";
      link.style.boxShadow = "0 6px 24px rgba(232,179,126,0.25)";
    });
  }

  /* ===============================
     🎞 動画切替アニメ関数
  =============================== */
  function fadeVideo(showEl, hideEl, withTransition) {
    if (!showEl || !hideEl) return;
    const t = withTransition ? "opacity 1.6s ease" : "none";
    showEl.style.transition = hideEl.style.transition = t;
    showEl.style.opacity = "0.28";
    hideEl.style.opacity = "0";
  }
});
/* ===============================
   💫 Mode Button Ripple Effect
   =============================== */
const modeBtn = document.getElementById("modeBtn");
modeBtn.addEventListener("click", e => {
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");
  const rect = modeBtn.getBoundingClientRect();
  ripple.style.left = `${e.clientX - rect.left}px`;
  ripple.style.top = `${e.clientY - rect.top}px`;
  modeBtn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 1600);
});
/* ===============================
   ✨ Mode Button Text Transition
   =============================== */
const modeBtnText = document.createElement("span");
modeBtnText.textContent = "☀ 光の香り";
modeBtn.appendChild(modeBtnText);

modeBtn.addEventListener("click", () => {
  // 既存トグル動作を保持
  if (typeof isMorning !== "undefined" && typeof setNight === "function" && typeof setMorning === "function") {
    isMorning ? setNight(true) : setMorning(true);
  }

  // テキストフェード
  modeBtnText.classList.add("fade-out");
  setTimeout(() => {
    modeBtnText.textContent = isMorning ? "☀ 光の香り" : "🌙 灯の香り";
    modeBtnText.classList.remove("fade-out");
    modeBtnText.classList.add("fade-in");
    setTimeout(() => modeBtnText.classList.remove("fade-in"), 800);
  }, 400);
});

// 💫 泡の呼吸トーンを追加
// 💫 泡に呼吸感を付加（タイトル非干渉）
function animateBubbles() {
  ctxB.clearRect(0, 0, canvas.width, canvas.height);
  const t = Date.now() / 1000;
  bubbles.forEach(b => {
    b.y -= b.s;
    if (b.y < -10) {
      b.y = canvas.height + 10;
      b.x = Math.random() * canvas.width;
    }

    const pulse = 70 + Math.sin(t + b.x / 100) * 10;
    const color =
      bubbleTone === "morning"
        ? `hsla(168, 60%, ${pulse}%, ${b.o})`
        : `hsla(38, 75%, ${pulse - 5}%, ${b.o})`;

    const g = ctxB.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 2);
    g.addColorStop(0, color);
    g.addColorStop(1, "transparent");
    ctxB.fillStyle = g;
    ctxB.beginPath();
    ctxB.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctxB.fill();
  });
  requestAnimationFrame(animateBubbles);
}
const canvas = document.getElementById("storyParticles");
const ctx = canvas.getContext("2d");

function resizeStoryParticles() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeStoryParticles();
window.addEventListener("resize", resizeStoryParticles);

// 🌌 粒を増やして明るめトーンに
let particles = Array.from({ length: 220 }).map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.8 + 0.8,
  speedY: Math.random() * 0.35 + 0.15,
  opacity: Math.random() * 0.6 + 0.4
}));

function animateStoryParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    const color = document.body.classList.contains("night-mode")
      ? "232,179,126"  // 夜＝金光
      : "168,216,209"; // 朝＝琉海

    // 💫 呼吸光 + 滑らかな流れ
    const pulse = 0.7 + Math.sin(Date.now() / 1500 + p.x / 50) * 0.4;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color},${p.opacity * pulse})`;
    ctx.fill();

    // 浮遊アニメ
    p.y -= p.speedY;
    p.x += Math.sin(p.y / 100) * 0.3; // 少し横揺れ
    if (p.y < -10) {
      p.y = canvas.height + 10;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(animateStoryParticles);
}
animateStoryParticles();
// ===============================
// 🧭 ナビゲーションフェードイン制御
// ===============================
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav-header");
  if (!nav) return; // 安全チェック

  if (window.scrollY > 50) {
    nav.classList.add("visible");
  } else {
    nav.classList.remove("visible");
  }
});

// ページ読み込み後に少し遅れて初期化（DOM対策）
window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav-header");
  setTimeout(() => {
    if (window.scrollY > 50) {
      nav.classList.add("visible");
    }
  }, 300);
});
// ===============================
// 🌫️ Smooth Scroll with Easing
// ===============================
document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    const offset = target.getBoundingClientRect().top + window.scrollY - 80; // ナビ高さ分
    window.scrollTo({
      top: offset,
      behavior: "smooth"
    });
  });
});