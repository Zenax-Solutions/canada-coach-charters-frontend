import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    ChevronRight,
    Briefcase,
    Heart,
    GraduationCap,
    Plane,
    ShieldCheck,
    Compass,
} from "lucide-react";

const services = [
    {
        title: "Corporate Travel Service",
        description:
            "Corporate Travel Services are specialized solutions designed to meet the unique travel needs of businesses and their employees. Whether it is arranging flights, booking accommodations, or managing itineraries, these services are tailored to simplify the complexities associated with corporate travel.",
        image: "/services-page/corporate-travel.jpg",
        icon: Briefcase,
    },
    {
        title: "Wedding & Engagement",
        description:
            "Weddings and engagements are joyous occasions that mark the beginning of a lifelong journey for couples. These events are filled with love, traditions, and the promise of a shared future. From the romantic proposal to the grand celebration of a wedding, each step is a unique and meaningful part of the couple's story.",
        image: "/services-page/buying-an-engagement.jpg",
        icon: Heart,
    },
    {
        title: "School Rental Service",
        description:
            "Safe and reliable school bus rentals for field trips, ensuring comfortable transportation for students and teachers.",
        image: "/services-page/school-rental-services.jpg",
        icon: GraduationCap,
    },
    {
        title: "Airport Shuttle Service",
        description:
            "Airport shuttle services play a crucial role in enhancing the overall travel experience by providing convenient and reliable transportation to and from airports. These services are tailored to meet the needs of travelers, offering a cost-effective and efficient alternative to traditional transportation methods.",
        image: "/services-page/Airport-Shuttle-Service.jpg",
        icon: Plane,
    },
    {
        title: "Private Travel Service",
        description:
            "Private travel services redefine the conventional travel experience by providing exclusive, tailored, and luxurious options for individuals or groups. Whether it is flying on a private jet, cruising in a luxury yacht, or enjoying a bespoke vacation, these services prioritize personalized attention and high-end amenities.",
        image: "/services-page/private-travel.jpg",
        icon: ShieldCheck,
    },
    {
        title: "Tours & Excursions",
        description:
            "Tours and excursions are immersive travel experiences that allow individuals to discover the beauty and uniqueness of different destinations. From cultural explorations to outdoor adventures, these activities provide an enriching way to connect with new places, people, and traditions.",
        image: "/services-page/Tours-Excursions.jpg",
        icon: Compass,
    },
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-white p-4">
            <div className="relative rounded-3xl overflow-hidden">
                <Header />

                <section className="relative pt-36 pb-20 px-6 sm:px-8 lg:px-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/page-header.jpg')" }}
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
                            <span className="text-white font-medium">Our Services</span>
                        </nav>

                        <span className="inline-block text-xs font-semibold text-blue-200 border border-blue-500 bg-blue-600/50 rounded-full px-4 py-1.5 mb-5">
                            Service Categories
                        </span>

                        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-2xl">
                            Our Services
                        </h1>
                        <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-3xl">
                            Tailored transportation solutions for corporate travel, events, school trips,
                            airport transfers, private journeys, and memorable excursions.
                        </p>
                    </div>
                </section>
            </div>

            <section className="py-16 lg:py-24 px-6 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-semibold text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
                            From Archived Services Page
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
                            Service Options For Every Trip
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
                            These service categories are based on the original Canada Coach Charters
                            services listing and adapted to the current site experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
                        {services.map((service) => (
                            <article
                                key={service.title}
                                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_45px_-32px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_26px_52px_-28px_rgba(37,99,235,0.28)]"
                            >
                                <div className="relative h-56 w-full">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/78 via-slate-900/30 to-transparent" />
                                    <div className="absolute left-5 bottom-5 flex items-center gap-2.5">
                                        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                                            <service.icon className="w-5 h-5 text-blue-700" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white">{service.title}</h3>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <p className="text-sm text-gray-500 leading-relaxed mb-5">
                                        {service.description}
                                    </p>

                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-2 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors font-semibold text-white text-sm"
                                    >
                                        Contact Us
                                        <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                                            <ChevronRight className="w-4 h-4 text-blue-700" />
                                        </span>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <QuoteSection />
            <Footer />
        </div>
    );
}
