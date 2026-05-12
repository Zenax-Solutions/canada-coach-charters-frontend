export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/45 backdrop-blur-sm">
            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/90 px-5 py-4 shadow-xl">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                <span className="text-sm font-semibold text-slate-800">Loading page...</span>
            </div>
        </div>
    );
}
