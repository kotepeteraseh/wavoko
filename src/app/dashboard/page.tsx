"use client";
// Signed-in client dashboard: loads the selected plan and lists submitted applications.
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageProvider";

type Row = { company: string; role: string; status: string; date: string };

export default function Dashboard() {
  const router = useRouter();
  const { t } = useLanguage();
  const [rows, setRows] = useState<Row[]>([]);
  const [plan, setPlan] = useState("none yet");
  const [name, setName] = useState("");

  // Require a session, then load the latest subscription and this user's applications.
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return router.push("/auth");
      setName(data.session.user.email ?? "");
      const sub = await supabase.from("subscriptions").select("plan_id,status").order("created_at", { ascending: false }).limit(1).maybeSingle();
      if (sub.data) setPlan(`${sub.data.plan_id} (${sub.data.status})`);
      const r = await fetch("/api/applications", { headers: { Authorization: `Bearer ${data.session.access_token}` } });
      if (r.ok) setRows((await r.json()).rows);
    })();
  }, [router]);

  // Count status groups for the summary cards above the application table.
  const count = (s: string[]) => rows.filter((r) => s.includes(r.status)).length;
  const planLabel = plan === "none yet"
    ? t(plan)
    : (() => {
        const [planId, status] = plan.split(" (");
        return `${t(planId)}${status ? ` (${t(status.replace(")", ""))})` : ""}`;
      })();
  const stats: [string, number][] = [
    [t("Jobs applied for"), rows.length],
    [t("Employer replies"), count(["Replied", "Interview", "Offer"])],
    [t("Interviews"), count(["Interview"])],
    [t("Offers"), count(["Offer"])],
  ];

  return (
    <div className="wrap">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">{t("My applications")}</h1>
          <p className="text-sm text-charcoal">{name} · {t("Plan:")} {planLabel}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/details" className="btn btn-ghost">{t("My details")}</Link>
          <button className="btn btn-ghost" onClick={async () => { await supabase.auth.signOut(); router.push("/"); }}>{t("Sign out")}</button>
        </div>
      </div>
      <div className="grid3 my-6">
        {stats.map(([l, n]) => <div key={l} className="card"><p className="text-4xl font-bold">{n}</p><p className="text-sm">{l}</p></div>)}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="bg-ink text-cream"><tr>{["Company", "Role", "Application date", "Status"].map((h) => <th key={h} className="p-2">{t(h)}</th>)}</tr></thead>
          <tbody>
            {rows.map((r, i) => <tr key={i} className="border-b border-sand"><td className="p-2">{r.company}</td><td className="p-2">{r.role}</td><td className="p-2">{r.date}</td><td className="p-2">{t(r.status)}</td></tr>)}
            {!rows.length && <tr><td className="p-2 text-charcoal" colSpan={4}>{t("No applications yet. They appear here as our team submits them.")}</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
