import HeroSection from "../components/sections/HeroSection";
import LocationExperienceResumeSection from "../components/sections/LocationExperienceResumeSection";
import SkillsWorksSection from "../components/sections/SkillsWorksSection";
import { PROJECTS } from "../data/projects";

function Home() {
  return (
    <div className="page-enter md:space-y-4">
      {/* Row 1 */}
      <HeroSection />
      {/* Row 2 */}
      <SkillsWorksSection projects={PROJECTS} />
      {/* Row 3 */}
      <LocationExperienceResumeSection />
    </div>
  );
}

export default Home;
