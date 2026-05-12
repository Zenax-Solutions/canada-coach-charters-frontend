import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, ChevronLeft } from "lucide-react";
import { storageUrl } from "@/lib/api";

interface ApiPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    featured_image: string | null;
    author: string | null;
    published_at: string | null;
    category: { name: string } | null;
}

async function getPost(slug: string): Promise<ApiPost | null> {
    try {
        const base = process.env.NEXT_PUBLIC_API_URL;
        if (!base) return null;

        const res = await fetch(`${base}/blog/${slug}`, { next: { revalidate: 60 } });
        if (res.status === 404) return null;
        if (!res.ok) return null;

        return (await res.json()) as ApiPost;
    } catch {
        return null;
    }
}

function formatDate(iso: string | null) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    const imgSrc = storageUrl(post.featured_image);
    const isLocalBackendImage = Boolean(
        imgSrc && (imgSrc.startsWith("http://localhost:") || imgSrc.startsWith("http://127.0.0.1:"))
    );

    return (
        <div className="min-h-screen bg-white p-4">
            <div className="relative rounded-3xl overflow-hidden">
                <Header />

                <section className="relative pt-36 pb-20 px-6 sm:px-8 lg:px-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/page-header.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-black/60" />

                    <div className="relative max-w-4xl mx-auto">
                        <nav className="flex items-center gap-2 text-blue-200 text-sm mb-6">
                            <Link href="/" className="hover:text-white transition-colors">
                                Home
                            </Link>
                            <ArrowRight className="w-3.5 h-3.5" />
                            <Link href="/blog" className="hover:text-white transition-colors">
                                Blog
                            </Link>
                            <ArrowRight className="w-3.5 h-3.5" />
                            <span className="text-white font-medium">Post</span>
                        </nav>

                        {post.category && (
                            <span className="inline-block text-xs font-semibold text-blue-200 border border-blue-500 bg-blue-600/50 rounded-full px-4 py-1.5 mb-5">
                                {post.category.name}
                            </span>
                        )}

                        <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
                            {post.title}
                        </h1>

                        {post.published_at && (
                            <div className="flex flex-wrap items-center gap-4 text-sm text-blue-100">
                                <span className="inline-flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(post.published_at)}
                                </span>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <section className="py-16 lg:py-24 px-6 sm:px-8 lg:px-10">
                <article className="max-w-4xl mx-auto">
                    <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden mb-10">
                        {imgSrc ? (
                            <Image
                                src={imgSrc}
                                alt={post.title}
                                fill
                                sizes="(min-width: 1024px) 896px, 100vw"
                                unoptimized={isLocalBackendImage}
                                className="object-cover"
                            />
                        ) : (
                            <div className="h-full w-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300" />
                        )}
                    </div>

                    {post.excerpt && (
                        <p className="text-base text-gray-600 leading-relaxed mb-6">{post.excerpt}</p>
                    )}

                    {post.content ? (
                        <div
                            className="prose prose-slate max-w-none prose-headings:font-bold prose-p:leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    ) : (
                        <p className="text-base text-gray-600 leading-relaxed">No content available for this post.</p>
                    )}

                    <div className="mt-10">
                        <Link
                            href="/blog"
                            className="inline-flex items-center justify-between gap-4 pl-6 pr-2 py-2.5 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors font-semibold text-white text-sm"
                        >
                            <span className="inline-flex items-center gap-2">
                                <ChevronLeft className="w-4 h-4" />
                                Back to Blog
                            </span>
                        </Link>
                    </div>
                </article>
            </section>

            <QuoteSection />
            <Footer />
        </div>
    );
}
