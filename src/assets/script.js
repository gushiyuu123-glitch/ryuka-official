// ===============================
// 🌸 Lead Section Scroll Fade In
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const lead = document.querySelector(".lead");
  if (!lead) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          lead.classList.add("visible");
          observer.unobserve(lead);
        }
      });
    },
    { threshold: 0.3 } // 画面の30%見えたら発火
  );

  observer.observe(lead);
});
// ===============================
// ☀️ Store Section Scroll Fade In
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const stores = document.querySelectorAll(".store");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  stores.forEach(store => observer.observe(store));
});
