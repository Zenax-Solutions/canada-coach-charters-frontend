"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { forwardRef, useEffect, useState, type ButtonHTMLAttributes } from "react";
import { MapPin, Calendar, Users, Phone, Mail, ArrowUpRight, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { storageUrl, submitQuote } from "@/lib/api";
import { geocodeFirstGtaLocation, getDrivingRouteMetrics, searchGtaLocations, type GeoPoint, type RouteMetrics } from "@/lib/location";

type ServiceType = "charter" | "transfer" | "tour";
type TripType = "inter-city" | "inter-province";
type TransferTripType = "round-trip" | "one-way";
type Mode = "booking" | "quote";

const TRANSFER_OPTIONS = [
    "Airport Transfer",
    "Hotel Transfer",
    "City Transfer",
    "Intercity Transfer",
    "Private Transfer",
];

interface TourListItem {
    id: number;
    title: string;
    slug: string;
    short_description: string;
    featured_image: string | null;
    duration_days: number;
    start_location: string;
    max_group_size: number;
    price_per_person: number;
    country: string | null;
    category: { name: string; slug: string } | null;
}

interface ToursResponse {
    data: TourListItem[];
}

interface BookingCardProps {
    ctaLabel?: string;
    variant?: "hero" | "section";
    mode?: Mode;
    initialServiceType?: ServiceType;
    quoteContext?: string;
    initialTourSlug?: string;
}

const fmtDate = (d: Date) =>
    d.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });

function FieldError({ msg }: { msg?: string }) {
    if (!msg) return null;
    return (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3 shrink-0" />
            {msg}
        </p>
    );
}

type DateButtonProps = {
    date: Date | undefined;
    placeholder: string;
    error?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const DateButton = forwardRef<HTMLButtonElement, DateButtonProps>(function DateButton(
    { date, placeholder, error, className, ...props },
    ref
) {
    return (
        <button
            ref={ref}
            type="button"
            className={cn(
                "w-full h-11 rounded-xl border border-gray-200 bg-gray-50/80 px-3 text-sm text-left flex items-center gap-2 transition-colors hover:border-blue-400",
                !date && "text-gray-400",
                error && "border-red-400",
                className
            )}
            {...props}
        >
            <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="truncate">{date ? fmtDate(date) : placeholder}</span>
        </button>
    );
});

export default function BookingCard({
    ctaLabel = "Request Pricing",
    variant = "section",
    mode = "quote",
    initialServiceType = "charter",
    quoteContext,
    initialTourSlug,
}: BookingCardProps) {
    const searchParams = useSearchParams();

    /* ── Booking mode state ── */
    const [tripType, setTripType] = useState<TripType>("inter-city");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departure, setDeparture] = useState<Date | undefined>();
    const [returnDate, setReturnDate] = useState<Date | undefined>();

    /* ── Quote mode state ── */
    const [serviceType, setServiceType] = useState<ServiceType>(initialServiceType);
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
    const [date, setDate] = useState<Date | undefined>();
    const [passengers, setPassengers] = useState("");
    const [transferOption, setTransferOption] = useState("");
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

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [apiError, setApiError] = useState<string | null>(null);

    const selectedTour = tourOptions.find((tour) => tour.slug === selectedTourSlug) ?? null;
    const requestedTourSlug = searchParams.get("tour")?.trim() ?? "";
    const requestedQuoteType = searchParams.get("quote")?.trim() ?? "";
    const preferredTourSlug = (initialTourSlug?.trim() || requestedTourSlug).trim();

    useEffect(() => {
        if (mode !== "quote") return;
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
    }, [pickup, pickupPoint, mode]);

    useEffect(() => {
        if (mode !== "quote") return;
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
    }, [dropoff, dropoffPoint, mode]);

    useEffect(() => {
        if (mode !== "quote") return;
        setServiceType(initialServiceType);
    }, [initialServiceType, mode]);

    useEffect(() => {
        if (mode !== "quote") return;

        let mounted = true;

        const loadTours = async () => {
            try {
                const res = await fetch(`/api/tours/options?per_page=50`, {
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
    }, [mode]);

    useEffect(() => {
        if (mode !== "quote") return;

        if (requestedQuoteType === "tour" || preferredTourSlug) {
            setServiceType("tour");
        }
    }, [mode, requestedQuoteType, preferredTourSlug]);

    useEffect(() => {
        if (mode !== "quote") return;
        if (!preferredTourSlug || tourOptions.length === 0) return;

        const matched = tourOptions.find((tour) => tour.slug === preferredTourSlug);
        if (matched) {
            setSelectedTourSlug(matched.slug);
            clearErr("tourDestination");
        }
    }, [mode, preferredTourSlug, tourOptions]);

    useEffect(() => {
        if (!pickupPoint || !dropoffPoint || mode !== "quote") {
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
    }, [pickupPoint, dropoffPoint, mode]);

    // Auto-reset form after successful submission
    useEffect(() => {
        if (!success) return;

        const timer = window.setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    // Reset form
                    setSuccess(false);
                    setSubmitted(false);
                    setPickup("");
                    setDropoff("");
                    setPickupPoint(null);
                    setDropoffPoint(null);
                    setDate(undefined);
                    setPassengers("");
                    setTransferOption("");
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
                    setServiceType(initialServiceType);
                    setRouteMetrics(null);
                    setErrors({});
                    setCountdown(5);
                    return 5;
                }
                return prev - 1;
            });
        }, 1000);

        return () => window.clearInterval(timer);
    }, [success, initialServiceType]);

    const clearErr = (key: string) => {
        if (submitted) setErrors((p) => ({ ...p, [key]: "" }));
    };

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

    const validate = () => {
        const e: Record<string, string> = {};
        if (mode === "booking") {
            if (!from.trim()) e.from = "Origin city is required";
            if (!to.trim()) e.to = "Destination city is required";
            if (!departure) e.departure = "Select a departure date";
        } else {
            if (serviceType === "tour") {
                if (!selectedTourSlug.trim()) e.tourDestination = "Tour selection is required";
            } else {
                if (!pickup.trim()) e.pickup = "Pickup location is required";
                if (!dropoff.trim()) e.dropoff = "Drop-off location is required";
            }

            if (serviceType === "transfer" && !transferOption.trim()) {
                e.transferOption = "Transfer service is required";
            }

            if (serviceType === "transfer" && !pickupTime.trim()) {
                e.pickupTime = "Pickup time is required";
            }

            if (serviceType === "transfer" && transferTripType === "round-trip") {
                if (!departureDate) e.departureDate = "Departure date is required";
                if (!departureTime.trim()) e.departureTime = "Departure time is required";
            }

            if (!date) e.date = "Please select a date";
            if (!passengers || parseInt(passengers) < 1) e.passengers = "At least 1 passenger";
            if (!fullName.trim()) e.name = "Full name is required";
            if (!email.trim()) {
                e.email = "Email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                e.email = "Enter a valid email address";
            }
            if (mobile.trim() && !/^[\d\s\+\-\(\)]{7,}$/.test(mobile)) {
                e.mobile = "Enter a valid mobile number";
            }
        }
        return e;
    };

    const handleSubmit = async () => {
        setSubmitted(true);
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length > 0) return;

        setSubmitting(true);
        setApiError(null);
        try {
            let resolvedPickup = pickupPoint;
            let resolvedDropoff = dropoffPoint;

            if (mode === "quote" && serviceType !== "tour") {
                try {
                    if (!resolvedPickup && pickup.trim()) {
                        resolvedPickup = await geocodeFirstGtaLocation(pickup);
                    }
                    if (!resolvedDropoff && dropoff.trim()) {
                        resolvedDropoff = await geocodeFirstGtaLocation(dropoff);
                    }
                } catch {
                    // Keep the quote submit resilient if location lookup is unavailable.
                    resolvedPickup = resolvedPickup ?? null;
                    resolvedDropoff = resolvedDropoff ?? null;
                }
            }

            let route: RouteMetrics | null = null;
            if (mode === "quote" && serviceType !== "tour" && resolvedPickup && resolvedDropoff) {
                try {
                    route = await getDrivingRouteMetrics(resolvedPickup, resolvedDropoff);
                } catch {
                    route = null;
                }
            }

            const contextualDetails = [
                quoteContext,
                serviceType === "transfer" && transferOption ? `Transfer service: ${transferOption}` : null,
                serviceType === "transfer" ? `Trip type: ${transferTripType === "round-trip" ? "Round Trip" : "One Way"}` : null,
                serviceType === "transfer" ? `Use vehicle at destination: ${useVehicleAtDestination === "yes" ? "Yes" : "No"}` : null,
                serviceType === "transfer" && pickupTime ? `Pickup time: ${pickupTime}` : null,
                serviceType === "transfer" && departureDate ? `Departure date: ${departureDate.toISOString().split("T")[0]}` : null,
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
                trip_date: date ? date.toISOString().split("T")[0] : undefined,
                passengers: passengers ? parseInt(passengers) : undefined,
                pickup_time: serviceType === "transfer" ? pickupTime : undefined,
                departure_date: serviceType === "transfer" ? departureDate?.toISOString().split("T")[0] : undefined,
                departure_time: serviceType === "transfer" ? departureTime : undefined,
                transfer_option: serviceType === "transfer" ? transferOption : undefined,
                pickup_lat: resolvedPickup?.lat,
                pickup_lng: resolvedPickup?.lon,
                dropoff_lat: resolvedDropoff?.lat,
                dropoff_lng: resolvedDropoff?.lon,
                distance_km: route?.distanceKm,
                duration_minutes: route?.durationMinutes,
            });
            setSuccess(true);
        } catch {
            setApiError("Something went wrong. Please try again or call us directly.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            className={cn(
                "bg-white rounded-2xl p-6 w-full",
                variant === "hero" ? "shadow-2xl" : "shadow-lg border border-gray-100"
            )}
        >
            {/* ── Tabs ── */}
            {mode === "booking" ? (
                <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
                    {(["inter-city", "inter-province"] as TripType[]).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTripType(t)}
                            className={cn(
                                "flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200",
                                tripType === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            {t === "inter-city" ? "Inter-City" : "Inter-Province"}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
                    {(["charter", "transfer", "tour"] as ServiceType[]).map((t) => (
                        <button
                            key={t}
                            onClick={() => setServiceType(t)}
                            className={cn(
                                "flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200 capitalize",
                                serviceType === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>
            )}

            <div className="space-y-4">
                {mode === "booking" ? (
                    <>
                        {/* From */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">From</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                <Input
                                    value={from}
                                    onChange={(e) => { setFrom(e.target.value); clearErr("from"); }}
                                    placeholder="Select origin city"
                                    className={cn("pl-9 h-11 border-gray-200 rounded-xl bg-gray-50/80", errors.from && "border-red-400")}
                                />
                            </div>
                            <FieldError msg={errors.from} />
                        </div>

                        {/* To */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Where to</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                <Input
                                    value={to}
                                    onChange={(e) => { setTo(e.target.value); clearErr("to"); }}
                                    placeholder="Select destination city"
                                    className={cn("pl-9 h-11 border-gray-200 rounded-xl bg-gray-50/80", errors.to && "border-red-400")}
                                />
                            </div>
                            <FieldError msg={errors.to} />
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Departure</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <DateButton date={departure} placeholder="Set date" error={errors.departure} />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <CalendarPicker
                                            mode="single"
                                            selected={departure}
                                            onSelect={(d) => { setDeparture(d); clearErr("departure"); }}
                                            disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FieldError msg={errors.departure} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Return</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <DateButton date={returnDate} placeholder="Set date" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <CalendarPicker
                                            mode="single"
                                            selected={returnDate}
                                            onSelect={setReturnDate}
                                            disabled={(d) => departure ? d < departure : d < new Date(new Date().setHours(0, 0, 0, 0))}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {serviceType === "transfer" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Trip Type</label>
                                    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50/80 px-3 py-2.5">
                                        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                            <input
                                                type="radio"
                                                name="transferTripType"
                                                checked={transferTripType === "round-trip"}
                                                onChange={() => setTransferTripType("round-trip")}
                                            />
                                            Round Trip
                                        </label>
                                        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                            <input
                                                type="radio"
                                                name="transferTripType"
                                                checked={transferTripType === "one-way"}
                                                onChange={() => {
                                                    setTransferTripType("one-way");
                                                    setDepartureDate(undefined);
                                                    setDepartureTime("");
                                                    clearErr("departureDate");
                                                    clearErr("departureTime");
                                                }}
                                            />
                                            One Way
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Do you plan to use the vehicle at the destination?</label>
                                    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50/80 px-3 py-2.5">
                                        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                            <input
                                                type="radio"
                                                name="useVehicleAtDestination"
                                                checked={useVehicleAtDestination === "yes"}
                                                onChange={() => setUseVehicleAtDestination("yes")}
                                            />
                                            Yes
                                        </label>
                                        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                            <input
                                                type="radio"
                                                name="useVehicleAtDestination"
                                                checked={useVehicleAtDestination === "no"}
                                                onChange={() => setUseVehicleAtDestination("no")}
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Service</label>
                                    <select
                                        value={transferOption}
                                        onChange={(e) => { setTransferOption(e.target.value); clearErr("transferOption"); }}
                                        className={cn("w-full h-11 rounded-xl border border-gray-200 bg-gray-50/80 px-3 text-sm", errors.transferOption && "border-red-400")}
                                    >
                                        <option value="">Select transfer service</option>
                                        {TRANSFER_OPTIONS.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                    <FieldError msg={errors.transferOption} />
                                </div>
                            </>
                        )}

                        {serviceType === "tour" ? (
                            <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-3 sm:p-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Tour</label>
                                <select
                                    value={selectedTourSlug}
                                    onChange={(e) => { setSelectedTourSlug(e.target.value); clearErr("tourDestination"); }}
                                    className={cn("w-full h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm", errors.tourDestination && "border-red-400")}
                                >
                                    <option value="">Select tour</option>
                                    {tourOptions.map((tour) => (
                                        <option key={tour.id} value={tour.slug}>{tour.title}</option>
                                    ))}
                                </select>

                                {tourOptions.length > 0 && (
                                    <div className="mt-3">
                                        <p className="mb-2 text-xs font-medium text-gray-500">Or choose visually</p>
                                        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pr-1">
                                            {tourOptions.map((tour) => {
                                                const tourImage = storageUrl(tour.featured_image);
                                                const isLocalBackendImage = Boolean(
                                                    tourImage && (tourImage.startsWith("http://localhost:") || tourImage.startsWith("http://127.0.0.1:")),
                                                );

                                                return (
                                                    <button
                                                        key={tour.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedTourSlug(tour.slug);
                                                            clearErr("tourDestination");
                                                        }}
                                                        className={cn(
                                                            "min-w-[158px] snap-start overflow-hidden rounded-2xl border bg-white text-left transition-all",
                                                            selectedTourSlug === tour.slug
                                                                ? "border-blue-500 ring-2 ring-blue-100 shadow-sm"
                                                                : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
                                                        )}
                                                        aria-label={`Select ${tour.title}`}
                                                    >
                                                        <div className="relative h-24 w-full bg-slate-100">
                                                            {tourImage ? (
                                                                <Image
                                                                    src={tourImage}
                                                                    alt={tour.title}
                                                                    fill
                                                                    unoptimized={isLocalBackendImage}
                                                                    className="object-cover"
                                                                />
                                                            ) : null}
                                                        </div>
                                                        <p className="h-[2.6rem] overflow-hidden px-3 py-2 text-xs font-medium leading-snug text-slate-700 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                                                            {tour.title}
                                                        </p>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-1">
                                    <FieldError msg={errors.tourDestination} />
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Pickup */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Pickup</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <Input
                                            value={pickup}
                                            onChange={(e) => {
                                                setPickup(e.target.value);
                                                setPickupPoint(null);
                                                clearErr("pickup");
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
                                            placeholder="Enter pickup location"
                                            className={cn("pl-9 h-11 border-gray-200 rounded-xl bg-gray-50/80", errors.pickup && "border-red-400")}
                                        />
                                        {pickupSuggestions.length > 0 && (
                                            <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                                                {pickupSuggestions.map((s, index) => (
                                                    <button
                                                        key={`${s.lat}-${s.lon}-${s.label}`}
                                                        type="button"
                                                        onClick={() => selectPickupSuggestion(s)}
                                                        className={cn(
                                                            "block w-full border-b border-gray-100 px-3 py-2 text-left text-xs text-gray-700 hover:bg-blue-50 last:border-b-0",
                                                            index === pickupActiveIndex && "bg-blue-50 text-blue-700"
                                                        )}
                                                    >
                                                        {s.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <FieldError msg={errors.pickup} />
                                </div>

                                {/* Drop-off */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{serviceType === "transfer" ? "Destination" : "Drop-off"}</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <Input
                                            value={dropoff}
                                            onChange={(e) => {
                                                setDropoff(e.target.value);
                                                setDropoffPoint(null);
                                                clearErr("dropoff");
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
                                            placeholder={serviceType === "transfer" ? "Enter destination location" : "Enter drop-off location"}
                                            className={cn("pl-9 h-11 border-gray-200 rounded-xl bg-gray-50/80", errors.dropoff && "border-red-400")}
                                        />
                                        {dropoffSuggestions.length > 0 && (
                                            <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                                                {dropoffSuggestions.map((s, index) => (
                                                    <button
                                                        key={`${s.lat}-${s.lon}-${s.label}`}
                                                        type="button"
                                                        onClick={() => selectDropoffSuggestion(s)}
                                                        className={cn(
                                                            "block w-full border-b border-gray-100 px-3 py-2 text-left text-xs text-gray-700 hover:bg-blue-50 last:border-b-0",
                                                            index === dropoffActiveIndex && "bg-blue-50 text-blue-700"
                                                        )}
                                                    >
                                                        {s.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <FieldError msg={errors.dropoff} />
                                </div>
                            </>
                        )}

                        {/* Date + Passengers */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">{serviceType === "transfer" ? "Pickup Date" : "Date"}</label>
                                {serviceType === "transfer" ? (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <DateButton date={date} placeholder="Select pickup date" error={errors.date} />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <CalendarPicker
                                                mode="single"
                                                selected={date}
                                                onSelect={(d) => { setDate(d); clearErr("date"); }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                ) : (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <DateButton date={date} placeholder="Select date" error={errors.date} />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <CalendarPicker
                                                mode="single"
                                                selected={date}
                                                onSelect={(d) => { setDate(d); clearErr("date"); }}
                                                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                                <FieldError msg={errors.date} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">{serviceType === "transfer" ? "Pickup Time" : "Passengers"}</label>
                                {serviceType === "transfer" ? (
                                    <Input
                                        type="time"
                                        value={pickupTime}
                                        onChange={(e) => { setPickupTime(e.target.value); clearErr("pickupTime"); }}
                                        className={cn("h-11 border-gray-200 rounded-xl bg-gray-50/80 text-sm", errors.pickupTime && "border-red-400")}
                                    />
                                ) : (
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <Input
                                            type="number"
                                            min={1}
                                            value={passengers}
                                            onChange={(e) => { setPassengers(e.target.value); clearErr("passengers"); }}
                                            placeholder="e.g. 20"
                                            className={cn("pl-9 h-11 border-gray-200 rounded-xl bg-gray-50/80 text-sm", errors.passengers && "border-red-400")}
                                        />
                                    </div>
                                )}
                                <FieldError msg={serviceType === "transfer" ? errors.pickupTime : errors.passengers} />
                            </div>
                        </div>

                        {serviceType === "transfer" && transferTripType === "round-trip" && (
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Departure Date</label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <DateButton date={departureDate} placeholder="Select departure date" error={errors.departureDate} />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <CalendarPicker
                                                mode="single"
                                                selected={departureDate}
                                                onSelect={(d) => { setDepartureDate(d); clearErr("departureDate"); }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FieldError msg={errors.departureDate} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Departure Time</label>
                                    <Input
                                        type="time"
                                        value={departureTime}
                                        onChange={(e) => { setDepartureTime(e.target.value); clearErr("departureTime"); }}
                                        className={cn("h-11 border-gray-200 rounded-xl bg-gray-50/80", errors.departureTime && "border-red-400")}
                                    />
                                    <FieldError msg={errors.departureTime} />
                                </div>
                            </div>
                        )}

                        {serviceType === "transfer" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">No. of Passengers</label>
                                <div className="relative">
                                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <Input
                                        type="number"
                                        min={1}
                                        value={passengers}
                                        onChange={(e) => { setPassengers(e.target.value); clearErr("passengers"); }}
                                        placeholder="Passengers"
                                        className={cn("pl-9 h-11 border-gray-200 rounded-xl bg-gray-50/80 text-sm", errors.passengers && "border-red-400")}
                                    />
                                </div>
                                <FieldError msg={errors.passengers} />
                            </div>
                        )}

                        {/* Contact details */}
                        <div>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">User name</label>
                                    <div className="relative">
                                        <Input
                                            value={fullName}
                                            onChange={(e) => { setFullName(e.target.value); clearErr("name"); }}
                                            placeholder="Your full name"
                                            className={cn("h-11 border-gray-200 rounded-xl bg-gray-50/80", errors.name && "border-red-400")}
                                        />
                                    </div>
                                    <FieldError msg={errors.name} />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value); clearErr("email"); }}
                                            placeholder="you@example.com"
                                            className={cn("pl-9 h-11 border-gray-200 rounded-xl bg-gray-50/80", errors.email && "border-red-400")}
                                        />
                                    </div>
                                    <FieldError msg={errors.email} />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Mobile number <span className="text-gray-400">(optional)</span></label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <Input
                                            type="tel"
                                            value={mobile}
                                            onChange={(e) => { setMobile(e.target.value); clearErr("mobile"); }}
                                            placeholder="+1 (xxx) xxx-xxxx"
                                            className={cn("pl-9 h-11 border-gray-200 rounded-xl bg-gray-50/80", errors.mobile && "border-red-400")}
                                        />
                                    </div>
                                    <FieldError msg={errors.mobile} />
                                </div>
                                {serviceType === "tour" && (
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Note <span className="text-gray-400">(optional)</span></label>
                                        <textarea
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            placeholder="Any extra details for your destination quote"
                                            className="w-full min-h-24 rounded-xl border border-gray-200 bg-gray-50/80 p-3 text-sm outline-none focus:border-blue-500"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* CTA */}
                {success ? (
                    <div className="w-full h-14 bg-green-50 border border-green-200 text-green-700 font-semibold text-sm rounded-2xl flex items-center justify-center gap-3">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>Sent! We&apos;ll be in touch shortly.</span>
                        <span className="ml-auto text-xs font-bold bg-green-200 text-green-800 px-2 py-1 rounded-lg">{countdown}s</span>
                    </div>
                ) : (
                    <>
                        {apiError && (
                            <p className="text-red-500 text-xs flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />{apiError}
                            </p>
                        )}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="w-full h-14 bg-blue-700 hover:bg-blue-800 disabled:opacity-70 text-white font-semibold text-sm rounded-full flex items-center justify-between pl-6 pr-1.5 transition-colors mt-1"
                        >
                            <span>{submitting ? "Sending…" : ctaLabel}</span>
                            <div
                                className="bg-white rounded-full flex items-center justify-center shrink-0 shadow-md"
                                style={{ width: "44px", height: "44px" }}
                            >
                                {submitting
                                    ? <Loader2 className="w-4 h-4 text-blue-700 animate-spin" />
                                    : <ArrowUpRight className="w-4 h-4 text-blue-700" />}
                            </div>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
