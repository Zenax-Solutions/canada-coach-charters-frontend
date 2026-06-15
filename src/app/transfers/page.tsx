"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import QuoteModal from "@/components/QuoteModal";
import {
    Plane,
    Briefcase,
    Heart,
    GraduationCap,
    Compass,
    Sparkles,
    Bus,
    Users,
    ShieldCheck,
    Anchor,
    Building2,
    Route,
    ArrowRight,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const transfers = [
    {
        icon: Plane,
        title: "Airport Arrivals and Departures",
        description:
            "Private transfer coordination for Toronto Pearson and regional airports with reliable timing, luggage handling, and organized drop-off.",
    },
    {
        icon: Building2,
        title: "Hotel and Resort Transfers",
        description:
            "Smooth transportation between hotels, resorts, attractions, and venues for groups that need dependable, on-time service.",
    },
    {
        icon: Briefcase,
        title: "Corporate Group Transportation",
        description:
            "Reliable transfer planning for meetings, conferences, and business events with efficient routing and schedule-based coordination.",
    },
    {
        icon: Heart,
        title: "Wedding Guest Transfers",
        description:
            "Keep your wedding transportation stress-free with organized guest movement between hotels, ceremonies, receptions, and after-events.",
    },
    {
        icon: Bus,
        title: "Conference and Convention Shuttles",
        description:
            "Dedicated shuttle support for delegates, teams, and attendees across single or multi-stop conference itineraries.",
    },
    {
        icon: Users,
        title: "Sports Team Transportation",
        description:
            "Dependable transfer service for athletes, coaches, and support staff with space and timing designed for game-day logistics.",
    },
    {
        icon: GraduationCap,
        title: "School and University Group Transfers",
        description:
            "Safe and organized transfers for students and education groups with professional scheduling and coordinated travel support.",
    },
    {
        icon: Compass,
        title: "Tour Group Transfers",
        description:
            "Flexible transfer operations for guided tours and private groups, built around your destinations, stops, and pace.",
    },
    {
        icon: Anchor,
        title: "Cruise, Rail, and Station Transfers",
        description:
            "Convenient transfers to and from cruise terminals, rail stations, and transport hubs with precise pickup and departure planning.",
    },
    {
        icon: Route,
        title: "Private City-to-City Transfers",
        description:
            "Comfortable city-to-city transfer options across Toronto and Ontario, tailored to route timing, group size, and luggage needs.",
    },
    {
        icon: ShieldCheck,
        title: "Baggage and Luggage Transfers",
        description:
            "Secure luggage transportation between airports, hotels, events, and long-distance destinations to keep your trip moving smoothly.",
    },
    {
        icon: Sparkles,
        title: "Luxury Coach and Shuttle Transfers",
        description:
            "From private shuttle buses to luxury coaches, we match the right vehicle to your comfort preferences, travel distance, and group size.",
    },
];

const transferImages: Record<string, string> = {
    "Airport Arrivals and Departures": "/tranfers-new/12.jpeg",
    "Hotel and Resort Transfers": "/tranfers-new/4.jpeg",
    "Corporate Group Transportation": "/tranfers-new/2.jpeg",
    "Wedding Guest Transfers": "/tranfers-new/10.jpeg",
    "Conference and Convention Shuttles": "/tranfers-new/1.jpeg",
    "Sports Team Transportation": "/tranfers-new/8.jpeg",
    "School and University Group Transfers": "/tranfers-new/7.jpeg",
    "Tour Group Transfers": "/tranfers-new/11.jpeg",
    "Cruise, Rail, and Station Transfers": "/tranfers-new/6.jpeg",
    "Private City-to-City Transfers": "/tranfers-new/9.jpeg",
    "Baggage and Luggage Transfers": "/tranfers-new/3.jpeg",
    "Luxury Coach and Shuttle Transfers": "/tranfers-new/5.jpeg",
};

export default function TransfersPage() {
    const [quoteOpen, setQuoteOpen] = useState(false);
    const [quoteContext, setQuoteContext] = useState<string | undefined>();

    const openTransferQuote = (serviceTitle: string) => {
        setQuoteContext(`Transfer quote request for: ${serviceTitle}`);
        setQuoteOpen(true);
    };

    return (
        <div className="min-h-screen bg-white p-1 sm:p-4">
            <div className="relative rounded-3xl overflow-hidden">
                <Header />

                {/* Hero */}
                <div className="relative pt-36 pb-20 px-2 sm:px-8 lg:px-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/page-header/ChatGPT-Image-May-8-2026-03_37_17-PM.webp')" }}
                    />
                    <div className="absolute inset-0 bg-black/55" />
                    {/* Subtle grid overlay */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    />
                    <div className="relative max-w-7xl mx-auto">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-blue-200 text-sm mb-6">
                            <Link href="/" className="hover:text-white transition-colors">
                                Home
                            </Link>
                            <ArrowRight className="w-3.5 h-3.5" />
                            <span className="text-white font-medium">Transfers</span>
                        </nav>

                        <span className="inline-block text-xs font-semibold text-blue-200 border border-blue-500 bg-blue-600/50 rounded-full px-4 py-1.5 mb-5">
                            Private Bus Transfer Services in Toronto
                        </span>

                        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-2xl">
                            Transfer Services in Toronto and Across Ontario
                        </h1>
                        <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-4xl mb-3">
                            Canada Coach Charters offers reliable and comfortable transfers for individuals, groups, and organisations. Our team simplifies every trip, making it safe and well-organised, whether you are travelling from the airport, hotel, venue, or another city.
                        </p>
                        <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-4xl mb-8">
                            Choose from private shuttle buses or luxury coach transfers. We offer flexible options around your schedule, group size, luggage, and destination.
                        </p>

                        <button
                            type="button"
                            onClick={() => openTransferQuote("General Transfer")}
                            className="inline-flex items-center justify-between gap-4 pl-6 pr-2 py-2.5 rounded-full bg-white text-blue-700 hover:bg-blue-50 transition-colors font-semibold"
                        >
                            Get a Quote
                            <span className="w-11 h-11 rounded-full bg-blue-700 flex items-center justify-center shrink-0">
                                <ChevronRight className="w-5 h-5 text-white" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Transfer Cards Grid */}
            <section className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-semibold text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
                            Comfortable Private Transfers for Every Occasion
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
                            Transfer Transportation for Every Group
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-3xl mx-auto">
                            Our service is ideal for groups that need dependable transport and a stress-free experience. We keep your itinerary on time.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {transfers.map((item) => (
                            <div
                                key={item.title}
                                className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl mb-5">
                                    <Image
                                        src={transferImages[item.title]}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>

                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                                    <item.icon className="w-5 h-5 text-blue-600" strokeWidth={1.75} />
                                </div>

                                <h3 className="text-base font-bold text-gray-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                                    {item.description}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => openTransferQuote(item.title)}
                                    className="inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-2 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors font-semibold text-white text-sm"
                                >
                                    Enquire Now
                                    <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                                        <ChevronRight className="w-4 h-4 text-blue-700" />
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10 bg-slate-50">
                <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2">
                    <article className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Airport Transfer Services</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Airport arrivals and departures should be smooth and stress-free. Canada Coach Charters offers private airport transfers for groups travelling through Toronto Pearson and other regional airports. Our airport transfers serve tour groups, corporate teams, students, wedding guests, sports teams, and families.
                        </p>
                    </article>

                    <article className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Hotel and Event Transfers</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Need to move guests between hotels, venues, restaurants, or attractions? Our transfer services make group travel easy. We work with event planners, coordinators, and corporate teams, providing organised shuttle transportation for single or multi-stop trips.
                        </p>
                    </article>

                    <article className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Baggage Transfer Services</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We transport luggage separately or securely between locations, ideal for tour groups, airport arrivals, hotels, conferences, sports teams, and long-distance trips. Our team coordinates baggage handling and timing to keep your trip on schedule.
                        </p>
                    </article>

                    <article className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Luxury Coach and Shuttle Transfer Options</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Groups have different travel needs. That is why we offer vehicles from shuttle service to luxury coaches. Our fleet serves groups of all sizes, and we select vehicles for comfort, space, and smooth travel.
                        </p>
                    </article>
                </div>
            </section>

            <section className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10 bg-white">
                <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-10 shadow-sm">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Why Choose Canada Coach Charters?</h2>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            We focus on dependable service, coordination, and passenger comfort. When you book with us, your transportation is tailored to your schedule and destination.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                "Private group transportation",
                                "Professional drivers",
                                "Comfortable passenger vehicles",
                                "Flexible pickup and drop-off options",
                                "Airport, hotel, event, and city transfers",
                                "Support for luggage and baggage needs",
                                "Transportation for small and large groups",
                                "Service in Toronto and surrounding areas",
                            ].map((item) => (
                                <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-gradient-to-br from-blue-800 to-blue-600 p-7 sm:p-10 text-white shadow-lg">
                        <h3 className="text-2xl font-bold mb-4">Transfer Services for Businesses and Groups</h3>
                        <p className="text-blue-100 leading-relaxed mb-5">
                            We serve companies, schools, agencies, sports organisations, wedding planners, and private groups. Need a one-time or recurring transfer? We will build a plan for your route, timing, and passenger count.
                        </p>
                        <p className="text-blue-100 leading-relaxed mb-4">
                            Planning group transportation in Toronto or Ontario? We are ready to help with transfer services tailored to your trip.
                        </p>
                        <p className="text-blue-100 leading-relaxed mb-6">
                            Contact us today for a fast, personalised quote and secure your private bus, shuttle, or coach transfer with Canada Coach Charters. Let us ensure your group&apos;s travel goes smoothly&mdash;reserve now and experience the difference.
                        </p>
                        <button
                            type="button"
                            onClick={() => openTransferQuote("Book a Private Transfer")}
                            className="inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-2 rounded-full bg-white hover:bg-blue-50 transition-colors font-semibold text-blue-800 text-sm"
                        >
                            Book a Private Transfer
                            <span className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center shrink-0">
                                <ChevronRight className="w-4 h-4 text-white" />
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            <QuoteModal
                isOpen={quoteOpen}
                onClose={() => setQuoteOpen(false)}
                title="Transfer Quote"
                serviceType="transfer"
                context={quoteContext}
            />

            <QuoteSection />
            <Footer />
        </div>
    );
}
