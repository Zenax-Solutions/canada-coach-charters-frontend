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

export const metadata = {
    title: "Rental Bus Services in Toronto | Private School, Church & Group Charters in the GTA",
    description:
        "Canada Coach Charters provides reliable bus rental and charter services in Toronto and the GTA for private schools, churches, corporate groups, weddings, airport transfers, and private travel. Approved for Toronto District School Board and York Region District School Board transportation.",
};

const services = [
    {
        title: "Private School Bus Rentals in the GTA",
        description:
            "Canada Coach Charters proudly serves private schools across the GTA, offering dependable bus rentals for field trips, athletics, academics, daily transport, special events, and student travel. Our transportation is planned for safety, punctuality, and clear communication.",
        image: "/services-page/corporate-travel.jpg",
        icon: Briefcase,
    },
    {
        title: "Church Bus Rentals in the GTA",
        description:
            "We provide church bus rental services for congregations, ministries, youth groups, seniors' groups, retreats, conferences, community events, and special worship gatherings across the GTA.",
        image: "/services-page/buying-an-engagement.jpg",
        icon: Heart,
    },
    {
        title: "Corporate Bus Rentals",
        description:
            "Canada Coach Charters offers professional corporate transportation for meetings, conferences, staff events, team-building outings, trade shows, conventions, and business travel.",
        image: "/services-page/school-rental-services.jpg",
        icon: GraduationCap,
    },
    {
        title: "Wedding Transportation",
        description:
            "Make your wedding easier with a private bus rental for guests, parties, and family. We provide rides to ceremonies, receptions, hotels, photo sites, and after-events.",
        image: "/services-page/Airport-Shuttle-Service.jpg",
        icon: Plane,
    },
    {
        title: "Airport Shuttle Services",
        description:
            "We offer airport and group shuttle transfers to Toronto Pearson International Airport, Billy Bishop Toronto City Airport, hotels, offices, schools, churches, and private addresses.",
        image: "/services-page/private-travel.jpg",
        icon: ShieldCheck,
    },
    {
        title: "Private Group Travel",
        description:
            "Planning a custom trip? We provide private rentals for family events, tours, sports, community, clubs, seniors, and special occasions across Toronto, Ontario, and beyond.",
        image: "/services-page/Tours-Excursions.jpg",
        icon: Compass,
    },
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-white p-1 sm:p-4">
            <div className="relative rounded-3xl overflow-hidden">
                <Header />

                <section className="relative pt-36 pb-20 px-2 sm:px-8 lg:px-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/page-header/56-psngr-bnr2.jpg')" }}
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
                            Rental Bus Services in Toronto and the GTA
                        </span>

                        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-2xl">
                            Rental Bus Services in Toronto and the GTA
                        </h1>
                        <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-3xl">
                            Canada Coach Charters offers safe, affordable bus rentals in Toronto and the GTA. Our team ensures your school, church, corporate, wedding, airport, or group trip is simple, comfortable, and organized.
                        </p>
                        <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-3xl mt-3">
                            We serve all group sizes with charter bus solutions tailored to your schedule, destination, and needs.
                        </p>
                    </div>
                </section>
            </div>

            <section className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-semibold text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
                            Rental Bus Services in Toronto
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
                            Service Options for Every Trip
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
                            Explore the charter services Canada Coach Charters provides across Toronto, York Region, and the GTA.
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

            <section className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10 bg-slate-50">
                <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
                    <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-10 shadow-sm">
                        <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 mb-4">
                            Why Choose Canada Coach Charters?
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
                            Trusted by Schools, Churches, Businesses, and Families Across the GTA
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            Canada Coach Charters is trusted by schools, churches, businesses, and families across the GTA. We provide safe, dependable transportation, clean vehicles, and professional coordination.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                "Private schools in the GTA",
                                "Churches in the GTA",
                                "Toronto District School Board trips",
                                "York Region District School Board trips",
                                "Corporate transportation",
                                "Wedding shuttles",
                                "Airport transfers",
                                "Private group charters",
                                "Field trips and student events",
                                "Community and senior group travel",
                            ].map((item) => (
                                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-gradient-to-br from-blue-800 to-blue-600 p-7 sm:p-10 text-white shadow-lg">
                        <h3 className="text-2xl font-bold mb-4">Book a Charter Bus in Toronto</h3>
                        <p className="text-blue-100 leading-relaxed mb-6">
                            Canada Coach Charters makes group travel easy. Contact us for a quote for rentals in Toronto, York Region, and the GTA.
                        </p>
                        <p className="text-blue-100 leading-relaxed mb-6">
                            For school, church, corporate, wedding, airport, or group trips, our team is ready to help plan a safe, reliable ride.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-2 rounded-full bg-white hover:bg-blue-50 transition-colors font-semibold text-blue-800 text-sm"
                        >
                            Request a Quote
                            <span className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center shrink-0">
                                <ChevronRight className="w-4 h-4 text-white" />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            <QuoteSection />
            <Footer />
        </div>
    );
}
