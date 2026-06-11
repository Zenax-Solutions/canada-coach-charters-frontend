import type { Metadata } from "next";
import { Manrope, Dancing_Script } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AIChatWidget from "@/components/AIChatWidget";
import WhatsAppWidget from "@/components/WhatsAppWidget";

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
    default: "Canada Coach Charters | Rental Bus Services in Toronto",
    template: "%s | Canada Coach Charters",
  },
  description:
    "Explore Canada with Canada Coach Charters. We provide wedding, corporate, private travel, school rentals, and airport shuttle services at affordable rates.",
  keywords: [
    "Canada Coach Charters",
    "rental bus services Toronto",
    "charter coach service Toronto",
    "luxury coach buses Toronto",
    "shuttle transfer service Toronto",
    "bus rental services Toronto",
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
    languages: {
      "en-CA": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    locale: "en_CA",
    title: "Canada Coach Charters | Rental Bus Services in Toronto",
    description:
      "Explore Canada with Canada Coach Charters. Wedding, corporate, private travel, school rentals, and airport shuttle transportation services.",
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
    title: "Canada Coach Charters | Rental Bus Services in Toronto",
    description:
      "Wedding, corporate, school, private, and airport shuttle transportation services with dependable support.",
    creator: "@canadacoachcharters",
    site: "@canadacoachcharters",
    images: ["/page-header.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E5CFLVF3Q9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-E5CFLVF3Q9');`}
        </Script>
        {children}
        <WhatsAppWidget />
        <AIChatWidget />
      </body>
    </html>
  );
}
