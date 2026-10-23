import type { Metadata } from "next";
import WholeProject from "../../components/WholeProject";
import Container from "../../components/cards/Container";
import BackLink from "../../components/BackLink";
import { PROJECTS } from "../../data/projects";

export const metadata: Metadata = {
  title: "Recent Works",
  description:
    "Projects by Vishal Pokuri, including a music streaming app, a pentomino solver, an API debugging tool, and a Solana arcade.",
  alternates: { canonical: "/recent-work" },
};

export default function RecentWorkPage() {
  return (
    <div className="min-h-screen py-8">
      <Container>
        <div className="page-enter space-y-6">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-deb text-white">Recent Works</h1>
              <BackLink />
            </div>
            <p className="text-gray-400 font-reg">
              A collection of my latest projects and experiments
            </p>
          </div>

          <div className="space-y-6">
            {PROJECTS.map((project) => (
              <WholeProject
                key={project.id}
                title={project.title}
                subTitle={project.subTitle}
                image={project.image}
                description={project.description}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                technologies={project.technologies}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
