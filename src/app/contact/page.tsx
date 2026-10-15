"use client";
// Contact form that opens a pre-addressed email in the visitor's mail app.
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
export default function Contact() {
  const { t } = useLanguage();
  // Keep the form fields together so the mailto message uses the visitor's details.
  const [f, setF] = useState({ name: "", email: "", message: "" });
  // Encode the subject and body so entered text is safe to include in a mailto URL.
  const send = () => {
    const s = encodeURIComponent(`${t("Message from")} ${f.name}`);
    const b = encodeURIComponent(`${f.message}\n\n${t("Reply to:")} ${f.email}`);
    window.location.href = `mailto:info@localadsnetwork.com?subject=${s}&body=${b}`;
  };
  return (
    <div className="wrap max-w-xl">
      <h1 className="mb-4 text-3xl font-bold">{t("Contact us")}</h1>
      <div className="space-y-2">
        <input className="input" placeholder={t("Your name")} onChange={(e) => setF({ ...f, name: e.target.value })} />
        <input className="input" type="email" placeholder={t("Email")} onChange={(e) => setF({ ...f, email: e.target.value })} />
        <textarea className="input" rows={5} placeholder={t("How can we help?")} onChange={(e) => setF({ ...f, message: e.target.value })} />
        <button className="btn" onClick={send}>{t("Send message")}</button>
      </div>
    </div>
  );
}
