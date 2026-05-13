"use client";

import { useState } from "react";
import { Users, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import QuoteModal from "@/components/QuoteModal";

const vehicles = [
    {
        name: "Mini Coaches",
        image: "/vehicles/Mini-Coaches.png",
        capacity: "12–24 Passengers",
        badge: "Small Groups",
        comfort: [
            "Reclining seats",
            "Air conditioning",
            "USB charging ports",
            "Overhead storage",
        ],
        bestFor: "School field trips, family outings, small corporate groups",
    },
    {
        name: "Mid-size Coaches",
        image: "/vehicles/Mid-size-Coaches.png",
        capacity: "24–40 Passengers",
        badge: "Most Popular",
        comfort: [
            "Reclining leather seats",
            "Onboard Wi-Fi",
            "Climate control",
            "Restroom onboard",
        ],
        bestFor: "Corporate events, weddings, sports team travel",
    },
    {
        name: "Full-size Coaches",
        image: "/vehicles/Full-size-Coaches.png",
        capacity: "40–56 Passengers",
        badge: "Large Groups",
        comfort: [
            "Premium reclining seats",
            "Onboard Wi-Fi & entertainment",
            "Full restroom facility",
            "Luggage compartment",
        ],
        bestFor: "Long-distance tours, university trips, large conferences",
    },
    {
        name: "Executive Vans",
        image: "/vehicles/Executive-Vans.png",
        capacity: "Up to 14 Passengers",
        badge: "VIP Experience",
        comfort: [
            "Luxury leather seating",
            "Climate control",
            "Privacy partitions",
            "Complimentary refreshments",
        ],
        bestFor: "Executive transfers, airport pickups, VIP events",
    },
];

export default function FleetSection() {
    const [quoteOpen, setQuoteOpen] = useState(false);
    const [quoteContext, setQuoteContext] = useState<string | undefined>();

    const openFleetQuote = (vehicleName: string) => {
        setQuoteContext(`Fleet quote request for: ${vehicleName}`);
        setQuoteOpen(true);
    };

    return (
        <>
            <section className="bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex flex-col gap-4">
                            <span className="inline-flex w-fit items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-blue-700">
                                Choose the Vehicle
                            </span>
                            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                                Modern Fleet for Every Group Size
                            </h2>
                            <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                                Our fleet of modern and well-maintained coach buses is perfect for any occasion
                                including corporate events, school trips, weddings and family vacations. Go in
                                style and enjoy an unrivalled travel experience at an affordable cost.
                            </p>
                        </div>

                        <Link
                            href="/fleet"
                            className="inline-flex w-fit items-center justify-between gap-3 pl-5 pr-2 py-2 rounded-full text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 transition-colors"
                        >
                            <span>View More</span>
                            <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                                <ArrowRight className="h-4 w-4 text-blue-700 -rotate-45" />
                            </span>
                        </Link>
                    </div>

                    {/* Cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {vehicles.map((v) => {
                            return (
                                <div
                                    key={v.name}
                                    className="relative flex flex-col rounded-3xl border border-slate-200 bg-white shadow-[0_20px_45px_-32px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_26px_52px_-28px_rgba(37,99,235,0.28)] overflow-hidden"
                                >
                                    <div className="relative h-52 w-full overflow-hidden bg-slate-50">
                                        <Image
                                            src={v.image}
                                            alt={v.name}
                                            fill
                                            className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/78 via-slate-900/25 to-transparent" />
                                        <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/20 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
                                            {v.badge}
                                        </span>
                                        <div className="absolute inset-x-4 bottom-4">
                                            <h3 className="text-xl font-bold text-white leading-tight">{v.name}</h3>
                                            <div className="mt-1 flex items-center gap-1.5">
                                                <Users className="h-3.5 w-3.5 text-white/80" />
                                                <span className="text-sm font-medium text-white/90">{v.capacity}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="flex flex-col flex-1 px-6 pt-5 pb-6 gap-5 bg-white">

                                        {/* Comfort features */}
                                        <div>
                                            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-slate-400 mb-3">
                                                Comfort Features
                                            </p>
                                            <ul className="space-y-2">
                                                {v.comfort.map((f) => (
                                                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                                                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-px" />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Best use */}
                                        <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                                            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-slate-400 mb-1">
                                                Best For
                                            </p>
                                            <p className="text-sm text-slate-600 leading-snug">{v.bestFor}</p>
                                        </div>

                                        {/* CTA */}
                                        <button
                                            type="button"
                                            onClick={() => openFleetQuote(v.name)}
                                            className="mt-auto w-full flex items-center justify-between pl-5 pr-2 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 transition-colors"
                                        >
                                            <span>Request this vehicle</span>
                                            <span className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0">
                                                <ArrowRight className="w-5 h-5 text-blue-700 -rotate-45" />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <QuoteModal
                isOpen={quoteOpen}
                onClose={() => setQuoteOpen(false)}
                title="Fleet Quote"
                serviceType="charter"
                context={quoteContext}
            />
        </>
    );
}
