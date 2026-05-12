"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviewsUrl =
    "https://www.google.com/search?q=canadacoachcharters.ca&sxsrf=ANbL-n5gqxKDkaftD2i0tkN-ggeoOFtYTw%3A1778549348584#lrd=0x882b2b5b6bf2f609:0xc3b67aa713230b4f,1,,,,";

const googleLogoSrc =
    "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png";

const verifiedReviews = [
    {
        id: 1,
        reviewer: "Alister Dejong",
        rating: 5,
        time: "2 years ago",
        quote:
            "Canada Coach Charters has been so easy and supportive to help our journeys. Safe and sound. Will use them again! Great experience and superb customer service.",
        hasVisibleQuote: true,
    },
    {
        id: 2,
        reviewer: "Devon Holdenbottle",
        rating: 5,
        time: "2 years ago",
        quote:
            "Canada Coach Charters surpassed my expectations with their exceptional service. From booking to arrival, the team was professional, the coach was immaculate, and the journey was seamless.",
        hasVisibleQuote: true,
    },
    {
        id: 3,
        reviewer: "Sue Talmey",
        rating: 5,
        time: "2 years ago",
        quote:
            "Million drove the bus that took 30 staff to a retreat. The bus was clean and comfortable, and Million was a great host and driver. I would definitely use Canada Coach Charters again.",
    },
    {
        id: 4,
        reviewer: "Champika Ranjan",
        rating: 5,
        time: "2 years ago",
        quote:
            "I just wanted to extend my thanks and let you know how impressed I was with your company and the service we received from our driver. We will definitely be using you in the near future. Thank you!",
    },
    {
        id: 5,
        reviewer: "Michelle Ghidotti",
        rating: 4,
        time: "2 years ago",
        quote:
            "I had a great experience with Canada Coach Charters. They made our trip to and from the airport easy.",
    },
];

const reviewSummary = {
    rating: 4.3,
    totalReviews: 12,
    source: "Public Reviews",
    location: "Richmond Hill, Ontario",
};

function Stars({ value }: { value: number }) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
                <Star
                    key={index}
                    className={`h-3.5 w-3.5 ${index < value ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
                />
            ))}
        </div>
    );
}

function ReviewDeckCard({
    index,
    isActive,
    reviewer,
    rating,
    time,
    quote,
}: {
    index: number;
    isActive: boolean;
    reviewer: string;
    rating: number;
    time: string;
    quote: string;
}) {
    const initials = reviewer
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0])
        .join("");

    return (
        <article
            className={`flex h-full flex-col rounded-[24px] border p-5 transition-all duration-500 ${isActive
                ? "border-blue-200 bg-blue-100 shadow-[0_26px_42px_-26px_rgba(29,78,216,0.35)]"
                : "border-slate-200 bg-slate-50 shadow-[0_18px_30px_-28px_rgba(15,23,42,0.25)]"
                }`}
            style={{
                transform: isActive
                    ? "translateY(-8px) rotate(-2deg)"
                    : index % 2 === 0
                        ? "rotate(1deg)"
                        : "rotate(-1deg)",
            }}
        >
            <div className="flex items-start gap-3">
                <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${isActive ? "bg-white text-blue-700" : "bg-slate-200 text-slate-700"
                        }`}
                >
                    {initials}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">{reviewer}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{time}</p>
                </div>
                <span
                    className={`ml-auto inline-flex items-center rounded-full px-2.5 py-1 ${isActive ? "bg-white" : "bg-slate-100"
                        }`}
                >
                    <img
                        src={googleLogoSrc}
                        alt="Google"
                        className="h-3.5 w-auto"
                        loading="lazy"
                    />
                </span>
            </div>

            <div className="mt-4">
                <Stars value={rating} />
            </div>

            <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{quote}</p>
        </article>
    );
}

export default function TestimonialsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isPaused || verifiedReviews.length <= 1) {
            return;
        }

        const intervalId = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % verifiedReviews.length);
        }, 3200);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [isPaused]);

    useEffect(() => {
        const container = trackRef.current;
        if (!container) {
            return;
        }

        const child = container.children[activeIndex] as HTMLElement | undefined;
        if (!child) {
            return;
        }

        const scrollLeft = child.offsetLeft - 8;
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }, [activeIndex]);

    return (
        <section className="overflow-x-hidden bg-white py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="overflow-x-hidden overflow-y-visible rounded-[36px] border border-slate-200 bg-blue-50 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.3)] sm:p-8 lg:p-10">
                    <div className="flex items-start justify-between gap-6">
                        <div className="max-w-3xl">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-blue-700">
                                    Testimonials
                                </span>
                                <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-1">
                                    <img
                                        src={googleLogoSrc}
                                        alt="Google"
                                        className="h-4 w-auto"
                                        loading="lazy"
                                    />
                                </span>
                            </div>

                            <h2 className="mt-5 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                                Real feedback from charter riders
                            </h2>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                                {reviewSummary.rating} rating from {reviewSummary.totalReviews} public reviews in {reviewSummary.location}. Carousel autoplay is enabled and you can still move manually.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    setActiveIndex((current) =>
                                        current === 0 ? verifiedReviews.length - 1 : current - 1,
                                    )
                                }
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-700"
                                aria-label="Previous reviews"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    setActiveIndex((current) =>
                                        (current + 1) % verifiedReviews.length,
                                    )
                                }
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-700"
                                aria-label="Next reviews"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div
                        className="mt-8 overflow-visible pb-8 pt-4"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div
                            ref={trackRef}
                            className="flex gap-4 overflow-x-auto overflow-y-visible px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {verifiedReviews.map((review, index) => (
                                <div
                                    key={review.id}
                                    className="shrink-0"
                                    style={{ width: "clamp(230px, 25vw, 300px)" }}
                                >
                                    <div className="mb-2 flex items-center justify-between px-1">
                                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-300/50 text-[11px] font-bold text-slate-600">
                                            {String(review.id).padStart(2, "0")}
                                        </span>
                                        <ArrowUpRight className="h-4 w-4 text-slate-700" />
                                    </div>
                                    <ReviewDeckCard
                                        index={index}
                                        isActive={index === activeIndex}
                                        reviewer={review.reviewer}
                                        rating={review.rating}
                                        time={review.time}
                                        quote={review.quote}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            {verifiedReviews.map((review, index) => (
                                <button
                                    key={review.id}
                                    type="button"
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-2.5 rounded-full transition-all ${index === activeIndex
                                        ? "w-8 bg-blue-700"
                                        : "w-2.5 bg-blue-200"
                                        }`}
                                    aria-label={`Go to review ${index + 1}`}
                                />
                            ))}
                        </div>

                        <a
                            href={reviewsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-between gap-4 pl-6 pr-2 py-2.5 rounded-full bg-blue-700 hover:bg-blue-800 text-sm font-semibold text-white transition-colors"
                        >
                            View all reviews
                            <span className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0">
                                <ArrowUpRight className="h-5 w-5 text-blue-700" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
