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
        name: "Full-Size Coach Buses",
        image: "/vehicles/Full-size-Coaches.png",
        capacity: "40–56 Passengers",
        badge: "Large Groups",
        bestFor: [
            "Corporate events",
            "School trips",
            "Group tours",
            "Sports teams",
            "Long-distance travel",
            "Wedding guest transportation",
            "Conference and convention shuttles",
        ],
        features: [
            "Comfortable reclining seats",
            "Climate control",
            "Large luggage storage",
            "Smooth highway travel",
            "Professional driver service",
            "Spacious passenger cabin",
        ],
    },
    {
        name: "Mini Bus Rentals",
        image: "/vehicles/Mini-Coaches.png",
        capacity: "12–24 Passengers",
        badge: "Mid-Sized Groups",
        bestFor: [
            "Small corporate groups",
            "Airport transfers",
            "Private tours",
            "Wedding parties",
            "Local shuttles",
            "Community groups",
            "Day trips",
        ],
        features: [
            "Comfortable seating",
            "Easy passenger boarding",
            "Compact size for city travel",
            "Climate-controlled cabin",
            "Affordable group transportation",
        ],
    },
    {
        name: "School Bus Rentals",
        image: "/fleet/School-Bus.jpg",
        capacity: "Up to 72 Passengers",
        badge: "Budget Friendly",
        bestFor: [
            "School trips",
            "Camp transportation",
            "Sports events",
            "Community outings",
            "Local group travel",
            "Budget-friendly charters",
        ],
        features: [
            "Affordable rental option",
            "Reliable for short-distance travel",
            "Great for large local groups",
            "Simple and efficient passenger transport",
        ],
    },
    {
        name: "Shuttle Bus Services",
        image: "/vehicles/Mid-size-Coaches.png",
        capacity: "20–40 Passengers",
        badge: "Event Flow",
        bestFor: [
            "Corporate shuttles",
            "Hotel transfers",
            "Airport shuttle service",
            "Wedding guest shuttles",
            "Event transportation",
            "Conference transportation",
            "Festival and venue shuttles",
        ],
        features: [
            "Keeps guests on schedule",
            "Reduces parking issues",
            "Improves event flow",
            "Smooth group travel experience",
        ],
    },
    {
        name: "Passenger Van Rentals",
        image: "/vehicles/Executive-Vans.png",
        capacity: "Up to 14 Passengers",
        badge: "Private Transfers",
        bestFor: [
            "Small groups",
            "Executive transportation",
            "Family travel",
            "Airport pickups",
            "Private city tours",
            "Short-distance transfers",
        ],
        features: [
            "Flexible private travel",
            "Direct point-to-point convenience",
            "Comfortable interior",
            "Ideal for short and medium trips",
        ],
    },
];

const occasionOptions = [
    {
        title: "Corporate Transportation",
        description:
            "Simplify business travel with professional charter bus and shuttle services for meetings, events, employee commutes, and client outings.",
    },
    {
        title: "School Trips and Student Transportation",
        description:
            "Count on safe, reliable transportation for students and youth with thorough planning for educational excursions and athletic events.",
    },
    {
        title: "Wedding Transportation",
        description:
            "Keep your wedding day seamless with dedicated group shuttles so guests and families arrive on time at each location.",
    },
    {
        title: "Sports Team Travel",
        description:
            "Give athletes and coaches the comfort, reliability, and space they need while we handle the travel logistics.",
    },
    {
        title: "Tours and Day Trips",
        description:
            "Experience Ontario destinations with private charter solutions designed for comfortable, memorable group outings.",
    },
    {
        title: "Airport Transfers",
        description:
            "Guarantee smooth, on-time arrivals and departures for your group with private airport transfer service.",
    },
];

const whyTravel = [
    {
        title: "Modern and Well-Maintained Vehicles",
        text: "Travel with confidence in a meticulously maintained fleet that supports comfort and safety every time.",
    },
    {
        title: "Professional Drivers",
        text: "Skilled and safety-focused drivers dedicated to punctuality and quality service.",
    },
    {
        title: "Flexible Fleet Selection",
        text: "Choose from coach, mini, school, shuttle buses, and passenger vans to fit your group and trip.",
    },
    {
        title: "Service Across Toronto and Beyond",
        text: "Coverage includes Toronto, the GTA, Southern Ontario, Canada, and U.S. travel when required.",
    },
    {
        title: "Custom Charter Solutions",
        text: "From one transfer to full-day travel or recurring shuttles, service is built around your schedule.",
    },
];

const faqs = [
    {
        question: "What types of buses does Canada Coach Charters offer?",
        answer:
            "Canada Coach Charters offers coach buses, mini buses, school buses, shuttle buses, and passenger vans.",
    },
    {
        question: "How do I know which bus is right for my group?",
        answer:
            "The right vehicle depends on passenger count, luggage needs, distance, and event type. Our team recommends the best option after reviewing your trip details.",
    },
    {
        question: "Do you provide bus rentals outside Toronto?",
        answer:
            "Yes. We provide charter bus service in Toronto, the GTA, Southern Ontario, and other destinations based on your itinerary.",
    },
    {
        question: "Can I rent a bus for a wedding or private event?",
        answer:
            "Yes. We provide transportation for weddings, private parties, family events, corporate functions, school trips, sports teams, and group tours.",
    },
    {
        question: "Do your bus rentals include a driver?",
        answer: "Yes. Our charter bus rentals include a professional driver so your group can travel safely and comfortably.",
    },
    {
        question: "Can I request a quote online?",
        answer:
            "Yes. Share your pickup location, destination, travel date, passenger count, and any special requirements to receive a customized quote.",
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
        <div className="min-h-screen bg-white p-1 sm:p-4">
            <div className="relative rounded-3xl overflow-hidden">
                <Header />

                <section className="relative pt-36 pb-20 px-2 sm:px-8 lg:px-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/page-header/670e29b775d7fe2bd880096e_what-is-a-charter-bus-a-comprehensive-guide-to-charter-bus-rentals.webp')" }}
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
                            <span className="text-white font-medium">Our Charter Bus Fleet in Toronto</span>
                        </nav>

                        <span className="inline-block text-xs font-semibold text-blue-200 border border-blue-500 bg-blue-600/50 rounded-full px-4 py-1.5 mb-5">
                            Fleet Options for Group Transportation
                        </span>

                        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-3xl">
                            Our Charter Bus Fleet in Toronto
                        </h1>
                        <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-4xl mb-3">
                            Choose Canada Coach Charters for your next group journey and experience safe, comfortable, and reliable transportation.
                            From corporate events and school trips to weddings and private tours, our fleet stands ready to get your group there smoothly and on time.
                        </p>
                        <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-4xl">
                            Our fleet includes modern coach buses, mini buses, school buses, shuttle buses, and passenger vans.
                            Each vehicle is professionally maintained and cleaned, operated by skilled drivers focused on safety, punctuality, and service.
                        </p>

                        <button
                            type="button"
                            onClick={() => openFleetQuote("General Fleet")}
                            className="mt-8 inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-2 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors font-semibold text-white text-sm"
                        >
                            <span>Request a Quote</span>
                            <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                                <ChevronRight className="w-4 h-4 text-blue-700" />
                            </span>
                        </button>
                    </div>
                </section>
            </div>

            <section className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 flex flex-col gap-4">
                        <span className="inline-flex w-fit items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
                            Fleet Categories
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                            Choose the Right Bus for Your Group
                        </h2>
                        <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600">
                            Every journey is unique. Our team helps you choose the ideal vehicle based on group size, travel distance, and comfort needs so you get the best value.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                        {featuredFleet.map((vehicle) => (
                            <div
                                key={vehicle.name}
                                className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-[0_20px_45px_-32px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_26px_52px_-28px_rgba(37,99,235,0.28)] overflow-hidden"
                            >
                                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-50">
                                    <Image
                                        src={vehicle.image}
                                        alt={vehicle.name}
                                        fill
                                        className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/78 via-slate-900/25 to-transparent" />
                                    <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                        {vehicle.badge}
                                    </span>
                                    <div className="absolute inset-x-4 bottom-4">
                                        <h3 className="text-2xl font-bold text-white leading-tight">{vehicle.name}</h3>
                                        <div className="mt-1 flex items-center gap-1.5">
                                            <Users className="h-3.5 w-3.5 text-white/80" />
                                            <span className="text-base font-medium text-white/90">{vehicle.capacity}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col flex-1 px-6 pt-5 pb-6 gap-4 bg-white">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400 mb-3">
                                            Best For
                                        </p>
                                        <ul className="space-y-2">
                                            {vehicle.bestFor.slice(0, 4).map((item) => (
                                                <li key={item} className="flex items-start gap-2 text-base text-slate-600 leading-snug">
                                                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-px" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                                        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400 mb-2">
                                            Features May Include
                                        </p>
                                        <ul className="space-y-1.5">
                                            {vehicle.features.slice(0, 3).map((feature) => (
                                                <li key={feature} className="text-sm text-slate-600 leading-snug">
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => openFleetQuote(vehicle.name)}
                                        className="mt-auto w-full inline-flex items-center justify-between pl-5 pr-2 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 transition-colors"
                                    >
                                        <span>Book this vehicle</span>
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

            <section className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 text-center">
                        <span className="inline-block text-xs font-semibold text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
                            Fleet Uses
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
                            Fleet Options for Every Occasion
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
                            Canada Coach Charters supports diverse transportation needs in Toronto and surrounding areas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {occasionOptions.map((option) => (
                            <div
                                key={option.title}
                                className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                            >
                                <h3 className="text-base font-bold text-gray-900 mb-2">{option.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{option.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
                            Why Travel With Canada Coach Charters?
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {whyTravel.map((item) => (
                            <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <h3 className="text-sm font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">Fleet FAQs</h2>
                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <details key={faq.question} className="rounded-xl border border-slate-200 bg-white p-5" open={index === 0}>
                                <summary className="font-semibold cursor-pointer text-slate-900">{faq.question}</summary>
                                <p className="text-sm text-slate-600 mt-2">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white px-2 pb-16 pt-14 sm:px-8 lg:px-10 lg:pb-24 lg:pt-16">
                <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-blue-800 to-blue-600 p-8 text-white sm:p-10">
                    <h2 className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl">Book a Charter Bus in Toronto</h2>
                    <p className="mb-6 max-w-3xl text-sm text-blue-100 sm:text-base">
                        Share your trip details and let our experts recommend the ideal vehicle with a customized quote.
                        Reach out now to secure the right bus for your next group trip.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <button type="button" onClick={() => openFleetQuote("Request a Quote")}
                            className="inline-flex items-center justify-center rounded-full bg-white text-blue-800 px-6 py-3 text-sm font-semibold hover:bg-blue-50 transition-colors">
                            Request a Quote
                        </button>
                        <a href="tel:+16478464140" className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                            Call Now
                        </a>
                        <button type="button" onClick={() => openFleetQuote("Book Your Bus Rental")}
                            className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                            Book Your Bus Rental
                        </button>
                        <Link href="/services" className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                            View Our Services
                        </Link>
                        <button type="button" onClick={() => openFleetQuote("Plan Your Trip")}
                            className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                            Plan Your Trip
                        </button>
                    </div>
                </div>
            </section>

            <QuoteModal
                isOpen={quoteOpen}
                onClose={() => setQuoteOpen(false)}
                title="Fleet Quote"
                serviceType="transfer"
                context={quoteContext}
            />

            <QuoteSection />
            <Footer />
        </div>
    );
}
