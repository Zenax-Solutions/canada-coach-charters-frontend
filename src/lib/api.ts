const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';
const BACKEND = BASE.replace('/api/v1', '');

/** Full URL for a Laravel storage file (e.g. "gallery/photo.jpg" → "http://localhost:8000/storage/gallery/photo.jpg") */
export const storageUrl = (path: string | null | undefined): string | null =>
    path ? `${BACKEND}/storage/${path}` : null;

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE}${path}`, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...init?.headers },
        ...init,
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw error;
    }
    return res.json();
}

export const submitQuote = (data: Record<string, unknown>) =>
    apiFetch('/quote', { method: 'POST', body: JSON.stringify(data) });

export const fetchBlogs = (params?: string) =>
    apiFetch(`/blog${params ? '?' + params : ''}`);

export const fetchBlog = (slug: string) =>
    apiFetch(`/blog/${slug}`);

export const fetchTours = (params?: string) =>
    apiFetch(`/tours${params ? '?' + params : ''}`);

export const fetchTour = (slug: string) =>
    apiFetch(`/tours/${slug}`);

export const fetchGallery = (params?: string) =>
    apiFetch(`/gallery${params ? '?' + params : ''}`);

export const fetchGalleryAlbums = () =>
    apiFetch('/gallery/albums');
