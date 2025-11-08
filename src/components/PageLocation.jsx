import React from "react";
import { useLocation } from "react-router-dom";

export default function PageLocation() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;

  const map = [
    { key: "/store/workshop", label: "WORKSHOP" },
    { key: "/workshop", label: "WORKSHOP" },
    { key: "/store", label: "STORE" },
    { key: "/exhibit", label: "EXHIBIT" },
    { key: "/story", label: "STORY" },
    { key: "/contact", label: "CONTACT" },
  ];

  const current = map.find((item) => pathname.startsWith(item.key))?.label;
  if (!current) return null;

  return (
    <div className="page-location">
      RYUKA <span>/</span> {current}
    </div>
  );
}
