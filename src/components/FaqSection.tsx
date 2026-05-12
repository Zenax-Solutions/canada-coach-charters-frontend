"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        question: "What types of services does Canada Coach Charters offer?",
        answer:
            "Canada Coach Charters offers a range of transportation services including wedding transportation, corporate travel, school rentals, private travel, and airport shuttle services.",
    },
    {
        question: "What safety measures does Canada Coach Charters have in place?",
        answer:
            "At Canada Coach Charters, safety is our top priority. We ensure that all our vehicles undergo regular maintenance and inspections to meet the highest safety standards. Our drivers are also trained in defensive driving techniques and adhere to all traffic regulations.",
    },
    {
        question: "How can I book a service with Canada Coach Charters?",
        answer:
            "You can easily book a service with us by using our website, phone, or email. Our friendly staff will help you choose the right service for your needs and guide you through the booking process.",
    },
    {
        question: "Is Canada Coach Charters available for long-distance travel?",
        answer:
            "Yes, we provide services for both short and long-distance travel. Whether you need transportation for a local event or a cross-country trip, we have the vehicles and expertise to accommodate your needs.",
    },
    {
        question: "Are the drivers at Canada Coach Charters professional and experienced?",
        answer:
            "Yes, all our drivers are highly trained professionals with years of experience in the transportation industry. They are punctual, safe, and friendly, dedicated to providing you with the best possible service.",
    },
    {
        question: "What sets Canada Coach Charters apart from other transportation companies?",
        answer:
            "At Canada Coach Charters, we pride ourselves on delivering exceptional service that goes above and beyond our customers' expectations. Our commitment to personalized, comfortable, and hassle-free travel experiences sets us apart from other transportation companies.",
    },
    {
        question: "Can Canada Coach Charters accommodate special requests or custom itineraries?",
        answer:
            "Absolutely! We understand that every customer has unique needs and preferences. We are happy to accommodate special requests and work with you to create custom itineraries tailored to your specific requirements.",
    },
    {
        question:
            "What are the payment options available when booking a service with Canada Coach Charters?",
        answer:
            "We offer flexible payment options for your convenience, including credit/debit card payments, bank transfers, and cash payments. Our staff will provide you with all the necessary details and help you choose the most suitable payment method for your booking.",
    },
];

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="bg-slate-100 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_30px_65px_-45px_rgba(15,23,42,0.35)] lg:grid-cols-2 lg:gap-7 lg:p-6">
                    <div className="relative min-h-[320px] overflow-hidden rounded-2xl lg:min-h-[520px]">
                        <Image
                            src="/hero/2.jpg"
                            alt="Passengers inside a coach bus"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
                    </div>

                    <div className="space-y-3">
                        {faqs.map((item, index) => {
                            const open = openIndex === index;
                            return (
                                <article
                                    key={item.question}
                                    className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                                >
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-semibold text-slate-800"
                                        onClick={() => setOpenIndex(open ? -1 : index)}
                                        aria-expanded={open}
                                    >
                                        <span>{item.question}</span>
                                        {open ? <X className="h-4 w-4 shrink-0" /> : <Plus className="h-4 w-4 shrink-0" />}
                                    </button>

                                    <div
                                        className={cn(
                                            "grid transition-all duration-300 ease-out",
                                            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                                        )}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="px-4 pb-4 text-sm leading-relaxed text-slate-600">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
