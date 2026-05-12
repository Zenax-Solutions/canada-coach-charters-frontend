import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PrivacyPolicyPage() {
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
                            <span className="text-white font-medium">Privacy Policy</span>
                        </nav>

                        <span className="inline-block text-xs font-semibold text-blue-200 border border-blue-500 bg-blue-600/50 rounded-full px-4 py-1.5 mb-5">
                            Legal & Privacy
                        </span>

                        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-2xl">
                            Privacy Policy
                        </h1>
                        <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-3xl">
                            CAREFULLY READ OUR PRIVACY POLICY BEFORE USING OUR SITES.
                        </p>
                    </div>
                </section>
            </div>

            <section className="py-16 lg:py-24 px-6 sm:px-8 lg:px-10 bg-slate-50">
                <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200 bg-white p-7 sm:p-10 shadow-sm">
                    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed">
                        <h2 className="text-2xl sm:text-3xl">CAREFULLY READ OUR PRIVACY POLICY BEFORE USING OUR SITES.</h2>

                        <p className="text-sm text-slate-400 -mt-2">Last updated: May 13, 2026</p>

                        <p>
                            At Canada Coach Charters, we are committed to protecting the privacy of our visitors. This Privacy Policy applies to our Sites and sets out how we collect, use, and disclose personal information on our Sites. We comply with Canadian Federal and Provincial privacy laws, including the Personal Information and Electronic Documents Act.
                        </p>
                        <p>
                            Note that this Privacy Policy only applies to our Sites and not to other websites that may be linked to ours. If you have any questions or concerns about our Privacy Policy, please contact us. You may encounter links to third-party websites while using our Sites. Canada Coach Charters is not responsible for the privacy policies of these linked sites, nor does it endorse them. We advise you to check the privacy policy of any linked site before providing any personal information.
                        </p>
                        <p>
                            If you choose to register with us or provide us with personal information, you signify your agreement to our Privacy Policy. If you do not agree to this policy, please do not register or continue to use our Sites. Your continued use of the Sites signifies your acceptance of these terms and any changes in effect at the time of use.
                        </p>

                        <h3 className="text-xl sm:text-2xl mt-10">PERSONAL DATA COLLECTION</h3>
                        <p>
                            We collect Personal Information from you when you voluntarily provide it to us through responses to surveys, search functions, questionnaires, feedback, Tell Your Story forms and the like. We may also ask you to provide additional information, such as your e-mail address and your location, if you want to obtain additional services, information, participate in a contest or to resolve complaints or concerns.
                        </p>

                        <h3 className="text-xl sm:text-2xl mt-10">IS THE INFORMATION GATHERED ABOUT ONLINE VISITORS USED BY THE COMPANY?</h3>
                        <p>
                            The personal information you provide to us may be used for research and development relating to our Sites, future site development, and/or to send you promotional materials, if you ask us to. We may use information gathered about you to create a profile in order to show you content that might be of interest and to display content according to your preferences. If you have indicated that you wish to receive additional information, we will send you information about us and promotional material about our products together with details of any offers we may have available from time to time.
                        </p>

                        <h3 className="text-xl sm:text-2xl mt-10">INFORMATIONAL AND PROMOTIONAL OFFERS</h3>
                        <p>
                            Canada Coach Charters may use information submitted by visitors for marketing and promotional purposes, with the visitor&apos;s consent. If a visitor objects to such use, they may opt-out or change their registration information. We take reasonable steps to protect visitors&apos; information and maintain it in a secure environment. If you have submitted personal information and would like to change it or opt-out, please contact us as described below.
                        </p>

                        <h3 className="text-xl sm:text-2xl mt-10">DISCLOSURE OF INFORMATION</h3>
                        <p>
                            Canada Coach Charters is committed to protecting your privacy. We will only use the information you provide to us in accordance with this Privacy Policy. Your personal information will only be disclosed to a Company agent in specific circumstances, such as: i) in accordance with the terms of this Privacy Policy; ii) to comply with legal requirements such as a law, regulation, warrant, subpoena or court order; and/or iii) if you are reporting an adverse event/side effect, in which case Canada Coach Charters may be required to disclose such information to bodies such as Canadian and/or international regulatory authorities.
                        </p>
                        <p>
                            Please note that any of these disclosures may involve the storage or processing of personal information outside of Canada and may, therefore, be subject to different privacy laws than those applicable in Canada, including laws that require the disclosure of personal information to governmental authorities under circumstances that are different than those that apply in Canada.
                        </p>

                        <h3 className="text-xl sm:text-2xl mt-10">AI CHAT ASSISTANT</h3>
                        <p>
                            Our website features an AI-powered chat assistant to help you with enquiries, service information, and quote requests. When you use the AI chat widget, we collect your name and email address before the conversation begins. This information is used solely to personalise your chat session and, if you request a quote, to associate that quote with your contact details so our team can follow up with you.
                        </p>
                        <p>
                            Your chat conversations are processed by OpenAI (ChatGPT) in order to generate responses. Messages you send are transmitted to OpenAI&apos;s servers and are subject to{" "}
                            <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">OpenAI&apos;s Privacy Policy</a>.
                            We do not store the full transcript of your chat conversation on our servers. Quote requests submitted through the chat are stored in our system in the same way as quotes submitted via our contact form.
                        </p>
                        <p>
                            Contact details you provide at the start of a chat session (name and email) are stored in our system as a chat lead record. If you begin multiple chat sessions using the same email address, your existing record is updated rather than duplicated. This data is accessible only to authorised Canada Coach Charters staff and is never sold to third parties.
                        </p>

                        <h3 className="text-xl sm:text-2xl mt-10">COOKIES</h3>
                        <p>
                            We use standard technology called cookies on our Sites. Cookies are small data files that are downloaded onto your computer when you visit a particular web site. You can disable cookies by turning them off in your browser; however, some areas of the Sites may not function properly if you do so.
                        </p>

                        <h3 className="text-xl sm:text-2xl mt-10">PROTECTION OF CHILDREN ONLINE</h3>
                        <p>
                            At Canada Coach Charters, we take children&apos;s privacy very seriously, especially when it comes to the internet. We do not knowingly collect or solicit personal information from children or allow them to request information through our sites or help-seeking information lines.
                        </p>

                        <h3 className="text-xl sm:text-2xl mt-10">ADDITIONAL TERMS FOR CERTAIN WEBSITES</h3>
                        <p>
                            If you&apos;re registering for one of our Sites, we may need to collect some personal information from you. Normally, you do not have to provide us with any personal information just to use our Sites. However, sometimes we need that information in order to give you a product or service that you&apos;ve requested.
                        </p>

                        <h3 className="text-xl sm:text-2xl mt-10">PROTECTION OF INFORMATION</h3>
                        <p>
                            At Canada Coach Charters, we are committed to protecting the security of your personal information. We have implemented physical, electronic, and managerial procedures to safeguard and help prevent unauthorized access, maintain data security, and correctly use the information we collect online. Only authorized employees who need access to your personal information in order to perform their job duties will have access to it. Our hosting providers are required by contract to provide the same level of security as we have implemented and maintain compliance with our Privacy Policy.
                        </p>

                        <h3 className="text-xl sm:text-2xl mt-10">POLICY CHANGE</h3>
                        <p>
                            Our Privacy Policy may change from time to time. If we make any changes to our policy, we will post those changes on this page of our Site so that you are always aware of the information we collect, how we use it and under what circumstances we may disclose it.
                        </p>

                        <h3 className="text-xl sm:text-2xl mt-10">ACCEPTANCE OF OUR PRIVACY POLICY</h3>
                        <p>
                            This Site and all other Canada Coach Charters Sites use cookies and other similar technologies. This Privacy Policy governs the manner in which we collect, use, disclose, and otherwise make use of your personal information. Please read this Privacy Policy carefully. By accessing or using our Sites, you agree to the terms of this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our Sites.
                        </p>

                        <h3 className="text-xl sm:text-2xl mt-10">CONTACT INFORMATION</h3>
                        <p>
                            Canada Coach Charters<br />
                            Phone: +1 (647) 846-4140<br />
                            Email: info@canadacoachcharters.ca<br />
                            Address: 95 Mural St, Richmond Hill, ON L4B 3G2, Canada
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
