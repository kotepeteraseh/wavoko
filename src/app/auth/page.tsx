"use client";
// Sign-in and account-creation form backed by Supabase Auth.
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageProvider";

export default function Auth() {
  const { t } = useLanguage();
  const router = useRouter();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  // Use the selected auth mode, then show confirmation or open the client dashboard.
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const { error } =
      mode === "in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
    if (error) return setMsg(error.message);
    if (mode === "up") setMsg(t("Check your email to confirm your account, then sign in."));
    else router.push("/dashboard");
  }

  return (
    <div className="wrap max-w-md">
      <h1 className="mb-4 text-3xl font-bold">{t(mode === "in" ? "Sign in" : "Create your account")}</h1>
      <form onSubmit={submit} className="space-y-3">
        {mode === "up" && <input className="input" placeholder={t("Full name")} value={name} onChange={(e) => setName(e.target.value)} required />}
        <input className="input" type="email" placeholder={t("Email")} value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder={t("Password (min 6 characters)")} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        <button className="btn w-full">{t(mode === "in" ? "Sign in" : "Sign up")}</button>
      </form>
      {msg && <p className="mt-3 text-sm text-ink">{msg}</p>}
      <button className="mt-4 text-sm text-ink underline" onClick={() => setMode(mode === "in" ? "up" : "in")}>
        {t(mode === "in" ? "New here? Create an account" : "Already have an account? Sign in")}
      </button>
    </div>
  );
}
