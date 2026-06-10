import type { Metadata } from "next";
import { getPageSeo } from "@/lib/page-seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingCard from "@/components/BookingCard";
import Link from "next/link";
import {
    ArrowRight,
    Mail,
    MapPin,
    Phone,
    Clock3,
    Star,
    Bus,
    ShieldCheck,
    CalendarClock,
    CircleDollarSign,
    CheckCircle2,
    Users,
    Plane,
    Briefcase,
    Heart,
    Van,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter, FaTiktok } from "react-icons/fa6";

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getPageSeo("contact");
    return {
        title: seo?.meta_title || "Contact Us | Canada Coach Charters",
        description:
            seo?.meta_description || "Get in touch with Canada Coach Charters for quotes, bookings, and inquiries.",
        keywords: seo?.keywords || undefined,
    };
}

export default function ContactPage() {
    const serviceAreas = [
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
        "Niagara Falls",
        "Ottawa",
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
        {
            label: "TikTok",
            href: "https://www.tiktok.com/@canadacoachcharters0",
            icon: FaTiktok,
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-1 sm:p-4">
            <div className="relative rounded-3xl overflow-hidden">
                <Header />

                <section className="relative pt-36 pb-20 px-2 sm:px-8 lg:px-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/page-header/cr=t_0,w_100.webp')" }}
                    />
                    <div className="absolute inset-0 bg-black/55" />
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    />

                    <div className="relative max-w-7xl mx-auto">
                        <nav className="flex items-center gap-2 text-blue-200 text-sm mb-6">
                            <Link href="/" className="hover:text-white transition-colors">
                                Home
                            </Link>
                            <ArrowRight className="w-3.5 h-3.5" />
                            <span className="text-white font-medium">Contact Us</span>
                        </nav>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            <div>
                                <span className="inline-block text-xs font-semibold text-blue-200 border border-blue-500 bg-blue-600/50 rounded-full px-4 py-1.5 mb-5">
                                    Contact Information
                                </span>

                                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-3xl">
                                    Contact Canada Coach Charters
                                </h1>
                                <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-3xl mb-4">
                                    Reliable charter coach buses, airport transfers, tours, and group transportation services across Toronto, the GTA, and Ontario.
                                </p>
                                <p className="text-blue-100/95 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
                                    Whether you&apos;re planning a corporate event, wedding, airport transfer, school trip, sports team travel, or private tour, our team is here to help you organize smooth and dependable transportation for your group.
                                </p>

                                <div className="flex flex-wrap gap-3 mb-8">
                                    <a
                                        href="#quick-quote"
                                        className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
                                    >
                                        Get a Free Quote
                                    </a>
                                    <a
                                        href="tel:+16478464140"
                                        className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                                    >
                                        Call Now
                                    </a>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-blue-50">
                                    <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur px-4 py-3 flex items-center gap-2">
                                        <Star className="w-4 h-4 text-amber-300" />
                                        <a href="https://www.google.com/search?q=canada+coach+charters+reviews" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                                            Google Reviews
                                        </a>
                                    </div>
                                    <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur px-4 py-3 flex items-center gap-2">
                                        <Bus className="w-4 h-4 text-sky-200" />
                                        Modern &amp; Comfortable Fleet
                                    </div>
                                    <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur px-4 py-3 flex items-center gap-2">
                                        <Clock3 className="w-4 h-4 text-violet-200" />
                                        GTA-Based Company • Available 24/7
                                    </div>
                                </div>
                            </div>

                            <div id="quick-quote" className="w-full lg:max-w-[560px] lg:justify-self-end">
                                <BookingCard mode="quote" variant="hero" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                        <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-sm">
                            <span className="inline-block text-xs font-semibold text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 mb-5">
                                Get in Touch
                            </span>

                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
                                Contact Information
                            </h2>
                            <p className="text-gray-500 text-sm leading-relaxed mb-8">
                                We would love to hear from you for charter coach buses, airport transfers, and group travel planning.
                            </p>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                        <Phone className="w-4 h-4 text-blue-700" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Phone</p>
                                        <a href="tel:+16478464140" className="text-sm font-semibold text-gray-800 hover:text-blue-700 transition-colors">
                                            +1 (647) 846-4140
                                        </a>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                        <Mail className="w-4 h-4 text-blue-700" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Email</p>
                                        <a href="mailto:info@canadacoachcharters.ca" className="text-sm font-semibold text-gray-800 hover:text-blue-700 transition-colors break-all">
                                            info@canadacoachcharters.ca
                                        </a>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                        <MapPin className="w-4 h-4 text-blue-700" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Address</p>
                                        <p className="text-sm font-semibold text-gray-800">
                                            95 Mural St, Richmond Hill, ON L4B 3G2, Canada
                                        </p>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                        <Bus className="w-4 h-4 text-blue-700" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Service Area</p>
                                        <p className="text-sm font-semibold text-gray-800">
                                            Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill &amp; Across the GTA
                                        </p>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                        <Clock3 className="w-4 h-4 text-blue-700" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Office Hours</p>
                                        <p className="text-sm font-semibold text-gray-800">
                                            Available 24/7 for Bookings
                                        </p>
                                    </div>
                                </li>
                            </ul>

                            <div className="mt-7 pt-6 border-t border-slate-200">
                                <p className="text-xs text-gray-500 mb-3">Follow Us</p>
                                <div className="flex items-center gap-3">
                                    {socialLinks.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <a
                                                key={item.label}
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                                aria-label={item.label}
                                            >
                                                <Icon className="w-4 h-4" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-sm">
                            <span className="inline-block text-xs font-semibold text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 mb-5">
                                Visit Our Office
                            </span>

                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">Visit Our Office</h2>
                            <p className="text-gray-500 text-sm leading-relaxed mb-8">
                                Conveniently serving Toronto, Richmond Hill, and surrounding GTA cities with reliable group transportation services.
                            </p>

                            <div className="rounded-2xl overflow-hidden border border-slate-200 mb-6">
                                <iframe
                                    title="Canada Coach Charters Office Location"
                                    src="https://www.google.com/maps?q=95%20Mural%20St%2C%20Richmond%20Hill%2C%20ON%20L4B%203G2%2C%20Canada&output=embed"
                                    className="w-full h-72"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    allowFullScreen
                                />
                            </div>

                            <a
                                href="https://maps.google.com/?q=95+Mural+St,+Richmond+Hill,+ON+L4B+3G2,+Canada"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors"
                            >
                                Get Directions
                            </a>

                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">GTA-Based Company</div>
                                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">Professional Drivers</div>
                                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">Reliable Group Transportation</div>
                                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">Trusted Across Ontario</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-20 px-2 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">Why Choose Us</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="rounded-2xl bg-white border border-slate-200 p-5"><ShieldCheck className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold text-slate-900 mb-1">Professional Drivers</h3><p className="text-sm text-slate-600">Experienced, courteous, and safety-focused drivers.</p></div>
                        <div className="rounded-2xl bg-white border border-slate-200 p-5"><Bus className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold text-slate-900 mb-1">Modern Fleet</h3><p className="text-sm text-slate-600">Clean and comfortable vehicles for every type of group trip.</p></div>
                        <div className="rounded-2xl bg-white border border-slate-200 p-5"><CalendarClock className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold text-slate-900 mb-1">Flexible Scheduling</h3><p className="text-sm text-slate-600">Transportation solutions built around your itinerary.</p></div>
                        <div className="rounded-2xl bg-white border border-slate-200 p-5"><CircleDollarSign className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold text-slate-900 mb-1">Transparent Pricing</h3><p className="text-sm text-slate-600">Clear quotes with no unnecessary surprises.</p></div>
                        <div className="rounded-2xl bg-white border border-slate-200 p-5"><CheckCircle2 className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold text-slate-900 mb-1">Reliable Service</h3><p className="text-sm text-slate-600">On-time pickups and organized transportation logistics.</p></div>
                        <div className="rounded-2xl bg-white border border-slate-200 p-5"><Users className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold text-slate-900 mb-1">Group Transportation Specialists</h3><p className="text-sm text-slate-600">Experienced with corporate events, weddings, tours, and airport transfers.</p></div>
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-20 px-2 sm:px-8 lg:px-10 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">Transportation Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="rounded-2xl border border-slate-200 p-5"><Bus className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold mb-2">Charter Coaches</h3><p className="text-sm text-slate-600">Transportation for corporate events, weddings, schools, sports teams, and private groups.</p></div>
                        <div className="rounded-2xl border border-slate-200 p-5"><Plane className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold mb-2">Airport Transfers</h3><p className="text-sm text-slate-600">Group airport pickups, hotel transfers, and business travel coordination.</p></div>
                        <div className="rounded-2xl border border-slate-200 p-5"><MapPin className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold mb-2">Tours &amp; Day Trips</h3><p className="text-sm text-slate-600">Curated and custom transportation solutions across Ontario destinations.</p></div>
                        <div className="rounded-2xl border border-slate-200 p-5"><Briefcase className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold mb-2">Corporate Transportation</h3><p className="text-sm text-slate-600">Professional transportation for meetings, conferences, and executive travel.</p></div>
                        <div className="rounded-2xl border border-slate-200 p-5"><Heart className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold mb-2">Wedding Transportation</h3><p className="text-sm text-slate-600">Guest shuttles and coordinated transportation for weddings and events.</p></div>
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-20 px-2 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">Fleet Options for Every Group Size</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="rounded-2xl bg-white border border-slate-200 p-5"><Bus className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold mb-2">Mini Coaches</h3><p className="text-sm text-slate-600 mb-4">Ideal for airport transfers and smaller group transportation.</p><a href="#quick-quote" className="text-sm font-semibold text-blue-700 hover:text-blue-800">Request This Vehicle</a></div>
                        <div className="rounded-2xl bg-white border border-slate-200 p-5"><Bus className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold mb-2">Mid-Size Coaches</h3><p className="text-sm text-slate-600 mb-4">Comfortable transportation for events and regional travel.</p><a href="#quick-quote" className="text-sm font-semibold text-blue-700 hover:text-blue-800">Get Pricing</a></div>
                        <div className="rounded-2xl bg-white border border-slate-200 p-5"><Bus className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold mb-2">Full-Size Charter Coaches</h3><p className="text-sm text-slate-600 mb-4">Perfect for larger groups, tours, conferences, and long-distance travel.</p><a href="#quick-quote" className="text-sm font-semibold text-blue-700 hover:text-blue-800">Request This Vehicle</a></div>
                        <div className="rounded-2xl bg-white border border-slate-200 p-5"><Van className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold mb-2">Executive Vans &amp; SUVs</h3><p className="text-sm text-slate-600 mb-4">Private transportation for VIP and executive travel.</p><a href="#quick-quote" className="text-sm font-semibold text-blue-700 hover:text-blue-800">Get Pricing</a></div>
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-20 px-2 sm:px-8 lg:px-10 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">What Our Customers Say</h2>
                        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-2 text-sm font-semibold text-amber-700">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> Google Rating
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <blockquote className="rounded-2xl border border-slate-200 p-5 bg-white"><p className="text-amber-500 mb-3">★★★★★</p><p className="text-sm text-slate-700">&ldquo;Excellent communication and reliable service for our corporate event in Toronto.&rdquo;</p></blockquote>
                        <blockquote className="rounded-2xl border border-slate-200 p-5 bg-white"><p className="text-amber-500 mb-3">★★★★★</p><p className="text-sm text-slate-700">&ldquo;The bus arrived on time, was very clean, and made our Niagara Falls trip stress-free.&rdquo;</p></blockquote>
                        <blockquote className="rounded-2xl border border-slate-200 p-5 bg-white"><p className="text-amber-500 mb-3">★★★★★</p><p className="text-sm text-slate-700">&ldquo;Professional drivers and smooth airport transfers for our entire group.&rdquo;</p></blockquote>
                    </div>
                    <div className="rounded-2xl bg-blue-700 text-blue-50 px-6 py-4 text-sm font-semibold text-center">
                        Trusted by Groups Across Ontario
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-20 px-2 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Serving Toronto &amp; the GTA</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                        {serviceAreas.map((area) => (
                            <div key={area} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
                                {area}
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-slate-600">
                        Providing charter coaches, airport transfers, tours, and group transportation throughout Canada and to USA.
                    </p>
                </div>
            </section>

            <section className="py-16 lg:py-20 px-2 sm:px-8 lg:px-10 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-2xl border border-slate-200 p-6"><p className="text-xs font-semibold text-blue-700 mb-2">STEP 1</p><h3 className="font-bold mb-2">Tell us about your trip.</h3><p className="text-sm text-slate-600">Share pickup details, destination, timing, and group size.</p></div>
                        <div className="rounded-2xl border border-slate-200 p-6"><p className="text-xs font-semibold text-blue-700 mb-2">STEP 2</p><h3 className="font-bold mb-2">Receive a clear quote.</h3><p className="text-sm text-slate-600">We provide vehicle recommendations, pricing, and availability.</p></div>
                        <div className="rounded-2xl border border-slate-200 p-6"><p className="text-xs font-semibold text-blue-700 mb-2">STEP 3</p><h3 className="font-bold mb-2">Travel with confidence.</h3><p className="text-sm text-slate-600">We coordinate transportation so your group is comfortable and on time.</p></div>
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-20 px-2 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                        <details className="rounded-xl border border-slate-200 bg-white p-5" open>
                            <summary className="font-semibold cursor-pointer">How quickly can I receive a quote?</summary>
                            <p className="text-sm text-slate-600 mt-2">Most inquiries receive a response shortly during business hours.</p>
                        </details>
                        <details className="rounded-xl border border-slate-200 bg-white p-5">
                            <summary className="font-semibold cursor-pointer">What vehicles are available?</summary>
                            <p className="text-sm text-slate-600 mt-2">We offer charter buses, mini coaches, shuttle buses, executive vans, and SUVs.</p>
                        </details>
                        <details className="rounded-xl border border-slate-200 bg-white p-5">
                            <summary className="font-semibold cursor-pointer">Do you provide airport transfers?</summary>
                            <p className="text-sm text-slate-600 mt-2">Yes. Airport transportation is available for business groups, tourists, weddings, and events.</p>
                        </details>
                        <details className="rounded-xl border border-slate-200 bg-white p-5">
                            <summary className="font-semibold cursor-pointer">Can transportation be customized?</summary>
                            <p className="text-sm text-slate-600 mt-2">Yes. We tailor transportation around your itinerary and schedule.</p>
                        </details>
                        <details className="rounded-xl border border-slate-200 bg-white p-5">
                            <summary className="font-semibold cursor-pointer">Do you serve areas outside Toronto?</summary>
                            <p className="text-sm text-slate-600 mt-2">Yes. We provide transportation throughout Canada and to USA</p>
                        </details>
                    </div>
                </div>
            </section>

            <section className="pb-16 lg:pb-24 px-2 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto">
                    <div className="rounded-3xl bg-gradient-to-r from-blue-800 to-blue-600 p-8 sm:p-10 text-white">
                        <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
                            Planning Group Transportation in Toronto or the GTA?
                        </h2>
                        <p className="text-blue-100 text-sm sm:text-base max-w-3xl mb-6">
                            Let&apos;s make your transportation simple, comfortable, and organized.
                        </p>
                        <div className="flex flex-wrap gap-3 mb-5">
                            <a href="#quick-quote" className="inline-flex items-center justify-center rounded-full bg-white text-blue-800 px-6 py-3 text-sm font-semibold hover:bg-blue-50 transition-colors">Request a Quote</a>
                            <a href="tel:+16478464140" className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">Call Now</a>
                        </div>
                        <p className="text-xs sm:text-sm text-blue-100">
                            Trusted for charter coach buses, airport transfers, tours, corporate transportation, and group travel across Ontario and to USA.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
