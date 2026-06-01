import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, ChevronRight } from "lucide-react";
import { storageUrl } from "@/lib/api";

interface ApiPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    featured_image: string | null;
    author: string;
    published_at: string | null;
    category: { name: string } | null;
}

async function getPosts(): Promise<ApiPost[]> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/blog?per_page=12`,
            { next: { revalidate: 60 } }
        );
        if (!res.ok) return [];
        const json = await res.json();
        return json.data ?? [];
    } catch {
        return [];
    }
}

function formatDate(iso: string | null) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPage() {
    const apiPosts = await getPosts();
    const hasPosts = apiPosts.length > 0;

    return (
        <div className="min-h-screen bg-white p-1 sm:p-4">
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
                            <span className="text-white font-medium">Blog</span>
                        </nav>

                        <span className="inline-block text-xs font-semibold text-blue-200 border border-blue-500 bg-blue-600/50 rounded-full px-4 py-1.5 mb-5">
                            Travel Insights
                        </span>

                        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-2xl">
                            Our Blog
                        </h1>
                        <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-3xl">
                            Practical transportation guides, planning tips, and fleet insights to help
                            you organize smarter group travel across Toronto and beyond.
                        </p>
                    </div>
                </section>
            </div>

            <section className="py-16 lg:py-24 px-2 sm:px-8 lg:px-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-semibold text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
                            {hasPosts ? `${apiPosts.length} Article${apiPosts.length !== 1 ? "s" : ""}` : "Latest Post"}
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
                            {hasPosts ? "Latest Articles" : "No Articles Yet"}
                        </h2>
                    </div>

                    {hasPosts ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {apiPosts.map((post) => {
                                const imgSrc = storageUrl(post.featured_image);
                                const isLocalBackendImage = Boolean(
                                    imgSrc && (imgSrc.startsWith("http://localhost:") || imgSrc.startsWith("http://127.0.0.1:"))
                                );
                                return (
                                    <article
                                        key={post.id}
                                        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                                    >
                                        <div className="relative h-52 w-full">
                                            {imgSrc ? (
                                                <Image
                                                    src={imgSrc}
                                                    alt={post.title}
                                                    fill
                                                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                                    unoptimized={isLocalBackendImage}
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
                                            {post.category && (
                                                <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                                    {post.category.name}
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-5">
                                            {post.published_at && (
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {formatDate(post.published_at)}
                                                </div>
                                            )}
                                            <h3 className="text-base font-bold text-gray-900 leading-tight mb-2 line-clamp-2">
                                                {post.title}
                                            </h3>
                                            {post.excerpt && (
                                                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                            )}
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-2 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors font-semibold text-white text-xs"
                                            >
                                                Read More
                                                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                                                    <ChevronRight className="w-4 h-4 text-blue-700" />
                                                </span>
                                            </Link>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600">
                            Blog posts will appear here once they are published.
                        </div>
                    )}
                </div>
            </section>

            <QuoteSection />
            <Footer />
        </div>
    );
}

