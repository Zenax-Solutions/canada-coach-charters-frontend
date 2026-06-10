import type { Metadata } from "next";
import { getPageSeo } from "@/lib/page-seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, MapPin, Clock3, Users } from "lucide-react";
import { storageUrl } from "@/lib/api";
import { getTourCategories, getTours } from "@/lib/tours";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://canadacoachcharters.ca";

const toursKeywords = [
    "Sri Lanka tours from Canada",
    "Sri Lanka tours from the USA",
    "Sri Lanka tour packages",
    "Sri Lanka guided tours",
    "private Sri Lanka tours",
    "Sri Lanka vacation packages",
    "Sri Lanka wildlife tours",
    "Sri Lanka cultural tours",
    "Sri Lanka accessible tours",
    "Sri Lanka culinary tours",
    "Sri Lanka custom tours",
    "Sri Lanka round tours",
    "Sri Lanka luxury tours",
    "Sri Lanka tours for Canadian travellers",
    "Sri Lanka tours for American travellers",
];

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getPageSeo("tours");
    const title = seo?.meta_title || "Sri Lanka Tours from Canada & USA | Guided Travel Packages";
    const description =
        seo?.meta_description ||
        "Explore Sri Lanka tours from Canada and the USA. Choose from private, guided, wildlife, cultural, culinary, wellness, accessible, and custom Sri Lanka tour packages.";
    return {
        title,
        description,
        keywords: seo?.keywords ? seo.keywords.split(",").map((k) => k.trim()) : toursKeywords,
        alternates: {
            canonical: "/tours",
        },
        openGraph: {
            type: "website",
            url: `${siteUrl}/tours`,
            title,
            description:
                seo?.meta_description ||
                "Guided Sri Lanka travel packages for Canadian and American travellers, including private, wildlife, cultural, culinary, wellness, accessible, and custom tours.",
            images: [
                {
                    url: "/page-header.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Sri Lanka Tours",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description:
                seo?.meta_description ||
                "Explore guided Sri Lanka tour packages for Canada and USA travellers.",
            images: ["/page-header.jpg"],
        },
    };
}

export default async function ToursPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}) {
    const { category } = await searchParams;
    const [categories, tours] = await Promise.all([
        getTourCategories(),
        getTours({ category, perPage: 24 }),
    ]);

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Sri Lanka Tour Packages for Canada and USA Travellers",
        itemListElement: tours.map((tour, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${siteUrl}/tours/${tour.slug}`,
            name: tour.title,
        })),
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${siteUrl}/`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Tours",
                item: `${siteUrl}/tours`,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-white p-1 sm:p-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="relative rounded-3xl overflow-hidden">
                <Header />

                <section className="relative pt-36 pb-20 px-2 sm:px-8 lg:px-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/page-header/69ea2c4020765b2e7a997484_vip-bus-viandi.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-black/60" />

                    <div className="relative max-w-7xl mx-auto">
                        <nav className="flex items-center gap-2 text-blue-200 text-sm mb-6">
                            <Link href="/" className="hover:text-white transition-colors">
                                Home
                            </Link>
                            <ArrowRight className="w-3.5 h-3.5" />
                            <span className="text-white font-medium">Tours</span>
                        </nav>

                        <span className="inline-block text-xs font-semibold text-blue-200 border border-blue-500 bg-blue-600/50 rounded-full px-4 py-1.5 mb-5">
                            Guided Sri Lanka Tour Packages for North American Travellers
                        </span>

                        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-3xl">
                            Sri Lanka Tours from Canada & USA
                        </h1>
                        <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-3xl">
                            Experience Sri Lanka with a travel team that truly understands what Canadian and USA travellers want. Journey from ancient temples to lush tea country, enjoy thrilling wildlife safaris, relax on golden beaches, savour exclusive food tours, and rejuvenate at top wellness retreats.
                        </p>
                        <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-3xl mt-3">
                            No matter your style - couple, family, group, senior, or solo - we expertly tailor your itinerary, hotel, transportation, guide, and travel pace to ensure your perfect trip.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href="#packages"
                                className="inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-2 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors font-semibold text-white text-sm"
                            >
                                View Sri Lanka Tour Packages
                                <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                                    <ChevronRight className="w-4 h-4 text-blue-700" />
                                </span>
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-2 rounded-full border border-white/40 bg-white/10 hover:bg-white/20 transition-colors font-semibold text-white text-sm"
                            >
                                Request a Custom Quote
                                <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                                    <ChevronRight className="w-4 h-4 text-blue-700" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

            <section className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10 bg-white">
                <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-10 shadow-sm">
                        <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 mb-4">
                            Guided Sri Lanka Tour Packages for North American Travellers
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
                            Tours Crafted for Travellers from Canada and the USA
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Fly from major Canadian or US cities such as Toronto, Vancouver, Montreal, New York, or Los Angeles, and embark on a Sri Lanka journey meticulously crafted for North American travellers.
                        </p>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            Every tour can be tailored to your arrival airport, travel dates, budget, hotel preferences, dietary needs, mobility, and sightseeing interests.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Need something more specific? Our team can help you plan a customised itinerary through our contact team.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href="#packages"
                                className="inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-2 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors font-semibold text-white text-sm"
                            >
                                View Custom Tour
                                <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                                    <ChevronRight className="w-4 h-4 text-blue-700" />
                                </span>
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-2 rounded-full border border-blue-700 text-blue-700 hover:bg-blue-50 transition-colors font-semibold text-sm"
                            >
                                Request Private Tour Quote
                                <span className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center shrink-0">
                                    <ChevronRight className="w-4 h-4 text-white" />
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-gradient-to-br from-blue-800 to-blue-600 p-7 sm:p-10 text-white shadow-lg">
                        <h3 className="text-2xl font-bold mb-4">Why Book Sri Lanka Tours With Us?</h3>
                        <p className="text-blue-100 leading-relaxed mb-5">
                            Travel with confidence - our flexible itineraries, expert guides, and seamless support make exploring Sri Lanka effortless and rewarding for Canadian and USA-based adventurers.
                        </p>
                        <p className="text-blue-100 leading-relaxed mb-5">
                            Our tours are ideal for families, couples, seniors, small groups, accessible travel guests, and anyone interested in food, culture, wildlife, or visiting Sri Lanka for the first time.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-2 rounded-full bg-white hover:bg-blue-50 transition-colors font-semibold text-blue-800 text-sm"
                        >
                            Talk to a Tour Specialist
                            <span className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center shrink-0">
                                <ChevronRight className="w-4 h-4 text-white" />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            <section id="packages" className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 text-center">
                        <span className="inline-block text-xs font-semibold text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
                            Popular Sri Lanka Tour Packages
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-3">
                            Popular Sri Lanka Tour Packages
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed max-w-3xl mx-auto">
                            Browse our collection of Sri Lanka journeys and choose the style that matches your travel plans.
                        </p>
                    </div>

                    <div className="mb-7 flex flex-wrap items-center gap-2">
                        <Link
                            href="/tours"
                            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${!category
                                ? "border-blue-700 bg-blue-700 text-white"
                                : "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                                }`}
                        >
                            All Categories
                        </Link>

                        {categories.map((item) => (
                            <Link
                                key={item.id}
                                href={`/tours?category=${item.slug}`}
                                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${category === item.slug
                                    ? "border-blue-700 bg-blue-700 text-white"
                                    : "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                                    }`}
                            >
                                {item.name} ({item.tours_count})
                            </Link>
                        ))}
                    </div>

                    {tours.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                            {tours.map((tour) => {
                                const imgSrc = storageUrl(tour.featured_image);
                                const isLocalBackendImage = Boolean(
                                    imgSrc &&
                                    (imgSrc.startsWith("http://localhost:") || imgSrc.startsWith("http://127.0.0.1:")),
                                );
                                const numericPrice = Number(tour.price_per_person);
                                const hasVisiblePrice = Number.isFinite(numericPrice) && numericPrice > 0;

                                return (
                                    <article
                                        key={tour.id}
                                        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_45px_-32px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_26px_52px_-28px_rgba(37,99,235,0.28)]"
                                    >
                                        <div className="relative h-56 w-full">
                                            {imgSrc ? (
                                                <Image
                                                    src={imgSrc}
                                                    alt={tour.title}
                                                    fill
                                                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                                    unoptimized={isLocalBackendImage}
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
                                            {tour.category && (
                                                <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                                    {tour.category.name}
                                                </span>
                                            )}
                                        </div>

                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 line-clamp-2">
                                                {tour.title}
                                            </h3>
                                            <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                                                {tour.short_description}
                                            </p>

                                            <div className="mb-4 space-y-2 text-xs text-slate-500">
                                                <p className="inline-flex items-center gap-1.5 mr-3">
                                                    <Clock3 className="w-3.5 h-3.5 text-blue-600" />
                                                    {tour.duration_days} Days
                                                </p>
                                                <p className="inline-flex items-center gap-1.5 mr-3">
                                                    <Users className="w-3.5 h-3.5 text-blue-600" />
                                                    Up to {tour.max_group_size} Pax
                                                </p>
                                                <p className="inline-flex items-center gap-1.5">
                                                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                                                    {tour.country ?? tour.start_location}
                                                </p>
                                            </div>

                                            <div className={`flex items-center gap-4 ${hasVisiblePrice ? "justify-between" : "justify-end"}`}>
                                                {hasVisiblePrice && (
                                                    <p className="text-sm font-semibold text-slate-900">
                                                        From <span className="text-blue-700">USD {numericPrice.toLocaleString()}</span>
                                                    </p>
                                                )}

                                                <Link
                                                    href={`/tours/${tour.slug}`}
                                                    className="inline-flex items-center justify-between gap-2 pl-4 pr-1 py-1 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors font-semibold text-white text-xs"
                                                >
                                                    View Tour
                                                    <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0">
                                                        <ChevronRight className="w-4 h-4 text-blue-700" />
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600">
                            No tours found in this category yet.
                        </div>
                    )}
                </div>
            </section>

            <section className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 text-center">
                        <span className="inline-block text-xs font-semibold text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
                            What Can You Experience in Sri Lanka?
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-3">
                            A Single Island Packed with Culture, Wildlife, Beaches, and Wellness
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed max-w-3xl mx-auto">
                            Discover a world of wonders - a single island where vibrant culture, spectacular wildlife, breathtaking landscapes, pristine beaches, and authentic hospitality await.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            "Ancient cities and UNESCO heritage sites",
                            "Sigiriya Rock Fortress",
                            "Temple of the Tooth in Kandy",
                            "Tea plantations and hill country",
                            "Ella's train journeys",
                            "Yala and Udawalawe wildlife safaris",
                            "Galle Fort and southern beaches",
                            "Ayurveda wellness retreats",
                            "Sri Lankan food and cooking experiences",
                            "Private guided round tours",
                        ].map((item) => (
                            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-medium text-slate-700">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10 bg-slate-50">
                <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-10 shadow-sm">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Sri Lanka Tours from Canada</h2>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            Unlock Sri Lanka&apos;s magic with seamless airport pickup, stress-free private transport, and ongoing local support. We handle the details for Canadian travellers from Toronto, Vancouver, and beyond.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-2 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors font-semibold text-white text-sm"
                        >
                            Request a Sri Lanka Tour from Canada
                            <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                                <ChevronRight className="w-4 h-4 text-blue-700" />
                            </span>
                        </Link>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-10 shadow-sm">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Sri Lanka Tours from the USA</h2>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            Transform your travel dreams into reality. From New York to Los Angeles, our Sri Lanka holidays offer you exceptional experiences and worry-free planning from takeoff to return.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-2 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors font-semibold text-white text-sm"
                        >
                            Request a Sri Lanka Tour from the USA
                            <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                                <ChevronRight className="w-4 h-4 text-blue-700" />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10 bg-white">
                <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-10 shadow-sm">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Custom Sri Lanka Tours</h2>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            Design an exclusive Sri Lanka journey tailored to your interests, budget, travel dates, and group needs. Let us turn your vision into an unforgettable private escape.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            {[
                                "Private family tours",
                                "Luxury Sri Lanka tours",
                                "Budget-friendly tours",
                                "Senior-friendly tours",
                                "Accessible tours",
                                "Wildlife and nature tours",
                                "Food and culture tours",
                                "Beach and wellness holidays",
                            ].map((item) => (
                                <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
                                    {item}
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-2 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors font-semibold text-white text-sm"
                        >
                            Create My Custom Sri Lanka Tour
                            <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                                <ChevronRight className="w-4 h-4 text-blue-700" />
                            </span>
                        </Link>
                    </div>

                    <div className="rounded-3xl bg-gradient-to-br from-blue-800 to-blue-600 p-7 sm:p-10 text-white shadow-lg">
                        <h3 className="text-2xl font-bold mb-4">Why Book Sri Lanka Tours With Us?</h3>
                        <p className="text-blue-100 leading-relaxed mb-5">
                            Travel with confidence - our flexible itineraries, expert guides, and seamless support make exploring Sri Lanka effortless and rewarding for Canadian and USA-based adventurers.
                        </p>
                        <p className="text-blue-100 leading-relaxed mb-6">
                            Our tours are ideal for families, couples, seniors, small groups, accessible travel guests, and anyone interested in food, culture, wildlife, or visiting Sri Lanka for the first time.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-2 rounded-full bg-white hover:bg-blue-50 transition-colors font-semibold text-blue-800 text-sm"
                        >
                            Talk to a Tour Specialist
                            <span className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center shrink-0">
                                <ChevronRight className="w-4 h-4 text-white" />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-3">
                            Frequently Asked Questions
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {[
                            {
                                question: "What is the best Sri Lanka tour for first-time visitors?",
                                answer:
                                    "The Classic Sri Lanka Highlights Tour or Grand Island Journey are top options for first-time travellers. These tours cover culture, tea country, wildlife, beaches, and historic sites.",
                            },
                            {
                                question: "Can travellers from Canada and the USA book these Sri Lanka tours?",
                                answer:
                                    "Yes. Our Sri Lanka tours are designed for Canada and USA-based travellers, with flexible itineraries, airport pickup, private transport, and guided support in Sri Lanka.",
                            },
                            {
                                question: "Can I customise my Sri Lanka tour package?",
                                answer:
                                    "Yes. You may customise your tour package according to travel dates, budget, hotel, group size, mobility requirements, and preferred experiences.",
                            },
                            {
                                question: "Are private Sri Lanka tours available?",
                                answer:
                                    "Yes. Private Sri Lanka tours are available for couples, families, small groups, seniors, and custom travel groups.",
                            },
                            {
                                question: "Do you offer accessible Sri Lanka tours?",
                                answer:
                                    "Yes. We offer accessible Sri Lanka tour options with selected hotels, suitable transport, and adjusted itineraries for travellers with mobility needs.",
                            },
                            {
                                question: "What currency are tour prices listed in?",
                                answer:
                                    "Prices are listed in USD unless otherwise stated. Custom quotes can be prepared based on your travel requirements.",
                            },
                        ].map((faq) => (
                            <details key={faq.question} className="rounded-xl border border-slate-200 bg-white p-5" open={faq.question.includes("first-time")}>
                                <summary className="font-semibold cursor-pointer text-slate-900">{faq.question}</summary>
                                <p className="text-sm text-slate-600 mt-2">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white px-2 pb-16 pt-14 sm:px-8 lg:px-10 lg:pb-24 lg:pt-16">
                <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-blue-800 to-blue-600 p-8 text-white sm:p-10">
                    <h2 className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl">Start Planning Your Sri Lanka Tour Today</h2>
                    <p className="mb-6 max-w-3xl text-sm text-blue-100 sm:text-base">
                        Seize the opportunity to explore Sri Lanka from Canada or the USA. Share your travel wishes - dates, group size, tour style, and budget - and our specialists will craft a personalised Sri Lanka adventure just for you.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-full bg-white text-blue-800 px-6 py-3 text-sm font-semibold hover:bg-blue-50 transition-colors"
                        >
                            Get a Free Quote
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="#packages"
                            className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                        >
                            View All Tour Packages
                        </Link>
                    </div>
                </div>
            </section>

            <QuoteSection initialServiceType="tour" />
            <Footer />
        </div>
    );
}
