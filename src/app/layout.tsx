import type { Metadata } from "next";
import { Manrope, Dancing_Script } from "next/font/google";
import "./globals.css";
import AIChatWidget from "@/components/AIChatWidget";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://canadacoachcharters.ca";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Canada Coach Charters",
  authors: [{ name: "Canada Coach Charters" }],
  creator: "Canada Coach Charters",
  publisher: "Canada Coach Charters",
  title: {
    default: "Canada Coach Charters | Coach Charter, Transfers & Tour Packages",
    template: "%s | Canada Coach Charters",
  },
  description:
    "Canada Coach Charters provides premium coach charter rentals, airport transfers, group transportation, and curated international tour packages with trusted drivers and transparent pricing.",
  keywords: [
    "Canada Coach Charters",
    "coach charter Canada",
    "bus rental Toronto",
    "charter bus Toronto",
    "charter bus rental Ontario",
    "group transportation Canada",
    "corporate shuttle service",
    "wedding transportation Toronto",
    "school trip bus rental",
    "airport transfers Toronto",
    "private transfer service",
    "guided tour packages",
    "Sri Lanka tours from Canada",
    "private guided tours",
    "custom travel itineraries",
    "Canada group travel",
  ],
  category: "travel",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Canada Coach Charters | Coach Charter, Transfers & Tour Packages",
    description:
      "Coach charters, airport transfers, and curated guided tour packages with transparent pricing and trusted service across Canada.",
    siteName: "Canada Coach Charters",
    images: [
      {
        url: "/page-header.jpg",
        width: 1200,
        height: 630,
        alt: "Canada Coach Charters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Canada Coach Charters | Coach Charter, Transfers & Tour Packages",
    description:
      "Premium coach charters, transfers, and guided tours with transparent pricing and reliable support.",
    images: ["/page-header.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${dancingScript.variable}`}>
      <body
        className="min-h-screen font-[family-name:var(--font-manrope)] antialiased"
        suppressHydrationWarning
      >
        {children}
        <AIChatWidget />
      </body>
    </html>
  );
}
