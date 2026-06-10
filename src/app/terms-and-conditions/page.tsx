import type { Metadata } from "next";
import { getPageSeo } from "@/lib/page-seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const termsKeywords = [
    "Canada Coach Charters terms and conditions",
    "charter bus terms and conditions",
    "Coach Rental Terms Ontario",
    "charter bus rental policies",
    "bus rental cancellation policy",
    "Toronto charter bus terms",
    "Richmond Hill coach rental",
    "Ontario group transportation policies",
    "airport shuttle terms",
    "wedding transportation policy",
    "school trip transportation terms",
    "corporate shuttle service terms",
    "SMS messaging consent policy",
];

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getPageSeo("terms-and-conditions");
    return {
        title: seo?.meta_title || "Terms and Conditions | Charter Bus Rental Policies | Canada Coach Charters",
        description:
            seo?.meta_description ||
            "Read the Canada Coach Charters Terms and Conditions for charter bus rental, coach rental, shuttle service, payments, cancellations, passenger conduct, SMS messaging, safety, delays, and transportation policies in Ontario.",
        keywords: seo?.keywords ? seo.keywords.split(",").map((k) => k.trim()) : termsKeywords,
    };
}

export default function TermsAndConditionsPage() {
    const sections = [
        { id: "overview", label: "Overview" },
        { id: "services", label: "1. Transportation Services" },
        { id: "booking", label: "2. Quotes and Booking" },
        { id: "payment", label: "3. Payment Terms" },
        { id: "cancellations", label: "4. Cancellation and Refunds" },
        { id: "itinerary", label: "5. Itinerary Changes" },
        { id: "conduct", label: "6. Passenger Conduct" },
        { id: "damage", label: "7. Vehicle Damage and Cleaning" },
        { id: "prohibited", label: "8. Alcohol and Prohibited Items" },
        { id: "luggage", label: "9. Luggage and Belongings" },
        { id: "delays", label: "10. Delays and Conditions" },
        { id: "safety", label: "11. Safety and Legal Compliance" },
        { id: "substitution", label: "12. Vehicle Substitution" },
        { id: "interruptions", label: "13. Mechanical Interruptions" },
        { id: "accessibility", label: "14. Accessibility Requests" },
        { id: "third-party", label: "15. Third-Party Providers" },
        { id: "website", label: "16. Website Terms" },
        { id: "privacy", label: "17. Privacy and Personal Information" },
        { id: "sms", label: "18. SMS Messaging Notice" },
        { id: "liability", label: "19. Limitation of Liability" },
        { id: "indemnification", label: "20. Customer Indemnification" },
        { id: "updates", label: "21. Updates to These Terms" },
        { id: "contact", label: "22. Contact Canada Coach Charters" },
        { id: "faqs", label: "Frequently Asked Questions" },
    ];

    return (
        <div className="min-h-screen bg-white p-1 sm:p-4">
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
                            <span className="text-white font-medium">Terms and Conditions</span>
                        </nav>

                        <span className="inline-block text-xs font-semibold text-blue-200 border border-blue-500 bg-blue-600/50 rounded-full px-4 py-1.5 mb-5">
                            Legal Terms
                        </span>

                        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-3xl">
                            Terms and Conditions
                        </h1>
                        <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-4xl">
                            Terms and Conditions for Charter Bus Rental and Coach Transportation Services.
                        </p>
                    </div>
                </section>
            </div>

            <section className="px-2 py-14 sm:px-8 lg:px-10 lg:py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50 via-white to-slate-100 p-6 sm:p-8 shadow-sm">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-700">
                                Last updated: May 29, 2026
                            </span>
                            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                                Canada Coach Charters Terms
                            </span>
                        </div>
                        <p className="mt-4 max-w-5xl text-sm leading-relaxed text-slate-600 sm:text-base">
                            Welcome to <Link href="/" className="text-blue-700 underline hover:text-blue-800">Canada Coach Charters</Link>. These Terms and Conditions explain the rules, responsibilities, booking policies, and service terms that apply when you request a quote, book transportation, use our website, or hire our charter bus and coach rental services.
                        </p>
                        <p className="mt-4 max-w-5xl text-sm leading-relaxed text-slate-600 sm:text-base">
                            Canada Coach Charters provides a range of transportation services in Toronto, Richmond Hill, Ontario, and nearby areas, including <Link href="/services" className="text-blue-700 underline hover:text-blue-800">charter bus rental services</Link>, shuttle bus rental, airport transfers, private group, corporate, wedding, school trip, and tour transportation.
                        </p>
                        <p className="mt-4 max-w-5xl text-sm leading-relaxed text-slate-600 sm:text-base">
                            By using our website or booking our transportation services, you agree to the Terms and Conditions below.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
                        <aside className="lg:sticky lg:top-28">
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">On This Page</p>
                                <nav className="mt-3 space-y-1.5">
                                    {sections.map((section) => (
                                        <a
                                            key={section.id}
                                            href={`#${section.id}`}
                                            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                                        >
                                            {section.label}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        <article className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-10 shadow-sm">
                            <div className="prose prose-slate prose-headings:text-slate-900 prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:mb-4 prose-p:text-slate-700 prose-p:leading-8 prose-p:mt-0 max-w-none">
                                <h2 id="overview" className="scroll-mt-28 text-2xl sm:text-3xl mb-4">Terms and Conditions for Canada Coach Charters</h2>
                                <p>
                                    These Terms and Conditions apply when you request a quote, book a trip, or use our transportation services and website.
                                </p>

                                <h3 id="services" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">1. Charter Bus and Coach Rental Services</h3>
                                <p>
                                    We serve private groups, businesses, schools, event planners, wedding planners, tour operators, airport travellers, and organizations across Ontario.
                                </p>
                                <p>Our services may include:</p>
                                <ul>
                                    <li>Charter bus rental</li>
                                    <li>Coach bus rental</li>
                                    <li>Shuttle bus service</li>
                                    <li><Link href="/services" className="text-blue-700 underline hover:text-blue-800">Airport shuttle transportation</Link></li>
                                    <li>Corporate transportation</li>
                                    <li>School trip transportation</li>
                                    <li>Wedding guest transportation</li>
                                    <li>Private group transportation</li>
                                    <li>Tour and event transportation</li>
                                </ul>
                                <p>
                                    When you book with us, you are hiring a vehicle and driver for the trip details confirmed in your booking agreement. All services are subject to vehicle availability, driver availability, weather, road conditions, traffic, legal driving limits, and applicable transportation regulations.
                                </p>

                                <h3 id="booking" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">2. Quotes, Reservations, and Booking Confirmation</h3>
                                <p>
                                    A quote is based on the trip details you provide, including pickup location, destination, travel date, pickup time, return time, number of passengers, itinerary, luggage requirements, and requested vehicle type.
                                </p>
                                <p>
                                    A quote does not guarantee availability until your booking has been confirmed in writing by Canada Coach Charters.
                                </p>
                                <p>Your booking is confirmed only when:</p>
                                <ul>
                                    <li>Canada Coach Charters provides written confirmation.</li>
                                    <li>Any required deposit has been received.</li>
                                    <li>Payment terms have been accepted.</li>
                                    <li>Trip details have been approved.</li>
                                </ul>
                                <p>
                                    Customers are responsible for reviewing all booking details carefully, including pickup address, destination, passenger count, itinerary, billing information, and contact details. Any changes requested after booking confirmation may affect the final price.
                                </p>

                                <h3 id="payment" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">3. Payment Terms, Deposits, and Final Balance</h3>
                                <p>
                                    A deposit may be required to reserve your charter bus, coach bus, shuttle bus, or private transportation service. The remaining balance must be paid according to the payment terms listed in your quote, invoice, or booking confirmation.
                                </p>
                                <p>
                                    Canada Coach Charters may cancel, release, or reschedule a booking if required payments are not received by the stated deadline.
                                </p>

                                <h3 id="cancellations" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">4. Cancellation Policy and Refunds</h3>
                                <p>
                                    Cancellation terms depend on the type of transportation service, trip date, vehicle reserved, booking value, and amount of notice provided.
                                </p>
                                <p>
                                    Cancellation fees may apply once a booking has been confirmed. If a trip is cancelled close to the scheduled service date, Canada Coach Charters may retain part or all of the payment to cover reserved vehicle time, driver scheduling, administration, and lost booking opportunities.
                                </p>
                                <p>
                                    Refunds, when applicable, will be processed in accordance with the written cancellation terms provided at booking.
                                </p>

                                <h3 id="itinerary" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">5. Changes to Your Transportation Itinerary</h3>
                                <p>
                                    Customers must provide accurate trip details before the service date. Any changes to pickup times, destinations, routes, stops, passenger count, luggage needs, or trip duration must be approved by Canada Coach Charters in advance.
                                </p>
                                <p>Additional charges may apply for:</p>
                                <ul>
                                    <li>Extra stops</li>
                                    <li>Waiting time</li>
                                    <li>Route changes</li>
                                    <li>Extended service hours</li>
                                    <li>Additional mileage</li>
                                    <li>Parking fees</li>
                                    <li>Toll charges</li>
                                    <li>Driver accommodation</li>
                                    <li>Last-minute itinerary changes</li>
                                </ul>
                                <p>
                                    Drivers are not authorized to approve billing changes, waive fees, or negotiate service charges during the trip.
                                </p>

                                <h3 id="conduct" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">6. Passenger Conduct and Group Responsibilities</h3>
                                <p>
                                    Passengers must follow all safety instructions from the driver and Canada Coach Charters staff. The booking customer is responsible for the conduct of all passengers in their group.
                                </p>
                                <p>
                                    Canada Coach Charters may refuse or terminate service if passengers engage in unsafe, unlawful, abusive, disruptive, or damaging behaviour. No refund will be issued if service is terminated because of passenger misconduct.
                                </p>
                                <p>Passengers must not:</p>
                                <ul>
                                    <li>Interfere with the driver</li>
                                    <li>Block aisles or exits</li>
                                    <li>Damage the vehicle</li>
                                    <li>Smoke or vape inside the vehicle</li>
                                    <li>Carry prohibited items</li>
                                    <li>Create unsafe conditions</li>
                                    <li>Harass the driver or other passengers</li>
                                </ul>

                                <h3 id="damage" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">7. Vehicle Condition, Cleaning, and Damage Fees</h3>
                                <p>
                                    Customers are responsible for any damage caused by passengers during the charter. This includes damage to seats, windows, floors, entertainment systems, restrooms, luggage compartments, and other vehicle parts.
                                </p>
                                <p>Cleaning, repair, or replacement fees may apply for:</p>
                                <ul>
                                    <li>Spills or stains</li>
                                    <li>Garbage or excessive mess</li>
                                    <li>Bodily fluids</li>
                                    <li>Broken equipment</li>
                                    <li>Damaged upholstery</li>
                                    <li>Damaged interior or exterior vehicle parts</li>
                                    <li>Any cleaning beyond normal use</li>
                                </ul>

                                <h3 id="prohibited" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">8. Alcohol, Smoking, Vaping, and Prohibited Items</h3>
                                <p>
                                    Smoking and vaping are not permitted inside any Canada Coach Charters vehicle.
                                </p>
                                <p>
                                    Alcohol may only be permitted when approved in writing before the trip and when all required permits, licences, and legal conditions are met.
                                </p>
                                <p>
                                    Illegal substances, weapons, hazardous materials, and unsafe items are not allowed on board any vehicle.
                                </p>

                                <h3 id="luggage" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">9. Luggage, Equipment, and Personal Belongings</h3>
                                <p>
                                    Passengers are responsible for their own luggage, personal belongings, valuables, and electronic devices.
                                </p>
                                <p>
                                    All luggage and equipment must fit safely in designated storage areas. Canada Coach Charters may refuse oversized, unsafe, excessive, or improperly packed luggage.
                                </p>
                                <p>
                                    Canada Coach Charters is not responsible for lost, stolen, damaged, or unattended belongings.
                                </p>

                                <h3 id="delays" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">10. Delays, Traffic, Weather, and Road Conditions</h3>
                                <p>
                                    Canada Coach Charters works to provide safe, reliable, and timely transportation. However, arrival times and travel times may be affected by traffic, weather, road closures, construction, border delays, passenger delays, mechanical issues, police activity, or other events outside our control.
                                </p>
                                <p>
                                    Customers should allow enough travel time for flights, events, appointments, cruise departures, school schedules, and other time-sensitive plans.
                                </p>

                                <h3 id="safety" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">11. Safety, Driver Hours, and Legal Compliance</h3>
                                <p>
                                    All charter bus, coach rental, and shuttle services must comply with applicable transportation laws, vehicle safety standards, and driver hours-of-service rules.
                                </p>
                                <p>
                                    Itineraries may need to be adjusted to meet legal and safety requirements. Driver and passenger safety are always the priority.
                                </p>

                                <h3 id="substitution" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">12. Vehicle Availability and Substitution</h3>
                                <p>
                                    Canada Coach Charters makes reasonable efforts to provide the requested or confirmed vehicle type. In some situations, a comparable vehicle may be substituted due to availability, maintenance, mechanical issues, safety concerns, or operational needs.
                                </p>

                                <h3 id="interruptions" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">13. Mechanical Issues and Service Interruptions</h3>
                                <p>
                                    Although vehicles are maintained for safe operation, mechanical issues can occur. If a vehicle becomes unavailable or inoperable, Canada Coach Charters may arrange a replacement vehicle or alternate transportation when reasonably possible.
                                </p>
                                <p>
                                    Canada Coach Charters is not liable for indirect losses, missed events, missed flights, lost income, lost reservations, inconvenience, or other consequential damages caused by delays or service interruptions.
                                </p>

                                <h3 id="accessibility" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">14. Accessibility, Mobility Needs, and Special Requests</h3>
                                <p>
                                    Customers should notify Canada Coach Charters of accessibility needs, mobility requirements, child seating needs, luggage requirements, or other special requests before booking.
                                </p>
                                <p>
                                    We will make reasonable efforts to accommodate special requests, subject to vehicle availability, legal requirements, and operational feasibility.
                                </p>

                                <h3 id="third-party" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">15. Third-Party Locations, Venues, and Service Providers</h3>
                                <p>
                                    Some trips may involve third-party locations, venues, parking providers, toll operators, ferries, hotels, attractions, border authorities, airports, schools, or event organizers.
                                </p>
                                <p>
                                    Canada Coach Charters is not responsible for acts, policies, delays, fees, restrictions, or service failures of third parties.
                                </p>

                                <h3 id="website" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">16. Website Terms of Use</h3>
                                <p>
                                    Content on the Canada Coach Charters website is provided for general information about our transportation services. We try to keep information accurate and current, but service availability, pricing, vehicle options, routes, and policies may change without notice.
                                </p>
                                <p>
                                    You may not misuse the website, attempt unauthorized access, copy content for commercial use without permission, or use the website for unlawful purposes.
                                </p>

                                <h3 id="privacy" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">17. Privacy Policy and Personal Information</h3>
                                <p>
                                    Canada Coach Charters collects and uses personal information to respond to inquiries, prepare quotes, manage bookings, process payments, provide transportation services, and communicate with customers.
                                </p>
                                <p>
                                    Personal information may include your name, phone number, email address, pickup location, destination, payment details, passenger requirements, and trip details. For more details, review our <Link href="/privacy-policy" className="text-blue-700 underline hover:text-blue-800">Privacy Policy</Link>.
                                </p>

                                <h3 id="sms" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">18. SMS Privacy and Messaging Notice</h3>
                                <p>
                                    Mobile information, SMS consent, and text messaging opt-in data will not be shared with third parties, affiliates, or external organizations for marketing or promotional purposes.
                                </p>
                                <p>
                                    Consumer and SMS registration data will not be transferred, sold, shared, rented, or otherwise provided to external organizations, except as required to deliver the service, support customer communication, or comply with applicable law.
                                </p>
                                <p>
                                    By providing your mobile number and opting in to receive SMS messages from Canada Coach Charters, you agree that we may send text messages related to your inquiry, quote, booking, transportation service, customer support request, or other service-related communication. Message frequency may vary. Message and data rates may apply.
                                </p>
                                <p>
                                    You may opt out of SMS messages at any time by replying STOP. For help, reply HELP. For program questions, please <Link href="/contact" className="text-blue-700 underline hover:text-blue-800">contact Canada Coach Charters</Link>.
                                </p>

                                <h3 id="liability" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">19. Limitation of Liability</h3>
                                <p>
                                    To the fullest extent permitted by law, Canada Coach Charters is not responsible for indirect, incidental, special, or consequential damages, including missed flights, missed events, lost profits, lost reservations, inconvenience, or costs caused by delays, cancellations, passenger actions, traffic, weather, mechanical problems, third-party issues, or circumstances outside our control.
                                </p>
                                <p>
                                    Our liability, where applicable, is limited to the amount paid for the affected transportation service.
                                </p>

                                <h3 id="indemnification" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">20. Customer Indemnification</h3>
                                <p>
                                    The customer agrees to indemnify and hold Canada Coach Charters, its employees, drivers, agents, contractors, and partners harmless from claims, damages, losses, costs, or expenses arising from passenger misconduct, property damage, inaccurate booking information, unsafe requests, unlawful behaviour, or violation of these Terms and Conditions.
                                </p>

                                <h3 id="updates" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">21. Updates to These Terms and Conditions</h3>
                                <p>
                                    Canada Coach Charters may update these Terms and Conditions from time to time. The updated version will be posted on this page with a revised Last updated date. Continued use of our website or transportation services indicates your acceptance of the updated Terms and Conditions.
                                </p>

                                <h3 id="contact" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">22. Contact Canada Coach Charters</h3>
                                <p>
                                    For questions about these Terms and Conditions or to request a quote for transportation services, please <Link href="/contact" className="text-blue-700 underline hover:text-blue-800">contact Canada Coach Charters</Link>.
                                </p>
                                <p>
                                    Canada Coach Charters<br />
                                    95 Mural St, Richmond Hill, ON L4B 3G2, Canada<br />
                                    Phone: +1 (647) 846-4140<br />
                                    Email: info@canadacoachcharters.ca<br />
                                    Website: canadacoachcharters.ca
                                </p>

                                <h3 id="faqs" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">Frequently Asked Questions</h3>
                                <h4>How do I book a charter bus with Canada Coach Charters?</h4>
                                <p>
                                    You can request a quote through our <Link href="/contact" className="text-blue-700 underline hover:text-blue-800">contact page</Link> or by calling +1 (647) 846-4140. Your booking is confirmed once Canada Coach Charters provides written confirmation and any required deposit has been received.
                                </p>
                                <h4>Do I need to pay a deposit for coach rental?</h4>
                                <p>
                                    A deposit may be required to reserve your charter bus, coach bus, or shuttle service. Payment terms are listed in your quote, invoice, or booking confirmation.
                                </p>
                                <h4>Can I change my itinerary after booking?</h4>
                                <p>
                                    Yes, but itinerary changes must be approved in advance. Extra charges may apply for additional stops, route changes, waiting time, extended hours, or added mileage.
                                </p>
                                <h4>What happens if my group cancels a charter bus booking?</h4>
                                <p>
                                    Cancellation terms depend on the service type, trip date, vehicle reserved, and notice provided. Cancellation fees may apply after your booking is confirmed.
                                </p>
                                <h4>Are passengers allowed to smoke or vape on the bus?</h4>
                                <p>
                                    No. Smoking and vaping are not permitted inside any Canada Coach Charters vehicle.
                                </p>
                                <h4>Can I opt out of SMS messages?</h4>
                                <p>
                                    Yes. You may opt out of SMS messages at any time by replying STOP. For help, reply HELP.
                                </p>
                                <h4>Does Canada Coach Charters share SMS opt-in information?</h4>
                                <p>
                                    No. Mobile information, SMS consent, and text messaging opt-in data will not be shared with third parties or affiliates for marketing or promotional purposes.
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
