"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mic, Phone, RotateCcw, Send, Square, Stethoscope, TriangleAlert } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import { SmoothLink } from "@/components/shared/smooth-link";
import { DEMO_LIMITS, DemoMessage, DemoReply, DemoSnapshot } from "@/lib/demo-types";

const SAMPLES = ["I have had a fever and body ache for two days", "Mujhe teen din se sir dard ho raha hai", "My knee hurts when I climb stairs"];

const ERROR_TEXT: Record<string, string> = {
  rate_limited: "You have tried the demo a lot just now. Please wait a minute and try again.",
  busy: "The demo is busy right now. Please try again in a moment.",
  unavailable: "The demo is not available right now."
};

interface RecognitionLike {
  lang: string;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}

// Replies appear as they would from someone typing. Screen readers get the whole sentence at once.
function TypedText({ text }: { text: string }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text.length);
      return;
    }
    setShown(0);
    const timer = window.setInterval(() => {
      setShown((current) => {
        if (current >= text.length) window.clearInterval(timer);
        return Math.min(current + 4, text.length);
      });
    }, 14);
    return () => window.clearInterval(timer);
  }, [text]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{text.slice(0, shown)}</span>
    </>
  );
}

// Goes straight to the app when a download link is live, and otherwise to the download section.
const APP_URL = process.env.NEXT_PUBLIC_ANDROID_STORE_URL || process.env.NEXT_PUBLIC_APK_URL || "";

function ConsultLink({ className, label = "Consult a doctor on the CD4 app" }: { className: string; label?: string }) {
  const content = (
    <>
      <Stethoscope className="h-4 w-4" />
      {label}
    </>
  );
  return APP_URL ? (
    <a href={APP_URL} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <SmoothLink href="#download" className={className}>
      {content}
    </SmoothLink>
  );
}

function SnapshotCard({ snapshot }: { snapshot: DemoSnapshot }) {
  const rows = [
    { title: "Symptoms", body: snapshot.symptoms.length ? snapshot.symptoms.join(", ") : "Not mentioned" },
    { title: "Symptom timeline", body: snapshot.timeline },
    { title: "Medical history", body: snapshot.history },
    { title: "Doctor to consider", body: snapshot.specialty }
  ];

  return (
    <div className="demo-snapshot" tabIndex={-1}>
      <div className="grid gap-3 sm:grid-cols-2">
        {rows.map((row) => (
          <article key={row.title} className="report-card demo-rise">
            <h4 className="font-heading text-sm font-bold text-[#37D6E8]">{row.title}</h4>
            <p className="mt-1 text-sm leading-6 text-white">{row.body}</p>
          </article>
        ))}
      </div>
      <article className="demo-rise mt-3 rounded-[1.25rem] border border-[#37D6E8]/40 bg-[#071426]/70 p-5 text-white">
        <h4 className="font-heading text-sm font-bold text-[#37D6E8]">Doctor-ready summary</h4>
        <p className="mt-2 text-sm leading-7">{snapshot.summary}</p>
        {snapshot.discuss.length ? (
          <>
            <h4 className="mt-4 font-heading text-sm font-bold text-[#37D6E8]">Questions to ask your doctor</h4>
            <ul className="mt-2 grid gap-1.5 text-sm leading-6 text-[#dbe8f5]">
              {snapshot.discuss.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </>
        ) : null}
      </article>
      <p className="mt-3 text-xs leading-5 text-[#9fb4cb]">This is not a diagnosis. Only a licensed doctor can diagnose and treat you.</p>
    </div>
  );
}

export function DemoSection() {
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [reply, setReply] = useState<Extract<DemoReply, { type: "snapshot" | "emergency" }> | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [understood, setUnderstood] = useState<string[]>([]);
  const [typingIndex, setTypingIndex] = useState(-1);
  const [consult, setConsult] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);
  const [canSpeak, setCanSpeak] = useState(false);
  const [voiceLang, setVoiceLang] = useState("en-IN");
  const recognition = useRef<RecognitionLike | null>(null);
  const request = useRef<AbortController | null>(null);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const speech = window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown };
    setCanSpeak(Boolean(speech.SpeechRecognition || speech.webkitSpeechRecognition));
    fetch("/api/demo")
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.remaining === "number") setRemaining(data.remaining);
      })
      .catch(() => undefined);
    return () => {
      request.current?.abort();
      recognition.current?.stop();
    };
  }, []);

  useEffect(() => {
    // Only the chat box scrolls, so a new reply never moves the page.
    const element = log.current;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
    element.toggleAttribute("data-lenis-prevent", element.scrollHeight > element.clientHeight + 4);
  }, [messages, busy, reply]);

  const send = async (raw: string) => {
    const text = raw.trim().slice(0, DEMO_LIMITS.messageChars);
    if (!text || busy) return;
    const next: DemoMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setError("");
    setOptions([]);
    setBusy(true);
    request.current = new AbortController();
    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-DEMO_LIMITS.messages) }),
        signal: request.current.signal
      });
      const data = await response.json().catch(() => ({}));
      if (typeof data.remaining === "number") setRemaining(data.remaining);
      if (data.error === "demo_limit") {
        setLimitReached(true);
        setMessages(messages);
        setInput(text);
        return;
      }
      if (!response.ok || !data.reply) {
        setError(ERROR_TEXT[data.error] ?? "Something went wrong. Please try again.");
        setMessages(messages);
        setInput(text);
        return;
      }
      const result = data.reply as DemoReply;
      if (result.type === "question") {
        setOptions(result.options);
        if (result.understood.length) setUnderstood(result.understood);
        if (result.consult) setConsult(true);
      }
      if (result.type === "snapshot" || result.type === "emergency") {
        setReply(result);
      }
      setTypingIndex(next.length);
      setMessages([...next, { role: "assistant", content: result.text }]);
    } catch (failure) {
      if ((failure as Error).name !== "AbortError") {
        setError("We could not reach the demo. Please check your connection and try again.");
        setMessages(messages);
        setInput(text);
      }
    } finally {
      setBusy(false);
    }
  };

  const restart = () => {
    request.current?.abort();
    setMessages([]);
    setOptions([]);
    setUnderstood([]);
    setTypingIndex(-1);
    setConsult(false);
    setReply(null);
    setError("");
    setInput("");
    setBusy(false);
  };

  const toggleVoice = () => {
    if (listening) {
      recognition.current?.stop();
      return;
    }
    const speech = window as unknown as { SpeechRecognition?: new () => RecognitionLike; webkitSpeechRecognition?: new () => RecognitionLike };
    const Recognition = speech.SpeechRecognition ?? speech.webkitSpeechRecognition;
    if (!Recognition) return;
    const instance = new Recognition();
    instance.lang = voiceLang;
    instance.interimResults = false;
    instance.onresult = (event) => {
      const heard = event.results[0]?.[0]?.transcript;
      if (heard) setInput((current) => `${current} ${heard}`.trim());
    };
    instance.onend = () => setListening(false);
    instance.onerror = () => {
      setListening(false);
      setError("We could not hear you. Please allow the microphone, or type instead.");
    };
    recognition.current = instance;
    setError("");
    setListening(true);
    instance.start();
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void send(input);
  };

  const finished = reply !== null;

  return (
    <section id="try-demo" data-stage="demo" data-dark className="story-section relative py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <Heading
            kicker="Try it yourself"
            title="See your words become a doctor-ready summary."
            description="Describe a health concern in Hindi or English. CD4 AI asks a few questions, then organizes what you said."
          />
          <p className="glass mt-5 flex gap-2 rounded-2xl p-4 text-sm leading-6 text-[#c5d6e8]" data-reveal>
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#37D6E8]" />
            <span>A demo, not medical advice. Please avoid sharing your name, phone number or other personal details. CD4 does not save this conversation.</span>
          </p>
        </div>

        <div className="demo-panel" data-reveal>
          <div className="demo-header">
            <Image src="/images/cd4-logo-nav.png" alt="" width={40} height={40} className="demo-avatar" unoptimized />
            <span>
              <span className="block font-heading text-sm font-bold text-white">CD4 AI</span>
              <span className="flex items-center text-xs text-[#9fb4cb]">
                <span className="demo-live-dot" aria-hidden />
                {busy ? "Thinking through what you said" : finished ? "Summary ready" : "Listening"}
                {remaining !== null ? <span className="demo-free-count">{remaining} of {DEMO_LIMITS.freeChats} free chats left</span> : null}
              </span>
            </span>
          </div>
          <div className="demo-log-wrap">
            <div className="demo-watermark" aria-hidden>
              <span className="demo-watermark-ring" />
              <span className="demo-watermark-ring" />
              <span className="demo-watermark-ring" />
              <span className="demo-watermark-text">CD4</span>
              <span className="demo-watermark-sub">Healthcare That Understands You</span>
            </div>
          <div ref={log} className="demo-log" role="log" aria-live="polite" aria-label="Demo conversation">
            <div className="demo-ai-row">
              <Image src="/images/cd4-logo-nav.png" alt="" width={28} height={28} className="demo-message-logo" unoptimized />
              <p className="demo-bubble demo-bubble-ai">Hello, I am CD4 AI. What health concern would you like to talk about?</p>
            </div>
            {messages.map((message, index) =>
              message.role === "assistant" ? (
                <motion.div
                  key={index}
                  className="demo-ai-row"
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                >
                  <Image src="/images/cd4-logo-nav.png" alt="" width={28} height={28} className="demo-message-logo" unoptimized />
                  <p className="demo-bubble demo-bubble-ai">{index === typingIndex ? <TypedText text={message.content} /> : message.content}</p>
                </motion.div>
              ) : (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="demo-bubble demo-bubble-user"
                >
                  {message.content}
                </motion.p>
              )
            )}
            {busy ? (
              <div className="demo-ai-row">
                <Image src="/images/cd4-logo-nav.png" alt="" width={28} height={28} className="demo-message-logo" unoptimized />
                <p className="demo-bubble demo-bubble-ai" aria-label="CD4 AI is writing">
                  <span className="demo-dots" aria-hidden>
                    <span />
                    <span />
                    <span />
                  </span>
                </p>
              </div>
            ) : null}

            {reply?.type === "emergency" ? (
              <div className="demo-emergency" role="alert">
                <p className="font-heading font-bold">Medical emergency?</p>
                <p className="mt-1 font-normal">Call 112 for an ambulance. For urgent advice, consult a doctor.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a href="tel:112" className="demo-call">
                    <Phone className="h-4 w-4" />
                    Call 112
                  </a>
                  <ConsultLink className="demo-outline demo-outline-small" label="Consult a doctor" />
                </div>
              </div>
            ) : null}
            {reply?.type === "snapshot" ? <SnapshotCard snapshot={reply.snapshot} /> : null}
          </div>
          </div>

          {consult && !finished ? (
            <div className="px-4 pt-3 sm:px-5">
              <ConsultLink className="demo-consult" />
            </div>
          ) : null}

          {understood.length && !finished ? (
            <div className="demo-understood">
              <span>Understood so far:</span>
              {understood.map((fact) => (
                <motion.span key={fact} className="demo-noted" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}>
                  {fact}
                </motion.span>
              ))}
            </div>
          ) : null}

          {options.length && !busy && !finished ? (
            <div className="flex flex-wrap gap-2 px-4 pt-3 sm:px-5">
              {options.map((option, index) => (
                <motion.button
                  key={option}
                  type="button"
                  className="demo-sample"
                  onClick={() => void send(option)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.07 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          ) : null}

          {messages.length === 0 && !finished && !limitReached ? (
            <div className="flex flex-wrap gap-2 px-4 pb-1 sm:px-5">
              {SAMPLES.map((sample) => (
                <button key={sample} type="button" className="demo-sample" onClick={() => void send(sample)} disabled={busy}>
                  {sample}
                </button>
              ))}
            </div>
          ) : null}

          {error ? (
            <p className="px-4 pt-2 text-sm font-medium text-[#fda29b] sm:px-5" role="alert">
              {error}
            </p>
          ) : null}

          {limitReached ? (
            <div className="demo-limit" role="status">
              <p className="font-heading text-base font-bold text-white">You have used today&apos;s {DEMO_LIMITS.freeChats} free chats.</p>
              <p className="mt-1 text-sm leading-6 text-[#c5d6e8]">Download the CD4 AI app to continue your conversation and reach a doctor. In an emergency, call 112.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <ConsultLink className="btn-primary" label="Download the app and continue" />
                <a href="tel:112" className="demo-call">
                  <Phone className="h-4 w-4" />
                  Call 112
                </a>
              </div>
            </div>
          ) : finished ? (
            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:p-5">
              {remaining === 0 ? null : (
              <button type="button" className="demo-outline" onClick={restart}>
                <RotateCcw className="h-4 w-4" />
                Start again
              </button>
              )}
              <ConsultLink className="btn-primary" />
            </div>
          ) : (
            <form onSubmit={onSubmit} className="p-4 sm:p-5">
              <label htmlFor="demo-input" className="sr-only">
                Describe your health concern
              </label>
              <div className="demo-compose">
                <div className="demo-compose-row">
                <Image src="/images/cd4-logo-nav.png" alt="" width={28} height={28} className="demo-message-logo mt-1" unoptimized />
                <textarea
                  id="demo-input"
                  rows={2}
                  value={input}
                  maxLength={DEMO_LIMITS.messageChars}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void send(input);
                    }
                  }}
                  placeholder="Tell CD4 AI what is bothering you"
                  className="demo-textarea"
                />
                </div>
                <div className="flex items-center justify-between gap-2">
                  {canSpeak ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleVoice}
                        aria-pressed={listening}
                        aria-label={listening ? "Stop listening" : "Speak your concern"}
                        className={`demo-icon-button ${listening ? "is-listening" : ""}`}
                      >
                        {listening ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </button>
                      <label className="sr-only" htmlFor="demo-voice-language">
                        Voice language
                      </label>
                      <select id="demo-voice-language" value={voiceLang} onChange={(event) => setVoiceLang(event.target.value)} className="demo-select">
                        <option value="en-IN">English</option>
                        <option value="hi-IN">हिंदी</option>
                      </select>
                    </div>
                  ) : (
                    <span />
                  )}
                  <button type="submit" disabled={busy || !input.trim()} aria-label="Send" className="demo-send">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
