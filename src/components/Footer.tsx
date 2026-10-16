"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import Logo from "./Logo";

// Footer navigation grouped by service and company destination.
const cols: [string, [string, string][]][] = [
  ["Services", [["/talent", "Wavoko Talent"], ["/wecoapply", "Wavoko Solutions"], ["/finance", "Wavoko Finance"]]],
  ["Company", [["/about", "About Wavoko"], ["/success-stories", "Stories"], ["/contact", "Contact"]]],
];

export default function Footer() {
  const { t } = useLanguage();
  // Shared footer rendered below every route by the root layout.
  return (
    <footer className="site-footer border-t border-sand">
      <div className="grid w-full gap-8 px-5 py-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm">{t("Connecting ambition to opportunity, across borders.")}</p>
        </div>
        {cols.map(([title, items]) => (
          <div key={title}>
            <p className="mb-2 text-sm font-medium text-ink">{t(title)}</p>
            <ul className="space-y-1.5 text-sm">
              {items.map(([h, label]) => <li key={h}><Link href={h} className="hover:text-ink">{t(label)}</Link></li>)}
            </ul>
          </div>
        ))}
        <div>
          <p className="mb-2 text-sm font-medium text-ink">{t("Connect")}</p>
          <ul className="space-y-1.5 text-sm">
            <li><a href="mailto:hello@wavoko.com" className="hover:text-ink">hello@wavoko.com</a></li>
            <li><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-ink">{t("LinkedIn")}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sand px-5 py-4 text-xs">
        <div className="flex w-full flex-wrap justify-between gap-2">
          <span>{t("© 2026 Wavoko")}</span>
          <span>{t("People · Opportunity · Movement")}</span>
        </div>
      </div>
    </footer>
  );
}
