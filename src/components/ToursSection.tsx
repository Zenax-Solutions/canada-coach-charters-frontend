"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import QuoteModal from "@/components/QuoteModal";

const tourCards = [
    { title: "Niagara Falls", image: "https://images.pexels.com/photos/11281305/pexels-photo-11281305.jpeg" },
    { title: "Wine Country", image: "https://images.pexels.com/photos/10499984/pexels-photo-10499984.jpeg" },
    { title: "Toronto City", image: "https://images.pexels.com/photos/27815190/pexels-photo-27815190.jpeg" },
    { title: "Ontario Adventures", image: "https://images.pexels.com/photos/27011340/pexels-photo-27011340.jpeg" },
];

export default function ToursSection() {
    const [quoteOpen, setQuoteOpen] = useState(false);
    const [quoteContext, setQuoteContext] = useState<string | undefined>();

    const openTourQuote = (destination: string) => {
        setQuoteContext(`Destination quote request for: ${destination}`);
        setQuoteOpen(true);
    };

    return (
        <section className="bg-gradient-to-b from-white via-slate-50 to-blue-50/40 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-4">
                    <span className="inline-flex w-fit items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-blue-700">
                        Our Destinations
                    </span>
                    <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                        Custom Tours Across Ontario
                    </h2>
                    <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
                        Explore Ontario comfortably with private group tours designed around your schedule.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {tourCards.map((tour) => (
                        <article
                            key={tour.title}
                            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_45px_-32px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_26px_52px_-28px_rgba(37,99,235,0.28)]"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={tour.image}
                                    alt={tour.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
                                <h3 className="absolute bottom-4 left-4 right-4 text-2xl font-bold tracking-tight text-white">
                                    {tour.title}
                                </h3>
                            </div>
                            <div className="p-4">
                                <button
                                    type="button"
                                    onClick={() => openTourQuote(tour.title)}
                                    className="w-full flex items-center justify-between pl-5 pr-2 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 transition-colors"
                                >
                                    <span>Book Destination</span>
                                    <span className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0">
                                        <ArrowRight className="w-5 h-5 text-blue-700 -rotate-45" />
                                    </span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                <p className="mt-10 max-w-6xl text-base leading-relaxed text-slate-700">
                    Experience the blissful beaches of Bali, vintage charm of Vietnam, cultural richness of Texas, enchanting landscapes of Mexico, stunning vistas of the West Coast, or romantic allure of destinations like the Maldives, Amsterdam, and Paris with our leading travel and tour company. We&apos;re committed to providing safe, efficient, and enjoyable transportation for your journey.
                </p>

                <QuoteModal
                    isOpen={quoteOpen}
                    onClose={() => setQuoteOpen(false)}
                    title="Destination Quote"
                    serviceType="tour"
                    context={quoteContext}
                />
            </div>
        </section>
    );
}
