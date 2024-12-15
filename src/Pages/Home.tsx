import React from "react";
import HeroSection from "../Components/Section/HeroSection";

interface SectionProps {
  key: string;
  name: string;
  Section: React.FC<any>;
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
