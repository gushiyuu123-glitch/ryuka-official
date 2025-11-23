import React from "react";
import "../styles/mobileMenu.css";

export default function MobileMenu({
  open,
  setOpen,
  handleNavClick,
  isMorning,
}) {
  return (
    <div className={`mobile-menu ${open ? "show" : ""} ${isMorning ? "day" : "night"}`}>
      {/* 中央光 */}
      <div className="menu-glow"></div>

      <div className="menu-items">
        <a onClick={(e) => handleNavClick(e, "top")}>Top</a>
        <a onClick={(e) => handleNavClick(e, isMorning ? "store" : "store-night")}>Store</a>
        <a onClick={(e) => handleNavClick(e, "exhibit")}>Exhibit</a>
        <a onClick={(e) => handleNavClick(e, "story")}>Story</a>
      </div>

      {/* 閉じる領域 */}
      <div className="menu-close" onClick={() => setOpen(false)}></div>
    </div>
  );
}
