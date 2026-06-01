import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronLeft, ChevronRight, Clock3, MapPin, Users } from "lucide-react";
import { storageUrl } from "@/lib/api";
import TourRequestModalButton from "@/components/TourRequestModalButton";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://canadacoachcharters.ca";

interface ItineraryDay {
    day_number: number;
    title: string;
    description: string;
    meals: string | null;
    accommodation: string | null;
}

interface AccommodationRow {
    destination: string;
    hotel: string;
    room: string;
}

interface PriceRate {
    group: string;
    price: number;
}

interface PricingPeriod {
    label: string;
    rates: PriceRate[];
    triple_reduction?: number;
    single_supplement?: number;
    currency?: string;
}

interface RelatedTour {
    id: number;
    slug: string;
    title: string;
    short_description: string;
    featured_image: string | null;
}

interface TourDetail {
    id: number;
    title: string;
    slug: string;
    description: string;
    short_description: string;
    featured_image: string | null;
    duration_days: number;
    start_location: string;
    end_location: string;
    country: string | null;
    meal_plan: string | null;
    max_group_size: number;
    price_per_person: number;
    included: string[] | null;
    excluded: string[] | null;
    highlights: string[] | null;
    accommodation_chart: AccommodationRow[] | null;
    pricing_periods: PricingPeriod[] | null;
    complements: string[] | null;
    other_conditions: string[] | null;
    general_reminders: string[] | null;
    hotel_rules: string | null;
    alcohol_policy: string | null;
    attire_policy: string | null;
    blackout_notes: string | null;
    extra_supplements: string[] | null;
    itineraries: ItineraryDay[];
    related_tours?: RelatedTour[];
    category: { name: string; slug: string } | null;
}

async function getTour(slug: string): Promise<TourDetail | null> {
    try {
        const base = process.env.NEXT_PUBLIC_API_URL;
        if (!base) return null;

        const res = await fetch(`${base}/tours/${slug}`, { next: { revalidate: 60 } });
        if (res.status === 404) return null;
        if (!res.ok) return null;

        return (await res.json()) as TourDetail;
    } catch {
        return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const tour = await getTour(slug);

    if (!tour) {
        return {
            title: "Tour Not Found",
            description: "The requested tour could not be found.",
        };
    }

    const canonicalPath = `/tours/${tour.slug}`;
    const imageUrl = storageUrl(tour.featured_image) ?? "/page-header.jpg";

    return {
        title: tour.title,
        description: tour.short_description || tour.description,
        keywords: [
            tour.title,
            `${tour.country ?? "Sri Lanka"} tour package`,
            `${tour.duration_days} day tour`,
            "private guided tour",
            "itinerary",
            "wildlife and heritage",
            "tour pricing",
            "tour accommodation",
            "custom travel package",
            "guided holiday package",
            "international group tour",
            "tour from Canada",
        ],
        alternates: {
            canonical: canonicalPath,
        },
        openGraph: {
            type: "article",
            url: `${siteUrl}${canonicalPath}`,
            title: tour.title,
            description: tour.short_description || tour.description,
            images: [
                {
                    url: imageUrl,
                    alt: tour.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: tour.title,
            description: tour.short_description || tour.description,
            images: [imageUrl],
        },
    };
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tour = await getTour(slug);

    if (!tour) notFound();

    const imgSrc = storageUrl(tour.featured_image);
    const isLocalBackendImage = Boolean(
        imgSrc && (imgSrc.startsWith("http://localhost:") || imgSrc.startsWith("http://127.0.0.1:")),
    );
    const numericPrice = Number(tour.price_per_person);
    const hasVisiblePrice = Number.isFinite(numericPrice) && numericPrice > 0;

    const tourSchema = {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: tour.title,
        description: tour.short_description || tour.description,
        image: imgSrc ?? `${siteUrl}/page-header.jpg`,
        touristType: "Leisure Travelers",
        itinerary: tour.itineraries.map((day) => ({
            "@type": "TouristAttraction",
            name: `Day ${day.day_number}: ${day.title}`,
            description: day.description,
        })),
        ...(hasVisiblePrice
            ? {
                offers: {
                    "@type": "Offer",
                    priceCurrency: "USD",
                    price: numericPrice,
                    availability: "https://schema.org/InStock",
                    url: `${siteUrl}/tours/${tour.slug}`,
                },
            }
            : {}),
        provider: {
            "@type": "Organization",
            name: "Canada Coach Charters",
            telephone: "+1-647-846-4140",
            email: "info@canadacoachcharters.ca",
        },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "Tours", item: `${siteUrl}/tours` },
            { "@type": "ListItem", position: 3, name: tour.title, item: `${siteUrl}/tours/${tour.slug}` },
        ],
    };

    return (
        <div className="min-h-screen bg-white p-2 sm:p-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(tourSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="relative rounded-3xl overflow-hidden">
                <Header />

                <section className="relative px-2 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-36 lg:px-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/page-header/69ea2c4020765b2e7a997484_vip-bus-viandi.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-black/60" />

                    <div className="relative max-w-6xl mx-auto">
                        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-blue-200">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <ArrowRight className="w-3.5 h-3.5" />
                            <Link href="/tours" className="hover:text-white transition-colors">Tours</Link>
                            <ArrowRight className="w-3.5 h-3.5" />
                            <span className="max-w-full break-words text-white font-medium">{tour.title}</span>
                        </nav>

                        {tour.category && (
                            <span className="inline-block text-xs font-semibold text-blue-200 border border-blue-500 bg-blue-600/50 rounded-full px-4 py-1.5 mb-5">
                                {tour.category.name}
                            </span>
                        )}

                        <h1 className="mb-5 max-w-5xl text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                            {tour.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-blue-100 sm:gap-4 sm:text-sm">
                            <span className="inline-flex items-center gap-1.5">
                                <Clock3 className="w-4 h-4" /> {tour.duration_days} Days
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Users className="w-4 h-4" /> Up to {tour.max_group_size} Pax
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" /> {tour.start_location} to {tour.end_location}
                            </span>
                        </div>
                    </div>
                </section>
            </div>

            <section className="px-2 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-20">
                <article className="max-w-6xl mx-auto">
                    <div className="relative mb-6 h-56 overflow-hidden rounded-2xl sm:mb-8 sm:h-[26rem] sm:rounded-3xl">
                        {imgSrc ? (
                            <Image
                                src={imgSrc}
                                alt={tour.title}
                                fill
                                sizes="(min-width: 1024px) 1100px, 100vw"
                                unoptimized={isLocalBackendImage}
                                className="object-cover"
                            />
                        ) : (
                            <div className="h-full w-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300" />
                        )}
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="rounded-2xl border border-slate-200 p-4 sm:p-6">
                                <h2 className="text-2xl font-bold text-slate-900 mb-3">Overview</h2>
                                <p className="text-slate-600 leading-relaxed">{tour.description}</p>
                                {tour.meal_plan && (
                                    <p className="mt-4 text-sm font-medium text-blue-700">Meal Plan: {tour.meal_plan}</p>
                                )}
                            </div>

                            {tour.highlights && tour.highlights.length > 0 && (
                                <div className="rounded-2xl border border-slate-200 p-4 sm:p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Tour Highlights</h3>
                                    <ul className="space-y-2 text-slate-600 text-sm">
                                        {tour.highlights.map((item) => (
                                            <li key={item}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="rounded-2xl border border-slate-200 p-4 sm:p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Day-by-Day Itinerary</h3>
                                <div className="space-y-4">
                                    {tour.itineraries.map((day) => (
                                        <div key={day.day_number} className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 sm:p-4">
                                            <p className="text-xs font-semibold text-blue-700 mb-1">Day {day.day_number}</p>
                                            <h4 className="text-base font-bold text-slate-900 mb-2">{day.title}</h4>
                                            <p className="text-sm text-slate-600 leading-relaxed">{day.description}</p>
                                            <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                                                {day.meals && <span>Meals: {day.meals}</span>}
                                                {day.accommodation && <span>Stay: {day.accommodation}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {tour.accommodation_chart && tour.accommodation_chart.length > 0 && (
                                <div className="rounded-2xl border border-slate-200 p-4 sm:p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">Accommodation Plan</h3>
                                    <div className="space-y-3 sm:hidden">
                                        {tour.accommodation_chart.map((row, idx) => (
                                            <div key={`${row.destination}-${idx}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                                                <p className="text-xs font-semibold text-slate-500">Destination</p>
                                                <p className="text-sm text-slate-800">{row.destination}</p>
                                                <p className="mt-2 text-xs font-semibold text-slate-500">Hotel</p>
                                                <p className="text-sm text-slate-800">{row.hotel}</p>
                                                <p className="mt-2 text-xs font-semibold text-slate-500">Room</p>
                                                <p className="text-sm text-slate-800">{row.room}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="hidden overflow-x-auto sm:block">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="text-left text-slate-500 border-b border-slate-200">
                                                    <th className="py-2 pr-4">Destination</th>
                                                    <th className="py-2 pr-4">Hotel</th>
                                                    <th className="py-2">Room Category</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tour.accommodation_chart.map((row, idx) => (
                                                    <tr key={`${row.destination}-${idx}`} className="border-b border-slate-100">
                                                        <td className="py-2 pr-4 text-slate-700">{row.destination}</td>
                                                        <td className="py-2 pr-4 text-slate-700">{row.hotel}</td>
                                                        <td className="py-2 text-slate-700">{row.room}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>

                        <aside className="space-y-6">
                            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:p-6">
                                {hasVisiblePrice && (
                                    <>
                                        <p className="text-xs font-semibold text-blue-700">Starting from</p>
                                        <p className="mt-1 text-3xl font-bold text-blue-900">USD {numericPrice.toLocaleString()}</p>
                                        <p className="mt-1 text-xs text-blue-700">Per person (indicative)</p>
                                    </>
                                )}
                                <TourRequestModalButton tourSlug={tour.slug} tourTitle={tour.title} />
                            </div>

                            {tour.pricing_periods && tour.pricing_periods.length > 0 && (
                                <div className="rounded-2xl border border-slate-200 p-4 sm:p-5">
                                    <h3 className="text-base font-bold text-slate-900 mb-3">Pricing Periods</h3>
                                    <div className="space-y-4">
                                        {tour.pricing_periods.map((period, idx) => (
                                            <div key={`${period.label}-${idx}`} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                                <p className="text-xs font-semibold text-slate-900 break-words">{period.label}</p>
                                                <ul className="mt-2 space-y-1 text-xs text-slate-600">
                                                    {period.rates.map((rate) => (
                                                        <li key={rate.group} className="flex items-center justify-between gap-3">
                                                            <span>{rate.group}</span>
                                                            <span className="font-semibold text-slate-800 text-right">
                                                                {period.currency ?? "USD"} {Number(rate.price).toLocaleString()}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                {(period.triple_reduction || period.single_supplement) && (
                                                    <p className="mt-2 text-[11px] text-slate-500 break-words">
                                                        {period.triple_reduction ? `Triple Reduction: ${period.currency ?? "USD"} ${period.triple_reduction}` : ""}
                                                        {period.triple_reduction && period.single_supplement ? " | " : ""}
                                                        {period.single_supplement ? `Single Supplement: ${period.currency ?? "USD"} ${period.single_supplement}` : ""}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {tour.included && tour.included.length > 0 && (
                                <div className="rounded-2xl border border-slate-200 p-4 sm:p-5">
                                    <h3 className="text-base font-bold text-slate-900 mb-2">What is Included</h3>
                                    <ul className="space-y-1.5 text-sm text-slate-600">
                                        {tour.included.map((item) => (
                                            <li key={item}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {tour.excluded && tour.excluded.length > 0 && (
                                <div className="rounded-2xl border border-slate-200 p-4 sm:p-5">
                                    <h3 className="text-base font-bold text-slate-900 mb-2">What is Not Included</h3>
                                    <ul className="space-y-1.5 text-sm text-slate-600">
                                        {tour.excluded.map((item) => (
                                            <li key={item}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </aside>
                    </div>

                    {(tour.blackout_notes || tour.alcohol_policy || tour.attire_policy || tour.hotel_rules) && (
                        <div className="mt-8 space-y-3 rounded-2xl border border-slate-200 p-4 sm:p-6">
                            <h3 className="text-xl font-bold text-slate-900">Travel Notes</h3>
                            {tour.blackout_notes && <p className="text-sm text-slate-600"><strong>Blackout:</strong> {tour.blackout_notes}</p>}
                            {tour.alcohol_policy && <p className="text-sm text-slate-600"><strong>Alcohol Policy:</strong> {tour.alcohol_policy}</p>}
                            {tour.attire_policy && <p className="text-sm text-slate-600"><strong>Attire:</strong> {tour.attire_policy}</p>}
                            {tour.hotel_rules && <p className="text-sm text-slate-600"><strong>Hotel Rules:</strong> {tour.hotel_rules}</p>}
                        </div>
                    )}

                    {tour.related_tours && tour.related_tours.length > 0 && (
                        <div className="mt-10">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Related Tours</h3>
                            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {tour.related_tours.map((item) => {
                                    const relatedImg = storageUrl(item.featured_image);
                                    const isLocal = Boolean(
                                        relatedImg &&
                                        (relatedImg.startsWith("http://localhost:") || relatedImg.startsWith("http://127.0.0.1:")),
                                    );
                                    return (
                                        <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                                            <div className="relative h-36 w-full">
                                                {relatedImg ? (
                                                    <Image
                                                        src={relatedImg}
                                                        alt={item.title}
                                                        fill
                                                        unoptimized={isLocal}
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full bg-slate-200" />
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <p className="text-sm font-bold text-slate-900 line-clamp-2">{item.title}</p>
                                                <p className="mt-1 text-xs text-slate-600 line-clamp-2">{item.short_description}</p>
                                                <Link
                                                    href={`/tours/${item.slug}`}
                                                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800"
                                                >
                                                    View Tour <ChevronRight className="w-3.5 h-3.5" />
                                                </Link>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="mt-10">
                        <Link
                            href="/tours"
                            className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
                        >
                            <ChevronLeft className="w-4 h-4" /> Back to Tours
                        </Link>
                    </div>
                </article>
            </section>

            <QuoteSection initialServiceType="tour" />
            <Footer />
        </div>
    );
}
