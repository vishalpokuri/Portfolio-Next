"use client";

import { useState } from "react";
import CareerTimeline from "../CareerTimeline";
import ExperienceCard from "../ExperienceCard";
import { EXPERIENCES, accentOf } from "../../data/experiences";

const ExperienceSection = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const scrollToCard = (id: string) => {
    document
      .getElementById(`experience-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border-2 border-[#303030] bg-[#1c1c1d] p-4 sm:p-5 md:p-6">
        <CareerTimeline
          experiences={EXPERIENCES}
          activeId={activeId}
          onActiveChange={setActiveId}
          onSelect={scrollToCard}
        />
      </section>

      <div className="space-y-5">
        {EXPERIENCES.map((experience, index) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            accent={accentOf(experience, index)}
            index={index}
            isActive={activeId === experience.id}
            onHoverChange={(hovered) =>
              setActiveId(hovered ? experience.id : null)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
