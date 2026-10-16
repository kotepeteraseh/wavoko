"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import Logo from "./Logo";

// Primary navigation items and the links inside the services dropdown.
const links = [
  ["/about", "Why Wavoko"],
  ["/success-stories", "Success stories"],
  ["/about", "Company"],
];

const serviceLinks = [
  ["/services", "All services"],
  ["/wecoapply", "Wavoko Solutions"],
  ["/talent", "Wavoko Talent"],
  ["/finance", "Wavoko Finance"],
];

export default function Header() {
  const path = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement>(null);

  // Add the compact scrolled header style after the visitor moves down the page.
  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 12);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  // Close both navigation menus when the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [path]);

  // Close the services dropdown when clicking elsewhere or pressing Escape.
  useEffect(() => {
    if (!isServicesOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof Node && !servicesMenuRef.current?.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsServicesOpen(false);
    };

    document.addEventListener("click", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("click", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isServicesOpen]);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="announcement-bar">
        <div className="announcement-message">
          <span className="announcement-pill">{t("NEW")}</span>
          <span>{t("Wavoko brings talent, career opportunity, and global finance together.")}</span>
          <Link href="/about" className="announcement-link">{t("Discover Wavoko")} <span aria-hidden="true">→</span></Link>
        </div>
        <label className="announcement-language">
          <span>{t("Language")}</span>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value === "fr" ? "fr" : "en")}
            aria-label={t("Language")}
          >
            <option value="en">{t("English")}</option>
            <option value="fr">{t("French")}</option>
          </select>
        </label>
      </div>
      <div className="site-nav-row">
        <Logo />
        <button
          type="button"
          className="mobile-menu-button"
          aria-expanded={isMenuOpen}
          aria-label={t(isMenuOpen ? "Close menu" : "Open menu")}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`site-primary-nav${isMenuOpen ? " is-open" : ""}`}>
          <div className={`services-menu${isServicesOpen ? " is-open" : ""}`} ref={servicesMenuRef}>
            <button
              type="button"
              className="services-menu-trigger"
              aria-expanded={isServicesOpen}
              aria-haspopup="true"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              {t("Services")}
              <ChevronDown size={15} aria-hidden="true" />
            </button>
            <div className="services-menu-panel" hidden={!isServicesOpen}>
              {serviceLinks.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={path === href ? "page" : undefined}
                  onClick={() => setIsServicesOpen(false)}
                >
                  {t(label)}
                </Link>
              ))}
            </div>
          </div>
          {links.map(([h, label]) => (
            <Link key={label} href={h} aria-current={path === h ? "page" : undefined}>{t(label)}</Link>
          ))}
        </nav>
        <div className={`site-nav-actions${isMenuOpen ? " is-open" : ""}`}>
          <Link href="/contact">{t("Contact")}</Link>
          <Link href={path === "/" ? "/wecoapply" : "/services"} className="btn btn-ink">
            {path === "/" ? t("Get started") : t("Explore services")} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
