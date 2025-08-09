"use client";
import ExperienceCard from "../../components/ExperienceCard";
import CareerTimeline from "../../components/CareerTimeline";
import { motion } from "framer-motion";

export default function ExperiencePage() {
  const experiences = [
    {
      position: "Frontend Developer",
      company: "InsightAI",
      duration: "July 2025 - Present",
      employmentType: "Internship",
      companyUrl: "https://insightai.pro",
      description:
        "Built a Next.js/TypeScript marketing site and a secure, responsive dashboard for enterprise LLM querying and user management. Focused on performance, accessibility, and RBAC using Tailwind and Framer Motion.",
    },
    {
      position: "Frontend Developer Intern",
      company: "Pixelcraft",
      duration: "June 2025",
      employmentType: "Internship",
      companyUrl: "https://pixelcraft.com",
      description:
        "Developed a banking dashboard within a game UI, improving data visualization and user experience. Enhanced performance and refactored UI from Figma, reducing load times by 25%.",
    },
  ];

  const pageVariants = {
    hidden: { filter: "blur(10px)", transform: "translateY(10%)", opacity: 0 },
    visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
  };

  const pageTransition = { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={pageVariants}
      transition={pageTransition}
      className="space-y-8"
    >
      {experiences.map((exp, idx) => (
        <ExperienceCard key={idx} {...exp} />
      ))}
      <CareerTimeline experiences={experiences} />
    </motion.div>
  );
}
