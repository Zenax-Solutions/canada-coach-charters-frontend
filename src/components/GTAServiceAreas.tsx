"use client";

import Image from "next/image";
import { Navigation } from "lucide-react";
import { useRef, useState, useCallback } from "react";

const cities = [
    "Toronto",
    "Mississauga",
    "Brampton",
    "Vaughan",
    "Markham",
    "Richmond Hill",
    "Scarborough",
    "Oakville",
    "Burlington",
    "Pickering",
    "Ajax",
    "Whitby",
];

const regions = ["Toronto Core", "West GTA", "East GTA"];

const MIN_SCALE = 2;
const MAX_SCALE = 2;
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export default function GTAServiceAreas() {
    const [scale, setScale] = useState(2);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // --- drag ---
    const drag = useRef<{ active: boolean; startX: number; startY: number; tx: number; ty: number }>({
        active: false, startX: 0, startY: 0, tx: 0, ty: 0,
    });

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        drag.current = { active: true, startX: e.clientX, startY: e.clientY, tx: translate.x, ty: translate.y };
    }, [translate]);

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        if (!drag.current.active) return;
        setTranslate({ x: drag.current.tx + e.clientX - drag.current.startX, y: drag.current.ty + e.clientY - drag.current.startY });
    }, []);

    const stopDrag = useCallback(() => { drag.current.active = false; }, []);

    // --- wheel zoom ---
    const onWheel = useCallback((e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        setScale((s) => clamp(s * delta, MIN_SCALE, MAX_SCALE));
    }, []);

    // --- touch ---
    const touch = useRef<{ lastDist: number | null; startX: number; startY: number; tx: number; ty: number }>({
        lastDist: null, startX: 0, startY: 0, tx: 0, ty: 0,
    });

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            touch.current.lastDist = Math.hypot(dx, dy);
        } else if (e.touches.length === 1) {
            touch.current = { lastDist: null, startX: e.touches[0].clientX, startY: e.touches[0].clientY, tx: translate.x, ty: translate.y };
        }
    }, [translate]);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
        e.preventDefault();
        if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.hypot(dx, dy);
            if (touch.current.lastDist !== null) {
                const ratio = dist / touch.current.lastDist;
                setScale((s) => clamp(s * ratio, MIN_SCALE, MAX_SCALE));
            }
            touch.current.lastDist = dist;
        } else if (e.touches.length === 1) {
            setTranslate({ x: touch.current.tx + e.touches[0].clientX - touch.current.startX, y: touch.current.ty + e.touches[0].clientY - touch.current.startY });
        }
    }, []);

    const onTouchEnd = useCallback(() => { touch.current.lastDist = null; }, []);

    const resetView = () => { setScale(2); setTranslate({ x: 0, y: 0 }); };

    return (
        <section className="bg-gradient-to-b from-slate-50 via-white to-blue-50/40 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_45px_-32px_rgba(15,23,42,0.35)] sm:p-7">
                    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-3xl">
                            <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-blue-700">
                                GTA Service Areas
                            </span>
                            <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                                Serving Toronto & the Greater Toronto Area
                            </h2>
                            <p className="mt-2 text-sm text-slate-600 sm:text-base">
                                Reliable coach transportation across 12 major cities in and around the GTA.
                            </p>
                        </div>
                    </div>

                    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                    <div
                        ref={containerRef}
                        className="relative h-[420px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 cursor-grab active:cursor-grabbing select-none"
                        onWheel={onWheel}
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={stopDrag}
                        onMouseLeave={stopDrag}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <div
                            className="absolute inset-0 transition-none will-change-transform"
                            style={{ transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`, transformOrigin: "center center" }}
                        >
                            <Image
                                src="/map.png"
                                alt="GTA service area map"
                                fill
                                className="object-contain"
                                draggable={false}
                            />
                        </div>

                        {/* Toronto callout */}
                        <div className="pointer-events-none absolute bottom-16 right-[19%] z-10 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
                            <div className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900">
                                <Navigation className="h-3.5 w-3.5 text-blue-600" />
                                Toronto
                            </div>
                            <p className="mt-0.5 text-xs text-slate-500">Ontario, Canada</p>
                        </div>

                        {/* Zoom controls */}
                        <div className="absolute bottom-4 right-4 z-10 flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                            <button
                                className="h-8 w-8 text-base text-slate-600 hover:bg-slate-50"
                                onClick={() => setScale((s) => clamp(s * 1.25, MIN_SCALE, MAX_SCALE))}
                            >+</button>
                            <button
                                className="h-8 w-8 border-t border-slate-200 text-base text-slate-600 hover:bg-slate-50"
                                onClick={() => setScale((s) => clamp(s * 0.8, MIN_SCALE, MAX_SCALE))}
                            >-</button>
                            <button
                                title="Reset"
                                className="h-8 w-8 border-t border-slate-200 text-[10px] font-semibold text-slate-500 hover:bg-slate-50"
                                onClick={resetView}
                            >⤢</button>
                        </div>
                    </div>


                </div>
            </div>
        </section>
    );
}
