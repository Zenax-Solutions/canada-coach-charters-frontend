"use client";

import { useState, useEffect } from "react";
import { CalendarIcon, ArrowUpRight, Bus, MapPin, Users, Mail, Phone, Loader2, Star, ShieldCheck, Clock3, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import QuoteModal from "@/components/QuoteModal";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { submitQuote } from "@/lib/api";
import { geocodeFirstGtaLocation, getDrivingRouteMetrics, searchGtaLocations, type GeoPoint, type RouteMetrics } from "@/lib/location";

const flipWords = ["Travel", "Adventure", "Discovery", "Freedom"];

type ServiceType = "charter" | "transfer" | "tour";

export default function Hero() {
    const [serviceType, setServiceType] = useState<ServiceType>("charter");
    const [isLoading, setIsLoading] = useState(false);
    const [tripDate, setTripDate] = useState<Date | undefined>();
    const [wordIndex, setWordIndex] = useState(0);
    const [pickup, setPickup] = useState("");
    const [dropoff, setDropoff] = useState("");
    const [pickupPoint, setPickupPoint] = useState<GeoPoint | null>(null);
    const [dropoffPoint, setDropoffPoint] = useState<GeoPoint | null>(null);
    const [pickupSuggestions, setPickupSuggestions] = useState<GeoPoint[]>([]);
    const [dropoffSuggestions, setDropoffSuggestions] = useState<GeoPoint[]>([]);
    const [pickupActiveIndex, setPickupActiveIndex] = useState(-1);
    const [dropoffActiveIndex, setDropoffActiveIndex] = useState(-1);
    const [routeMetrics, setRouteMetrics] = useState<RouteMetrics | null>(null);
    const [distanceLoading, setDistanceLoading] = useState(false);
    const [passengers, setPassengers] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [quoteOpen, setQuoteOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim()) { setFormError("Please enter your name."); return; }
        if (!email.trim()) { setFormError("Please enter your email."); return; }
        setSubmitting(true);
        setFormError(null);
        try {
            let resolvedPickup = pickupPoint;
            let resolvedDropoff = dropoffPoint;

            if (!resolvedPickup && pickup.trim()) {
                resolvedPickup = await geocodeFirstGtaLocation(pickup);
            }
            if (!resolvedDropoff && dropoff.trim()) {
                resolvedDropoff = await geocodeFirstGtaLocation(dropoff);
            }

            const route =
                resolvedPickup && resolvedDropoff
                    ? await getDrivingRouteMetrics(resolvedPickup, resolvedDropoff)
                    : null;

            await submitQuote({
                name: fullName,
                email,
                phone: mobile || undefined,
                service_type: serviceType,
                pickup_location: pickup,
                dropoff_location: dropoff,
                trip_date: tripDate ? format(tripDate, "yyyy-MM-dd") : undefined,
                passengers: passengers ? parseInt(passengers) : undefined,
                pickup_lat: resolvedPickup?.lat,
                pickup_lng: resolvedPickup?.lon,
                dropoff_lat: resolvedDropoff?.lat,
                dropoff_lng: resolvedDropoff?.lon,
                distance_km: route?.distanceKm,
                duration_minutes: route?.durationMinutes,
            });
            setSubmitted(true);
        } catch {
            setFormError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleServiceChange = (key: ServiceType) => {
        setIsLoading(true);
        setServiceType(key);
        setTimeout(() => setIsLoading(false), 600);
    };
    const [wordPhase, setWordPhase] = useState<"in" | "out">("in");

    useEffect(() => {
        const cycle = setInterval(() => {
            setWordPhase("out");
            setTimeout(() => {
                setWordIndex((prev) => (prev + 1) % flipWords.length);
                setWordPhase("in");
            }, 300);
        }, 2800);
        return () => clearInterval(cycle);
    }, []);

    useEffect(() => {
        const text = pickup.trim();
        if (text.length < 3 || pickupPoint?.label === pickup) {
            setPickupSuggestions([]);
            setPickupActiveIndex(-1);
            return;
        }

        const timer = window.setTimeout(async () => {
            const results = await searchGtaLocations(text);
            setPickupSuggestions(results);
            setPickupActiveIndex(results.length > 0 ? 0 : -1);
        }, 350);

        return () => window.clearTimeout(timer);
    }, [pickup, pickupPoint]);

    useEffect(() => {
        const text = dropoff.trim();
        if (text.length < 3 || dropoffPoint?.label === dropoff) {
            setDropoffSuggestions([]);
            setDropoffActiveIndex(-1);
            return;
        }

        const timer = window.setTimeout(async () => {
            const results = await searchGtaLocations(text);
            setDropoffSuggestions(results);
            setDropoffActiveIndex(results.length > 0 ? 0 : -1);
        }, 350);

        return () => window.clearTimeout(timer);
    }, [dropoff, dropoffPoint]);

    useEffect(() => {
        if (!pickupPoint || !dropoffPoint) {
            setRouteMetrics(null);
            return;
        }

        let mounted = true;
        setDistanceLoading(true);
        getDrivingRouteMetrics(pickupPoint, dropoffPoint)
            .then((metrics) => {
                if (mounted) setRouteMetrics(metrics);
            })
            .finally(() => {
                if (mounted) setDistanceLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, [pickupPoint, dropoffPoint]);

    const selectPickupSuggestion = (suggestion: GeoPoint) => {
        setPickup(suggestion.label);
        setPickupPoint(suggestion);
        setPickupSuggestions([]);
        setPickupActiveIndex(-1);
    };

    const selectDropoffSuggestion = (suggestion: GeoPoint) => {
        setDropoff(suggestion.label);
        setDropoffPoint(suggestion);
        setDropoffSuggestions([]);
        setDropoffActiveIndex(-1);
    };

    return (
        <section className="relative overflow-hidden" style={{ minHeight: "680px" }}>
            {/* Background video */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/hero/13456587_3840_2160_30fps.mp4"
                autoPlay
                muted
                loop
                playsInline
            />
            {/* Left-to-right dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

            {/* Content grid */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 flex flex-col lg:flex-row items-center gap-6 pt-24 pb-12" style={{ minHeight: "680px" }}>

                {/* Left — slogan, headline, description, CTAs */}
                <div className="flex-1 flex flex-col gap-4">

                    {/* Slogan */}
                    <p className="text-white/80 text-md tracking-wide flex items-center gap-1.5">
                        Canada&apos;s most trusted coach charter service
                    </p>

                    {/* Headline with flip word */}
                    <div>
                        <h1 className="text-4xl sm:text-5xl xl:text-[3.4rem] text-white leading-tight tracking-tight">
                            Your Smart Choice<br />
                            for Long-Distance<br />
                            <span
                                className="inline-block text-blue-600"
                                style={{ perspective: "400px", display: "inline-block" }}
                            >
                                <span
                                    key={wordIndex}
                                    className={cn(
                                        "inline-block",
                                        wordPhase === "in" ? "word-flip-in" : "word-flip-out"
                                    )}
                                    style={{ transformOrigin: "center top", display: "inline-block" }}
                                >
                                    {flipWords[wordIndex]}
                                </span>
                            </span>
                        </h1>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed max-w-2xl">
                        We provide reliable group transportation for corporate events, weddings, airport transfers,
                        school trips, sports teams, and private tours across Toronto and surrounding GTA cities.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setQuoteOpen(true)}
                            className="h-12 bg-blue-700 hover:bg-blue-600 text-white font-semibold text-sm rounded-full transition-colors flex items-center justify-between pl-6 pr-1.5 gap-4"
                        >
                            <span>Get a Quote</span>
                            <div className="bg-white rounded-full flex items-center justify-center shrink-0 shadow-md" style={{ width: "38px", height: "38px" }}>
                                <ArrowUpRight className="w-4 h-4 text-blue-700" />
                            </div>
                        </button>
                        <a href="/fleet" className="h-12 bg-white/10 hover:bg-white/20 border border-white/35 text-white font-semibold text-sm rounded-full transition-colors flex items-center justify-between pl-6 pr-1.5 gap-4">
                            <span>View Fleet</span>
                            <div className="bg-white rounded-full flex items-center justify-center shrink-0 shadow-md" style={{ width: "38px", height: "38px" }}>
                                <Bus className="w-4 h-4 text-blue-700" />
                            </div>
                        </a>
                    </div>

                    {/* Compact trust elements */}
                    <div className="pt-1 space-y-2.5">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs sm:text-sm">
                            <span className="inline-flex items-center gap-0.5 text-amber-300">
                                <Star className="w-3.5 h-3.5 fill-amber-300" />
                                <Star className="w-3.5 h-3.5 fill-amber-300" />
                                <Star className="w-3.5 h-3.5 fill-amber-300" />
                                <Star className="w-3.5 h-3.5 fill-amber-300" />
                                <Star className="w-3.5 h-3.5 fill-amber-300" />
                            </span>
                            <span className="font-semibold text-white">4.9 Rated</span>
                        </div>

                        <div className="text-xs sm:text-sm text-white/85 flex flex-wrap items-center gap-x-4 gap-y-2">
                            <span className="inline-flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-blue-300" />
                                GTA-Based Service
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
                                Professional Drivers
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Bus className="w-3.5 h-3.5 text-blue-300" />
                                Modern Fleet
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Clock3 className="w-3.5 h-3.5 text-blue-300" />
                                Available 24/7 for Bookings
                            </span>
                        </div>
                    </div>

                </div>

                {/* Right — booking card */}
                <div className="w-full lg:w-[420px] shrink-0 flex items-center">
                    <div className="w-full">

                        {/* Browser-style tabs — Charter / Transfer / Tour */}
                        <div className="flex items-end gap-1.5 overflow-visible">
                            {(
                                [
                                    { key: "charter", label: "Charter" },
                                    { key: "transfer", label: "Transfer" },
                                    { key: "tour", label: "Tour" },
                                ] as { key: ServiceType; label: string }[]
                            ).map((tab, index) => (
                                <button
                                    key={tab.key}
                                    onClick={() => handleServiceChange(tab.key)}
                                    className={cn(
                                        "px-5 text-sm font-semibold transition-all duration-300 ease-in-out relative ml-2 first:ml-0",
                                        serviceType === tab.key
                                            ? "tab-active bg-white text-blue-600 pt-4 pb-4 rounded-t-2xl z-10 -mb-px"
                                            : "bg-white/80 text-gray-400 pt-2.5 pb-3 rounded-t-2xl -mb-px hover:bg-white/90"
                                        ,
                                        serviceType === tab.key && index === 0 && "tab-no-left-notch"
                                    )}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Card body */}
                        <div className="bg-white shadow-2xl p-6 relative z-0 rounded-b-2xl rounded-tr-2xl">
                            {/* Card title */}
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-base font-bold text-gray-800">Plan Your Trip in Minutes</p>
                                <div className="flex items-center gap-2">
                                    {isLoading && <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />}
                                    <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full capitalize">
                                        {serviceType}
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-3">

                                {/* Pickup & Drop-off */}
                                <div className="flex flex-col lg:flex-row gap-3">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Pickup
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                            <Input
                                                placeholder="Enter pickup location"
                                                value={pickup}
                                                onChange={e => {
                                                    setPickup(e.target.value);
                                                    setPickupPoint(null);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (!pickupSuggestions.length) return;

                                                    if (e.key === "ArrowDown") {
                                                        e.preventDefault();
                                                        setPickupActiveIndex((current) => (current + 1) % pickupSuggestions.length);
                                                    }

                                                    if (e.key === "ArrowUp") {
                                                        e.preventDefault();
                                                        setPickupActiveIndex((current) =>
                                                            current <= 0 ? pickupSuggestions.length - 1 : current - 1
                                                        );
                                                    }

                                                    if (e.key === "Enter" && pickupActiveIndex >= 0) {
                                                        e.preventDefault();
                                                        selectPickupSuggestion(pickupSuggestions[pickupActiveIndex]);
                                                    }

                                                    if (e.key === "Escape") {
                                                        setPickupSuggestions([]);
                                                        setPickupActiveIndex(-1);
                                                    }
                                                }}
                                                className="pl-9 h-11 border-gray-200 rounded-xl bg-gray-50/80 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                            {pickupSuggestions.length > 0 && (
                                                <div className="absolute z-30 mt-1 w-full max-h-48 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
                                                    {pickupSuggestions.map((s, index) => (
                                                        <button
                                                            key={`${s.lat}-${s.lon}-${s.label}`}
                                                            type="button"
                                                            onClick={() => selectPickupSuggestion(s)}
                                                            className={cn(
                                                                "flex w-full items-start gap-2 border-b border-gray-100 px-3 py-2 text-left text-xs text-gray-700 hover:bg-blue-50 last:border-b-0",
                                                                index === pickupActiveIndex && "bg-blue-50 text-blue-700"
                                                            )}
                                                        >
                                                            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
                                                            <span>{s.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Drop-off
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
                                            <Input
                                                placeholder="Enter drop-off location"
                                                value={dropoff}
                                                onChange={e => {
                                                    setDropoff(e.target.value);
                                                    setDropoffPoint(null);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (!dropoffSuggestions.length) return;

                                                    if (e.key === "ArrowDown") {
                                                        e.preventDefault();
                                                        setDropoffActiveIndex((current) => (current + 1) % dropoffSuggestions.length);
                                                    }

                                                    if (e.key === "ArrowUp") {
                                                        e.preventDefault();
                                                        setDropoffActiveIndex((current) =>
                                                            current <= 0 ? dropoffSuggestions.length - 1 : current - 1
                                                        );
                                                    }

                                                    if (e.key === "Enter" && dropoffActiveIndex >= 0) {
                                                        e.preventDefault();
                                                        selectDropoffSuggestion(dropoffSuggestions[dropoffActiveIndex]);
                                                    }

                                                    if (e.key === "Escape") {
                                                        setDropoffSuggestions([]);
                                                        setDropoffActiveIndex(-1);
                                                    }
                                                }}
                                                className="pl-9 h-11 border-gray-200 rounded-xl bg-gray-50/80 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                            {dropoffSuggestions.length > 0 && (
                                                <div className="absolute z-30 mt-1 w-full max-h-48 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
                                                    {dropoffSuggestions.map((s, index) => (
                                                        <button
                                                            key={`${s.lat}-${s.lon}-${s.label}`}
                                                            type="button"
                                                            onClick={() => selectDropoffSuggestion(s)}
                                                            className={cn(
                                                                "flex w-full items-start gap-2 border-b border-gray-100 px-3 py-2 text-left text-xs text-gray-700 hover:bg-blue-50 last:border-b-0",
                                                                index === dropoffActiveIndex && "bg-blue-50 text-blue-700"
                                                            )}
                                                        >
                                                            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
                                                            <span>{s.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Date & Passengers */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Date
                                        </label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button
                                                    className={cn(
                                                        "w-full h-11 pl-9 pr-3 text-sm text-left border border-gray-200 rounded-xl bg-gray-50/80 relative flex items-center hover:border-blue-400 transition-colors",
                                                        !tripDate && "text-gray-400"
                                                    )}
                                                >
                                                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                                    {tripDate ? format(tripDate, "MMM d, yyyy") : "Select date"}
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={tripDate}
                                                    onSelect={setTripDate}
                                                    autoFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Passengers
                                        </label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                            <Input
                                                type="number"
                                                min={1}
                                                placeholder="0"
                                                value={passengers}
                                                onChange={e => setPassengers(e.target.value)}
                                                className="pl-9 h-11 border-gray-200 rounded-xl bg-gray-50/80 text-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Name + Email */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            User name
                                        </label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                            <Input
                                                placeholder="Your full name"
                                                value={fullName}
                                                onChange={e => setFullName(e.target.value)}
                                                className="pl-9 h-11 border-gray-200 rounded-xl bg-gray-50/80 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                            <Input
                                                type="email"
                                                placeholder="you@example.com"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className="pl-9 h-11 border-gray-200 rounded-xl bg-gray-50/80 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Mobile <span className="text-gray-400">(optional)</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <Input
                                            type="tel"
                                            placeholder="Your mobile number"
                                            value={mobile}
                                            onChange={e => setMobile(e.target.value)}
                                            className="pl-9 h-11 border-gray-200 rounded-xl bg-gray-50/80 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* CTA button */}
                                {submitted ? (
                                    <div className="w-full h-16 bg-green-50 border border-green-200 text-green-700 font-semibold text-sm rounded-2xl flex items-center justify-center gap-2">
                                        <CheckCircle2 className="w-5 h-5" />
                                        Request sent! We&apos;ll be in touch shortly.
                                    </div>
                                ) : (
                                    <>
                                        {formError && <p className="text-sm text-red-500">{formError}</p>}
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full h-16 bg-blue-700 hover:bg-blue-800 disabled:opacity-70 text-white font-semibold text-base rounded-full flex items-center justify-between pl-6 pr-1.5 transition-colors mt-1"
                                        >
                                            <span>{submitting ? "Sending…" : "Request Pricing"}</span>
                                            <div className="aspect-square bg-white rounded-full flex items-center justify-center shrink-0 shadow-md" style={{ width: "52px", height: "52px" }}>
                                                {submitting ? <Loader2 className="w-5 h-5 text-blue-700 animate-spin" /> : <ArrowUpRight className="w-5 h-5 text-blue-700" />}
                                            </div>
                                        </button>
                                    </>
                                )}

                            </form>
                        </div>
                    </div>
                </div>

            </div>

            <QuoteModal
                isOpen={quoteOpen}
                onClose={() => setQuoteOpen(false)}
                title="Get a Quote"
                serviceType="charter"
                context="Quote request from Hero section"
            />
        </section>
    );
}
