"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type Msg = { id: string; role: "user" | "assistant"; content: string };

export default function Home() {
  // Simple ID helper
  const genId = () => {
    try {
      const id = (globalThis as unknown as { crypto?: { randomUUID?: () => string } }).crypto?.randomUUID?.();
      if (id) return id;
    } catch {}
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  };

  const useEcho = process.env.NEXT_PUBLIC_TEST_ECHO === "1";
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => setMounted(true), []);

  return (
    <div className="relative min-h-dvh flex flex-col bg-[radial-gradient(85%_70%_at_50%_0%,#1356a8_0%,#0b3670_55%,#0a2146_100%)]">
      {/* decorative rings */}
      <div className="pointer-events-none absolute inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 1200 800" aria-hidden>
          <defs>
            <radialGradient id="rg" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.22" />
              <stop offset="60%" stopColor="#0ea5e9" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="600" cy="280" r="220" fill="none" stroke="url(#rg)" strokeWidth="2" />
          <circle cx="600" cy="280" r="320" fill="none" stroke="url(#rg)" strokeWidth="2" />
          <circle cx="600" cy="280" r="420" fill="none" stroke="url(#rg)" strokeWidth="2" />
          <circle cx="600" cy="280" r="520" fill="none" stroke="url(#rg)" strokeWidth="2" />
        </svg>
      </div>
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-[#0b2144]/60 bg-[#0b2144]/80 border-b border-cyan-400/20 shadow-[0_1px_0_0_rgba(3,8,23,0.6)]">
        <div className="mx-auto max-w-5xl px-4 py-2.5 flex items-center gap-3">
          <div className="relative size-9 grid place-items-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
            <span className="text-[11px]">🤖</span>
            <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-cyan-400/30" />
          </div>
          <div className="mr-auto">
            <h1 className="text-sm font-semibold tracking-wide text-cyan-200">Nova Chat</h1>
            <p className="text-[11px] text-cyan-100/70">Neon UI • Fast responses</p>
          </div>
          {mounted && (
            <div className="flex items-center gap-2" suppressHydrationWarning>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-[#0e2244]/70 px-2.5 py-1 text-xs text-cyan-100">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                OpenRouter
              </span>
              <button title="Help" className="h-8 w-8 grid place-items-center rounded-md border border-cyan-400/20 text-cyan-100/90 hover:bg-white/5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1.5 1.1-1.5 2v.2"/><circle cx="12" cy="17" r=".8"/></svg>
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
  <div className="rounded-3xl border border-cyan-400/20 bg-[#0b2144]/70 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] overflow-hidden">
          <main className="px-4 py-6 md:px-6 md:py-8">
            {messages.length === 0 && (
              <section className="mb-5 grid gap-3 sm:grid-cols-2">
                {["Plan a 3-day trip to Tokyo", "Rewrite this text more friendly", "Explain this code snippet", "Brainstorm startup ideas"].map(
                  (s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setInput(s)}
                      className="text-left rounded-2xl border border-white/30 bg-white/30 dark:bg-white/10 p-4 backdrop-blur transition hover:bg-white/40 dark:hover:bg-white/15"
                    >
                      <span className="text-sm text-foreground font-medium">{s}</span>
                    </button>
                  ),
                )}
              </section>
            )}

            <div ref={listRef} className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={clsx("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}> 
                  {m.role === "assistant" && (
                    <div className="shrink-0">
                      <div className="size-8 rounded-full grid place-items-center text-[11px] text-white shadow-[0_0_0_2px_rgba(34,211,238,0.3)] bg-gradient-to-br from-cyan-500 to-blue-600">🤖</div>
                    </div>
                  )}
          <div className={clsx(
            "relative max-w-[78%] rounded-xl border px-4 py-3 shadow-sm",
            "bg-[#f7f3e9] border-[#e8ddc5] text-black",
          )}>
                    {m.role === "assistant" && (
                      <span
            className="absolute -left-2 top-4 border-y-8 border-y-transparent border-r-8"
            style={{ borderRightColor: "#f7f3e9" }}
                      />
                    )}
                    {m.role === "user" && (
                      <span
            className="absolute -right-2 top-4 border-y-8 border-y-transparent border-l-8"
            style={{ borderLeftColor: "#f7f3e9" }}
                      />
                    )}
          <div className="prose prose-sm max-w-none whitespace-pre-wrap text-[1rem] leading-relaxed text-black">
                      {m.content}
                    </div>
                  </div>
                  {m.role === "user" && (
                    <div className="shrink-0">
                      <div className="size-8 rounded-full grid place-items-center text-[11px] text-white shadow-[0_0_0_2px_rgba(59,130,246,0.35)] bg-gradient-to-br from-blue-500 to-indigo-600">🧑</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const text = input.trim();
              if (!text || isLoading) return;
              setInput("");
              const userMsg: Msg = { id: genId(), role: "user", content: text };
              const draft = [...messages, userMsg];
              setMessages(draft);
              setIsLoading(true);
              try {
                const res = await fetch(useEcho ? "/api/echo" : "/api/chat", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ messages: draft }),
                });
                if (!res.ok) throw new Error("Request failed");

                // If server sent plain text (e.g., error message), show it without streaming
                const ct = res.headers.get("content-type") || "";
                if (!res.body || ct.includes("text/plain")) {
                  const txt = await res.text();
                  const assistant: Msg = { id: genId(), role: "assistant", content: txt || "" };
                  setMessages((m) => [...m, assistant]);
                  return;
                }

                // Otherwise, stream chunks
                const reader = res.body.getReader();
                const decoder = new TextDecoder();
                let assistant: Msg = { id: genId(), role: "assistant", content: "" };
                setMessages((m) => [...m, assistant]);
                let gotAnyChunk = false;
                while (true) {
                  const { value, done } = await reader.read();
                  if (done) break;
                  const chunk = decoder.decode(value, { stream: true });
                  if (chunk) {
                    gotAnyChunk = true;
                    assistant = { ...assistant, content: assistant.content + chunk };
                    setMessages((m) => m.map((x) => (x.id === assistant.id ? assistant : x)));
                  }
                }
                if (!gotAnyChunk) {
                  assistant = {
                    ...assistant,
                    content:
                      "I couldn’t get a response from the AI. This often means your OpenAI key has insufficient credits or hit a rate/usage limit.",
                  };
                  setMessages((m) => m.map((x) => (x.id === assistant.id ? assistant : x)));
                }
              } catch {
                const errorMsg: Msg = { id: genId(), role: "assistant", content: "Sorry, something went wrong." };
                setMessages((m) => [...m, errorMsg]);
              } finally {
                setIsLoading(false);
              }
            }}
            className="border-t border-cyan-400/10 bg-[#0b2144]/70 backdrop-blur-xl"
          >
            <div className="px-4 py-4 md:px-6">
              <div className="flex items-end gap-2 rounded-md border border-cyan-400/20 bg-[#0e2244]/70 px-3 py-2 backdrop-blur shadow-sm focus-within:ring-2 focus-within:ring-cyan-400/40">
                {/* Attach icon */}
                <button type="button" title="Attach" className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/5 text-cyan-200">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12v7a5 5 0 0 1-10 0V7a3 3 0 0 1 6 0v9a1 1 0 0 1-2 0V8"/></svg>
                </button>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      const form = e.currentTarget.form;
                      if (form) form.requestSubmit();
                    }
                  }}
                  className="flex-1 resize-none bg-transparent px-3 py-2 text-sm outline-none text-slate-100 placeholder:text-slate-400 caret-cyan-400"
                />
                {/* Mic icon */}
                <button type="button" title="Voice" className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/5 text-cyan-200">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M12 19v3"/><path d="M8 12a4 4 0 0 0 8 0"/><path d="M6 15a6 6 0 0 0 12 0"/></svg>
                </button>
                <button
                  type="submit"
                  disabled={isLoading || input.trim().length === 0}
                  className="inline-flex h-9 items-center gap-2 rounded-md bg-cyan-500 px-4 text-slate-900 text-sm font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-400"
                >
                  {isLoading ? "Sending…" : "Send"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
