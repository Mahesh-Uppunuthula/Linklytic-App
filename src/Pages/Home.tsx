import React from "react";
import HeroSection from "../components/sections/HeroSection";

interface SectionProps {
  key: string;
  name: string;
  Section: React.FC<unknown>;
}
const SECTIONS: SectionProps[] = [
  {
    key: "hero-section",
    name: "Hero Section",
    Section: HeroSection,
  },
];
function Home() {
  return (
    <div className="w-full h-fit">
      {SECTIONS.map(({ key, Section }) => (
        <section key={key}>{<Section />}</section>
      ))}
    </div>
  );
}

export default Home;
