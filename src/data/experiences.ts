import {
  currentMonthIndex,
  formatMonth,
  formatSpan,
  toMonthIndex,
} from "../utils/dates";

export interface Experience {
  id: string;
  position: string;
  company: string;
  companyUrl?: string;
  employmentType?: string;
  location?: string;
  /** Path under /public. Falls back to the company's initial when missing. */
  logo?: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", inclusive. Leave out for a role you're still in. */
  end?: string;
  summary?: string;
  /** Wrap text in **double asterisks** to highlight it. */
  points: string[];
  skills?: string[];
  /** Any CSS color. Falls back to a palette color when omitted. */
  accent?: string;
}

export const EXPERIENCES: Experience[] = [
  {
    id: "chargebee",
    position: "Software Engineer – Payments",
    company: "Chargebee",
    companyUrl: "https://www.chargebee.com",
    employmentType: "Full-time",
    location: "Chennai · Onsite",
    logo: "/logos/chargebee.png",
    start: "2026-02",
    points: [
      "Delivered **2 production payment gateway integrations**, Ecentric (Card) and NMI (ACH), across Chargebee’s distributed payment platform, spanning the backend-for-frontend (BFF), Openpay SDKs, hosted checkout, merchant dashboard, and QA automation for production merchants like **Shoprite, InciteTax, and Jami**.",
      "Designed and implemented **Openpay payment plugin Java SDKs** for vault-first tokenization, 3DS authentication, CIT, MIT, SOAP integrations, and complete payment lifecycle management.",
      "Migrated the Checkout test suite from Selenium to Playwright, cutting test time by **75%** (from 3.2 minutes to **50 seconds** per test).",
      "Implemented Error Intelligence for Ecentric Card, mapping **160+ response scenarios** to improve transaction diagnostics and merchant-facing error reporting.",
      "Implemented Payment Components for NMI ACH, a **PCI DSS compliant** JS payment collection layer for building custom checkout experiences.",
    ],
    skills: ["Java", "TypeScript", "AWS", "Playwright"],
    accent: "#fb6a3c",
  },
  {
    id: "insightai",
    position: "Software Developer Intern",
    company: "InsightAI",
    companyUrl: "https://insightai.pro",
    employmentType: "Internship",
    location: "San Francisco · Remote",
    logo: "/logos/insightai.png",
    start: "2025-07",
    end: "2026-01",
    points: [
      "Built the **complete frontend** for an enterprise private RAG platform, including the marketing site, admin dashboard, customer dashboard, and chat page, using Next.js and TypeScript.",
      "Implemented connectors like **Google Drive and Jira**, enabling selective ingestion and data management for RAG queries.",
      "Containerized microservices for admin tooling covering RBAC, connectors, content, and platform configuration.",
      "Built **CI/CD pipelines with GitHub Actions** for automated dashboard deployments, and collaborated on API design and schema migrations.",
    ],
    skills: ["Python", "Next.js", "React", "TypeScript", "GitHub Actions"],
    accent: "#3b9eff",
  },
  {
    id: "pixelcraft",
    position: "Frontend Developer Intern",
    company: "Pixelcraft",
    companyUrl: "https://pixelcraft.com",
    employmentType: "Internship",
    start: "2025-06",
    end: "2025-06",
    points: [
      "Developed a banking dashboard inside a game UI, improving data visualization and user experience.",
      "Refactored the UI to match the Figma designs.",
      "Improved performance, cutting load times by **25%**.",
    ],
    skills: ["Figma"],
    accent: "#a78bfa",
  },
  {
    id: "zunno",
    position: "Engineering Contributor",
    company: "Zunno.xyz",
    companyUrl: "https://zunno.xyz",
    location: "Remote",
    start: "2025-01",
    end: "2025-02",
    points: [
      "Implemented **WebSocket-based game state synchronization** with Redis-backed sessions.",
      "Refactored the Express.js backend into modular services to support scalable real-time multiplayer gameplay.",
      "Improved maintainability and debugging by decoupling networking, game logic, and state layers under concurrent load.",
    ],
    skills: ["TypeScript", "Express.js", "WebSockets", "Redis"],
    accent: "#34d399",
  },
];

const FALLBACK_ACCENTS = ["#60a5fa", "#f59e0b", "#34d399", "#a78bfa", "#f472b6"];

export const accentOf = (experience: Experience, index: number) =>
  experience.accent ?? FALLBACK_ACCENTS[index % FALLBACK_ACCENTS.length];

export const getRange = (experience: Experience) => {
  const start = toMonthIndex(experience.start);
  const end = experience.end
    ? toMonthIndex(experience.end)
    : currentMonthIndex();
  return { start, end, months: end - start + 1, isCurrent: !experience.end };
};

export const formatRange = (experience: Experience) => {
  const { start, end, isCurrent } = getRange(experience);
  if (isCurrent) return `${formatMonth(start)} – Present`;
  if (start === end) return formatMonth(start);
  return `${formatMonth(start)} – ${formatMonth(end)}`;
};

export const formatDuration = (experience: Experience) =>
  formatSpan(getRange(experience).months);
