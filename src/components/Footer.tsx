"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import QuoteModal from "@/components/QuoteModal";

const footerLinkSections = [
    {
        title: "Quick Links",
        links: [
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Transfers", href: "/transfers" },
            { label: "Our Fleet", href: "/fleet" },
            { label: "Blog", href: "/blog" },
            { label: "FAQ", href: "/faq" },
        ],
    },
    {
        title: "Services",
        links: [
            { label: "Our Services", href: "/services" },
            { label: "Gallery", href: "/gallery" },
            { label: "Contact Us", href: "/contact" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms and Conditions", href: "/terms-and-conditions" },
        ],
    },
];

const socialLinks = [
    {
        label: "Facebook",
        href: "https://www.facebook.com/people/Canada-Coach-Charters/100088672182959/",
        icon: FaFacebookF,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/canadacoachcharters/",
        icon: FaInstagram,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/canada-coach-charterss",
        icon: FaLinkedinIn,
    },
    {
        label: "X (Twitter)",
        href: "https://x.com/coachcharterss",
        icon: FaXTwitter,
    },
];

export default function Footer() {
    const [quoteOpen, setQuoteOpen] = useState(false);

    return (
        <>
            <footer className="relative z-20 pt-4 pb-8">
                <div className="mx-auto">
                    <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 shadow-[0_28px_40px_-28px_rgba(15,23,42,0.7)]">
                        <Image
                            src="/hero/2.jpg"
                            alt="Coach bus background"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/75" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/75" />

                        <div className="relative z-10 p-5 sm:p-6 md:p-7 lg:p-8">
                            <div className="rounded-2xl border border-slate-200 bg-slate-100/95 px-5 py-4 sm:px-6 sm:py-5">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <p className="text-[0.98rem] font-semibold text-slate-800">
                                            Newsletter
                                        </p>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Please subscribe to our newsletter and stay updated with our services, vehicles, and offers.
                                        </p>
                                    </div>

                                    <form className="flex w-full max-w-[430px] items-center rounded-full border border-slate-300 bg-white p-1.5">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="h-10 w-full border-none bg-transparent px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                                        />
                                        <button
                                            type="submit"
                                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white transition-colors hover:bg-blue-800"
                                            aria-label="Subscribe"
                                        >
                                            <ArrowUpRight className="h-4 w-4" />
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="mt-8 grid gap-10 border-t border-white/15 pt-8 sm:mt-10 sm:grid-cols-2 xl:grid-cols-4">
                                <div className="space-y-4">
                                    <Image
                                        src="/logo.png"
                                        alt="Canada Coach Charters"
                                        width={320}
                                        height={84}
                                        className="h-20 w-auto object-contain"
                                    />

                                    <p className="text-base font-semibold text-white">+1 (647) 846-4140</p>
                                    <p className="text-sm text-slate-100">info@canadacoachcharters.ca</p>
                                    <p className="max-w-[26rem] text-sm leading-relaxed text-slate-100">
                                        95 Mural St, Richmond Hill, ON L4B 3G2, Canada
                                    </p>

                                    <div className="flex items-center gap-3 pt-1">
                                        {socialLinks.map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={item.label}
                                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white text-black transition-colors hover:bg-blue-600 hover:text-white"
                                                >
                                                    <Icon className="h-4 w-4" />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>

                                {footerLinkSections.map((section) => (
                                    <div key={section.title}>
                                        <h3 className="mb-4 text-lg font-semibold text-white">{section.title}</h3>
                                        <ul className="space-y-2.5">
                                            {section.links.map((item) => (
                                                <li key={item.label}>
                                                    <Link href={item.href} className="text-sm text-slate-100 transition-colors hover:text-white">
                                                        {item.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}

                                <div>
                                    <h3 className="mb-4 text-lg font-semibold text-white">Get A Quote</h3>
                                    <p className="mb-6 max-w-[26rem] text-sm leading-relaxed text-slate-100">
                                        Your reliable and comfortable transportation partner. We are a leading bus coach company committed to providing safe, efficient, and enjoyable service.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setQuoteOpen(true)}
                                        className="inline-flex items-center justify-between gap-4 pl-6 pr-2 py-2.5 rounded-full bg-blue-700 hover:bg-blue-800 text-base font-semibold text-white transition-colors"
                                    >
                                        Get A Quote
                                        <span className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0">
                                            <ArrowUpRight className="h-5 w-5 text-blue-700" />
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-10 border-t border-white/15 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-200">
                                <p>© 2026 Canada Coach Charters — All rights reserved.</p>
                                <p>
                                    Designed &amp; Developed by{" "}
                                    <a
                                        href="https://www.zenax.info/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-white hover:text-blue-300 transition-colors"
                                    >
                                        Zenax Web Solutions™
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <QuoteModal
                isOpen={quoteOpen}
                onClose={() => setQuoteOpen(false)}
                title="Get a Quote"
                serviceType="transfer"
                context="Quote request from footer"
            />
        </>
    );
}
