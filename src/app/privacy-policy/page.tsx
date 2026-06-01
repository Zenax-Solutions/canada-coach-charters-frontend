import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
    title: "Privacy Policy | Canada Coach Charters",
    description:
        "Read the Canada Coach Charters Privacy Policy to learn how we collect, use, protect, and disclose personal information when you use our website, quote forms, AI chat assistant, and online services.",
    keywords: [
        "Privacy Policy Canada Coach Charters",
        "Canada Coach Charters privacy policy",
        "charter bus privacy policy",
        "Coach Bus Company Privacy Policy",
        "Toronto bus charter privacy",
        "group transportation privacy policy",
        "Canada Coach Charters contact information",
        "AI chat privacy policy",
        "charter bus quote privacy",
        "transportation website privacy policy",
    ],
};

export default function PrivacyPolicyPage() {
    const sections = [
        { id: "overview", label: "Overview" },
        { id: "information-collected", label: "Information We Collect" },
        { id: "information-use", label: "How We Use Your Information" },
        { id: "quote-forms", label: "Quote Requests and Contact Forms" },
        { id: "ai-chat", label: "AI Chat Assistant" },
        { id: "cookies", label: "Cookies and Website Tracking" },
        { id: "disclosure", label: "Disclosure of Information" },
        { id: "third-party", label: "Third-Party Websites" },
        { id: "security", label: "Data Security" },
        { id: "children", label: "Children's Privacy" },
        { id: "rights", label: "Your Choices and Rights" },
        { id: "changes", label: "Changes to This Privacy Policy" },
        { id: "contact", label: "Contact Information" },
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
                            <span className="text-white font-medium">Privacy Policy</span>
                        </nav>

                        <span className="inline-block text-xs font-semibold text-blue-200 border border-blue-500 bg-blue-600/50 rounded-full px-4 py-1.5 mb-5">
                            Legal & Privacy
                        </span>

                        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-2xl">
                            Privacy Policy
                        </h1>
                        <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-3xl">
                            Learn how Canada Coach Charters collects, uses, protects, and discloses personal information when you use our website, quote forms, AI chat assistant, and online services.
                        </p>
                    </div>
                </section>
            </div>

            <section className="px-2 py-14 sm:px-8 lg:px-10 lg:py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50 via-white to-slate-100 p-6 sm:p-8 shadow-sm">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-700">
                                Last updated: May 13, 2026
                            </span>
                            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                                Canada Coach Charters Privacy Terms
                            </span>
                        </div>
                        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">
                            At Canada Coach Charters, your privacy matters to us. This Privacy Policy explains how we collect, use, store, protect, and disclose personal information across our website, quote tools, chat assistant, and online services.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
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
                                <h2 id="overview" className="scroll-mt-28 text-2xl sm:text-3xl mb-4">Privacy Policy</h2>
                                <p>
                                    At Canada Coach Charters, your privacy matters to us. This Privacy Policy explains how we collect, use, store, protect, and disclose personal information. It covers visits to our website, requests for quotes, contact with our team, use of our AI chat assistant, and interactions with our online services.
                                </p>
                                <p>
                                    Canada Coach Charters follows Canadian privacy laws, including the Personal Information Protection and Electronic Documents Act (PIPEDA).
                                </p>
                                <p>
                                    By using our website or submitting personal information to Canada Coach Charters, you agree to the terms in this Privacy Policy. If you do not agree, do not use our website or submit information through our online forms.
                                </p>

                                <h3 id="information-collected" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">Information We Collect</h3>
                                <p>
                                    Canada Coach Charters may collect personal information you give us through our website, contact forms, quote forms, AI chat assistant, newsletter forms, surveys, feedback forms, or other online tools.
                                </p>
                                <p>
                                    The personal information we may collect includes your name, email address, phone number, location or service area, and trip details. We may collect pickup and drop-off information, preferred travel date and time, number of passengers, and message or enquiry details. We also collect information submitted through our AI chat assistant and newsletter subscriptions.
                                </p>
                                <p>
                                    Sometimes, we collect additional information to answer your requests, provide a quote, fix problems, or deliver the service you requested.
                                </p>

                                <h3 id="information-use" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">How We Use Your Information</h3>
                                <p>
                                    We use your information to answer questions, prepare quotes, manage bookings, improve our website, and communicate with you about our services.
                                </p>
                                <p>
                                    We may use your information to respond to quote requests, provide transportation service details, contact you about your enquiry or booking, personalize your website or chat experience, improve forms and customer service, send newsletters or offers with your consent, analyze website performance, resolve complaints, and comply with legal obligations.
                                </p>
                                <p>
                                    We do not sell your personal information to third parties.
                                </p>

                                <h3 id="quote-forms" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">Quote Requests and Contact Forms</h3>
                                <p>
                                    When you submit a quote request or contact form on our website, we collect the information needed to understand your transportation needs and respond accurately.
                                </p>
                                <p>
                                    This may include your contact details, trip information, pickup location, destination, group size, travel date, and any additional details you choose to provide.
                                </p>
                                <p>
                                    We use this information to prepare a quote, follow up with you, and provide customer service for Canada Coach Charters.
                                </p>

                                <h3 id="ai-chat" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">AI Chat Assistant</h3>
                                <p>
                                    Our website includes an AI-powered chat assistant designed to help visitors with service information, general enquiries, and quote requests.
                                </p>
                                <p>
                                    When you use the AI chat assistant, we may collect your name and email address before the conversation begins. We use this information to personalize your chat and connect your enquiry or quote request with your contact details.
                                </p>
                                <p>
                                    Chat messages may be processed by OpenAI&apos;s ChatGPT technology to generate responses. Messages sent through the chat assistant may be transmitted to OpenAI&apos;s systems and are subject to OpenAI&apos;s privacy practices.
                                </p>
                                <p>
                                    Canada Coach Charters does not store the full transcript of your AI chat conversation on our servers. Quote requests submitted via chat may be stored in our system, similar to requests sent through website forms.
                                </p>
                                <p>
                                    Contact details you submit through the chat assistant may be saved as a chat lead record. If you start multiple chats with the same email address, your existing record may be updated rather than duplicated. Only authorized Canada Coach Charters staff can access this information.
                                </p>

                                <h3 id="cookies" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">Cookies and Website Tracking</h3>
                                <p>
                                    Canada Coach Charters uses cookies and similar technologies to improve website functionality, understand visitor behavior, and provide a better user experience.
                                </p>
                                <p>
                                    Cookies are small data files placed on your device when you visit a website. They help us remember preferences and improve the site. You can turn off cookies in your browser settings, but some parts of our website may not work properly if you do.
                                </p>
                                <p>
                                    With your consent, we may use your information for marketing or promotional communications such as newsletters, service updates, and special offers related to charter buses, coach buses, airport transfers, group transportation, and tours. You may opt out at any time using unsubscribe options or by contacting us.
                                </p>

                                <h3 id="disclosure" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">Disclosure of Information</h3>
                                <p>
                                    Canada Coach Charters only shares personal information when necessary and in accordance with this Privacy Policy.
                                </p>
                                <p>
                                    We may disclose personal information to authorized staff who need it to perform their duties, service providers who help operate our website or business systems, or providers supporting your quote request or service enquiry.
                                </p>
                                <p>
                                    We may disclose information to comply with laws, regulations, warrants, subpoenas, or legal obligations, and to protect the rights, safety, or property of Canada Coach Charters, customers, or others.
                                </p>
                                <p>
                                    Some service providers may process personal information outside Canada, meaning your data could be subject to foreign laws while stored or processed.
                                </p>

                                <h3 id="third-party" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">Third-Party Websites</h3>
                                <p>
                                    Our website may include links to third-party websites. We are not responsible for how third-party websites handle your information. Please read their privacy policies before sharing your details.
                                </p>

                                <h3 id="security" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">Data Security</h3>
                                <p>
                                    Canada Coach Charters takes steps to protect your information from unauthorized access, misuse, loss, disclosure, alteration, or destruction.
                                </p>
                                <p>
                                    We use physical, electronic, and administrative safeguards to help protect information we collect online. Only authorized employees, contractors, or service providers can access personal information needed for their work.
                                </p>
                                <p>
                                    Although we take reasonable steps to protect your information, no website, online service, or electronic storage system is completely secure.
                                </p>

                                <h3 id="children" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">Children&apos;s Privacy</h3>
                                <p>
                                    Canada Coach Charters does not knowingly collect or solicit personal information from children. If we become aware that personal information from a child has been submitted through our website, we will take reasonable steps to delete it unless we are legally required to retain it.
                                </p>

                                <h3 id="rights" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">Your Choices and Rights</h3>
                                <p>
                                    You can contact us to request access to your information, correct inaccurate details, withdraw consent where applicable, or stop receiving marketing communications.
                                </p>

                                <h3 id="changes" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">Changes to This Privacy Policy</h3>
                                <p>
                                    Canada Coach Charters may update this Privacy Policy from time to time. We will post the updated version on this page with a new Last updated date.
                                </p>
                                <p>
                                    We encourage you to review this page periodically so you understand how we collect, use, and process your information.
                                </p>

                                <h3 id="contact" className="scroll-mt-28 text-xl sm:text-2xl mt-14 mb-4 font-extrabold">Contact Information</h3>
                                <p>
                                    If you have questions about this Privacy Policy or your information, please contact us:
                                </p>
                                <p>
                                    Canada Coach Charters<br />
                                    Phone: +1 (647) 846-4140<br />
                                    Email: info@canadacoachcharters.ca<br />
                                    Address: 95 Mural St, Richmond Hill, ON L4B 3G2, Canada
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
