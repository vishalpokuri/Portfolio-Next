import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/cards/Container";
import BentoCard from "../components/cards/BentoCard";
import RedirectButton from "../components/RedirectButton";

export const metadata: Metadata = {
  title: "Page not found",
};

const SHORTCUTS = [
  { href: "/experience", label: "Experience" },
  { href: "/recent-work", label: "Recent works" },
  { href: "/resume", label: "Resume" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen py-8 flex items-center">
      <Container>
        <div className="page-enter mx-auto max-w-xl text-center">
          <p className="text-7xl md:text-8xl font-deb text-white">404</p>
          <h1 className="mt-4 text-xl md:text-2xl font-sb text-gray-200">
            This page doesn&apos;t exist
          </h1>
          <p className="mt-2 text-sm md:text-base font-reg text-gray-500">
            The link may be old, or the page may have moved.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 px-4 py-2 border border-[#aaaaaa] rounded-lg text-[#aaaaaa] hover:text-white hover:border-[#404040] transition-all duration-200 font-deb text-sm tracking-[0.2em]"
          >
            ← HOME
          </Link>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
            {SHORTCUTS.map((shortcut) => (
              <BentoCard
                key={shortcut.href}
                href={shortcut.href}
                classes="flex items-center justify-between p-4 font-med text-gray-300 hover:border-[#404040] hover:text-white"
                padding="none"
                data-redirect="true"
              >
                <span className="text-sm">{shortcut.label}</span>
                <RedirectButton size={14} />
              </BentoCard>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
