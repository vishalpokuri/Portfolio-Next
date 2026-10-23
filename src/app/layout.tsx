import type { Metadata } from "next";
import localFont from "next/font/local";
import MotionProvider from "../components/MotionProvider";
import CustomCursor from "../components/CustomCursor";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_LINKS,
} from "../data/site";

import "./globals.css";

// Latin-only subsets (pyftsubset --flavor=woff2). Characters outside Latin fall back to system fonts.
const ralewayLightFont = localFont({
  src: "../fonts/Raleway-Light.woff2",
  variable: "--font-ralewayLight",
  display: "swap",
  preload: false,
});

const ralewayNormalFont = localFont({
  src: "../fonts/Raleway-Regular.woff2",
  variable: "--font-ralewayNormal",
  display: "swap",
});

const ralewayMediumFont = localFont({
  src: "../fonts/Raleway-Medium.woff2",
  variable: "--font-ralewayMedium",
  display: "swap",
});

const ralewaySemiBoldFont = localFont({
  src: "../fonts/Raleway-SemiBold.woff2",
  variable: "--font-ralewaySemiBold",
  display: "swap",
});

const ralewayBoldFont = localFont({
  src: "../fonts/Raleway-Bold.woff2",
  variable: "--font-ralewayBold",
  display: "swap",
  preload: false,
});

const dotoexbFont = localFont({
  src: "../fonts/Doto_Rounded-ExtraBold.woff2",
  variable: "--font-dotoexb",
  display: "swap",
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
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/ogImage.jpg",
        width: 1200,
        height: 630,
        alt: "Vishal Pokuri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@vishal_pokuri99",
    images: ["/ogImage.jpg"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Chargebee",
    url: "https://www.chargebee.com",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Vellore Institute of Technology",
  },
  email: `mailto:${SOCIAL_LINKS.email}`,
  sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin, SOCIAL_LINKS.x],
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
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <MotionProvider>
          <CustomCursor />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
