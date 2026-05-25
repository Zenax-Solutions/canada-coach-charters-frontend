import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
    ArrowRight,
    Briefcase,
    Bus,
    CheckCircle2,
    Clock3,
    Globe,
    GraduationCap,
    Plane,
    ShieldCheck,
    Star,
    Users,
    Wifi,
    BatteryCharging,
    Thermometer,
    Luggage,
    BadgeCheck,
    Route,
    Headset,
    CalendarCheck2,
    Building2,
    Car,
    Trophy,
    Landmark,
    HeartHandshake,
    MapPin,
} from "lucide-react";

const trustStats = [
    { title: "12+ Years", text: "Industry Experience", icon: Trophy },
    { title: "10,000+", text: "Passengers Transported", icon: Users },
    { title: "GTA + Ontario", text: "Coverage", icon: Globe },
    { title: "Corporate + Private", text: "Client Segments", icon: Briefcase },
    { title: "Licensed Team", text: "Professional Drivers", icon: BadgeCheck },
    { title: "Modern Fleet", text: "Multiple Vehicle Options", icon: Bus },
    { title: "Partner Network", text: "Affiliations and Partners", icon: Building2 },
    { title: "Certified", text: "Licenses and Compliance", icon: ShieldCheck },
];

const whyChooseUs = [
    "Professional Drivers",
    "Modern & Comfortable Fleet",
    "GTA-Wide Coverage",
    "Corporate Transportation Solutions",
    "Airport Transfers",
    "Flexible Group Travel",
    "Organized Tour Coordination",
    "Reliable Scheduling",
    "Safety-Focused Operations",
    "Dedicated Customer Support",
];

const services = [
    "Corporate Transportation",
    "Airport Transfers",
    "Wedding Transportation",
    "School Trips",
    "Sports Team Transportation",
    "Event Transportation",
    "Niagara Falls Tours",
    "Ontario Group Tours",
    "Sri Lanka Tours",
    "Private Group Travel",
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
];

const tourExperiences = [
    "Niagara Falls Tours",
    "Toronto Sightseeing",
    "Corporate Retreats",
    "Educational Tours",
    "Multi-Day Excursions",
    "Sri Lanka Group Tours",
    "Cultural & Spiritual Travel",
];

const safetyItems = [
    "Professionally Licensed Drivers",
    "Regular Vehicle Inspections",
    "Preventative Maintenance",
    "Reliable Fleet Standards",
    "Passenger-Focused Operations",
    "Safe Long-Distance Travel Coordination",
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 p-1 sm:p-4">
            <div className="relative rounded-3xl overflow-hidden">
                <Header />

                <section className="relative pt-36 pb-20 px-2 sm:px-8 lg:px-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/page-header.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-black/60" />
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
                            <span className="text-white font-medium">About Us</span>
                        </nav>

                        <div className="max-w-3xl">
                            <span className="inline-block text-xs font-semibold text-blue-200 border border-blue-500 bg-blue-600/50 rounded-full px-4 py-1.5 mb-5">
                                About Canada Coach Charters
                            </span>
                            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
                                Professional Charter Transportation Across Toronto &amp; the GTA
                            </h1>
                            <p className="text-blue-100 text-base sm:text-lg leading-relaxed mb-8">
                                Reliable group transportation, corporate travel, airport transfers, tours, and customized travel experiences across Ontario and beyond.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href="/contact#quick-quote"
                                    className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
                                >
                                    Request a Quote
                                </a>
                                <Link
                                    href="/fleet"
                                    className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                                >
                                    Explore Fleet
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="py-14 lg:py-16 px-2 sm:px-8 lg:px-10 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-7 rounded-3xl border border-slate-200 p-7 sm:p-8">
                        <span className="inline-block text-xs font-semibold text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 mb-5">
                            Your Trusted Transportation Partner
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Professionally Coordinated Group Transportation
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                            Canada Coach Charters provides professionally coordinated charter transportation services for corporate groups, schools, tours, events, airport transfers, and private travel throughout Toronto, the GTA, and Ontario.
                        </p>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                            We focus on safe travel, comfortable journeys, reliable coordination, and exceptional customer service.
                        </p>
                    </div>
                    <div className="lg:col-span-5 rounded-3xl border border-slate-200 p-7 sm:p-8 bg-gradient-to-br from-blue-50 to-white">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">At a Glance</h3>
                        <ul className="space-y-3 text-sm text-slate-700">
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 mt-0.5" /> Charter and group transportation specialists</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 mt-0.5" /> Corporate and private travel programs</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 mt-0.5" /> Airport, event, and tour coordination</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 mt-0.5" /> Toronto, GTA, Ontario, and beyond</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-14 lg:py-16 px-2 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">Stats &amp; Trust</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {trustStats.map((item) => (
                            <div key={item.text} className="rounded-2xl bg-white border border-slate-200 p-5">
                                <item.icon className="w-5 h-5 text-blue-700 mb-3" />
                                <p className="text-base font-bold text-slate-900">{item.title}</p>
                                <p className="text-sm text-slate-600">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-14 lg:py-16 px-2 sm:px-8 lg:px-10 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">The People Behind Every Journey</h2>
                    <p className="text-slate-600 text-sm sm:text-base mb-8">Meet Our Team</p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <article className="rounded-2xl border border-slate-200 p-6">
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">OT</div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">Operations &amp; Travel Coordination Team</h3>
                            <p className="text-sm text-slate-600 mb-4">Our operations team works behind the scenes to coordinate routes, schedules, transportation logistics, and customer support to help ensure every journey runs smoothly.</p>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li className="flex items-center gap-2"><Route className="w-4 h-4 text-blue-700" /> Transportation Coordination</li>
                                <li className="flex items-center gap-2"><CalendarCheck2 className="w-4 h-4 text-blue-700" /> Trip Planning</li>
                                <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-blue-700" /> Route Management</li>
                                <li className="flex items-center gap-2"><Headset className="w-4 h-4 text-blue-700" /> Customer Support</li>
                                <li className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-blue-700" /> Event Logistics</li>
                            </ul>
                        </article>

                        <article className="rounded-2xl border border-slate-200 p-6">
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">PD</div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">Professional Drivers</h3>
                            <p className="text-sm text-slate-600 mb-4">Our drivers are experienced, professionally licensed, and committed to providing safe, courteous, and dependable transportation services throughout Toronto and Ontario.</p>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-blue-700" /> Commercially Licensed Drivers</li>
                                <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-blue-700" /> Safety-Focused Operations</li>
                                <li className="flex items-center gap-2"><Bus className="w-4 h-4 text-blue-700" /> Long-Distance Travel Experience</li>
                                <li className="flex items-center gap-2"><HeartHandshake className="w-4 h-4 text-blue-700" /> Professional Customer Service</li>
                                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-700" /> GTA &amp; Ontario Route Knowledge</li>
                            </ul>
                        </article>

                        <article className="rounded-2xl border border-slate-200 p-6">
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">TT</div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">Tour &amp; Travel Support Team</h3>
                            <p className="text-sm text-slate-600 mb-4">Our travel coordination team assists with organizing sightseeing tours, group excursions, and customized travel experiences across Ontario and Sri Lanka.</p>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li className="flex items-center gap-2"><Landmark className="w-4 h-4 text-blue-700" /> Tour Planning</li>
                                <li className="flex items-center gap-2"><Users className="w-4 h-4 text-blue-700" /> Group Coordination</li>
                                <li className="flex items-center gap-2"><Clock3 className="w-4 h-4 text-blue-700" /> Itinerary Support</li>
                                <li className="flex items-center gap-2"><Headset className="w-4 h-4 text-blue-700" /> Travel Assistance</li>
                            </ul>
                        </article>
                    </div>
                </div>
            </section>

            <section className="py-14 lg:py-16 px-2 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <article className="rounded-2xl border border-slate-200 bg-white p-6">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h3>
                        <p className="text-sm text-slate-600">To become one of Toronto&apos;s most trusted charter transportation and group travel providers through safe, reliable, and professionally coordinated travel experiences.</p>
                    </article>
                    <article className="rounded-2xl border border-slate-200 bg-white p-6">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h3>
                        <p className="text-sm text-slate-600">To provide comfortable, dependable, and customized transportation solutions that prioritize safety, customer satisfaction, and seamless group travel.</p>
                    </article>
                </div>
            </section>

            <section className="py-14 lg:py-16 px-2 sm:px-8 lg:px-10 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">Why Groups Choose Canada Coach Charters</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        {whyChooseUs.map((item) => (
                            <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-14 lg:py-16 px-2 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">Transportation Solutions for Every Occasion</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        {services.map((item) => (
                            <div key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-blue-700" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-14 lg:py-16 px-2 sm:px-8 lg:px-10 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">Comfortable Transportation for Groups of All Sizes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <article className="rounded-2xl border border-slate-200 p-5"><Bus className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold text-slate-900 mb-2">Luxury Coaches</h3><p className="text-sm text-slate-600">Premium coaches for long-distance and high-comfort group travel.</p></article>
                        <article className="rounded-2xl border border-slate-200 p-5"><Bus className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold text-slate-900 mb-2">Mini Coaches</h3><p className="text-sm text-slate-600">Ideal for airport transfers and smaller group movement.</p></article>
                        <article className="rounded-2xl border border-slate-200 p-5"><Car className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold text-slate-900 mb-2">Executive Shuttles</h3><p className="text-sm text-slate-600">Efficient and comfortable transport for executive teams.</p></article>
                        <article className="rounded-2xl border border-slate-200 p-5"><Briefcase className="w-5 h-5 text-blue-700 mb-3" /><h3 className="font-bold text-slate-900 mb-2">Corporate Vehicles</h3><p className="text-sm text-slate-600">Business-ready vehicles for conferences and events.</p></article>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 mb-6">
                        <h3 className="font-bold text-slate-900 mb-3">Amenities</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-slate-700">
                            <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700" /> Reclining Seating</p>
                            <p className="flex items-center gap-2"><Wifi className="w-4 h-4 text-blue-700" /> Wi-Fi</p>
                            <p className="flex items-center gap-2"><BatteryCharging className="w-4 h-4 text-blue-700" /> USB Charging</p>
                            <p className="flex items-center gap-2"><Thermometer className="w-4 h-4 text-blue-700" /> Climate Control</p>
                            <p className="flex items-center gap-2"><Luggage className="w-4 h-4 text-blue-700" /> Luggage Storage</p>
                            <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700" /> Washrooms (select vehicles)</p>
                        </div>
                    </div>

                    <Link href="/fleet" className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition-colors">
                        View Fleet
                    </Link>
                </div>
            </section>

            <section className="py-14 lg:py-16 px-2 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Serving Toronto &amp; the Greater Toronto Area</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                        {serviceAreas.map((area) => (
                            <div key={area} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 text-center">
                                {area}
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-slate-600">Also serving destinations across Ontario and Canada.</p>
                </div>
            </section>

            <section className="py-14 lg:py-16 px-2 sm:px-8 lg:px-10 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">More Than Transportation</h2>
                    <p className="text-sm text-slate-600 mb-8">We help groups experience organized and memorable travel journeys across Ontario and internationally.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {tourExperiences.map((item) => (
                            <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-14 lg:py-16 px-2 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto rounded-3xl bg-slate-900 text-white p-7 sm:p-8">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">Safety Comes First</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {safetyItems.map((item) => (
                            <div key={item} className="rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-sm flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-blue-200" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-14 lg:py-16 px-2 sm:px-8 lg:px-10 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">Trusted by Groups Across Toronto &amp; the GTA</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
                        <div className="lg:col-span-5 rounded-2xl border border-slate-200 p-6">
                            <p className="text-sm text-slate-500 mb-2">Google Reviews</p>
                            <div className="flex items-center gap-2 mb-3">
                                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                            </div>
                            <p className="text-sm text-slate-700 mb-4">Trusted feedback from customers booking charter transportation across the GTA.</p>
                            <a href="https://www.google.com/search?q=canada+coach+charters+reviews" target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-700 hover:text-blue-800">View Google Reviews</a>
                        </div>
                        <div className="lg:col-span-7 rounded-2xl border border-slate-200 p-6">
                            <p className="text-sm text-slate-500 mb-3">Client Logos &amp; Partnerships</p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 text-center text-xs font-semibold text-slate-600">
                                <div className="rounded-lg border border-slate-200 bg-slate-50 py-3">Corporate Events</div>
                                <div className="rounded-lg border border-slate-200 bg-slate-50 py-3">Tour Groups</div>
                                <div className="rounded-lg border border-slate-200 bg-slate-50 py-3">Schools</div>
                                <div className="rounded-lg border border-slate-200 bg-slate-50 py-3">Sports Teams</div>
                            </div>
                            <blockquote className="text-sm text-slate-700 mb-2">"Excellent communication and very professional coordination for our event transportation."</blockquote>
                            <blockquote className="text-sm text-slate-700 mb-2">"On-time pickup, clean vehicle, and smooth airport transfer experience."</blockquote>
                            <blockquote className="text-sm text-slate-700">"Reliable planning support for large group movement across Ontario."</blockquote>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-14 lg:py-16 px-2 sm:px-8 lg:px-10">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                        <details className="rounded-xl border border-slate-200 bg-white p-5" open>
                            <summary className="font-semibold cursor-pointer">What areas do you serve?</summary>
                            <p className="text-sm text-slate-600 mt-2">We serve Toronto, the Greater Toronto Area, and destinations across Ontario and Canada.</p>
                        </details>
                        <details className="rounded-xl border border-slate-200 bg-white p-5">
                            <summary className="font-semibold cursor-pointer">Do you provide airport transfers?</summary>
                            <p className="text-sm text-slate-600 mt-2">Yes, we provide reliable group airport transfers to and from Toronto Pearson and other regional airports.</p>
                        </details>
                        <details className="rounded-xl border border-slate-200 bg-white p-5">
                            <summary className="font-semibold cursor-pointer">Can transportation be customized?</summary>
                            <p className="text-sm text-slate-600 mt-2">Yes, all trips are fully customized based on your group size, schedule, and travel requirements.</p>
                        </details>
                        <details className="rounded-xl border border-slate-200 bg-white p-5">
                            <summary className="font-semibold cursor-pointer">Do you organize tours to Sri Lanka?</summary>
                            <p className="text-sm text-slate-600 mt-2">Yes, we offer customized Sri Lanka group tours and travel experiences upon request.</p>
                        </details>
                        <details className="rounded-xl border border-slate-200 bg-white p-5">
                            <summary className="font-semibold cursor-pointer">Are your drivers licensed?</summary>
                            <p className="text-sm text-slate-600 mt-2">Yes, all our drivers are fully licensed, experienced, and professionally trained.</p>
                        </details>
                        <details className="rounded-xl border border-slate-200 bg-white p-5">
                            <summary className="font-semibold cursor-pointer">Do your vehicles include amenities?</summary>
                            <p className="text-sm text-slate-600 mt-2">Yes, our vehicles may include Wi-Fi, reclining seats, air conditioning, USB charging, and luggage space.</p>
                        </details>
                    </div>
                </div>
            </section>

            <section className="pb-16 lg:pb-24 px-2 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto">
                    <div className="rounded-3xl bg-gradient-to-r from-blue-800 to-blue-600 p-8 sm:p-10 text-white">
                        <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">Plan Your Next Journey With Canada Coach Charters</h2>
                        <p className="text-blue-100 text-sm sm:text-base max-w-3xl mb-6">
                            Professional charter transportation and customized travel experiences across Toronto, the GTA, Ontario, and beyond.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a href="/contact#quick-quote" className="inline-flex items-center justify-center rounded-full bg-white text-blue-800 px-6 py-3 text-sm font-semibold hover:bg-blue-50 transition-colors">Request a Quote</a>
                            <a href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">Contact Our Team</a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
