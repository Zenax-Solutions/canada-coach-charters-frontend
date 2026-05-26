import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import CoreServices from "@/components/CoreServices";
import FleetSection from "@/components/FleetSection";
import ToursSection from "@/components/ToursSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import GTAServiceAreas from "@/components/GTAServiceAreas";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/FaqSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://canadacoachcharters.ca";

export const metadata: Metadata = {
  title: "Canada Coach Charters | Rental Bus Services in Toronto",
  description:
    "Explore Canada with Canada Coach Charters. We provide wedding, corporate, private travel, school rentals, and airport shuttle services at affordable rates.",
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
      "Wedding, corporate, private travel, school rental, and airport shuttle services in Toronto and across the GTA.",
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
      "Trusted charter buses, airport transfers, and group transportation across Toronto and the GTA.",
    images: ["/page-header.jpg"],
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "Canada Coach Charters",
        inLanguage: "en-CA",
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: "Canada Coach Charters | Rental Bus Services in Toronto",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        description:
          "Explore Canada with Canada Coach Charters. We provide wedding, corporate, private travel, school rentals, and airport shuttle services at affordable rates.",
        inLanguage: "en-CA",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteUrl}/`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white p-1 sm:p-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="relative rounded-3xl overflow-hidden">
        <Header />
        <Hero />
      </div>
      <AboutUs />
      <section className="px-2 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-blue-100 bg-blue-50/70 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">GTA Group Services</h2>
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700 sm:text-base">
            <p>we do private schools in GTA</p>
            <p>Churches in GTA</p>
            <p>in the approved list for</p>
            <p>Toronto District School Board</p>
            <p>York Region District School Board</p>
          </div>
        </div>
      </section>
      <CoreServices />
      <FleetSection />
      <ToursSection />
      <WhyChooseUs />
      <GTAServiceAreas />
      <HowItWorks />
      <FaqSection />
      <TestimonialsSection />
      <QuoteSection />
      <Footer />
    </div>
  );
}
