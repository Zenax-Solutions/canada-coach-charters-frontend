import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, ChevronRight } from "lucide-react";
import { storageUrl } from "@/lib/api";

interface ApiGalleryItem {
    id: number;
    title: string | null;
    image_path: string;
    album: { name: string } | null;
}

async function getGalleryItems(): Promise<ApiGalleryItem[]> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/gallery?per_page=48`,
            { next: { revalidate: 60 } }
        );
        if (!res.ok) return [];
        const json = await res.json();
        return json.data ?? [];
    } catch {
        return [];
    }
}

export default async function GalleryPage() {
    const apiItems = await getGalleryItems();

    // Normalise to a flat list for the grid
    const items = apiItems
        .map((item) => {
            const src = storageUrl(item.image_path) ?? item.image_path;
            return {
                src,
                title: item.title ?? "Gallery Image",
                category: item.album?.name ?? "Gallery",
            };
        })
        .filter((item) => Boolean(item.src));

    return (<div className="min-h-screen bg-white p-1 sm:p-4">
        <div className="relative rounded-3xl overflow-hidden">
            <Header />

            <section className="relative pt-36 pb-20 px-2 sm:px-8 lg:px-10">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/page-header/gallery-3.webp')" }}
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
                        <span className="text-white font-medium">Gallery</span>
                    </nav>

                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-blue-200 border border-blue-500 bg-blue-600/50 rounded-full px-4 py-1.5 mb-5">
                        <Camera className="w-3.5 h-3.5" />
                        Photo Gallery
                    </span>

                    <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-2xl">
                        Our Gallery
                    </h1>
                    <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-3xl">
                        Explore highlights from our fleet, services, and group transportation
                        experiences across Toronto and beyond.
                    </p>
                </div>
            </section>
        </div>

        <section className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="inline-block text-xs font-semibold text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
                        Collection
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
                        Moments From Our Services
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
                        A curated collection of vehicles, travel experiences, and event transportation moments.
                    </p>
                </div>

                {items.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item, i) => (
                            <Link
                                key={`${item.src}-${i}`}
                                href={item.src}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                            >
                                <div className="relative h-56 w-full bg-slate-100">
                                    <Image
                                        src={item.src}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                    />
                                </div>
                                <div className="p-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-600 mb-2">
                                        {item.category}
                                    </p>
                                    <h3 className="text-base font-bold text-gray-900 leading-tight mb-3">
                                        {item.title}
                                    </h3>
                                    <span className="inline-flex items-center justify-between gap-3 pl-4 pr-1.5 py-1.5 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors font-semibold text-white text-xs">
                                        View Image
                                        <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                                            <ChevronRight className="w-4 h-4 text-blue-700" />
                                        </span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600">
                        Gallery images will appear here once items are published from the admin panel.
                    </div>
                )}
            </div>
        </section>

        <QuoteSection />
        <Footer />
    </div>
    );
}
