"use client";

import { useState } from "react";
import { ChevronRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitQuote } from "@/lib/api";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const e: Record<string, string> = {};
        if (!name.trim()) e.name = "Name is required";
        if (!email.trim()) e.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
        return e;
    };

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length > 0) return;

        setSubmitting(true);
        setError(null);
        try {
            await submitQuote({
                name,
                email,
                phone: phone || undefined,
                message: message || undefined,
                service_type: "pricing",
            });
            setSuccess(true);
        } catch {
            setError("Something went wrong. Please try again or call us directly.");
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                    Thank you for reaching out. Our team will get back to you shortly.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`h-12 w-full rounded-xl border bg-gray-50 px-4 text-sm text-gray-700 outline-none transition-colors focus:border-blue-500 ${errors.name ? "border-red-400" : "border-gray-200"}`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />{errors.name}
                        </p>
                    )}
                </div>
                <input
                    type="tel"
                    placeholder="Phone number (optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition-colors focus:border-blue-500"
                />
            </div>

            <div>
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`h-12 w-full rounded-xl border bg-gray-50 px-4 text-sm text-gray-700 outline-none transition-colors focus:border-blue-500 ${errors.email ? "border-red-400" : "border-gray-200"}`}
                />
                {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />{errors.email}
                    </p>
                )}
            </div>

            <textarea
                rows={5}
                placeholder="Tell us about your trip"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-blue-500 resize-none"
            />

            {error && (
                <p className="text-red-500 text-sm flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />{error}
                </p>
            )}

            <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-between gap-4 pl-6 pr-2 py-2.5 rounded-full bg-blue-700 hover:bg-blue-800 disabled:opacity-70 text-base font-semibold text-white transition-colors"
            >
                {submitting ? "SENDING…" : "SEND MESSAGE"}
                <span className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0">
                    {submitting
                        ? <Loader2 className="w-5 h-5 text-blue-700 animate-spin" />
                        : <ChevronRight className="w-5 h-5 text-blue-700" />}
                </span>
            </button>
        </form>
    );
}
