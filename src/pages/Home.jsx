import React from "react";
import Hero from "../components/Hero";
import Lead from "../components/Lead";
import Exhibit from "../components/Exhibit";
import BrandStory from "../components/BrandStory";
import Epilogue from "../components/Epilogue";
import StoreMorning from "../components/StoreMorning";
import StoreNight from "../components/StoreNight";

export default function Home({ isMorning }) {
  return (
    <main>

      <section id="top">
        <Hero isMorning={isMorning} />
      </section>

      <section id="lead">
        <Lead isMorning={isMorning} />
      </section>

      {isMorning && (
        <section id="store">
          <StoreMorning isMorning={isMorning} />
        </section>
      )}

      {!isMorning && (
        <section id="store-night">
          <StoreNight isMorning={isMorning} />
        </section>
      )}

      <section id="exhibit">
        <Exhibit isMorning={isMorning} />
      </section>

      <section id="story">
        <BrandStory isMorning={isMorning} />
      </section>

      <section id="epilogue">
        <Epilogue isMorning={isMorning} />
      </section>

    </main>
  );
}
