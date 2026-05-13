import { Clock, ShieldCheck, MapPin } from "lucide-react";
import BookingCard from "@/components/BookingCard";

const perks = [
    { icon: Clock, text: "Response within 2 hours" },
    { icon: ShieldCheck, text: "Licensed & fully insured" },
    { icon: MapPin, text: "Serving all of Canada" },
];

export default function QuoteSection() {
    return (
        <section id="quick-quote" className="relative overflow-hidden rounded-[2rem] py-16 lg:py-24 px-2 sm:px-8 lg:px-10">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
            >
                <source src="/quick.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-slate-900/28" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-slate-900/24 to-slate-900/8" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-8 lg:p-10">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-center">

                        {/* Left — heading & context */}
                        <div className="flex-1">
                            <span className="inline-block text-xs font-semibold text-blue-100 border border-blue-300/40 bg-blue-500/25 rounded-full px-4 py-1.5 mb-5">
                                Quick Quote
                            </span>

                            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                                Plan Your Trip<br />in Minutes
                            </h2>

                            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-md mb-8">
                                Tell us where you need to go and we&apos;ll get back to you with a
                                personalised quote — no obligation, no hassle.
                            </p>

                            <ul className="space-y-3">
                                {perks.map((perk) => (
                                    <li key={perk.text} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100/90 flex items-center justify-center shrink-0">
                                            <perk.icon className="w-4 h-4 text-blue-700" />
                                        </div>
                                        <span className="text-sm font-medium text-blue-50">{perk.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right — quote form */}
                        <div className="w-full lg:w-[440px] shrink-0">
                            <BookingCard mode="quote" />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
