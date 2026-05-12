"use client";

import { useState } from "react";
import { FileText, CheckCircle2, Bus, ChevronRight } from "lucide-react";
import QuoteModal from "@/components/QuoteModal";

const steps = [
    {
        number: 1,
        title: "Tell us your trip",
        description: "Share your travel dates, passenger count, and destination.",
        icon: FileText,
    },
    {
        number: 2,
        title: "Get a clear quote",
        description: "Receive a transparent quote with no hidden fees.",
        icon: CheckCircle2,
    },
    {
        number: 3,
        title: "We handle the transport",
        description: "Sit back and enjoy your comfortable coach journey.",
        icon: Bus,
    },
];

export default function HowItWorks() {
    const [quoteOpen, setQuoteOpen] = useState(false);

    return (
        <>
            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-16 text-center">
                        <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-blue-700">
                            Our Process
                        </span>
                        <h2 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">
                            How It Works
                        </h2>
                        <p className="mt-3 text-lg text-slate-600">
                            Three simple steps to book your coach charter
                        </p>
                    </div>

                    {/* Steps Container */}
                    <div className="relative">
                        {/* Animated dotted flow line (desktop only) */}
                        <svg className="absolute inset-0 hidden md:block w-full" height="100" viewBox="0 0 1200 100" preserveAspectRatio="none" style={{ overflow: "visible" }}>
                            <defs>
                                <style>
                                    {`
                                    @keyframes dotFlow {
                                        to {
                                            stroke-dashoffset: -16;
                                        }
                                    }
                                    .dot-flow-line {
                                        animation: dotFlow 0.9s linear infinite;
                                        stroke-dasharray: 2 14;
                                        stroke-linecap: round;
                                    }
                                `}
                                </style>
                            </defs>
                            <line
                                x1="50"
                                y1="50"
                                x2="1150"
                                y2="50"
                                stroke="#2563eb"
                                strokeWidth="3"
                                className="dot-flow-line"
                                opacity="0.9"
                            />
                        </svg>

                        {/* Steps Grid */}
                        <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-3">
                            {steps.map((step) => {
                                const Icon = step.icon;
                                return (
                                    <div key={step.number} className="text-center">
                                        {/* Node Circle with Icon */}
                                        <div className="mb-8 flex justify-center">
                                            <div className="relative">
                                                <div className="absolute inset-0 rounded-full bg-blue-200/60 blur-xl animate-pulse" />

                                                {/* Main Circle */}
                                                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-blue-600 shadow-lg shadow-blue-200/70">
                                                    <Icon className="h-10 w-10 text-white" />
                                                </div>

                                                {/* Step Number Badge */}
                                                <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-white text-sm font-bold text-blue-700">
                                                    {step.number}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-6">
                                            <h3 className="text-xl font-bold text-slate-900">
                                                {step.title}
                                            </h3>
                                            <p className="mt-2 text-sm text-slate-600">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-16 text-center flex justify-center">
                        <button
                            type="button"
                            onClick={() => setQuoteOpen(true)}
                            className="inline-flex items-center justify-between gap-4 pl-6 pr-2 py-2.5 rounded-full bg-blue-700 hover:bg-blue-800 font-semibold text-white transition-colors duration-300"
                        >
                            Get Your Quote
                            <span className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0">
                                <ChevronRight className="w-5 h-5 text-blue-700" />
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            <QuoteModal
                isOpen={quoteOpen}
                onClose={() => setQuoteOpen(false)}
                title="Get Your Quote"
                serviceType="charter"
                context="Quote request from How It Works section"
            />
        </>
    );
}
