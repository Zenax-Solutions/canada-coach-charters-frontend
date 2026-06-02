import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://canadacoachcharters.ca";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    return [
        {
            url: `${siteUrl}/`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${siteUrl}/about`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/services`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${siteUrl}/fleet`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${siteUrl}/transfers`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/gallery`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${siteUrl}/tours`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/blog`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${siteUrl}/contact`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${siteUrl}/faq`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/privacy-policy`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];
}
