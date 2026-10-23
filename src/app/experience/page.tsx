import type { Metadata } from "next";
import ExperienceSection from "../../components/sections/ExperienceSection";
import Container from "../../components/cards/Container";
import BackLink from "../../components/BackLink";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Vishal Pokuri's work experience: payments engineering at Chargebee, full-stack work at InsightAI, and more.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <div className="min-h-screen py-8">
      <Container>
        <div className="page-enter">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-deb text-white">Experience</h1>
              <BackLink />
            </div>
            <p className="text-gray-400 font-reg">
              My professional journey and key contributions
            </p>
          </div>

          <ExperienceSection />
        </div>
      </Container>
    </div>
  );
}
