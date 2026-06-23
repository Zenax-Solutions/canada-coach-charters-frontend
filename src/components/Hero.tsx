"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CalendarIcon, ArrowUpRight, Bus, MapPin, Users, Mail, Phone, Loader2, Star, ShieldCheck, Clock3, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import QuoteModal from "@/components/QuoteModal";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { storageUrl, submitQuote } from "@/lib/api";
import { geocodeFirstGtaLocation, getDrivingRouteMetricsToDropoff, searchGtaLocations, type GeoPoint, type RouteMetrics } from "@/lib/location";

const flipWords = ["Travel", "Adventure", "Discovery", "Freedom"];

type ServiceType = "charter" | "transfer" | "tour";
type TransferTripType = "round-trip" | "one-way";

interface TourListItem {
    id: number;
    title: string;
    slug: string;
    featured_image: string | null;
}

interface ToursResponse {
    data: TourListItem[];
}

export default function Hero() {
    const dropoffInputRef = useRef<HTMLInputElement | null>(null);
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [videoFailed, setVideoFailed] = useState(false);
    const [serviceType, setServiceType] = useState<ServiceType>("transfer");
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
    const [transferOption, setTransferOption] = useState("Private Transfer");
    const [transferTripType, setTransferTripType] = useState<TransferTripType>("round-trip");
    const [useVehicleAtDestination, setUseVehicleAtDestination] = useState<"yes" | "no">("yes");
    const [pickupTime, setPickupTime] = useState("");
    const [departureDate, setDepartureDate] = useState<Date | undefined>();
    const [departureTime, setDepartureTime] = useState("");
    const [selectedTourSlug, setSelectedTourSlug] = useState("");
    const [tourOptions, setTourOptions] = useState<TourListItem[]>([]);
    const [note, setNote] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [quoteOpen, setQuoteOpen] = useState(false);
    const selectedTour = tourOptions.find((tour) => tour.slug === selectedTourSlug) ?? null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (serviceType === "tour" && !selectedTourSlug.trim()) { setFormError("Please select a tour."); return; }

        if (serviceType !== "tour") {
            if (!pickup.trim()) { setFormError("Please enter pickup location."); return; }
            if (!dropoff.trim()) { setFormError("Please enter drop-off location."); return; }
        }

        if (!tripDate) {
            setFormError(serviceType === "transfer" ? "Please select pickup date." : "Please select a date.");
            return;
        }

        if (serviceType === "transfer" && !pickupTime.trim()) { setFormError("Please select pickup time."); return; }
        if (serviceType === "transfer" && transferTripType === "round-trip" && !departureDate) { setFormError("Please select departure date."); return; }
        if (serviceType === "transfer" && transferTripType === "round-trip" && !departureTime.trim()) { setFormError("Please select departure time."); return; }

        if (!passengers || parseInt(passengers, 10) < 1) { setFormError("Please enter number of passengers."); return; }
        if (!fullName.trim()) { setFormError("Please enter your name."); return; }
        if (!email.trim()) { setFormError("Please enter your email."); return; }

        setSubmitting(true);
        setFormError(null);
        try {
            let resolvedPickup = pickupPoint;
            let resolvedDropoff = dropoffPoint;

            if (serviceType !== "tour") {
                if (!resolvedPickup && pickup.trim()) {
                    resolvedPickup = await geocodeFirstGtaLocation(pickup);
                }
                if (!resolvedDropoff && dropoff.trim()) {
                    resolvedDropoff = await geocodeFirstGtaLocation(dropoff);
                }
            }

            const route =
                serviceType !== "tour" && resolvedDropoff
                    ? await getDrivingRouteMetricsToDropoff(resolvedDropoff, resolvedPickup)
                    : null;

            const contextualDetails = [
                serviceType === "transfer" && transferOption ? `Transfer service: ${transferOption}` : null,
                serviceType === "transfer" ? `Trip type: ${transferTripType === "round-trip" ? "Round Trip" : "One Way"}` : null,
                serviceType === "transfer" ? `Use vehicle at destination: ${useVehicleAtDestination === "yes" ? "Yes" : "No"}` : null,
                serviceType === "transfer" && pickupTime ? `Pickup time: ${pickupTime}` : null,
                serviceType === "transfer" && departureDate ? `Departure date: ${format(departureDate, "yyyy-MM-dd")}` : null,
                serviceType === "transfer" && departureTime ? `Departure time: ${departureTime}` : null,
                serviceType === "tour" && selectedTour ? `Tour: ${selectedTour.title}` : null,
                note.trim() ? `Note: ${note.trim()}` : null,
            ]
                .filter(Boolean)
                .join("\n");

            await submitQuote({
                name: fullName,
                email,
                phone: mobile || undefined,
                service_type: serviceType,
                transfer_trip_type: serviceType === "transfer" ? transferTripType : undefined,
                use_vehicle_at_destination: serviceType === "transfer" ? useVehicleAtDestination === "yes" : undefined,
                message: contextualDetails || undefined,
                pickup_location: serviceType === "tour" ? selectedTour?.title : pickup,
                dropoff_location: serviceType === "tour" ? undefined : dropoff,
                trip_date: tripDate ? format(tripDate, "yyyy-MM-dd") : undefined,
                passengers: passengers ? parseInt(passengers) : undefined,
                pickup_time: serviceType === "transfer" ? pickupTime : undefined,
                departure_date: serviceType === "transfer" && departureDate ? format(departureDate, "yyyy-MM-dd") : undefined,
                departure_time: serviceType === "transfer" ? departureTime : undefined,
                transfer_option: serviceType === "transfer" ? transferOption : undefined,
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

        setFormError(null);
        if (key !== "transfer") {
            setTransferOption("Private Transfer");
            setTransferTripType("round-trip");
            setUseVehicleAtDestination("yes");
            setPickupTime("");
            setDepartureDate(undefined);
            setDepartureTime("");
        }
        if (key !== "tour") {
            setSelectedTourSlug("");
            setNote("");
        }

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
        if (serviceType === "tour") {
            setPickupSuggestions([]);
            setPickupActiveIndex(-1);
            return;
        }
        if (text.length < 2 || pickupPoint?.label === pickup) {
            setPickupSuggestions([]);
            setPickupActiveIndex(-1);
            return;
        }

        let active = true;
        const timer = window.setTimeout(async () => {
            try {
                const results = await searchGtaLocations(text);
                if (!active) return;
                setPickupSuggestions(results);
                setPickupActiveIndex(results.length > 0 ? 0 : -1);
            } catch {
                if (!active) return;
                setPickupSuggestions([]);
                setPickupActiveIndex(-1);
            }
        }, 350);

        return () => {
            active = false;
            window.clearTimeout(timer);
        };
    }, [pickup, pickupPoint, serviceType]);

    useEffect(() => {
        const text = dropoff.trim();
        if (serviceType === "tour") {
            setDropoffSuggestions([]);
            setDropoffActiveIndex(-1);
            return;
        }
        if (text.length < 2 || dropoffPoint?.label === dropoff) {
            setDropoffSuggestions([]);
            setDropoffActiveIndex(-1);
            return;
        }

        let active = true;
        const timer = window.setTimeout(async () => {
            try {
                const results = await searchGtaLocations(text);
                if (!active) return;
                setDropoffSuggestions(results);
                setDropoffActiveIndex(results.length > 0 ? 0 : -1);
            } catch {
                if (!active) return;
                setDropoffSuggestions([]);
                setDropoffActiveIndex(-1);
            }
        }, 350);

        return () => {
            active = false;
            window.clearTimeout(timer);
        };
    }, [dropoff, dropoffPoint, serviceType]);

    useEffect(() => {
        let mounted = true;

        const loadTours = async () => {
            try {
                const res = await fetch("/api/tours/options?per_page=50", {
                    method: "GET",
                    headers: { Accept: "application/json" },
                });
                if (!res.ok) throw new Error("Unable to load tours");

                const json = (await res.json()) as ToursResponse;
                if (!mounted) return;
                setTourOptions(json.data ?? []);
            } catch {
                if (!mounted) return;
                setTourOptions([]);
            }
        };

        loadTours();

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        if (serviceType === "tour" || !dropoffPoint) {
            setRouteMetrics(null);
            return;
        }

        let mounted = true;
        setDistanceLoading(true);
        getDrivingRouteMetricsToDropoff(dropoffPoint, pickupPoint)
            .then((metrics) => {
                if (mounted) setRouteMetrics(metrics);
            })
            .finally(() => {
                if (mounted) setDistanceLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, [dropoffPoint, pickupPoint, serviceType]);

    useEffect(() => {
        if (!submitted) return;

        const timer = window.setTimeout(() => {
            setSubmitted(false);
            setFormError(null);
            setPickup("");
            setDropoff("");
            setPickupPoint(null);
            setDropoffPoint(null);
            setPickupSuggestions([]);
            setDropoffSuggestions([]);
            setPickupActiveIndex(-1);
            setDropoffActiveIndex(-1);
            setTripDate(undefined);
            setPassengers("");
            setTransferOption("Private Transfer");
            setTransferTripType("round-trip");
            setUseVehicleAtDestination("yes");
            setPickupTime("");
            setDepartureDate(undefined);
            setDepartureTime("");
            setSelectedTourSlug("");
            setNote("");
            setFullName("");
            setEmail("");
            setMobile("");
            setRouteMetrics(null);
            setDistanceLoading(false);
            setServiceType("transfer");
        }, 5000);

        return () => window.clearTimeout(timer);
    }, [submitted]);

    const selectPickupSuggestion = (suggestion: GeoPoint) => {
        setPickup(suggestion.label);
        setPickupPoint(suggestion);
        setPickupSuggestions([]);
        setPickupActiveIndex(-1);
        // Move users directly to destination entry after selecting pickup.
        requestAnimationFrame(() => dropoffInputRef.current?.focus());
    };

    const selectDropoffSuggestion = (suggestion: GeoPoint) => {
        setDropoff(suggestion.label);
        setDropoffPoint(suggestion);
        setDropoffSuggestions([]);
        setDropoffActiveIndex(-1);
    };

    return (
        <section className="relative overflow-x-hidden" style={{ minHeight: "680px" }}>
            {/* Background media (video with image fallback) */}
            {videoFailed ? (
                <Image
                    className="absolute inset-0 object-cover"
                    src="/hero/2.jpg"
                    alt="Coach charter hero"
                    fill
                    priority
                />
            ) : (
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/hero/13456587_3840_2160_30fps.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/hero/2.jpg"
                    preload="metadata"
                    onError={() => setVideoFailed(true)}
                />
            )}
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
                        <h1 className="text-4xl sm:text-5xl xl:text-[3.4rem] text-white font-bold sm:font-normal leading-tight tracking-tight">
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
                <div className="hidden md:flex w-full lg:w-[420px] shrink-0 items-center">
                    <div className="w-full">

                        {/* Browser-style tabs — Charter / Transfer / Tour */}
                        <div className="flex items-end gap-1.5 overflow-visible">
                            {(
                                [
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
                        <div className="bg-white shadow-2xl p-6 relative z-0 rounded-b-2xl rounded-tr-2xl min-h-[500px] max-h-[500px] flex flex-col">
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

                            <form onSubmit={handleSubmit} className="space-y-3 min-h-0 flex-1 overflow-y-auto pr-1">

                                {serviceType === "transfer" && (
                                    <>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Trip Type</label>
                                                <select
                                                    value={transferTripType}
                                                    onChange={(e) => {
                                                        const value = e.target.value as TransferTripType;
                                                        setTransferTripType(value);
                                                        if (value === "one-way") {
                                                            setDepartureDate(undefined);
                                                            setDepartureTime("");
                                                        }
                                                    }}
                                                    className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50/80 px-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                                                >
                                                    <option value="round-trip">Round Trip</option>
                                                    <option value="one-way">One Way</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Vehicle at destination?</label>
                                                <select
                                                    value={useVehicleAtDestination}
                                                    onChange={(e) => setUseVehicleAtDestination(e.target.value as "yes" | "no")}
                                                    className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50/80 px-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                                                >
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </div>
                                        </div>


                                    </>
                                )}

                                {serviceType === "tour" ? (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Select Tour
                                        </label>
                                        <select
                                            value={selectedTourSlug}
                                            onChange={(e) => setSelectedTourSlug(e.target.value)}
                                            className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50/80 px-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value="">Select tour</option>
                                            {tourOptions.map((tour) => (
                                                <option key={tour.id} value={tour.slug}>{tour.title}</option>
                                            ))}
                                        </select>

                                        {selectedTour && (
                                            <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50/80 p-2.5 flex items-center gap-3">
                                                <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-slate-200 shrink-0">
                                                    {selectedTour.featured_image && storageUrl(selectedTour.featured_image) && (
                                                        <Image
                                                            src={storageUrl(selectedTour.featured_image) as string}
                                                            alt={selectedTour.title}
                                                            fill
                                                            unoptimized
                                                            className="object-cover"
                                                        />
                                                    )}
                                                </div>
                                                <p className="text-xs font-medium text-slate-700 leading-snug line-clamp-2">{selectedTour.title}</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        {/* Pickup & Drop-off */}
                                        <div className="flex flex-col lg:flex-row gap-3">
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                    Pickup
                                                </label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                                    <Input
                                                        placeholder="Pickup location"
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
                                                        <div className="absolute z-30 mt-1 w-full max-h-56 sm:max-h-48 overflow-y-auto overscroll-contain touch-pan-y rounded-xl border border-gray-200 bg-white shadow-lg [webkit-overflow-scrolling:touch]">
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
                                                    {serviceType === "transfer" ? "Destination" : "Drop-off"}
                                                </label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
                                                    <Input
                                                        ref={dropoffInputRef}
                                                        placeholder={serviceType === "transfer" ? "Destination" : "Drop-off"}
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
                                                        <div className="absolute z-30 mt-1 w-full max-h-56 sm:max-h-48 overflow-y-auto overscroll-contain touch-pan-y rounded-xl border border-gray-200 bg-white shadow-lg [webkit-overflow-scrolling:touch]">
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
                                    </>
                                )}

                                {/* Date & Passengers */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            {serviceType === "transfer" ? "Pickup Date" : "Date"}
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
                                                    {tripDate ? format(tripDate, "MMM d, yyyy") : serviceType === "transfer" ? "Select pickup date" : "Select date"}
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={tripDate}
                                                    onSelect={setTripDate}
                                                    disabled={(d) => d < startOfToday}
                                                    autoFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            {serviceType === "transfer" ? "Pickup Time" : "Passengers"}
                                        </label>
                                        {serviceType === "transfer" ? (
                                            <Input
                                                type="time"
                                                value={pickupTime}
                                                onChange={e => setPickupTime(e.target.value)}
                                                className="h-11 border-gray-200 rounded-xl bg-gray-50/80 text-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        ) : (
                                            <div className="relative">
                                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                                <Input
                                                    type="number"
                                                    min={1}
                                                    placeholder="1"
                                                    value={passengers}
                                                    onChange={e => setPassengers(e.target.value)}
                                                    className="pl-9 h-11 border-gray-200 rounded-xl bg-gray-50/80 text-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {serviceType === "transfer" && transferTripType === "round-trip" && (
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Departure Date</label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <button
                                                        className={cn(
                                                            "w-full h-11 pl-9 pr-3 text-sm text-left border border-gray-200 rounded-xl bg-gray-50/80 relative flex items-center hover:border-blue-400 transition-colors",
                                                            !departureDate && "text-gray-400"
                                                        )}
                                                    >
                                                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                                        {departureDate ? format(departureDate, "MMM d, yyyy") : "Select departure date"}
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={departureDate}
                                                        onSelect={setDepartureDate}
                                                        disabled={(d) => d < (tripDate ?? startOfToday)}
                                                        autoFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Departure Time</label>
                                            <Input
                                                type="time"
                                                value={departureTime}
                                                onChange={e => setDepartureTime(e.target.value)}
                                                className="h-11 border-gray-200 rounded-xl bg-gray-50/80 text-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                )}

                                {serviceType === "transfer" && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Passengers</label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                            <Input
                                                type="number"
                                                min={1}
                                                placeholder="1"
                                                value={passengers}
                                                onChange={e => setPassengers(e.target.value)}
                                                className="pl-9 h-11 border-gray-200 rounded-xl bg-gray-50/80 text-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Name + Email */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Name
                                        </label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                            <Input
                                                placeholder="Full name"
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
                                                placeholder="Email"
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
                                            placeholder="Mobile number"
                                            value={mobile}
                                            onChange={e => setMobile(e.target.value)}
                                            className="pl-9 h-11 border-gray-200 rounded-xl bg-gray-50/80 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Note <span className="text-gray-400">(optional)</span>
                                    </label>
                                    <textarea
                                        value={note}
                                        onChange={e => setNote(e.target.value)}
                                        placeholder="Extra details"
                                        className="w-full min-h-20 rounded-xl border border-gray-200 bg-gray-50/80 p-3 text-sm outline-none focus:border-blue-500"
                                    />
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
                serviceType="transfer"
                context="Quote request from Hero section"
            />
        </section>
    );
}
