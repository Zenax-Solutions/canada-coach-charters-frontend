import type { Metadata } from "next";
import { getPageSeo } from "@/lib/page-seo";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
    ArrowRight,
    BatteryCharging,
    Briefcase,
    Bus,
    CheckCircle2,
    GraduationCap,
    HeartHandshake,
    Luggage,
    Mail,
    MapPin,
    Phone,
    Plane,
    ShieldCheck,
    Sparkles,
    Thermometer,
    Users,
    Wifi,
} from "lucide-react";

const aboutKeywords = [
    "charter bus rental Toronto",
    "coach bus rental GTA",
    "bus charter Ontario",
    "group transportation Toronto",
    "school bus charter Toronto",
    "corporate bus rental Toronto",
    "airport transfer bus Toronto",
    "Niagara Falls bus tour",
    "private bus rental Toronto",
    "Canada coach charter services",
];

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getPageSeo("about");
    return {
        title: {
            absolute: seo?.meta_title || "About Canada Coach Charters | Charter Bus Rentals in Toronto & GTA",
        },
        description:
            seo?.meta_description ||
            "Canada Coach Charters provides safe and reliable charter bus rentals in Toronto, the GTA, and across Ontario for corporate travel, school trips, airport transfers, tours, weddings, and group events.",
        keywords: seo?.keywords ? seo.keywords.split(",").map((k) => k.trim()) : aboutKeywords,
    };
}

const services = [
    "Corporate transportation",
    "School trips",
    "Airport transfers",
    "Wedding transportation",
    "Sports team travel",
    "Private group transportation",
    "Sightseeing tours",
    "Niagara Falls and Toronto tours",
    "Long-distance travel",
    "Event transportation",
];

const whyChoose = [
    { icon: ShieldCheck, title: "Professional drivers", text: "Licensed, experienced, and committed to safe travel." },
    { icon: Bus, title: "Well-maintained vehicles", text: "Modern fleet prepared for reliable group trips." },
    { icon: Sparkles, title: "Flexible travel options", text: "From airport pickups to multi-day charter journeys." },
    { icon: MapPin, title: "Wide coverage", text: "Toronto, GTA, Ontario, and long-distance Canada travel." },
    { icon: Users, title: "Personalized support", text: "Dedicated planning support for every group and itinerary." },
    { icon: CheckCircle2, title: "Reliable scheduling", text: "Dependable timing from pickup to final drop-off." },
];

const serviceAreas = [
    "Toronto",
    "Mississauga",
    "Brampton",
    "Vaughan",
    "Markham",
    "Richmond Hill",
    "Scarborough",
    "North York",
    "Etobicoke",
    "Hamilton",
    "Niagara Falls",
    "Other Ontario destinations",
];

const fleetFeatures = [
    { icon: Wifi, label: "Wi-Fi" },
    { icon: BatteryCharging, label: "USB charging" },
    { icon: Thermometer, label: "Climate control" },
    { icon: Luggage, label: "Luggage storage" },
    { icon: CheckCircle2, label: "Reclining seats" },
    { icon: CheckCircle2, label: "Onboard washrooms (select coaches)" },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-100 p-1 sm:p-4">
            <div className="relative overflow-hidden rounded-3xl">
                <Header />

                <section className="relative px-2 pb-24 pt-36 sm:px-8 lg:px-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/page-header/gallery-3.webp')" }}
                    />
                    <div className="absolute inset-0 bg-slate-950/65" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(251,191,36,0.2),transparent_30%)]" />

                    <div className="relative mx-auto max-w-7xl">
                        <nav className="mb-8 flex items-center gap-2 text-sm text-blue-100/90">
                            <Link href="/" className="transition-colors hover:text-white">
                                Home
                            </Link>
                            <ArrowRight className="h-3.5 w-3.5" />
                            <span className="font-semibold text-white">About Canada Coach Charters</span>
                        </nav>

                        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                            <div className="max-w-4xl">
                                <span className="mb-5 inline-flex rounded-full border border-blue-300/45 bg-blue-500/30 px-4 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur">
                                    Trusted Charter Bus Rentals in Toronto, the GTA, and Across Ontario
                                </span>
                                <h1 className="mb-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                                    About Canada Coach Charters
                                </h1>
                                <p className="max-w-3xl text-base leading-relaxed text-slate-100 sm:text-lg">
                                    Canada Coach Charters is a professional charter company serving Toronto, the Greater Toronto Area, and destinations across Ontario and Canada.
                                    We specialize in safe, comfortable, reliable group transportation for businesses, schools, sports teams, tour groups, weddings, private events, and airport transfers.
                                </p>
                            </div>

                            <aside className="rounded-2xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-md">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-blue-100">Book Support</p>
                                <p className="mb-4 text-sm text-blue-50">Planning a trip now? Reach our team directly for quick coordination.</p>
                                <p className="flex items-center gap-2 text-sm font-medium"><Phone className="h-4 w-4" /> +1 (647) 846-4140</p>
                                <p className="mt-2 flex items-center gap-2 text-sm font-medium"><Mail className="h-4 w-4" /> info@canadacoachcharters.ca</p>
                            </aside>
                        </div>
                    </div>
                </section>
            </div>

            <section className="bg-white px-2 py-14 sm:px-8 lg:px-10 lg:py-16">
                <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-12">
                    <article className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-7 shadow-sm sm:p-9 lg:col-span-8">
                        <h2 className="mb-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">Trusted Charter Bus Rentals in Toronto, the GTA, and Across Ontario</h2>
                        <h3 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">Professional Group Transportation You Can Rely On</h3>
                        <p className="mb-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                            With years of experience, our team knows passengers value punctuality, clean vehicles, professional drivers, and smooth journeys.
                            Whether you need a charter bus in Toronto, a coach for a corporate event, a school trip vehicle, or group transport to Niagara Falls,
                            Canada Coach Charters is ready to help you plan confidently.
                        </p>
                        <p className="mb-6 text-sm leading-relaxed text-slate-600 sm:text-base">
                            We provide tailored transportation for groups of all sizes. Our team works with each client to understand the schedule,
                            passenger needs, routes, pickups, and destinations.
                        </p>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {services.map((item) => (
                                <div key={item} className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-2.5 text-sm font-medium text-slate-700">
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-700" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </article>

                    <aside className="rounded-3xl border border-slate-200 bg-slate-900 p-7 text-white shadow-sm sm:p-9 lg:col-span-4">
                        <h3 className="mb-4 text-2xl font-extrabold">Why Choose Canada Coach Charters?</h3>
                        <p className="mb-6 text-sm leading-relaxed text-slate-200">
                            We make group travel simple and stress-free with reliable scheduling, personalized service, and professional support.
                        </p>
                        <ul className="space-y-3 text-sm text-slate-100">
                            <li className="flex items-start gap-2"><Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" /> Corporate and private trip support</li>
                            <li className="flex items-start gap-2"><GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" /> School and educational transportation</li>
                            <li className="flex items-start gap-2"><Plane className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" /> Airport transfer coordination</li>
                            <li className="flex items-start gap-2"><HeartHandshake className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" /> Wedding and event transportation</li>
                        </ul>
                    </aside>
                </div>
            </section>

            <section className="px-2 py-14 sm:px-8 lg:px-10 lg:py-16">
                <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="relative h-48">
                            <Image src="/about-us/1.jpg" alt="Canada Coach Charters luxury coach bus in Toronto" fill className="object-cover" />
                        </div>
                        <p className="px-4 py-3 text-sm font-medium text-slate-700">Charter bus rental service in the Greater Toronto Area</p>
                    </article>
                    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="relative h-48">
                            <Image src="/about-us/2.jpg" alt="Professional group transportation in Ontario" fill className="object-cover" />
                        </div>
                        <p className="px-4 py-3 text-sm font-medium text-slate-700">Coach bus for corporate travel and private events</p>
                    </article>
                    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="relative h-48">
                            <Image src="/about-us/3.jpg" alt="Coach bus for corporate travel and private events" fill className="object-cover" />
                        </div>
                        <p className="px-4 py-3 text-sm font-medium text-slate-700">Canada Coach Charters bus fleet in Richmond Hill, ON</p>
                    </article>
                    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="relative h-48">
                            <Image src="/about-us/4.jpg" alt="Canada Coach Charters bus fleet in Richmond Hill, ON" fill className="object-cover" />
                        </div>
                        <p className="px-4 py-3 text-sm font-medium text-slate-700">Private bus rental Toronto with comfortable modern coaches</p>
                    </article>
                </div>
            </section>

            <section className="bg-white px-2 py-14 sm:px-8 lg:px-10 lg:py-16">
                <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 p-7 shadow-sm sm:p-9">
                    <h2 className="mb-5 text-3xl font-extrabold text-slate-900 sm:text-4xl">Why Groups Trust Our Service</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {whyChoose.map((item) => (
                            <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <item.icon className="mb-3 h-5 w-5 text-blue-700" />
                                <h3 className="mb-1 text-base font-bold text-slate-900">{item.title}</h3>
                                <p className="text-sm text-slate-600">{item.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-2 py-14 sm:px-8 lg:px-10 lg:py-16">
                <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-12">
                    <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9 lg:col-span-7">
                        <h2 className="mb-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">Our Fleet</h2>
                        <p className="mb-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                            Our fleet includes modern coaches, mini coaches, shuttle buses, and executive options for group comfort.
                            Whether traveling locally in Toronto or across Ontario, we help you choose the right vehicle for your group and itinerary.
                        </p>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {fleetFeatures.map((feature) => (
                                <div key={feature.label} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                                    <feature.icon className="h-4 w-4 shrink-0 text-blue-700" />
                                    {feature.label}
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9 lg:col-span-5">
                        <h2 className="mb-4 flex items-center gap-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                                <MapPin className="h-5 w-5" />
                            </span>
                            Serving Toronto, the GTA, Ontario, and Beyond
                        </h2>
                        <p className="mb-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                            We serve Toronto and nearby communities including Mississauga, Brampton, Vaughan, Markham, Richmond Hill,
                            Scarborough, North York, Etobicoke, Hamilton, Niagara Falls, and other Ontario destinations.
                        </p>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {serviceAreas.map((area) => (
                                <div key={area} className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50/70 px-3 py-2 text-left text-xs font-semibold text-slate-700 sm:text-sm">
                                    <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-700" />
                                    <span>{area}</span>
                                </div>
                            ))}
                        </div>
                    </article>
                </div>
            </section>

            <section className="bg-white px-2 py-14 sm:px-8 lg:px-10 lg:py-16">
                <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
                    <article className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white">
                        <h3 className="mb-3 text-2xl font-extrabold">Our Mission</h3>
                        <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
                            Deliver safe, comfortable, affordable charter services for groups in Toronto, the GTA, Ontario, and Canada.
                            Make every trip easy, enjoyable, and reliable.
                        </p>
                    </article>
                    <article className="rounded-2xl border border-slate-200 bg-blue-700 p-6 text-white">
                        <h3 className="mb-3 text-2xl font-extrabold">Our Vision</h3>
                        <p className="text-sm leading-relaxed text-blue-100 sm:text-base">
                            Be a trusted charter company in Toronto and Ontario by delivering excellent customer service,
                            professional solutions, and dependable travel for every passenger.
                        </p>
                    </article>
                </div>
            </section>

            <section className="px-2 pb-16 pt-14 sm:px-8 lg:px-10 lg:pb-24 lg:pt-16">
                <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 p-8 text-white shadow-sm sm:p-10">
                    <h2 className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl">Book Your Charter Bus Today</h2>
                    <p className="mb-6 max-w-3xl text-sm text-blue-100 sm:text-base">
                        Planning group transportation? Canada Coach Charters is ready to help with reliable rentals, coach transport,
                        airport transfers, private tours, school trips, corporate travel, and event transportation.
                    </p>
                    <div className="mb-6 grid gap-2 text-sm text-blue-100 sm:text-base">
                        <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +1 (647) 846-4140</p>
                        <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@canadacoachcharters.ca</p>
                        <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 95 Mural St, Richmond Hill, ON L4B 3G2, Canada</p>
                    </div>
                    <a
                        href="/contact#quick-quote"
                        className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-800 transition-colors hover:bg-blue-50"
                    >
                        Request a Quote
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
