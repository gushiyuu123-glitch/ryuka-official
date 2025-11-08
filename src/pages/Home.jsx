import React from "react";
import StoreMorning from "../components/StoreMorning";
import StoreNight from "../components/StoreNight";

export default function Home() {
  return (
    <main>
      {/* ここにHeroやLeadも後で追加 */}
      <StoreMorning />
      <StoreNight />
    </main>
  );
}
