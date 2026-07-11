import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import CoreServices from "@/components/CoreServices";
import FleetSection from "@/components/FleetSection";

import WhyChooseUs from "@/components/WhyChooseUs";
import GTAServiceAreas from "@/components/GTAServiceAreas";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/FaqSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";
import { School, Church, BadgeCheck } from "lucide-react";
import { getPageSeo } from "@/lib/page-seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://canadacoachcharters.ca";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("home");
  return {
    title: seo?.meta_title || "Canada Coach Charters | Rental Bus Services in Toronto",
    description: seo?.meta_description || "Explore Canada with Canada Coach Charters. We provide wedding, corporate, private travel, school rentals, and airport shuttle services at affordable rates.",
    keywords: seo?.keywords || undefined,
    alternates: {
      canonical: "/",
      languages: { "en-CA": "/", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      url: siteUrl,
      locale: "en_CA",
      title: seo?.meta_title || "Canada Coach Charters | Rental Bus Services in Toronto",
      description: seo?.meta_description || "Wedding, corporate, private travel, school rental, and airport shuttle services in Toronto and across the GTA.",
      siteName: "Canada Coach Charters",
      images: [{ url: "/page-header.jpg", width: 1200, height: 630, alt: "Canada Coach Charters" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.meta_title || "Canada Coach Charters | Rental Bus Services in Toronto",
      description: seo?.meta_description || "Trusted charter buses, airport transfers, and group transportation across Toronto and the GTA.",
      images: ["/page-header.jpg"],
    },
  };
}

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
      <CoreServices />
      <FleetSection />

      <WhyChooseUs />
      <GTAServiceAreas />
      <HowItWorks />
      <FaqSection />
      <TestimonialsSection />
      <section className="relative overflow-hidden px-2 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-blue-100/80 via-cyan-50/35 to-transparent" />
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-blue-100/80 bg-gradient-to-br from-white via-blue-50/55 to-cyan-50/70 p-6 shadow-[0_28px_70px_-48px_rgba(14,116,144,0.65)] sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
            <div className="rounded-3xl border border-white/70 bg-white/85 p-5 backdrop-blur-sm sm:p-6">
              <p className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-blue-700">
                GTA Group Services
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                Trusted Transportation for Schools and Churches
              </h2>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/75 p-3.5">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <School className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-medium text-slate-700 sm:text-base">We do private schools in GTA</p>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/75 p-3.5">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-600 text-white">
                    <Church className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-medium text-slate-700 sm:text-base">Churches in GTA</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">In the approved list for</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2.5">
                  <BadgeCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                  <p className="text-sm font-semibold text-slate-800">Toronto District School Board</p>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2.5">
                  <BadgeCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                  <p className="text-sm font-semibold text-slate-800">York Region District School Board</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <QuoteSection />
      <Footer />
    </div>
  );
}
