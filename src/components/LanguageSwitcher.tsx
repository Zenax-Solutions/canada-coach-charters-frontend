"use client";

import { useEffect, useRef, useState } from "react";
import { Languages, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

declare global {
    interface Window {
        google: {
            translate: {
                TranslateElement: new (
                    config: Record<string, unknown>,
                    elementId: string
                ) => void;
            };
        };
        googleTranslateElementInit: () => void;
    }
}

const LANG_KEY = "ccc_lang";

const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
];

function getSavedLang(): string {
    if (typeof window === "undefined") return "en";
    try {
        const saved = localStorage.getItem(LANG_KEY);
        if (saved === "en" || saved === "fr") return saved;
    } catch {}
    return "en";
}

function saveLang(code: string) {
    try {
        localStorage.setItem(LANG_KEY, code);
    } catch {}
}

function triggerGoogleTranslate(code: string) {
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
        select.value = code;
        select.dispatchEvent(new Event("change"));
        return true;
    }
    return false;
}

export default function LanguageSwitcher() {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState("en");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const restored = useRef(false);

    useEffect(() => {
        if (typeof window.googleTranslateElementInit === "undefined") {
            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement(
                    {
                        autoDisplay: false,
                        includedLanguages: "en,fr",
                    },
                    "google_translate_element"
                );
            };

            const script = document.createElement("script");
            script.src =
                "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    useEffect(() => {
        const saved = getSavedLang();
        setCurrent(saved);

        if (saved !== "en") {
            const interval = setInterval(() => {
                if (triggerGoogleTranslate(saved)) {
                    clearInterval(interval);
                }
            }, 300);
            setTimeout(() => clearInterval(interval), 10000);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const changeLanguage = (code: string) => {
        if (code === current) return;
        setOpen(false);

        if (code === "en") {
            const cookie = document.cookie.split(";").find((c) => c.trim().startsWith("googtrans="));
            if (cookie) {
                document.cookie = "googtrans=; path=/; max-age=0";
            }
            saveLang("en");
            setCurrent("en");
            window.location.reload();
            return;
        }

        setCurrent(code);
        saveLang(code);
        triggerGoogleTranslate(code);
    };

    const active = languages.find((l) => l.code === current) ?? languages[0];

    return (
        <div ref={dropdownRef} className="relative">
            <div id="google_translate_element" className="hidden" />

            <button
                onClick={() => setOpen((prev) => !prev)}
                className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                    "text-white/85 hover:text-white hover:bg-white/10"
                )}
            >
                <Languages className="w-4 h-4" />
                <span>{active.flag}</span>
                <ChevronDown
                    className={cn(
                        "w-3 h-3 transition-transform duration-200",
                        open && "rotate-180"
                    )}
                />
            </button>

            <div
                className={cn(
                    "absolute top-full right-0 mt-1 w-36 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-100 py-1.5 z-50",
                    "transition-all duration-200 origin-top",
                    open
                        ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
                )}
            >
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={cn(
                            "w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors",
                            lang.code === current
                                ? "text-blue-700 font-semibold bg-blue-50"
                                : "text-gray-700 hover:bg-gray-50"
                        )}
                    >
                        <span>{lang.flag}</span>
                        {lang.label}
                    </button>
                ))}
            </div>

            <select className="hidden" />
        </div>
    );
}
