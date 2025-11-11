import gsap from "gsap";

export function sparkleEffect(target, isMorning) {
  const rect = target.getBoundingClientRect();
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  document.body.appendChild(sparkle);

  // 🌸 出現位置（入力欄の下あたり）
  sparkle.style.left = `${rect.left + rect.width / 2}px`;
  sparkle.style.top = `${rect.top + rect.height - 10}px`;
  sparkle.style.position = "fixed";
  sparkle.style.width = "6px";
  sparkle.style.height = "6px";
  sparkle.style.borderRadius = "50%";
  sparkle.style.pointerEvents = "none";
  sparkle.style.background = isMorning
    ? "rgba(232, 179, 126, 0.8)" // 金光
    : "rgba(255, 220, 170, 0.6)"; // 琥珀

  gsap.fromTo(
    sparkle,
    { scale: 0.4, y: 0, opacity: 1 },
    {
      scale: 1.4,
      y: -40,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      onComplete: () => sparkle.remove(),
    }
  );
}
