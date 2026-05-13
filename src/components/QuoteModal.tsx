"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import BookingCard from "@/components/BookingCard";

type ServiceType = "charter" | "transfer" | "tour";

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    serviceType: ServiceType;
    context?: string;
    initialTourSlug?: string;
}

export default function QuoteModal({
    isOpen,
    onClose,
    title,
    serviceType,
    context,
    initialTourSlug,
}: QuoteModalProps) {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let hideTimer: ReturnType<typeof setTimeout> | null = null;

        if (isOpen) {
            setShouldRender(true);
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
            hideTimer = setTimeout(() => setShouldRender(false), 220);
        }

        return () => {
            if (hideTimer) clearTimeout(hideTimer);
        };
    }, [isOpen]);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-3 transition-opacity duration-200 sm:items-center sm:p-4 ${isVisible ? "bg-slate-900/60 opacity-100" : "bg-slate-900/0 opacity-0"
                }`}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={title}
        >
            <div
                className={`relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2rem)] transition-all duration-200 ${isVisible
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-3 scale-[0.98] opacity-0"
                    }`}
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-3 top-3 rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                    aria-label="Close quote modal"
                >
                    <X className="h-4 w-4" />
                </button>

                <div className="mb-2 border-b border-slate-100 px-4 pb-3 pt-4 pr-10 sm:px-6 sm:pb-4 sm:pt-5">
                    <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                </div>

                <div className="overflow-y-auto px-4 pb-4 sm:px-6 sm:pb-6">
                    <BookingCard
                        mode="quote"
                        variant="section"
                        initialServiceType={serviceType}
                        quoteContext={context}
                        initialTourSlug={initialTourSlug}
                    />
                </div>
            </div>
        </div>
    );
}
