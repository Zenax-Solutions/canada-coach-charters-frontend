import { CheckCheck } from "lucide-react";
import Image from "next/image";

const reasons = [
    "On-time, every time (we plan properly, not rushed)",
    "Clean, comfortable vehicles",
    "Experienced local drivers",
    "Flexible group scheduling",
    "Transparent pricing (no surprises)",
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-[0_28px_56px_-36px_rgba(15,23,42,0.55)]">
                    <Image
                        src="https://images.pexels.com/photos/20849161/pexels-photo-20849161.jpeg"
                        alt="Modern coach bus"
                        fill
                        priority={false}
                        className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-slate-900/25" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(59,130,246,0.25),transparent_50%)]" />

                    <div className="relative z-10 max-w-3xl px-6 py-12 sm:px-10 lg:px-14 lg:py-16 text-white">
                        <span className="inline-flex w-fit items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-white/90 backdrop-blur-sm">
                            Why Choose Us
                        </span>

                        <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                            Why Groups Book With Us
                        </h2>

                        <ul className="mt-7 space-y-3.5">
                            {reasons.map((reason) => (
                                <li key={reason} className="flex items-start gap-3 text-base leading-relaxed text-white/95 sm:text-lg">
                                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
                                        <CheckCheck className="h-4 w-4 text-blue-200" />
                                    </span>
                                    <span>{reason}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
