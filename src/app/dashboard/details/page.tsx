"use client";
// Profile form for contact details, work history, job preferences, and resume upload.
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageProvider";

// Choices available as selectable chips in the job-preferences section.
const ROLES = ["Software engineering", "Data & analytics", "Product management", "Marketing", "Sales", "Finance & accounting", "Healthcare", "Operations", "Customer support", "Design"];
const STYLES = ["Remote", "Hybrid", "On-site", "Full-time", "Contract", "Part-time"];
type Exp = { company: string; title: string; start_date: string; end_date: string; details: string };
const blank: Exp = { company: "", title: "", start_date: "", end_date: "", details: "" };

export default function Details() {
  const router = useRouter();
  const { t } = useLanguage();
  const [uid, setUid] = useState("");
  const [p, setP] = useState<any>({ phone: "", location: "", linkedin: "", summary: "" });
  const [exps, setExps] = useState<Exp[]>([blank]);
  const [pref, setPref] = useState<any>({ roles: [], work_style: [], locations: "", min_salary: "", per_week: 20 });
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  // Load the signed-in user's existing profile, experience, and preferences.
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return router.push("/auth");
      const id = data.user.id;
      setUid(id);
      const [a, b, c] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", id).single(),
        supabase.from("experiences").select("*").eq("user_id", id),
        supabase.from("job_preferences").select("*").eq("user_id", id).maybeSingle(),
      ]);
      if (a.data) setP(a.data);
      if (b.data?.length) setExps(b.data);
      if (c.data) setPref(c.data);
    })();
  }, [router]);

  // Toggle a role or work-style choice without changing the other selections.
  const toggle = (k: "roles" | "work_style", v: string) =>
    setPref({ ...pref, [k]: pref[k].includes(v) ? pref[k].filter((x: string) => x !== v) : [...pref[k], v] });
  // Update one field in the selected experience entry.
  const setExp = (i: number, k: keyof Exp, v: string) => setExps(exps.map((e, j) => (j === i ? { ...e, [k]: v } : e)));

  // Persist the form sections and upload a newly selected resume, if present.
  async function save() {
    setMsg(t("Saving..."));
    await supabase.from("profiles").update({ phone: p.phone, location: p.location, linkedin: p.linkedin, summary: p.summary }).eq("id", uid);
    await supabase.from("experiences").delete().eq("user_id", uid);
    await supabase.from("experiences").insert(
      exps.filter((e) => e.company || e.title).map(({ company, title, start_date, end_date, details }) => ({ user_id: uid, company, title, start_date, end_date, details }))
    );
    await supabase.from("job_preferences").upsert({ user_id: uid, roles: pref.roles, work_style: pref.work_style, locations: pref.locations, min_salary: pref.min_salary, per_week: Number(pref.per_week) });
    if (file) {
      const { error } = await supabase.storage.from("resumes").upload(`${uid}/${file.name}`, file, { upsert: true });
      if (error) return setMsg(error.message);
    }
    setMsg(t("Saved. Our team will start preparing your applications."));
  }

  // Render a reusable set of selectable chips for roles or working arrangements.
  const chips = (k: "roles" | "work_style", list: string[]) => (
    <div className="flex flex-wrap gap-2">
      {list.map((o) => <button type="button" key={o} className={`chip ${pref[k].includes(o) ? "chip-on" : ""}`} onClick={() => toggle(k, o)}>{t(o)}</button>)}
    </div>
  );

  return (
    <div className="wrap max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold">{t("My details")}</h1>
      <section className="space-y-3">
        <h2 className="text-xl font-bold">{t("Contact and summary")}</h2>
        {(["phone", "location", "linkedin"] as const).map((k) => <input key={k} className="input" placeholder={t(k === "phone" ? "Phone" : k === "location" ? "Location" : "LinkedIn")} value={p[k] ?? ""} onChange={(e) => setP({ ...p, [k]: e.target.value })} />)}
        <textarea className="input" rows={4} placeholder={t("Professional summary")} value={p.summary ?? ""} onChange={(e) => setP({ ...p, summary: e.target.value })} />
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold">{t("Work experience")}</h2>
        {exps.map((e, i) => (
          <div key={i} className="card space-y-2">
            <input className="input" placeholder={t("Company")} value={e.company} onChange={(x) => setExp(i, "company", x.target.value)} />
            <input className="input" placeholder={t("Job title")} value={e.title} onChange={(x) => setExp(i, "title", x.target.value)} />
            <div className="grid grid-cols-2 gap-2">
              <input className="input min-w-0" type="month" value={e.start_date} onChange={(x) => setExp(i, "start_date", x.target.value)} />
              <input className="input min-w-0" type="month" value={e.end_date} onChange={(x) => setExp(i, "end_date", x.target.value)} />
            </div>
            <textarea className="input" rows={3} placeholder={t("Duties and achievements")} value={e.details} onChange={(x) => setExp(i, "details", x.target.value)} />
          </div>
        ))}
        <button className="btn btn-ghost" onClick={() => setExps([...exps, blank])}>{t("Add another job")}</button>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold">{t("Jobs you want us to apply for")}</h2>
        {chips("roles", ROLES)}
        {chips("work_style", STYLES)}
        <input className="input" placeholder={t("Preferred countries / cities")} value={pref.locations ?? ""} onChange={(e) => setPref({ ...pref, locations: e.target.value })} />
        <input className="input" placeholder={t("Minimum salary")} value={pref.min_salary ?? ""} onChange={(e) => setPref({ ...pref, min_salary: e.target.value })} />
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold">{t("Your current resume")}</h2>
        <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      </section>
      <button className="btn" onClick={save}>{t("Save everything")}</button>
      {msg && <p className="text-ink">{msg}</p>}
    </div>
  );
}
