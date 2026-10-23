export interface Project {
  id: number;
  title: string;
  subTitle?: string;
  image: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Apple Music Clone",
    image: "/projects/appleMusic.webp",
    description:
      "A fully functional Web based music Player, inspired by Apple Music. Features include music streaming, Time synced Lyrics and seek through music",
    liveUrl: "https://stream.canum.xyz",
    technologies: ["React", "TypeScript", "Tailwind CSS", "AWS EC2", "Express.js"],
  },
  {
    id: 2,
    title: "Calendar Pentomino",
    image: "/projects/calendarPentomino.webp",
    description:
      "A Calendar Styled Pentomino Solver engine, coded in Java which uses Recursive Backtracking algorithm.",
    githubUrl: "https://github.com/vishalpokuri/pentoMino-frontend",
    liveUrl: "https://calendar-pentomino.vercel.app/",
    technologies: ["React", "Java", "Typescript", "TailwindCSS"],
  },
  {
    id: 4,
    title: "Zerobug",
    subTitle: "(In Progress)",
    image: "/projects/zerobug.webp",
    description:
      "An alternative to Postman/Swagger API. Visualize, test and debug your endpoints, with Live frontend state mirroring. Create and test your flow chains with AI. ",
    liveUrl: "https://www.zerobug.canum.xyz",
    technologies: [
      "React",
      "Typescript",
      "CLI",
      "Web Sockets",
      "Express.js",
      "Node.js",
      "MongoDB",
    ],
  },
  {
    id: 3,
    title: "Solcade",
    image: "/projects/solcade.webp",
    description:
      "A decentralized arcade gaming platform built on Solana blockchain. Play classic games while earning cryptocurrency rewards.",
    liveUrl: "https://sol-cade.vercel.app",
    technologies: [
      "Next.js",
      "Typescript",
      "Solana Web3.js",
      "MongoDB",
      "Anchor",
      "Express",
    ],
  },
];
