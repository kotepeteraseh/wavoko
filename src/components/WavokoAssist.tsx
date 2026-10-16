"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function WavokoAssist() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isSending, error]);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = message.trim();
    if (!content || isSending) return;

    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setMessage("");
    setError("");
    setIsSending(true);

    try {
      const response = await fetch("/api/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-16) }),
      });

      const result: unknown = await response.json();
      if (
        typeof result !== "object" ||
        result === null ||
        !("reply" in result) ||
        typeof result.reply !== "string"
      ) {
        const errorMessage =
          typeof result === "object" && result !== null && "error" in result && typeof result.error === "string"
            ? result.error
            : t("Wavoko Assist couldn't respond. Please try again.");
        throw new Error(errorMessage);
      }

      const reply = result.reply;
      setMessages((current) => [...current, { role: "assistant", content: reply }]);
    } catch (caughtError) {
      setError(t(caughtError instanceof Error ? caughtError.message : "Wavoko Assist couldn't respond. Please try again."));
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="wavoko-assist">
      <section id="wavoko-assist-panel" className="wavoko-assist-panel" aria-labelledby="wavoko-assist-title" hidden={!isOpen}>
          <header className="wavoko-assist-header">
            <span className="wavoko-assist-avatar"><Bot size={20} aria-hidden="true" /></span>
            <div>
              <h2 id="wavoko-assist-title">{t("Wavoko Assist")}</h2>
              <p>{t("Ask us about Wavoko and our services")}</p>
            </div>
            <button
              className="wavoko-assist-close"
              type="button"
              aria-label={t("Close Wavoko Assist")}
              onClick={() => setIsOpen(false)}
            >
              <X size={19} aria-hidden="true" />
            </button>
          </header>

          <div className="wavoko-assist-messages" role="log" aria-live="polite" aria-relevant="additions text">
            <p className="wavoko-assist-message is-assistant">{t("Hello! I’m Wavoko Assist. Ask me about Wavoko Solutions, Wavoko Talent, or Wavoko Finance.")}</p>
            {messages.map((chatMessage, index) => (
              <p
                className={`wavoko-assist-message is-${chatMessage.role}`}
                key={`${chatMessage.role}-${index}`}
              >
                {chatMessage.content}
              </p>
            ))}
            {isSending && <p className="wavoko-assist-message is-assistant">{t("Wavoko Assist is thinking…")}</p>}
            {error && <p className="wavoko-assist-error" role="alert">{error}</p>}
            <div ref={messagesEndRef} />
          </div>

          <form className="wavoko-assist-form" onSubmit={sendMessage}>
            <label className="sr-only" htmlFor="wavoko-assist-input">{t("Your message")}</label>
            <input
              id="wavoko-assist-input"
              ref={inputRef}
              autoComplete="off"
              maxLength={2000}
              placeholder={t("Type your question…")}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              disabled={isSending}
            />
            <button type="submit" aria-label={t("Send message")} disabled={isSending || !message.trim()}>
              <Send size={17} aria-hidden="true" />
            </button>
          </form>
          <p className="wavoko-assist-disclaimer">{t("Messages are sent to OpenAI to generate replies. Don’t share sensitive information. AI can make mistakes.")}</p>
      </section>

      <button
        type="button"
        className="wavoko-assist-toggle"
        aria-label={t(isOpen ? "Close Wavoko Assist" : "Open Wavoko Assist")}
        aria-expanded={isOpen}
        aria-controls="wavoko-assist-panel"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={22} aria-hidden="true" /> : <MessageCircle size={22} aria-hidden="true" />}
        <span>{t("Wavoko Assist")}</span>
      </button>
    </div>
  );
}
