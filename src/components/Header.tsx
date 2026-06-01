"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, MapPin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import QuoteModal from "@/components/QuoteModal";

const gtaAreas = [
    "Toronto",
    "Mississauga",
    "Brampton",
    "Vaughan",
    "Markham",
    "Richmond Hill",
    "Scarborough",
    "Oakville",
    "Burlington",
    "Pickering",
    "Ajax",
    "Whitby",
];

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Fleet", href: "/fleet" },
    { label: "Transfers", href: "/transfers" },
    { label: "Tours", href: "/tours" },
    { label: "Contact", href: "/contact" },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [areasHovered, setAreasHovered] = useState(false);
    const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
    const [quoteOpen, setQuoteOpen] = useState(false);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const originalBodyOverflow = document.body.style.overflow;
        const originalHtmlOverflow = document.documentElement.style.overflow;

        if (mobileOpen || quoteOpen) {
            // Prevent page scroll behind the mobile drawer.
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = originalBodyOverflow;
            document.documentElement.style.overflow = originalHtmlOverflow;
        };
    }, [mobileOpen, quoteOpen]);

    useEffect(() => {
        if (!mobileOpen) setMobileAreasOpen(false);
    }, [mobileOpen]);

    const openAreas = () => {
        if (hideTimer.current) clearTimeout(hideTimer.current);
        setAreasHovered(true);
    };

    const closeAreas = () => {
        hideTimer.current = setTimeout(() => setAreasHovered(false), 120);
    };

    return (
        <>
            <header className={cn(
                "z-50 backdrop-blur-sm bg-black/25 rounded-2xl transition-all duration-300 overflow-hidden lg:overflow-visible",
                scrolled
                    ? "fixed top-4 left-6 right-6 shadow-lg"
                    : "absolute top-4 left-4 right-4"
            )}>
                <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center shrink-0 rounded-xl bg-white px-3 py-2 shadow-sm">
                            <Image
                                src="/logo.png"
                                alt="Canada Coach Charters"
                                width={160}
                                height={40}
                                className="h-9 w-auto object-contain"
                                priority
                            />
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium text-white/85 hover:text-white transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Service Areas dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={openAreas}
                                onMouseLeave={closeAreas}
                            >
                                <button
                                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/85 hover:text-white transition-colors"
                                >
                                    Service Areas
                                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", areasHovered && "rotate-180")} />
                                </button>

                                <div
                                    onMouseEnter={openAreas}
                                    onMouseLeave={closeAreas}
                                    className={cn(
                                        "absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-100 py-2 z-50",
                                        "transition-all duration-200 origin-top",
                                        areasHovered
                                            ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                                            : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
                                    )}
                                >
                                    <p className="px-3 pb-1.5 pt-0.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">GTA Areas</p>
                                    {gtaAreas.map((area) => (
                                        <div
                                            key={area}
                                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700"
                                        >
                                            <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                            {area}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </nav>

                        {/* CTA */}
                        <div className="hidden lg:flex items-center">
                            <button
                                type="button"
                                onClick={() => setQuoteOpen(true)}
                                className="inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-1.5 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors font-semibold text-white text-sm shadow-md shadow-blue-900/30"
                            >
                                <span>Get a Quote</span>
                                <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                                    <ChevronRight className="w-4 h-4 text-blue-700" />
                                </span>
                            </button>
                        </div>

                        {/* Mobile menu toggle */}
                        <button
                            className="lg:hidden p-2 rounded-md text-white/85 hover:text-white"
                            onClick={() => setMobileOpen((prev) => !prev)}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile nav drawer */}
                <div
                    className={cn(
                        "lg:hidden overflow-x-hidden overflow-y-auto overscroll-contain touch-pan-y [webkit-overflow-scrolling:touch] transition-all duration-300 rounded-b-2xl bg-black/45 backdrop-blur-md border-t border-white/10 shadow-[0_18px_35px_-16px_rgba(0,0,0,0.75)]",
                        mobileOpen ? "max-h-[calc(100dvh-7rem)]" : "max-h-0"
                    )}
                >
                    <nav className="flex flex-col px-4 py-3 gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-3 py-2.5 text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Mobile Service Areas accordion */}
                        <button
                            onClick={() => setMobileAreasOpen((prev) => !prev)}
                            className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <span>Service Areas</span>
                            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", mobileAreasOpen && "rotate-180")} />
                        </button>
                        <div className={cn("overflow-hidden transition-all duration-200", mobileAreasOpen ? "max-h-96" : "max-h-0")}>
                            <div className="pl-4 flex flex-col gap-0.5 pb-1">
                                {gtaAreas.map((area) => (
                                    <div
                                        key={area}
                                        className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 rounded-lg"
                                    >
                                        <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                        {area}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-white/10">
                            <button
                                type="button"
                                className="w-full inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-1.5 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors font-semibold text-white text-sm"
                                onClick={() => {
                                    setMobileOpen(false);
                                    setQuoteOpen(true);
                                }}
                            >
                                <span>Get a Quote</span>
                                <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                                    <ChevronRight className="w-4 h-4 text-blue-700" />
                                </span>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            <QuoteModal
                isOpen={quoteOpen}
                onClose={() => setQuoteOpen(false)}
                title="Get a Quote"
                serviceType="transfer"
                context="Quote request from header"
            />
        </>
    );
}
