import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, MapPin, Clock3, Users } from "lucide-react";
import { storageUrl } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://canadacoachcharters.ca";

export const metadata: Metadata = {
    title: "Sri Lanka Tour Packages from Canada | Wildlife, Heritage & Coastal Tours",
    description:
        "Browse Sri Lanka tour packages for Canada-based travelers, including wildlife safaris, heritage circuits, and coastal escapes with day-by-day itineraries, accommodation plans, and transparent pricing.",
    keywords: [
        "Sri Lanka tours",
        "Sri Lanka tour packages",
        "Sri Lanka holiday packages",
        "Sri Lanka wildlife tour",
        "Sri Lanka heritage tour",
        "Sri Lanka coastal tour",
        "Sri Lanka safari itinerary",
        "Sri Lanka private guided tour",
        "Sri Lanka travel package from Canada",
        "guided Sri Lanka itinerary",
        "tour packages from Canada",
        "private Sri Lanka tours",
        "13 day Sri Lanka tour",
        "Sri Lanka travel planner",
    ],
    alternates: {
        canonical: "/tours",
    },
    openGraph: {
        type: "website",
        url: `${siteUrl}/tours`,
        title: "Sri Lanka Tour Packages from Canada",
        description:
            "Curated Sri Lanka wildlife, heritage, and coastal tour categories with detailed itineraries and package options.",
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
        title: "Sri Lanka Tour Packages from Canada",
        description:
            "Browse wildlife, heritage, and coastal Sri Lanka packages with complete itinerary, stay, and pricing details.",
        images: ["/page-header.jpg"],
    },
};

interface TourCategory {
    id: number;
    name: string;
    slug: string;
    tours_count: number;
}

interface TourListItem {
    id: number;
    title: string;
    slug: string;
    short_description: string;
    featured_image: string | null;
    duration_days: number;
    start_location: string;
    max_group_size: number;
    price_per_person: number;
    country: string | null;
    category: { name: string; slug: string } | null;
}

interface ToursResponse {
    data: TourListItem[];
}

async function getCategories(): Promise<TourCategory[]> {
    try {
        const base = process.env.NEXT_PUBLIC_API_URL;
        if (!base) return [];
        const res = await fetch(`${base}/tours/categories`, { next: { revalidate: 60 } });
        if (!res.ok) return [];
        return (await res.json()) as TourCategory[];
    } catch {
        return [];
    }
}

async function getTours(category?: string): Promise<TourListItem[]> {
    try {
        const base = process.env.NEXT_PUBLIC_API_URL;
        if (!base) return [];
        const query = new URLSearchParams({ per_page: "24" });
        if (category) query.set("category", category);

        const res = await fetch(`${base}/tours?${query.toString()}`, { next: { revalidate: 60 } });
        if (!res.ok) return [];

        const json = (await res.json()) as ToursResponse;
        return json.data ?? [];
    } catch {
        return [];
    }
}

export default async function ToursPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}) {
    const { category } = await searchParams;
    const [categories, tours] = await Promise.all([getCategories(), getTours(category)]);

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Sri Lanka Tour Packages",
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
                        style={{ backgroundImage: "url('/page-header.jpg')" }}
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
                            International Tour Collection
                        </span>

                        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-3xl">
                            Sri Lanka Tours for Canada-Based Travelers
                        </h1>
                        <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-3xl">
                            Discover curated wildlife, heritage, and coastal journeys with guided experiences,
                            flexible itineraries, and transparent package structures.
                        </p>
                    </div>
                </section>
            </div>

            <section className="py-14 px-2 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto">
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

                                            <div className="flex items-center justify-between gap-4">
                                                <p className="text-sm font-semibold text-slate-900">
                                                    From <span className="text-blue-700">USD {Number(tour.price_per_person).toLocaleString()}</span>
                                                </p>

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

            <QuoteSection />
            <Footer />
        </div>
    );
}
