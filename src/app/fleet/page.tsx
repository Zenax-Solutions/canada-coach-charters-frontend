"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import QuoteModal from "@/components/QuoteModal";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Users, CheckCircle2 } from "lucide-react";

const featuredFleet = [
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

const archiveFleet = [
    {
        name: "Moto Coach",
        image: "/fleet/Moto-Coach.jpg",
        description:
            "Elevate your riding skills with a personalized companion that supports everything from beginner basics to advanced techniques.",
    },
    {
        name: "School Bus",
        image: "/fleet/School-Bus.jpg",
        description:
            "Safe journeys for bright futures with school-focused transport that prioritizes punctuality, safety, and comfort.",
    },
    {
        name: "Mini Coach with Washroom",
        image: "/fleet/Mini-Coach-with-Washroom.jpg",
        description:
            "Travel in comfort and convenience with a private onboard washroom for smooth group journeys.",
    },
    {
        name: "Mini Coach",
        image: "/fleet/Mini-Coach.jpg",
        description:
            "Compact elegance with group-friendly seating and premium comfort in a smaller footprint.",
    },
    {
        name: "Limousine Bus",
        image: "/fleet/Limousine-Bus.jpg",
        description:
            "Opulent group travel on wheels with spacious interiors and elevated VIP styling.",
    },
    {
        name: "Mini Party Bus",
        image: "/fleet/Mini-Party-Bus.jpg",
        description:
            "A compact celebration setup built to keep the fun moving between venues.",
    },
    {
        name: "Hummer Stretch Limo",
        image: "/fleet/hummer-stretch-limo.jpg",
        description:
            "Bold elegance and statement-making luxury for special events and premium arrivals.",
    },
    {
        name: "Limo SUV Stretch",
        image: "/fleet/Limo-SUV-Stretch.jpg",
        description:
            "SUV spaciousness meets limousine sophistication for upscale transfers.",
    },
    {
        name: "Sprinter Car",
        image: "/fleet/Sprinter-Car.jpg",
        description:
            "Compact agility and practical utility for efficient urban transport.",
    },
    {
        name: "Sprinter Limo",
        image: "/fleet/Sprinter-Limo.jpg",
        description:
            "A stylish stretch option designed for upscale events and refined comfort.",
    },
    {
        name: "Black SUV",
        image: "/fleet/Black-SUV.jpg",
        description:
            "Confident, executive-style transportation with versatile performance.",
    },
    {
        name: "Stretch Limo",
        image: "/fleet/Stretch-Limo.jpg",
        description:
            "A timeless symbol of glamour and luxury for unforgettable occasions.",
    },
    {
        name: "Black Sedan",
        image: "/fleet/Black-Sedan.jpg",
        description:
            "Understated elegance and discreet comfort for private rides.",
    },
    {
        name: "Town Car",
        image: "/fleet/Town-Car.jpg",
        description:
            "Classic luxury with smooth, reliable comfort for city and suburban travel.",
    },
];

export default function FleetPage() {
    const [quoteOpen, setQuoteOpen] = useState(false);
    const [quoteContext, setQuoteContext] = useState<string | undefined>();

    const openFleetQuote = (vehicleName: string) => {
        setQuoteContext(`Fleet quote request for: ${vehicleName}`);
        setQuoteOpen(true);
    };

    return (
        <div className="min-h-screen bg-white p-4">
            <div className="relative rounded-3xl overflow-hidden">
                <Header />

                <section className="relative pt-36 pb-20 px-6 sm:px-8 lg:px-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/page-header.jpg')" }}
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

                    <div className="relative max-w-7xl mx-auto">
                        <nav className="flex items-center gap-2 text-blue-200 text-sm mb-6">
                            <Link href="/" className="hover:text-white transition-colors">
                                Home
                            </Link>
                            <ArrowRight className="w-3.5 h-3.5" />
                            <span className="text-white font-medium">Our Fleet</span>
                        </nav>

                        <span className="inline-block text-xs font-semibold text-blue-200 border border-blue-500 bg-blue-600/50 rounded-full px-4 py-1.5 mb-5">
                            Choose The Vehicle
                        </span>

                        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-2xl">
                            Our Fleet
                        </h1>
                        <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-3xl">
                            Embrace eco-friendly travel. Designed for those who seek a thrilling drive,
                            each vehicle combines agility with sleek design to deliver a stylish and
                            comfortable journey.
                        </p>

                        <button
                            type="button"
                            onClick={() => openFleetQuote("General Fleet")}
                            className="mt-8 inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-2 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors font-semibold text-white text-sm"
                        >
                            <span>Get a Quote</span>
                            <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                                <ChevronRight className="w-4 h-4 text-blue-700" />
                            </span>
                        </button>
                    </div>
                </section>
            </div>

            <section className="py-16 lg:py-24 px-6 sm:px-8 lg:px-10 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 flex flex-col gap-4">
                        <span className="inline-flex w-fit items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
                            Featured Coaches
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                            Modern Fleet for Every Group Size
                        </h2>
                        <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600">
                            Our modern, well-maintained coaches are ideal for corporate events,
                            school trips, weddings, family vacations, and executive travel.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredFleet.map((vehicle) => (
                            <div
                                key={vehicle.name}
                                className="relative flex flex-col rounded-3xl border border-slate-200 bg-white shadow-[0_20px_45px_-32px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_26px_52px_-28px_rgba(37,99,235,0.28)] overflow-hidden"
                            >
                                <div className="relative w-full aspect-square overflow-hidden bg-slate-50">
                                    <Image
                                        src={vehicle.image}
                                        alt={vehicle.name}
                                        fill
                                        className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/78 via-slate-900/25 to-transparent" />
                                    <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/20 px-2.5 py-1 text-[0.65rem] font-bold text-white backdrop-blur-sm">
                                        {vehicle.badge}
                                    </span>
                                    <div className="absolute inset-x-4 bottom-4">
                                        <h3 className="text-xl font-bold text-white leading-tight">{vehicle.name}</h3>
                                        <div className="mt-1 flex items-center gap-1.5">
                                            <Users className="h-3.5 w-3.5 text-white/80" />
                                            <span className="text-sm font-medium text-white/90">{vehicle.capacity}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col flex-1 px-6 pt-5 pb-6 gap-5 bg-white">
                                    <div>
                                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-slate-400 mb-3">
                                            Comfort Features
                                        </p>
                                        <ul className="space-y-2">
                                            {vehicle.comfort.map((feature) => (
                                                <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                                                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-px" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-slate-400 mb-1">
                                            Best For
                                        </p>
                                        <p className="text-sm text-slate-600 leading-snug">{vehicle.bestFor}</p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => openFleetQuote(vehicle.name)}
                                        className="mt-auto w-full inline-flex items-center justify-between pl-5 pr-2 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 transition-colors"
                                    >
                                        <span>Request this vehicle</span>
                                        <span className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0">
                                            <ArrowRight className="w-5 h-5 text-blue-700 -rotate-45" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-24 px-6 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 text-center">
                        <span className="inline-block text-xs font-semibold text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
                            From The Archived Fleet List
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
                            More Vehicles We Offer
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
                            Based on the archived Our Fleet page, these are additional vehicle types
                            available for different occasions and travel preferences.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {archiveFleet.map((vehicle) => (
                            <div
                                key={vehicle.name}
                                className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="relative w-full aspect-square overflow-hidden rounded-xl mb-5 bg-slate-50">
                                    <Image
                                        src={vehicle.image}
                                        alt={vehicle.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>

                                <h3 className="text-base font-bold text-gray-900 mb-2">{vehicle.name}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                                    {vehicle.description}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => openFleetQuote(vehicle.name)}
                                    className="inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-2 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors font-semibold text-white text-sm"
                                >
                                    Get A Quote
                                    <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                                        <ChevronRight className="w-4 h-4 text-blue-700" />
                                    </span>
                                </button>
                            </div>
                        ))}
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

            <QuoteSection />
            <Footer />
        </div>
    );
}
