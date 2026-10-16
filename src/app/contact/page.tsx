"use client";

// Contact page with a responsive support intro and a validated email form.
import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

type ContactFields = {
  service: string;
  email: string;
  country: string;
  name: string;
  phone: string;
  message: string;
  newsletter: boolean;
};

const initialFields: ContactFields = {
  service: "",
  email: "",
  country: "",
  name: "",
  phone: "",
  message: "",
  newsletter: false,
};

const countries = [
  "Cameroon",
  "Ghana",
  "Kenya",
  "Nigeria",
  "South Africa",
  "United Kingdom",
  "United States",
  "Canada",
  "Other",
];

const services = [
  "Wavoko Solutions",
  "WECOAPPLY",
  "WeWork office spaces",
  "Wavoko Talent",
  "Wavoko Finance",
  "General enquiry",
];

export default function Contact() {
  const { t } = useLanguage();
  const [fields, setFields] = useState<ContactFields>(initialFields);

  const updateField = <K extends keyof ContactFields>(key: K, value: ContactFields[K]) => {
    setFields((current) => ({ ...current, [key]: value }));
  };

  // Prepare a support email containing the submitted details and preferences.
  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`${t("Contact request from")} ${fields.name}`);
    const body = encodeURIComponent([
      `${t("Service needed")}: ${t(fields.service)}`,
      `${t("Name")}: ${fields.name}`,
      `${t("Email")}: ${fields.email}`,
      `${t("Country")}: ${fields.country}`,
      `${t("Phone number")}: ${fields.phone}`,
      "",
      `${t("Message")}:`,
      fields.message,
      "",
      `${t("Newsletter subscription")}: ${fields.newsletter ? t("Yes") : t("No")}`,
    ].join("\n"));

    window.location.href = `mailto:info@localadsnetwork.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact-page">
      <div className="contact-page-inner">
        <div className="contact-intro">
          <p className="contact-eyebrow">{t("Wavoko support")}</p>
          <h1>
            <span>{t("Get Wavoko")}</span>
            <span>{t("Support")}</span>
          </h1>
          <p className="contact-intro-copy">
            {t("Need help with Wavoko? Our support team is here for you. Start with a message and tell us what you need. We’ll be happy to help.")}
          </p>
        </div>

        <div className="contact-form-card">
          <header className="contact-form-heading">
            <h2>{t("Let’s get you to the right place")}</h2>
            <p>{t("We just need a few quick details.")}</p>
          </header>

          <form className="contact-form" onSubmit={send}>
            <label className="contact-field">
              <span>{t("Which service do you need help with?")} <b aria-hidden="true">*</b></span>
              <select
                value={fields.service}
                onChange={(event) => updateField("service", event.target.value)}
                required
              >
                <option value="">{t("Choose a service")}</option>
                {services.map((service) => (
                  <option key={service} value={service}>{t(service)}</option>
                ))}
              </select>
            </label>

            <label className="contact-field">
              <span>{t("Email")} <b aria-hidden="true">*</b></span>
              <input
                autoComplete="email"
                type="email"
                placeholder="you@example.com"
                value={fields.email}
                onChange={(event) => updateField("email", event.target.value)}
                required
              />
            </label>

            <label className="contact-field">
              <span>{t("Country")} <b aria-hidden="true">*</b></span>
              <select
                value={fields.country}
                onChange={(event) => updateField("country", event.target.value)}
                required
              >
                <option value="">{t("Choose a country")}</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{t(country)}</option>
                ))}
              </select>
            </label>

            <label className="contact-field">
              <span>{t("Name")} <b aria-hidden="true">*</b></span>
              <input
                autoComplete="name"
                placeholder={t("Enter your name")}
                value={fields.name}
                onChange={(event) => updateField("name", event.target.value)}
                required
              />
            </label>

            <label className="contact-field">
              <span>{t("Phone number")} <b aria-hidden="true">*</b></span>
              <input
                autoComplete="tel"
                type="tel"
                placeholder={t("Enter your phone number")}
                value={fields.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                required
              />
            </label>

            <label className="contact-field">
              <span>{t("Message")} <b aria-hidden="true">*</b></span>
              <textarea
                rows={5}
                placeholder={t("Tell us how we can help")}
                value={fields.message}
                onChange={(event) => updateField("message", event.target.value)}
                required
              />
            </label>

            <label className="contact-newsletter">
              <input
                type="checkbox"
                checked={fields.newsletter}
                onChange={(event) => updateField("newsletter", event.target.checked)}
              />
              <span>{t("Subscribe to our newsletter")}</span>
            </label>

            <button className="contact-submit" type="submit">
              {t("Send message")} <ArrowRight size={16} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
