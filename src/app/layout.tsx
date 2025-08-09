import type { Metadata } from "next";
import { Raleway, Doto } from "next/font/google";

import "./globals.css";

const ralewayLightFont = Raleway({
  variable: "--font-ralewayLight",
  subsets: ["latin"],
  display: "swap",
  weight: "300",
});
const ralewayNormalFont = Raleway({
  variable: "--font-ralewayNormal",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});
const ralewayMediumFont = Raleway({
  variable: "--font-ralewayMedium",
  subsets: ["latin"],
  display: "swap",
  weight: "500",
});
const ralewaySemiBoldFont = Raleway({
  variable: "--font-ralewaySemiBold",
  subsets: ["latin"],
  display: "swap",
  weight: "600",
});
const ralewayBoldFont = Raleway({
  variable: "--font-ralewayBold",
  subsets: ["latin"],
  display: "swap",
  weight: "700",
});
const dotoexbFont = Doto({
  variable: "--font-dotoexb",
  subsets: ["latin"],
  // display: "swap",
  weight: "800", // 800 is ExtraBold
});

/* @theme {
  --font-light: Raleway Light, "sans-serif"; -> font-raleway font-light
  --font-reg: Raleway Regular, "sans-serif"; -> font-raleway font-normal
  --font-sb: Raleway SemiBold, "sans-serif"; -> font-raleway font-semibold
  --font-med: Raleway Medium, "sans-serif"; -> font-raleway font-medium
  --font-b: Raleway Bold, "sans-serif"; > font-raleway font-bold
  --font-deb: Doto Rounded ExtraBold, "sans-serif";
} */

export const metadata: Metadata = {
  title: "Portfolio | Vishal Pokuri",
  description: "A modern, fast, and optimized portfolio built with Next.js.",
  metadataBase: new URL("https://canum.xyz"),
  openGraph: {
    title: "Portfolio | Vishal Pokuri",
    description: "A modern, fast, and optimized portfolio built with Next.js.",
    url: "https://canum.xyz",
    siteName: "Portfolio | Vishal Pokuri",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${ralewayLightFont.variable}
        ${ralewayMediumFont.variable}
        ${ralewayNormalFont.variable}
        ${ralewayBoldFont.variable}
        ${ralewaySemiBoldFont.variable}
        ${dotoexbFont.variable}
      `}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
