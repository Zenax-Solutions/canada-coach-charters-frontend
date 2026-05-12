import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone, Clock3 } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white p-1 sm:p-4">
            <div className="relative rounded-3xl overflow-hidden">
                <Header />

                <section className="relative pt-36 pb-20 px-2 sm:px-8 lg:px-10">
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
                            <span className="text-white font-medium">Contact Us</span>
                        </nav>

                        <span className="inline-block text-xs font-semibold text-blue-200 border border-blue-500 bg-blue-600/50 rounded-full px-4 py-1.5 mb-5">
                            Contact Information
                        </span>

                        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-2xl">
                            Contact Us
                        </h1>
                        <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl">
                            Get in touch with us for personalized assistance and inquiries — your journey begins with a single message.
                        </p>
                    </div>
                </section>
            </div>

            <section className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                        <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-sm">
                            <span className="inline-block text-xs font-semibold text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 mb-5">
                                Contact Information
                            </span>

                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
                                GET IN Touch
                            </h2>
                            <p className="text-gray-500 text-sm leading-relaxed mb-8">
                                We would love to hear from you.
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
                                        <Clock3 className="w-4 h-4 text-blue-700" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Support</p>
                                        <p className="text-sm font-semibold text-gray-800">
                                            Fast responses for bookings and inquiries
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-sm">
                            <span className="inline-block text-xs font-semibold text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 mb-5">
                                Send Message
                            </span>

                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
                                Let&apos;s Start Your Journey
                            </h2>
                            <p className="text-gray-500 text-sm leading-relaxed mb-8">
                                Share your requirements and our team will get back to you shortly.
                            </p>

                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
