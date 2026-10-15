"use client";
// WECOAPPLY plan selector; choosing a plan requires a signed-in user.
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { PLANS } from "@/lib/plans";
import { useLanguage } from "@/components/LanguageProvider";

export default function Wecoapply() {
  const router = useRouter();
  const { t } = useLanguage();
  const [msg, setMsg] = useState("");

  // Save the selected subscription and continue to the profile-details form.
  async function choose(planId: string) {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return router.push("/auth");
    const { error } = await supabase.from("subscriptions").insert({ user_id: data.user.id, plan_id: planId });
    if (error) return setMsg(error.message);
    // TODO: send the user to Stripe Checkout or a mobile money payment here.
    router.push("/dashboard/details");
  }

  return (
    <div className="wrap">
      <h1 className="text-4xl font-bold">{t("WECOAPPLY")}</h1>
      <p className="mb-6 mt-2 max-w-xl">{t("You focus on your future. We tailor your resume, find the right roles and handle the applications. Choose a plan to begin.")}</p>
      <div className="grid3">
        {PLANS.map((p) => (
          <div key={p.id} className="card">
            <h2 className="text-xl font-bold">{t(p.name)}</h2>
            <p className="text-3xl font-bold">${p.price}<span className="text-sm font-normal">{t(" / month")}</span></p>
            <ul className="my-3 list-disc pl-5">{p.features.map((f) => <li key={f}>{t(f)}</li>)}</ul>
            <button className="btn" onClick={() => choose(p.id)}>{t("Select")} {t(p.name)}</button>
          </div>
        ))}
      </div>
      {msg && <p className="mt-3 text-red-700">{msg}</p>}
    </div>
  );
}
