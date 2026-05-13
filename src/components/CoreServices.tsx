import {
    BusFront,
    Plane,
    Map,
    BriefcaseBusiness,
    Heart,
    GraduationCap,
    Trophy,
    Users,
    PlaneTakeoff,
    Hotel,
    Building2,
    Mountain,
    Wine,
    Landmark,
    Compass,
    ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
    {
        title: "Charter Bus Services",
        description: "Flexible coach booking for organized group transportation.",
        icon: BusFront,
        accent: "from-blue-600 to-sky-500",
        image: "/services/atlanta-charter-bus-rentals-1b.jpg",
        highlights: [
            { label: "Corporate Events", icon: BriefcaseBusiness },
            { label: "Weddings", icon: Heart },
            { label: "School Trips", icon: GraduationCap },
            { label: "Sports Teams", icon: Trophy },
            { label: "Private Groups", icon: Users },
        ],
    },
    {
        title: "Airport Transfers",
        description: "On-time transfer coordination for every group size.",
        icon: Plane,
        accent: "from-indigo-600 to-blue-500",
        image: "/services/pexels-lensloji-264847388-31989303.jpg",
        highlights: [
            { label: "Airport Pickups", icon: PlaneTakeoff },
            { label: "Hotel Transfers", icon: Hotel },
            { label: "Corporate Logistics", icon: Building2 },
        ],
    },
    {
        title: "Tours & Day Trips",
        description: "Curated and custom trips across Ontario destinations.",
        icon: Map,
        accent: "from-cyan-600 to-blue-500",
        image: "/services/pexels-receptcelik-7595448.jpg",
        highlights: [
            { label: "Niagara Falls", icon: Mountain },
            { label: "Wine Tours", icon: Wine },
            { label: "City Tours", icon: Landmark },
            { label: "Custom Sightseeing", icon: Compass },
        ],
    },
];

export default function CoreServices() {
    return (
        <section className="bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-100 px-2 py-16 sm:px-8 lg:px-10 lg:py-20">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex flex-col gap-4">
                        <span className="inline-flex w-fit items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-blue-700">
                            Our Services
                        </span>
                        <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                            We are committed to delivering exceptional services
                        </h2>
                        <p className="max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">
                            Welcome to Canada Coach Charters, where we are committed to delivering exceptional services to meet your unique needs. We provide Wedding, Corporate Travel, School rental, Private travel and Airport shuttle services at very affordable cost.
                        </p>
                    </div>

                    <Link
                        href="/services"
                        className="inline-flex w-fit items-center justify-between gap-3 pl-5 pr-2 py-2 rounded-full text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 transition-colors"
                    >
                        <span>View More</span>
                        <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                            <ArrowRight className="h-4 w-4 text-blue-700 -rotate-45" />
                        </span>
                    </Link>
                </div>

                <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {services.map((service) => {
                        const Icon = service.icon;

                        return (
                            <article
                                key={service.title}
                                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 p-6 shadow-[0_20px_45px_-32px_rgba(15,23,42,0.75)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_26px_52px_-28px_rgba(37,99,235,0.35)]"
                            >
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover brightness-125 contrast-110 saturate-110"
                                />
                                <div className="absolute inset-0 bg-slate-900/32" />
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/24 via-slate-900/36 to-slate-900/52" />

                                <div
                                    className={`relative z-10 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${service.accent} text-white shadow-lg shadow-blue-600/25`}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>

                                <h3 className="relative z-10 text-xl font-semibold text-white">{service.title}</h3>
                                <p className="relative z-10 mt-3 h-[3rem] text-sm leading-relaxed text-slate-100 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                                    {service.description}
                                </p>

                                {service.highlights && (
                                    <div className="relative z-10 mt-5 flex-1">
                                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-300">
                                            Best For
                                        </p>
                                        <ol className="space-y-2.5">
                                            {service.highlights.map((item, index) => {
                                                const ItemIcon = item.icon;
                                                const isLast = index === service.highlights.length - 1;

                                                return (
                                                    <li
                                                        key={item.label}
                                                        className="relative pl-8"
                                                    >
                                                        {!isLast && (
                                                            <span className="absolute left-[11px] top-7 h-[calc(100%-0.25rem)] border-l border-dashed border-blue-300/60" />
                                                        )}
                                                        <span className="absolute left-2 top-4 h-[8px] w-[8px] rounded-full bg-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.15)]" />

                                                        <div className="flex items-center justify-between rounded-xl border border-white/20 bg-white/8 px-3 py-2.5 backdrop-blur-[1px]">
                                                            <div className="inline-flex items-center gap-2.5">
                                                                <span className="text-[11px] font-semibold tracking-wide text-slate-300">
                                                                    {(index + 1).toString().padStart(2, "0")}
                                                                </span>
                                                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-blue-600">
                                                                    <ItemIcon className="h-3.5 w-3.5" />
                                                                </span>
                                                                <span className="text-xs font-medium leading-tight text-white sm:text-sm">
                                                                    {item.label}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ol>
                                    </div>
                                )}

                                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-300/25 blur-2xl transition-opacity duration-300 group-hover:opacity-90" />
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
