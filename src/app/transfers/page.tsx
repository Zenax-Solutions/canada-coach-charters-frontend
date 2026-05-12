"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import QuoteModal from "@/components/QuoteModal";
import {
    Plane,
    Briefcase,
    PawPrint,
    Accessibility,
    Sparkles,
    Bus,
    Users,
    ShieldCheck,
    Anchor,
    Building2,
    Route,
    MapPin,
    ArrowRight,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const transfers = [
    {
        icon: Plane,
        title: "Airport Transfers",
        description:
            "Ensure a smooth start or end to your journey with airport transfers, offering reliable and punctual transportation between your location and the airport. Experience stress-free travel with dedicated services tailored to your flight schedule.",
    },
    {
        icon: Briefcase,
        title: "Baggage Transfers",
        description:
            "Experience the freedom of hands-free travel with baggage transfers, ensuring your belongings reach your destination securely and promptly. Say goodbye to the hassle of carrying heavy bags and focus on enjoying your journey.",
    },
    {
        icon: PawPrint,
        title: "Pet-Friendly Transfers",
        description:
            "Choose pet-friendly transfers for a journey that accommodates your furry companions, ensuring a stress-free and comfortable ride for both you and your pets. Enjoy the convenience of traveling together with your four-legged friends.",
    },
    {
        icon: Accessibility,
        title: "Disability-Accessible Transfers",
        description:
            "Ensure an inclusive travel experience with disability-accessible transfers, providing comfortable and accommodating transportation for individuals with mobility challenges. Embrace a journey where accessibility is a top priority.",
    },
    {
        icon: Sparkles,
        title: "Luxury Transfers",
        description:
            "Indulge in sophistication with luxury transfers that redefine travel. Experience comfort and style as you are chauffeured in premium vehicles, ensuring a lavish journey tailored to the discerning traveller.",
    },
    {
        icon: Bus,
        title: "Shuttle Transfers",
        description:
            "Experience seamless travel with shuttle transfers, offering direct and efficient transportation between designated locations. Enjoy the convenience of a dedicated service that ensures you reach your destination comfortably and on time.",
    },
    {
        icon: Users,
        title: "Group Transfers",
        description:
            "Facilitate smooth and coordinated group travel with specialized group transfers. Tailored for events, corporate outings, or leisure trips, these services ensure a cohesive and comfortable journey for all participants.",
    },
    {
        icon: ShieldCheck,
        title: "Private Transfers",
        description:
            "Enjoy the ultimate in personalized travel with private transfers, ensuring a direct and secure journey from your doorstep to the desired destination. Experience the convenience of dedicated transportation tailored to your schedule and preferences.",
    },
    {
        icon: Anchor,
        title: "Port Transfers",
        description:
            "Simplify the transition from land to sea with port transfers, offering convenient and reliable transportation services to and from cruise terminals. Ensure a stress-free start or end to your cruise adventure.",
    },
    {
        icon: Building2,
        title: "Hotel Transfers",
        description:
            "Elevate your travel experience with hotel transfers, ensuring a seamless transition from airport or station to your accommodation. Enjoy the convenience of door-to-door service, setting the tone for a relaxed and luxurious stay.",
    },
    {
        icon: Route,
        title: "Intercity Transfers",
        description:
            "Experience the ease of intercity transfers, designed for efficient and smooth travel between major destinations. Whether for business or leisure, these services provide a comfortable and time-saving solution for those seeking hassle-free transportation between cities.",
    },
    {
        icon: MapPin,
        title: "City Transfers",
        description:
            "Navigate cityscapes with ease through city transfers, providing convenient and swift transportation between key locations. Say goodbye to urban travel challenges and embrace a seamless journey within the heart of the city.",
    },
];

const transferImages: Record<string, string> = {
    "Airport Transfers": "/tranfers/Airport-transfers.jpg",
    "Baggage Transfers": "/tranfers/baggage_transffer.jpg",
    "Pet-Friendly Transfers": "/tranfers/Pet-Friendly.jpg",
    "Disability-Accessible Transfers": "/tranfers/Disability-Accessible.jpg",
    "Luxury Transfers": "/tranfers/Luxury-Transfers.jpg",
    "Shuttle Transfers": "/tranfers/Shuttle-Transfers.jpg",
    "Group Transfers": "/tranfers/group-transfer.jpg",
    "Private Transfers": "/tranfers/Private-Transfers.jpg",
    "Port Transfers": "/tranfers/Port-Transfers.jpg",
    "Hotel Transfers": "/tranfers/Hotel-Transfers.jpg",
    "Intercity Transfers": "/tranfers/Intercity-Transfers.jpg",
    "City Transfers": "/tranfers/City-Transfers.jpg",
};

export default function TransfersPage() {
    const [quoteOpen, setQuoteOpen] = useState(false);
    const [quoteContext, setQuoteContext] = useState<string | undefined>();

    const openTransferQuote = (serviceTitle: string) => {
        setQuoteContext(`Transfer quote request for: ${serviceTitle}`);
        setQuoteOpen(true);
    };

    return (
        <div className="min-h-screen bg-white p-4">
            <div className="relative rounded-3xl overflow-hidden">
                <Header />

                {/* Hero */}
                <div className="relative pt-36 pb-20 px-6 sm:px-8 lg:px-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/page-header.jpg')" }}
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
                            Transfer Services
                        </span>

                        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-2xl">
                            Explore Our Transfer Services
                        </h1>
                        <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
                            From airport pickups to luxury city rides, we offer a full range of
                            professional transfer solutions across Canada — tailored to your
                            schedule, group size, and comfort level.
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
            <section className="py-16 lg:py-24 px-6 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-semibold text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
                            What We Offer
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
                            Every Transfer, Covered
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
                            Whether you&apos;re travelling solo, with family, or coordinating a
                            large group — we have a transfer option designed for you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {transfers.map((item) => (
                            <div
                                key={item.title}
                                className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="relative w-full aspect-square overflow-hidden rounded-xl mb-5">
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
