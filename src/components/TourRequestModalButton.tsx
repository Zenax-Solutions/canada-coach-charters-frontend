"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import QuoteModal from "@/components/QuoteModal";

interface TourRequestModalButtonProps {
    tourSlug: string;
    tourTitle: string;
}

export default function TourRequestModalButton({
    tourSlug,
    tourTitle,
}: TourRequestModalButtonProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="mt-4 inline-flex w-full items-center justify-between gap-3 rounded-full bg-blue-700 pl-5 pr-2 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
            >
                <span>Request This Tour</span>
                <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                    <ChevronRight className="w-4 h-4 text-blue-700" />
                </span>
            </button>

            <QuoteModal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Request This Tour"
                serviceType="tour"
                context={`Tour quote request for: ${tourTitle}`}
                initialTourSlug={tourSlug}
            />
        </>
    );
}
