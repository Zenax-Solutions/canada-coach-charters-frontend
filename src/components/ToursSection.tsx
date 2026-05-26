import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Clock3, MapPin, Users } from "lucide-react";
import { storageUrl } from "@/lib/api";
import { getTours, type TourListItem } from "@/lib/tours";

export default async function ToursSection() {
    const tours = await getTours({ perPage: 4 });

    return (
        <section className="bg-gradient-to-b from-white via-slate-50 to-blue-50/40 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex flex-col gap-4">
                        <span className="inline-flex w-fit items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-blue-700">
                            International Tour Collection
                        </span>
                        <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                            Sri Lanka Tours for Canada-Based Travelers
                        </h2>
                        <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
                            Discover curated wildlife, heritage, and coastal journeys with guided experiences,
                            flexible itineraries, and transparent package structures.
                        </p>
                    </div>

                    <Link
                        href="/tours"
                        className="inline-flex w-fit items-center justify-between gap-3 pl-5 pr-2 py-2 rounded-full text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 transition-colors"
                    >
                        <span>View More</span>
                        <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                            <ArrowRight className="h-4 w-4 text-blue-700 -rotate-45" />
                        </span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {tours.map((tour) => {
                        const numericPrice = Number(tour.price_per_person);
                        const hasVisiblePrice = Number.isFinite(numericPrice) && numericPrice > 0;

                        return (
                        <article
                            key={tour.id}
                            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_45px_-32px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_26px_52px_-28px_rgba(37,99,235,0.28)]"
                        >
                            <div className="relative h-56 overflow-hidden">
                                {(() => {
                                    const imgSrc = storageUrl(tour.featured_image);
                                    const isLocalBackendImage = Boolean(
                                        imgSrc && (imgSrc.startsWith("http://localhost:") || imgSrc.startsWith("http://127.0.0.1:")),
                                    );

                                    if (!imgSrc) {
                                        return <div className="h-full w-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300" />;
                                    }

                                    return (
                                        <Image
                                            src={imgSrc}
                                            alt={tour.title}
                                            fill
                                            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                            unoptimized={isLocalBackendImage}
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    );
                                })()}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
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

                    {tours.length === 0 && (
                        <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                            No tours available at the moment. Please check back soon.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
