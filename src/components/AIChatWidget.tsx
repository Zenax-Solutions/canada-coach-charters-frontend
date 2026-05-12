"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
    X,
    Send,
    Loader2,
    MoreHorizontal,
    Maximize2,
    MessageCircle,
    ArrowUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ChatState = "closed" | "lead-form" | "chat";

/* ── Web Audio sound helpers ── */
function playWidgetPopSound() {
    try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
        osc.onended = () => ctx.close();
    } catch { /* ignore — AudioContext may be blocked */ }
}

function playAIResponseSound() {
    try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        // Two-tone ascending chime
        const notes = [660, 880];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = "sine";
            const start = ctx.currentTime + i * 0.13;
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.0, start);
            gain.gain.linearRampToValueAtTime(0.16, start + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.28);
            osc.start(start);
            osc.stop(start + 0.28);
            if (i === notes.length - 1) osc.onended = () => ctx.close();
        });
    } catch { /* ignore */ }
}

interface LeadInfo {
    name: string;
    email: string;
}

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

const SUGGESTED_QUESTIONS = [
    "What services do you offer?",
    "Tell me about your fleet",
    "I need a quote",
    "What areas do you serve?",
];

/* ── Bot avatar SVG ── */
function BotAvatar({ size = 36 }: { size?: number }) {
    return (
        <div
            className="relative shrink-0 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-sm"
            style={{ width: size, height: size }}
        >
            {/* simple bus icon in white */}
            <svg
                width={size * 0.52}
                height={size * 0.52}
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M8 6v6" />
                <path d="M16 6v6" />
                <path d="M2 12h20" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M6 20v1M18 20v1" />
                <circle cx="7" cy="17" r="1" fill="white" stroke="none" />
                <circle cx="17" cy="17" r="1" fill="white" stroke="none" />
            </svg>
            {/* online dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
        </div>
    );
}

function MessageBubble({ message }: { message: Message }) {
    const isUser = message.role === "user";
    return (
        <div className={cn("flex items-end gap-2.5", isUser ? "justify-end" : "justify-start")}>
            {!isUser && <BotAvatar size={30} />}
            <div
                className={cn(
                    "max-w-[75%] px-4 py-2.5 text-[0.84rem] leading-relaxed whitespace-pre-wrap break-words",
                    isUser
                        ? "bg-blue-600 text-white rounded-2xl rounded-br-none shadow-sm"
                        : "bg-white text-slate-800 rounded-2xl rounded-bl-none shadow-sm border border-slate-100"
                )}
            >
                {message.content}
            </div>
        </div>
    );
}

function TypingIndicator() {
    return (
        <div className="flex items-end gap-2.5 justify-start">
            <BotAvatar size={30} />
            <div className="bg-white border border-slate-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-none">
                <div className="flex gap-1 items-center h-3">
                    {[0, 160, 320].map((delay) => (
                        <span
                            key={delay}
                            className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: `${delay}ms` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── Privacy bar (dismissible) ── */
function PrivacyBar({ onDismiss }: { onDismiss: () => void }) {
    return (
        <div className="mx-4 mb-3 flex items-start gap-2 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5 text-[0.7rem] text-slate-500 leading-snug">
            <span className="flex-1">
                By chatting here, you agree we and authorized partners may process, monitor, and
                record this chat in line with our{" "}
                <a href="/privacy-policy" className="underline text-blue-600 hover:text-blue-700">
                    Privacy Policy
                </a>
                .
            </span>
            <button
                onClick={onDismiss}
                className="shrink-0 mt-0.5 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Dismiss"
            >
                <X className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}

export default function AIChatWidget() {
    const [chatState, setChatState] = useState<ChatState>("closed");
    const [lead, setLead] = useState<LeadInfo | null>(null);
    const [leadName, setLeadName] = useState("");
    const [leadEmail, setLeadEmail] = useState("");
    const [leadError, setLeadError] = useState("");
    const [leadLoading, setLeadLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [privacyDismissed, setPrivacyDismissed] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const leadNameRef = useRef<HTMLInputElement>(null);
    const hasPlayedPopRef = useRef(false);

    // Play a soft pop sound shortly after the page loads
    useEffect(() => {
        if (hasPlayedPopRef.current) return;
        hasPlayedPopRef.current = true;
        const t = setTimeout(playWidgetPopSound, 1800);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (chatState === "chat") {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, chatState, isLoading]);

    useEffect(() => {
        if (chatState === "lead-form") {
            setTimeout(() => leadNameRef.current?.focus(), 120);
        }
        if (chatState === "chat") {
            setTimeout(() => inputRef.current?.focus(), 120);
        }
    }, [chatState]);

    const openChat = () => {
        setUnreadCount(0);
        if (chatState === "closed") setChatState("lead-form");
    };

    const closeChat = () => setChatState("closed");

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const name = leadName.trim();
        const email = leadEmail.trim();

        if (!name || !email) { setLeadError("Please fill in both fields."); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setLeadError("Please enter a valid email address.");
            return;
        }

        setLeadLoading(true);
        setLeadError("");

        try {
            await fetch("/api/chat/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            });
        } catch { /* silent */ }

        const leadInfo: LeadInfo = { name, email };
        const firstName = name.split(" ")[0];
        setLead(leadInfo);

        setMessages([{
            id: "welcome",
            role: "assistant",
            content: `Good afternoon! Welcome to Canada Coach Charters, where we bring you the best in premium coach travel across Canada. It's a pleasure to have you here. To assist you better, could you please share what you're looking for today? I can help with services, fleet information, booking a quote, and more.`,
        }]);

        playAIResponseSound();
        setChatState("chat");
        setLeadLoading(false);

        // Greet with name on next tick
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: "welcome-name",
                    role: "assistant",
                    content: `I see you're ${firstName}! How can I assist you today? 😊`,
                },
            ]);
        }, 800);
    };

    const sendMessage = useCallback(
        async (text?: string) => {
            const msgText = (text ?? input).trim();
            if (!msgText || isLoading) return;

            const userMsg: Message = { id: Date.now().toString(), role: "user", content: msgText };
            const nextMessages = [...messages, userMsg];
            setMessages(nextMessages);
            setInput("");
            setIsLoading(true);

            try {
                const res = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
                        lead,
                    }),
                });
                const data = (await res.json()) as { content?: string };
                playAIResponseSound();
                setMessages((prev) => [
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        role: "assistant",
                        content: data.content ?? "Sorry, I couldn't generate a response. Please try again.",
                    },
                ]);
                if (chatState === "closed") setUnreadCount((n) => n + 1);
            } catch {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        role: "assistant",
                        content: "Sorry, I'm having trouble connecting. Please try again or call us at +1 (647) 846-4140.",
                    },
                ]);
            } finally {
                setIsLoading(false);
            }
        },
        [input, isLoading, lead, messages, chatState]
    );

    const panelVisible = chatState !== "closed";
    const panelH = expanded ? "h-[calc(100vh-6rem)]" : "h-[560px]";

    return (
        <>
            {/* ════════ PANEL ════════ */}
            <div
                className={cn(
                    "fixed bottom-[5.2rem] right-4 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-out overflow-hidden",
                    panelH,
                    panelVisible
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-5 pointer-events-none"
                )}
                style={chatState === "lead-form" ? { height: "auto" } : undefined}
                aria-hidden={!panelVisible}
            >
                {/* ── Header ── */}
                <div className="shrink-0 flex items-center justify-between px-4 pt-4 pb-3 border-b border-slate-100">
                    {/* Expand / back */}
                    <button
                        onClick={() => setExpanded((v) => !v)}
                        className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-500"
                        aria-label="Expand"
                    >
                        <Maximize2 className="w-4 h-4" />
                    </button>

                    {/* Centre: avatar + name */}
                    <div className="flex flex-col items-center gap-1">
                        <BotAvatar size={40} />
                        <p className="text-[0.82rem] font-bold text-slate-800 leading-none">
                            Canada Coach AI
                        </p>
                        <p className="text-[0.68rem] text-slate-400 leading-none">AI assistant</p>
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-1">
                        <button
                            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-500"
                            aria-label="Options"
                        >
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                        <button
                            onClick={closeChat}
                            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-500"
                            aria-label="Close chat"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* ── Lead-capture form ── */}
                {chatState === "lead-form" && (
                    <div className="p-5 flex flex-col gap-4">
                        {/* Bot message */}
                        <div className="flex items-start gap-2.5">
                            <BotAvatar size={30} />
                            <div className="bg-white border border-slate-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-none text-[0.84rem] text-slate-700 leading-relaxed max-w-[80%]">
                                Good afternoon! Welcome to Canada Coach Charters. To assist you
                                better, could you please share your{" "}
                                <strong>name</strong> and <strong>email</strong> with me?
                            </div>
                        </div>

                        <form onSubmit={handleLeadSubmit} className="space-y-2.5 mt-1">
                            <input
                                ref={leadNameRef}
                                type="text"
                                placeholder="Your full name"
                                value={leadName}
                                onChange={(e) => setLeadName(e.target.value)}
                                autoComplete="name"
                                className="w-full h-10 px-3.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                            <input
                                type="email"
                                placeholder="Your email address"
                                value={leadEmail}
                                onChange={(e) => setLeadEmail(e.target.value)}
                                autoComplete="email"
                                className="w-full h-10 px-3.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                            {leadError && (
                                <p className="text-xs text-red-500 font-medium pl-1">{leadError}</p>
                            )}
                            <button
                                type="submit"
                                disabled={leadLoading}
                                className="w-full h-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                                {leadLoading
                                    ? <Loader2 className="w-4 h-4 animate-spin" />
                                    : "Start chatting"}
                            </button>
                        </form>

                        {/* Privacy */}
                        <p className="text-[0.68rem] text-slate-400 text-center leading-relaxed">
                            By chatting here, you agree we and authorized partners may process,
                            monitor, and record this chat in line with our{" "}
                            <a href="/privacy-policy" className="underline hover:text-blue-600">
                                Privacy Policy
                            </a>
                            .
                        </p>
                        <p className="text-center text-[0.65rem] text-slate-300">
                            Powered by Canada Coach AI
                        </p>
                    </div>
                )}

                {/* ── Chat interface ── */}
                {chatState === "chat" && (
                    <>
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#f7f8fa] scroll-smooth">
                            {messages.map((msg) => (
                                <MessageBubble key={msg.id} message={msg} />
                            ))}
                            {isLoading && <TypingIndicator />}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick suggestions */}
                        {messages.filter((m) => m.role === "user").length === 0 && !isLoading && (
                            <div className="px-4 pt-2 pb-1 flex flex-wrap gap-1.5 bg-[#f7f8fa] shrink-0">
                                {SUGGESTED_QUESTIONS.map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => sendMessage(q)}
                                        className="px-3 py-1.5 text-[0.72rem] font-medium bg-white hover:bg-blue-50 text-blue-700 rounded-full border border-blue-200 shadow-sm transition-colors"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Privacy bar */}
                        {!privacyDismissed && (
                            <PrivacyBar onDismiss={() => setPrivacyDismissed(true)} />
                        )}

                        {/* Input area */}
                        <div className="shrink-0 px-4 pb-3 pt-2 border-t border-slate-100 bg-white">
                            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-sm">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Write a message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            sendMessage();
                                        }
                                    }}
                                    disabled={isLoading}
                                    className="flex-1 bg-transparent text-[0.84rem] outline-none text-slate-700 placeholder:text-slate-400 min-w-0"
                                />
                                <button
                                    onClick={() => sendMessage()}
                                    disabled={!input.trim() || isLoading}
                                    className="w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 flex items-center justify-center transition-colors shrink-0"
                                    aria-label="Send"
                                    type="button"
                                >
                                    <ArrowUp className="w-3.5 h-3.5 text-white" />
                                </button>
                            </div>
                            <p className="text-center text-[0.62rem] text-slate-300 mt-1.5">
                                Powered by Canada Coach AI
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* ════════ TRIGGER ════════ */}
            <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
                {/* Pill bar — only when closed */}
                {chatState === "closed" && (
                    <button
                        onClick={openChat}
                        className="flex items-center gap-2.5 h-14 pl-6 pr-3.5 rounded-full bg-white shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-200 group"
                    >
                        <span className="text-[0.9rem] text-slate-500 group-hover:text-slate-700 transition-colors whitespace-nowrap">
                            Write a message...
                        </span>
                        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors shrink-0">
                            <ArrowUp className="w-4 h-4 text-slate-500" />
                        </div>
                    </button>
                )}

                {/* Round chat button */}
                <button
                    onClick={chatState === "closed" ? openChat : closeChat}
                    className="relative w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg flex items-center justify-center transition-all duration-200 shrink-0"
                    aria-label={chatState !== "closed" ? "Close chat" : "Open AI chat"}
                >
                    {chatState !== "closed" ? (
                        <X className="w-6 h-6 text-white" />
                    ) : (
                        <MessageCircle className="w-6 h-6 text-white" />
                    )}
                    {unreadCount > 0 && chatState === "closed" && (
                        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[0.6rem] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white">
                            {unreadCount}
                        </span>
                    )}
                </button>
            </div>
        </>
    );
}
