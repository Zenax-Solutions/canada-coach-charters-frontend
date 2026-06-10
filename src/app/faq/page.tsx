import type { Metadata } from "next";
import { getPageSeo } from "@/lib/page-seo";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://canadacoachcharters.ca";

type FAQItem = {
    question: string;
    answer: string;
    bullets?: string[];
};

type FAQSection = {
    id: string;
    title: string;
    items: FAQItem[];
};

const faqSections: FAQSection[] = [
    {
        id: "general",
        title: "General Questions",
        items: [
            {
                question: "What services does Canada Coach Charters provide?",
                answer:
                    "We provide charter coach transportation, airport transfers, corporate transportation, employee shuttles, wedding transportation, sports team travel, school trips, private tours, and group transfers across Toronto, the GTA, and surrounding regions.",
            },
            {
                question: "What areas do you serve?",
                answer:
                    "We serve Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Scarborough, North York, Etobicoke, Hamilton, Niagara Falls, the GTA, and long-distance routes across Ontario and Canada.",
            },
            {
                question: "What types of vehicles are available?",
                answer: "Vehicle selection depends on your group size, trip type, and luggage requirements.",
                bullets: ["Luxury coach buses", "Mini coaches", "Charter buses", "Shuttle buses", "Executive vans", "Sprinter vehicles"],
            },
            {
                question: "How many passengers can your coaches accommodate?",
                answer: "We offer transportation solutions for both small and large groups.",
                bullets: ["10 to 14 passenger executive vans", "20 to 30 passenger mini coaches", "40 to 56 passenger full-size charter coaches"],
            },
            {
                question: "Are your drivers licensed and experienced?",
                answer:
                    "Yes. All drivers are professionally licensed, experienced, and trained to prioritize passenger safety and comfort.",
            },
        ],
    },
    {
        id: "booking",
        title: "Booking and Reservations",
        items: [
            {
                question: "How do I request a quote?",
                answer: "You can request a quote through the website, by phone, or by email. For accurate pricing, we typically require:",
                bullets: ["Pickup and drop-off locations", "Travel dates", "Number of passengers", "Trip duration", "Planned stops or itinerary"],
            },
            {
                question: "How far in advance should I book?",
                answer: "We recommend booking as early as possible, especially during peak seasons, weekends, holidays, weddings, and summer months.",
            },
            {
                question: "Can I make last-minute bookings?",
                answer: "Yes, subject to vehicle availability. Contact us directly for urgent or same-day transportation requests.",
            },
            {
                question: "Do you require a deposit?",
                answer: "Most bookings require a deposit to confirm the reservation. The remaining balance is generally due before the trip date.",
            },
            {
                question: "What payment methods do you accept?",
                answer: "Accepted payment options may include credit cards, debit cards, e-transfers, bank transfers, and corporate payments.",
            },
        ],
    },
    {
        id: "airport",
        title: "Airport Transfers",
        items: [
            {
                question: "Do you provide airport transfers?",
                answer: "Yes. We provide reliable airport transportation services for groups, families, corporate travelers, and tourists.",
            },
            {
                question: "Which airports do you serve?",
                answer: "We commonly serve Toronto Pearson (YYZ), Billy Bishop Toronto City Airport, Hamilton International Airport, and other regional airports upon request.",
            },
            {
                question: "Can you monitor flight delays?",
                answer: "Yes. Flight tracking can be arranged to help coordinate pickups and reduce wait times.",
            },
            {
                question: "Do airport transfers include luggage assistance?",
                answer: "Yes. Drivers can assist with loading and unloading luggage where required.",
            },
        ],
    },
    {
        id: "group",
        title: "Corporate, Tours, and Group Travel",
        items: [
            {
                question: "Do you provide corporate transportation services?",
                answer: "Yes. We support conferences, meetings, trade shows, employee shuttles, corporate retreats, VIP travel, and executive transportation.",
            },
            {
                question: "Can transportation be customized for events and tours?",
                answer: "Yes. We can arrange custom pickup schedules, multiple stops, and flexible itineraries for corporate and private group trips.",
            },
            {
                question: "Do you offer wedding, school, and sports transportation?",
                answer: "Yes. We regularly provide transportation for wedding events, school trips, sports tournaments, church groups, and community organizations.",
            },
            {
                question: "Do you offer multi-day and long-distance transportation?",
                answer: "Yes. Multi-day charters are available for tours, conferences, sports teams, and long-distance travel.",
            },
        ],
    },
    {
        id: "policies",
        title: "Safety, Comfort, and Policies",
        items: [
            {
                question: "Are your vehicles maintained and cleaned regularly?",
                answer: "Yes. Vehicles are routinely inspected, cleaned, and sanitized before and after trips.",
            },
            {
                question: "Can we bring food and drinks onboard?",
                answer: "Light snacks and non-alcoholic beverages are generally permitted. Please confirm specific policies during booking.",
            },
            {
                question: "Is alcohol or smoking allowed onboard?",
                answer: "Alcohol policies depend on local regulations and trip arrangements. Smoking and vaping are generally prohibited onboard charter coaches.",
            },
            {
                question: "What amenities are available onboard?",
                answer: "Depending on the selected vehicle, amenities may include reclining seats, air conditioning, Wi-Fi, USB charging ports, washrooms, PA systems, TV screens, and large luggage storage.",
            },
            {
                question: "What factors affect pricing?",
                answer: "Pricing may depend on group size, vehicle type, distance traveled, trip duration, number of stops, overnight stays, and seasonal demand.",
            },
        ],
    },
    {
        id: "contact",
        title: "Additional Questions",
        items: [
            {
                question: "Can we add multiple pickup and drop-off locations?",
                answer: "Yes. Routes can be customized with multiple stops based on your itinerary.",
            },
            {
                question: "Do you provide cross-border transportation to the United States?",
                answer: "Cross-border transportation may be available depending on licensing and travel requirements.",
            },
            {
                question: "How can I contact Canada Coach Charters?",
                answer: "You can contact us through our website, phone, or email for bookings, pricing, and custom transportation requests.",
            },
        ],
    },
];

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getPageSeo("faq");
    const title = seo?.meta_title || "Frequently Asked Questions | Canada Coach Charters";
    const description =
        seo?.meta_description ||
        "Browse frequently asked questions about charter bus services, airport transfers, group travel, booking policies, and pricing.";
    return {
        title,
        description,
        keywords: seo?.keywords || undefined,
        alternates: {
            canonical: "/faq",
            languages: {
                "en-CA": "/faq",
                "x-default": "/faq",
            },
        },
        openGraph: {
            type: "website",
            url: `${siteUrl}/faq`,
            locale: "en_CA",
            title,
            description: seo?.meta_description || "Answers about charter transportation, service areas, pricing, and booking policies.",
            siteName: "Canada Coach Charters",
            images: [{ url: "/page-header.jpg", width: 1200, height: 630, alt: "Canada Coach Charters FAQ" }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: seo?.meta_description || "Find quick answers for bookings, service options, and trip planning.",
            images: ["/page-header.jpg"],
        },
    };
}

export default function FaqPage() {
    const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqSections.flatMap((section) =>
            section.items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: [item.answer, ...(item.bullets ?? [])].join(" "),
                },
            }))
        ),
    };

    return (
        <div className="min-h-screen bg-white p-1 sm:p-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
            />

            <div className="relative overflow-hidden rounded-3xl">
                <Header />

                <section className="relative px-2 pb-20 pt-36 sm:px-8 lg:px-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/page-header/cr=t_0,w_100.webp')" }}
                    />
                    <div className="absolute inset-0 bg-black/55" />
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    />

                    <div className="relative mx-auto max-w-7xl">
                        <nav className="mb-6 flex items-center gap-2 text-sm text-blue-200">
                            <Link href="/" className="transition-colors hover:text-white">
                                Home
                            </Link>
                            <ArrowRight className="h-3.5 w-3.5" />
                            <span className="font-medium text-white">Frequently Asked Questions</span>
                        </nav>

                        <span className="mb-5 inline-block rounded-full border border-blue-500 bg-blue-600/50 px-4 py-1.5 text-xs font-semibold text-blue-200">
                            Help Center
                        </span>

                        <h1 className="mb-4 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl">
                            Frequently Asked Questions
                        </h1>
                        <p className="max-w-4xl text-base leading-relaxed text-blue-100 sm:text-lg">
                            Find answers about charter transportation, airport transfers, tours, school and sports travel, event transportation, pricing, and booking policies.
                        </p>
                    </div>
                </section>
            </div>

            <section className="bg-slate-50 px-2 py-14 sm:px-8 lg:px-10 lg:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Explore FAQ Topics</h2>
                        <div className="mt-4 flex flex-wrap gap-2.5">
                            {faqSections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                >
                                    {section.title}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 space-y-6">
                        {faqSections.map((section) => (
                            <section
                                key={section.id}
                                id={section.id}
                                className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                            >
                                <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>

                                <div className="mt-5 space-y-3">
                                    {section.items.map((item) => (
                                        <details
                                            key={item.question}
                                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                                        >
                                            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-4 py-3 text-left text-sm font-semibold text-slate-800 marker:content-none sm:text-base">
                                                <span>{item.question}</span>
                                                <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180" />
                                            </summary>

                                            <div className="px-4 pb-4 text-sm leading-relaxed text-slate-600">
                                                <p>{item.answer}</p>
                                                {item.bullets && item.bullets.length > 0 && (
                                                    <ul className="mt-2 list-disc space-y-1 pl-5">
                                                        {item.bullets.map((bullet) => (
                                                            <li key={bullet}>{bullet}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>

                    <section className="mt-8 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-cyan-50 p-6 shadow-sm sm:p-8">
                        <h2 className="text-2xl font-bold text-slate-900">Need a Custom Quote?</h2>
                        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
                            If you did not find your answer here, our team can help with route planning, fleet recommendations, and custom pricing for your group.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
                            >
                                Contact Us
                            </Link>
                            <a
                                href="tel:+16478464140"
                                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
                            >
                                +1 (647) 846-4140
                            </a>
                        </div>
                    </section>
                </div>
            </section>

            <Footer />
        </div>
    );
}