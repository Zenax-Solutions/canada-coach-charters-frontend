"use client";

import { useState } from "react";
import { Award, ShieldCheck, Handshake, Phone, ArrowUpRight } from "lucide-react";
import QuoteModal from "@/components/QuoteModal";

const badges = [
    {
        icon: Award,
        title: "12 Years of Experience",
        subtitle: "Trusted Since 2012",
    },
    {
        icon: ShieldCheck,
        title: "Licensed & Fully Insured",
        subtitle: "Safety First, Always",
    },
    {
        icon: Handshake,
        title: "Premier Travel Partner",
        subtitle: "Personalised Service",
    },
];

export default function AboutUs() {
    const [quoteOpen, setQuoteOpen] = useState(false);

    return (
        <>
            <section className="bg-white py-16 lg:py-20 px-2 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto">

                    {/* Badge bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 border-b border-gray-100 pb-12">
                        {badges.map((badge) => (
                            <div key={badge.title} className="flex flex-col items-center text-center gap-4">
                                <div className="w-20 h-20 rounded-full border-2 border-blue-600 flex items-center justify-center">
                                    <badge.icon className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-base">{badge.title}</p>
                                    <p className="text-gray-500 text-sm mt-1">{badge.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main content */}
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

                        {/* Left — 2×2 image grid */}
                        <div className="w-full lg:w-[480px] shrink-0 grid grid-cols-2 gap-3">
                            <img
                                src="/about-us/1.jpg"
                                alt="Canada Coach Charters coach"
                                className="w-full h-52 object-cover rounded-2xl"
                            />
                            <img
                                src="/about-us/2.jpg"
                                alt="Comfortable interior"
                                className="w-full h-52 object-cover rounded-2xl mt-6"
                            />
                            <img
                                src="/about-us/3.jpg"
                                alt="Fleet on the road"
                                className="w-full h-52 object-cover rounded-2xl"
                            />
                            <img
                                src="/about-us/4.jpg"
                                alt="Modern coach exterior"
                                className="w-full h-52 object-cover rounded-2xl mt-6"
                            />
                        </div>

                        {/* Right — text content */}
                        <div className="flex-1">
                            {/* Badge label */}
                            <span className="inline-block text-xs font-semibold text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 mb-5">
                                About Us
                            </span>

                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5">
                                Get to Know<br />Canada Coach Charters
                            </h2>

                            <div className="space-y-4 text-gray-600 text-sm leading-relaxed mb-8">
                                <p>
                                    At Canada Coach Charters, we believe that travel is not just about reaching a destination — it's about creating unforgettable experiences and lasting memories. As a leading tour and transfer company, we take pride in offering seamless, comfortable, and personalised travel solutions that go beyond expectations.
                                </p>
                                <p>
                                    With years of industry expertise, we have curated a diverse range of travel packages that cater to every type of explorer, from the intrepid adventurer to the luxury seeker.
                                </p>
                                <p>
                                    We know that providing great service requires drivers who are punctual, safe, and friendly. We're dedicated to meeting and exceeding your expectations of what a transportation service can be.
                                </p>
                            </div>

                            {/* CTA row */}
                            <div className="flex flex-wrap items-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => setQuoteOpen(true)}
                                    className="h-14 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-full flex items-center justify-between pl-6 pr-1.5 transition-colors gap-4"
                                >
                                    <span>Get a Quote</span>
                                    <div className="bg-white rounded-full flex items-center justify-center shrink-0 shadow-md" style={{ width: "44px", height: "44px" }}>
                                        <ArrowUpRight className="w-4 h-4 text-blue-700" />
                                    </div>
                                </button>

                                <a
                                    href="tel:+16478464140"
                                    className="flex items-center gap-2.5 text-sm font-semibold text-gray-800 hover:text-blue-700 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Phone className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-normal leading-none mb-0.5">Call us</p>
                                        +1 (647) 846-4140
                                    </div>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <QuoteModal
                isOpen={quoteOpen}
                onClose={() => setQuoteOpen(false)}
                title="Get a Quote"
                serviceType="charter"
                context="Quote request from About Us"
            />
        </>
    );
}
