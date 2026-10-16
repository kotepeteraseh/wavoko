"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowLeftRight, ArrowRight, Bot, Briefcase, ChartNoAxesColumnIncreasing, Check, FileText, Globe, MessageCircle, Pause, Play, ShieldCheck, Sparkles, UserRound, Users, Wallet } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

// Homepage cards describing the principles behind Wavoko's services.
const values = [
  { Icon: UserRound, t: "Built around you", d: "Your goals. Your pace. Your possibilities." },
  { Icon: Globe, t: "Opportunity without borders", d: "Connecting ambition with the right possibilities." },
  { Icon: ShieldCheck, t: "Real people. Real support.", d: "A dedicated team, every step of the way." },
];

// Four stages used by the illustrated customer journey section.
const journeySteps = [
  {
    Icon: Sparkles,
    title: "Tell us your goal",
    description: "Choose the support you need and share where you want to go.",
    points: ["Simple first step", "No complicated forms"],
    previewType: "assistant",
    previewLabel: "Wavoko assistant",
    previewText: "What would you like to achieve?",
  },
  {
    Icon: Users,
    title: "Meet your specialist",
    description: "A real person listens, asks the right questions, and builds your path.",
    points: ["One-to-one guidance", "Expert recommendations"],
    previewType: "specialist",
    previewLabel: "Your Wavoko specialist",
    previewText: "Abena K.",
  },
  {
    Icon: ChartNoAxesColumnIncreasing,
    title: "Follow the progress",
    description: "Stay informed as applications, searches, or transfers move forward.",
    points: ["Clear updates", "Everything in one place"],
    previewType: "progress",
    previewLabel: "Your progress",
    previewText: "On track",
  },
  {
    Icon: Globe,
    title: "Reach the outcome",
    description: "We stay close until your hire, application, or transfer is complete.",
    points: ["End-to-end support", "A confident finish"],
    previewType: "complete",
    previewLabel: "Journey complete",
    previewText: "You’re ready for what’s next.",
  },
];

type Point = [number, number];

// Result cards shown after the journey overview.
const outcomes = [
  {
    Icon: Users,
    title: "Better-fit talent",
    description: "People selected for the work, team, and ambition ahead.",
  },
  {
    Icon: ChartNoAxesColumnIncreasing,
    title: "Stronger applications",
    description: "Career stories positioned to earn the right attention.",
  },
  {
    Icon: Globe,
    title: "Smoother transfers",
    description: "Cross-border movement made clearer from start to finish.",
  },
];

// Example activity rows displayed in the partner overview card.
const partnershipRows = [
  { Icon: Users, title: "Talent search", detail: "Active shortlist", count: "12" },
  { Icon: FileText, title: "Team support", detail: "Applications moving", count: "08" },
  { Icon: ArrowLeftRight, title: "Global services", detail: "Transfer supported", count: "03" },
];

// Rotating illustrative quotes shown in the client-story carousel.
const clientStories = [
  {
    quote: "Wavoko helped us find the right people to bring our next stage of growth within reach.",
    clientType: "Business client",
  },
  {
    quote: "With a clearer plan and support at every step, I felt ready to pursue the career I wanted.",
    clientType: "Career client",
  },
  {
    quote: "The guidance made a big goal feel manageable and helped me move forward with confidence.",
    clientType: "Personal client",
  },
];

const heroMotivations = [
  "Every big journey begins with one brave step.",
  "Your next opportunity is worth pursuing.",
  "Keep moving forward. Your future is unfolding.",
];

// Bézier control points describing the route followed by the hero particles.
const heroCurves: [Point, Point, Point, Point][] = [
  [[710, -35], [590, 80], [500, 130], [360, 220]],
  [[360, 220], [205, 320], [230, 425], [365, 440]],
  [[365, 440], [505, 455], [390, 560], [315, 690]],
];

// Calculate one point along a cubic Bézier curve for the particle path.
function getBezierPoint([start, control1, control2, end]: [Point, Point, Point, Point], t: number): Point {
  const inverse = 1 - t;
  return [
    inverse ** 3 * start[0] + 3 * inverse ** 2 * t * control1[0] + 3 * inverse * t ** 2 * control2[0] + t ** 3 * end[0],
    inverse ** 3 * start[1] + 3 * inverse ** 2 * t * control1[1] + 3 * inverse * t ** 2 * control2[1] + t ** 3 * end[1],
  ];
}

// Produce repeatable pseudo-random values so the decorative particle cloud is stable.
function particleRandom(seed: number): number {
  const value = Math.sin(seed) * 43758.5453;
  return value - Math.floor(value);
}

// Keep generated SVG coordinates compact and consistent.
function roundParticleValue(value: number): number {
  return Math.round(value * 100) / 100;
}

// Precompute particle positions, sizes, and colors used by the hero animation.
const heroParticles = Array.from({ length: 720 }, (_, index) => {
  const progress = index / 720;
  const segmentPosition = progress * heroCurves.length;
  const segmentIndex = Math.min(heroCurves.length - 1, Math.floor(segmentPosition));
  const segmentProgress = segmentPosition - segmentIndex;
  const curve = heroCurves[segmentIndex];
  const point = getBezierPoint(curve, segmentProgress);
  const nextPoint = getBezierPoint(curve, Math.min(1, segmentProgress + 0.002));
  const tangentX = nextPoint[0] - point[0];
  const tangentY = nextPoint[1] - point[1];
  const tangentLength = Math.hypot(tangentX, tangentY) || 1;
  const spread = (particleRandom(index * 17.31) * 2 - 1) * (15 + 67 * Math.sin(Math.PI * progress) ** 0.7);
  const drift = (particleRandom(index * 31.73) * 2 - 1) * 13;

  return {
    x: roundParticleValue(point[0] - (tangentY / tangentLength) * spread + (tangentX / tangentLength) * drift),
    y: roundParticleValue(point[1] + (tangentX / tangentLength) * spread + (tangentY / tangentLength) * drift),
    radius: roundParticleValue(0.8 + particleRandom(index * 53.17) * 2.1),
    opacity: roundParticleValue(0.42 + particleRandom(index * 73.91) * 0.58),
    color: progress < 0.45 ? "#12B76A" : progress < 0.72 ? "#1A1410" : progress < 0.88 ? "#D1FAE5" : "#E8E2DA",
  };
});

// Service tiles shown inside the homepage dashboard preview.
const dashboardServices = [
  { Icon: Users, title: "Wavoko Talent", detail: "12 matches ready", href: "/talent", featured: true },
  { Icon: FileText, title: "Wavoko Solutions", detail: "Career and workspace solutions", href: "/wecoapply", featured: false },
  { Icon: ArrowLeftRight, title: "Wavoko Finance", detail: "Global support", href: "/finance", featured: false },
];

// Copy and links for each tab in the homepage service showcase.
const platformServices = [
  {
    Icon: Users,
    name: "Wavoko Talent",
    audience: "For growing companies",
    headline: "Build the team your ambition deserves",
    description: "From hard-to-find specialists to transformative leaders, we connect your business with people who can move it forward.",
    href: "/talent",
    cta: "Explore Wavoko Talent",
    metric: "3",
    metricLabel: "SPECIALIST SERVICES. ONE PLATFORM.",
    benefits: [
      ["Smarter shortlists", "Only qualified, culture-aligned candidates reach your team."],
      ["Faster hiring", "A focused process that protects your time and momentum."],
      ["End-to-end support", "Sourcing, screening, coordination, and placement handled."],
    ],
  },
  {
    Icon: FileText,
    name: "Wavoko Solutions",
    audience: "For ambitious professionals",
    headline: "Make your next move with confidence",
    description: "Explore career guidance through WECOAPPLY and WeWork office spaces available to rent.",
    href: "/wecoapply",
    cta: "Explore Wavoko Solutions",
    metric: "3",
    metricLabel: "SPECIALIST SERVICES. ONE PLATFORM.",
    benefits: [
      ["WECOAPPLY career guidance", "Explore support for applications, job searches, and interviews."],
      ["WeWork office spaces", "Find out about office spaces available to rent."],
      ["Solutions for work", "Ask us about the option that fits your needs."],
    ],
  },
  {
    Icon: ArrowLeftRight,
    name: "Wavoko Finance",
    audience: "For people and families",
    headline: "Move money forward with confidence",
    description: "Explore cross-border transfers and savings support through Wavoko’s licensed financial partner.",
    href: "/finance",
    cta: "Explore Wavoko Finance",
    metric: "3",
    metricLabel: "SPECIALIST SERVICES. ONE PLATFORM.",
    benefits: [
      ["International transfers", "Explore ways to move money across borders."],
      ["Savings goals", "Plan toward the milestones that matter to you."],
      ["Licensed partner", "Financial services are provided through a licensed partner."],
    ],
  },
];

// Onboarding actions and suggested assistant topics inside the dashboard preview.
const gettingStartedSteps = [
  { number: "01", title: "Create your account", detail: "Tell us a little about your goals.", href: "/auth" },
  { number: "02", title: "Choose your service", detail: "Pick the support that fits you.", href: "/services" },
  { number: "03", title: "Move forward with us", detail: "Get updates and personal support.", href: "/contact" },
];

const helpTopics = [
  {
    question: "I’m looking for a job",
    answer: "WECOAPPLY can help tailor your applications and keep your search moving.",
    href: "/wecoapply",
    link: "Explore Wavoko Solutions",
  },
  {
    question: "I need to hire someone",
    answer: "Our talent team can help you define the role and find the right people.",
    href: "/talent",
    link: "Explore Wavoko Talent",
  },
  {
    question: "I have a finance question",
    answer: "Explore cross-border transfers and savings support through our licensed partner.",
    href: "/finance",
    link: "Explore Wavoko Finance",
  },
];

// Decorative animated particle path reused in the hero and dashboard backdrop.
function HeroMotionGraphic({ className = "" }: { className?: string }) {
  return (
    <div className={`home-hero-motion ${className}`} aria-hidden="true">
      <svg className="home-hero-art" viewBox="0 0 700 650" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="hero-flow-gradient" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#12B76A" />
            <stop offset="38%" stopColor="#D1FAE5" />
            <stop offset="70%" stopColor="#12B76A" />
            <stop offset="100%" stopColor="#1A1410" />
          </linearGradient>
          <filter id="hero-flow-glow" x="-35%" y="-20%" width="170%" height="140%">
            <feGaussianBlur stdDeviation="32" />
          </filter>
        </defs>
        <path
          className="hero-flow-glow"
          d="M710 -35 C590 80 500 130 360 220 C205 320 230 425 365 440 C505 455 390 560 315 690"
          fill="none"
          stroke="url(#hero-flow-gradient)"
          strokeWidth="100"
          filter="url(#hero-flow-glow)"
        />
        <g className="hero-particle-cloud">
          {heroParticles.map((particle, index) => (
            <circle
              key={index}
              cx={particle.x}
              cy={particle.y}
              r={particle.radius}
              fill={particle.color}
              opacity={particle.opacity}
            />
          ))}
        </g>
        <path
          className="hero-flow-trail"
          d="M710 -35 C590 80 500 130 360 220 C205 320 230 425 365 440 C505 455 390 560 315 690"
          fill="none"
          stroke="url(#hero-flow-gradient)"
          strokeWidth="2"
          strokeDasharray="2 20"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// Decorative orbit graphic that represents Wavoko's connected services.
function PartnerOrbitGraphic() {
  const orbitIcons = [FileText, ArrowLeftRight, Users, Globe];

  return (
    <div className="home-hero-orbit" aria-hidden="true">
      <div className="home-hero-orbit-ring home-hero-orbit-ring-outer" />
      <div className="home-hero-orbit-ring home-hero-orbit-ring-inner" />
      <div className="home-hero-orbit-track">
        {orbitIcons.map((Icon, index) => (
          <span className="home-hero-orbit-item" key={index}>
            <Icon size={19} strokeWidth={2.2} />
          </span>
        ))}
      </div>
      <div className="home-hero-orbit-center">W</div>
    </div>
  );
}

// Section explaining how the service areas work together.
function ConnectedPartnerShowcase() {
  const { t } = useLanguage();

  return (
    <section className="connected-partner-section">
      <div className="connected-partner-inner">
        <div className="connected-partner-copy">
          <p className="eyebrow">{t("One connected partner")}</p>
          <h2>
            <span className="home-hero-heading-line">{t("Built around the way")}</span>
            <span className="home-hero-heading-line">{t("your world moves")}</span>
          </h2>
          <p className="home-hero-description">
            {t("Careers, teams, families, and finances are connected. Wavoko brings the support together so you can focus on where you are going.")}
          </p>
          <div className="home-hero-actions">
            <Link href="/about" className="btn btn-ghost">{t("Meet Wavoko")} <ArrowRight size={16} /></Link>
          </div>
        </div>
        <PartnerOrbitGraphic />
      </div>
    </section>
  );
}

// Interactive dashboard preview with service links and selectable help topics.
function HomeDashboard({ scale }: { scale: number }) {
  const { t } = useLanguage();
  const [activeHelpTopic, setActiveHelpTopic] = useState<number | null>(null);
  const activeTopic = activeHelpTopic === null ? null : helpTopics[activeHelpTopic];

  return (
    <section className="home-dashboard-scene" aria-label={t("Your Wavoko dashboard")}>
      <div className="home-dashboard-sticky">
        <div
          className="home-dashboard-frame"
          style={{ "--dashboard-scale": scale } as React.CSSProperties}
        >
          <div className="home-dashboard-topbar">
            <span className="home-dashboard-logo">
              <span className="home-dashboard-logo-prefix">./</span>WΛVOKO<span className="home-dashboard-logo-period">.</span>
            </span>
            <span className="home-dashboard-connected">{t("Connected services")}</span>
          </div>
          <div className="home-dashboard-content">
            <aside className="home-dashboard-sidebar" aria-label={t("Dashboard navigation")}>
              <span className="is-active" aria-label={t("Wavoko Talent")}><Users size={17} /></span>
              <span aria-label={t("Wavoko Solutions")}><FileText size={17} /></span>
              <span aria-label={t("Wavoko Finance")}><ArrowLeftRight size={17} /></span>
            </aside>
            <div className="home-dashboard-main">
              <p className="home-dashboard-greeting">{t("Your next step")}</p>
              <h2>{t("Get started with Wavoko")}</h2>
              <div className="home-dashboard-layout">
                <div className="home-dashboard-start">
                  <p className="home-dashboard-section-label">{t("Three simple steps")}</p>
                  <div className="home-dashboard-steps">
                    {gettingStartedSteps.map(({ number, title, detail, href }) => (
                      <Link className="home-dashboard-step" href={href} key={number}>
                        <span className="home-dashboard-step-number"><Check size={15} aria-hidden="true" /></span>
                        <span className="home-dashboard-step-copy">
                          <strong>{t(title)}</strong>
                          <span>{t(detail)}</span>
                        </span>
                        <span className="home-dashboard-step-index">{number}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="home-dashboard-services">
                    {dashboardServices.map(({ Icon, title, detail, href, featured }) => (
                      <Link
                        className={`home-dashboard-service${featured ? " is-featured" : ""}`}
                        href={href}
                        key={title}
                      >
                        <Icon size={18} aria-hidden="true" />
                        <span className="home-dashboard-service-title">{t(title)}</span>
                        <span className="home-dashboard-service-detail">{t(detail)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <aside className="home-dashboard-help" aria-label={t("AI help assistant preview")}>
                  <div className="home-dashboard-help-heading">
                    <span className="home-dashboard-help-avatar"><Bot size={18} aria-hidden="true" /></span>
                    <span>
                      <strong>{t("Wavoko AI assistant")}</strong>
                      <small>{t("Here to help you find your next step")}</small>
                    </span>
                    <span className="home-dashboard-help-status" aria-label={t("Online")} />
                  </div>
                  <div className="home-dashboard-chat" aria-live="polite">
                    <div className="home-dashboard-chat-message">
                      {t("Hi there! What can I help you with today?")}
                    </div>
                    {activeTopic && (
                      <>
                        <div className="home-dashboard-chat-message is-user">{t(activeTopic.question)}</div>
                        <div className="home-dashboard-chat-message">{t(activeTopic.answer)}</div>
                        <Link className="home-dashboard-chat-link" href={activeTopic.href}>
                          {t(activeTopic.link)} <ArrowRight size={13} aria-hidden="true" />
                        </Link>
                      </>
                    )}
                  </div>
                  <div className="home-dashboard-chat-topics">
                    {helpTopics.map(({ question }, index) => (
                      <button
                        type="button"
                        className={activeHelpTopic === index ? "is-selected" : ""}
                        aria-pressed={activeHelpTopic === index}
                        key={question}
                        onClick={() => setActiveHelpTopic(index)}
                      >
                        {t(question)}
                      </button>
                    ))}
                  </div>
                  <Link href="/contact" className="home-dashboard-chat-contact">
                    <MessageCircle size={14} aria-hidden="true" />
                    {t("Need a person? Talk to our team")}
                  </Link>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Tabbed overview of the three Wavoko service lines.
function PlatformShowcase() {
  const { t } = useLanguage();
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const activeService = platformServices[activeServiceIndex];

  return (
    <section className="platform-showcase">
      <div className="platform-showcase-inner">
        <p className="platform-showcase-eyebrow">{t("The Wavoko platform")}</p>
        <h2>{t("Everything you need for the next move")}</h2>
        <p className="platform-showcase-intro">{t("Three specialist services, one standard of personal support.")}</p>

        <div className="platform-service-tabs" role="tablist" aria-label={t("Choose a Wavoko service")}>
          {platformServices.map(({ Icon, name }, index) => (
            <button
              aria-controls="platform-service-panel"
              aria-selected={activeServiceIndex === index}
              className={`platform-service-tab${activeServiceIndex === index ? " is-active" : ""}`}
              id={`platform-service-tab-${index}`}
              key={name}
              onClick={() => setActiveServiceIndex(index)}
              onKeyDown={(event) => {
                let nextIndex = index;
                if (event.key === "ArrowRight") nextIndex = (index + 1) % platformServices.length;
                else if (event.key === "ArrowLeft") nextIndex = (index - 1 + platformServices.length) % platformServices.length;
                else if (event.key === "Home") nextIndex = 0;
                else if (event.key === "End") nextIndex = platformServices.length - 1;
                else return;

                event.preventDefault();
                setActiveServiceIndex(nextIndex);
                document.getElementById(`platform-service-tab-${nextIndex}`)?.focus();
              }}
              role="tab"
              tabIndex={activeServiceIndex === index ? 0 : -1}
              type="button"
            >
              <Icon size={16} aria-hidden="true" />
              {t(name)}
            </button>
          ))}
        </div>

        <div
          aria-labelledby={`platform-service-tab-${activeServiceIndex}`}
          className="platform-service-panel"
          id="platform-service-panel"
          role="tabpanel"
          tabIndex={0}
        >
          <div className="platform-service-copy">
            <p className="platform-service-audience">{t(activeService.audience)}</p>
            <h3>{t(activeService.headline)}</h3>
            <p>{t(activeService.description)}</p>
            <Link href={activeService.href} className="platform-service-cta">
              {t(activeService.cta)} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="platform-service-benefits">
            {activeService.benefits.map(([title, description]) => (
              <div className="platform-service-benefit" key={title}>
                <span className="platform-service-check"><Check size={13} aria-hidden="true" /></span>
                <span>
                  <strong>{t(title)}</strong>
                  <small>{t(description)}</small>
                </span>
              </div>
            ))}
          </div>
          <div className="platform-service-metric">
            <span className="platform-service-metric-value">{activeService.metric}</span>
            <span className="platform-service-metric-label">{t(activeService.metricLabel)}</span>
            <activeService.Icon className="platform-service-metric-icon" size={25} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Partnership callout combining company messaging and a sample activity card.
function PartnershipShowcase() {
  const { t } = useLanguage();

  return (
    <section className="partnership-section">
      <div className="partnership-panel">
        <div className="partnership-copy">
          <p className="eyebrow">{t("For companies and partners")}</p>
          <h2>{t("Grow beyond the limits of your current network.")}</h2>
          <p className="partnership-description">
            {t("Work with Wavoko to reach stronger candidates, support international teams, and give your people access to more opportunity.")}
          </p>
          <div className="partnership-metrics">
            <div><strong>{t("1:1")}</strong><span>{t("Dedicated partnership")}</span></div>
            <div><strong>{t("360°")}</strong><span>{t("Connected support")}</span></div>
            <div><strong>{t("Global")}</strong><span>{t("Outlook and reach")}</span></div>
          </div>
          <div className="partnership-actions">
            <Link href="/contact" className="partnership-primary-cta">
              {t("Partner with Wavoko")} <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="partnership-secondary-cta">
              {t("Talk to partnerships")} <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="partnership-overview">
          <div className="partnership-overview-header">
            <strong>{t("Partnership overview")}</strong>
            <span>{t("Live")}</span>
          </div>
          <div className="partnership-momentum">
            <span className="partnership-momentum-icon"><ChartNoAxesColumnIncreasing size={23} aria-hidden="true" /></span>
            <span><small>{t("Momentum")}</small><strong>{t("Moving forward")}</strong></span>
          </div>
          <div className="partnership-rows">
            {partnershipRows.map(({ Icon, title, detail, count }) => (
              <div className="partnership-row" key={title}>
                <span className="partnership-row-icon"><Icon size={15} aria-hidden="true" /></span>
                <span className="partnership-row-copy"><strong>{t(title)}</strong><small>{t(detail)}</small></span>
                <span className="partnership-row-count">{t(count)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Quote carousel with manual controls, autoplay, and reduced-motion support.
function ClientStoryShowcase() {
  const { t } = useLanguage();
  const [activeStory, setActiveStory] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const story = clientStories[activeStory];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(preference.matches);
    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const interval = window.setInterval(() => {
      setActiveStory((current) => (current + 1) % clientStories.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, [isPaused, reducedMotion]);

  const showPreviousStory = () => {
    setIsPaused(true);
    setActiveStory((current) => (current - 1 + clientStories.length) % clientStories.length);
  };
  const showNextStory = () => {
    setIsPaused(true);
    setActiveStory((current) => (current + 1) % clientStories.length);
  };

  return (
    <section className="client-story-section">
      <div className="client-story-panel">
        <div className="client-story-brand">
          <span className="client-story-brand-mark">W</span>
          <div className="client-story-ribbons" aria-hidden="true"><i /><i /><i /></div>
          <h2>{t("Forward, together.")}</h2>
        </div>
        <div className="client-story-content">
          <p className="client-story-label">{t("Illustrative client story")}</p>
          <blockquote key={activeStory} className="client-story-quote">
            “{t(story.quote)}”
          </blockquote>
          <div className="client-story-footer">
            <span className="client-story-avatar" aria-hidden="true">W</span>
            <span className="client-story-attribution">
              <strong>{t("Wavoko client")}</strong>
              <small>{t(story.clientType)}</small>
            </span>
          </div>
          <div className="client-story-controls" role="group" aria-label={t("Client story controls")}>
            <button type="button" onClick={showPreviousStory} aria-label={t("Previous story")}>
              <ArrowLeft size={15} aria-hidden="true" />
            </button>
            <div className="client-story-dots">
              {clientStories.map((item, index) => (
                <button
                  type="button"
                  key={item.clientType}
                  className={activeStory === index ? "is-active" : ""}
                  aria-label={`${t("Show story")} ${index + 1}`}
                  aria-current={activeStory === index ? "true" : undefined}
                  onClick={() => {
                    setIsPaused(true);
                    setActiveStory(index);
                  }}
                />
              ))}
            </div>
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                aria-label={t(isPaused ? "Play stories" : "Pause stories")}
              >
                {isPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
              </button>
            )}
            <button type="button" onClick={showNextStory} aria-label={t("Next story")}>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Final set of links routes visitors to the service matching their needs.
function ClosingCallToAction() {
  const { t } = useLanguage();
  const paths = [
    { audience: "For companies", title: "Find exceptional talent", href: "/talent" },
    { audience: "For candidates", title: "Reach leading employers", href: "/wecoapply", featured: true },
    { audience: "For global lives", title: "Transfer money abroad", href: "/finance" },
  ];

  return (
    <section className="closing-cta-section">
      <div className="closing-cta-inner">
        <div className="closing-cta-heading">
          <p className="eyebrow">{t("Let’s move forward")}</p>
          <h2>{t("What can we help you achieve?")}</h2>
        </div>
        <div className="closing-cta-links">
          {paths.map(({ audience, title, href, featured }) => (
            <Link
              href={href}
              className={`closing-cta-link${featured ? " is-featured" : ""}`}
              key={audience}
            >
              <span>
                <small>{t(audience)}</small>
                <strong>{t(title)}</strong>
              </span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Controls the dashboard preview's scroll-linked scale and decorative backdrop.
function HomeDashboardSection() {
  const dashboardSceneRef = useRef<HTMLDivElement>(null);
  const [dashboardScale, setDashboardScale] = useState(0.9);

  useEffect(() => {
    const scene = dashboardSceneRef.current;
    if (!scene) return;

    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const distance = scene.offsetHeight - window.innerHeight;
        const progress = distance <= 0
          ? 1
          : Math.min(1, Math.max(0, -scene.getBoundingClientRect().top / distance));
        const initialScale = window.innerWidth <= 760 ? 0.94 : 0.9;
        setDashboardScale(initialScale + (1.04 - initialScale) * progress);
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div ref={dashboardSceneRef} className="home-dashboard-section">
      <HeroMotionGraphic className="dashboard-underlay-motion" />
      <HomeDashboard scale={dashboardScale} />
    </div>
  );
}

// Homepage composition: hero, dashboard preview, service content, stories, and CTAs.
export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <p className="eyebrow">{t("One partner. Three ways forward.")}</p>
            <h1>
              <span>{t("Turn ambition into ")}</span>
              <span className="em">{t("forward motion")}</span>
            </h1>
            <p className="home-hero-description">
              {t("Wavoko helps companies find exceptional people, helps candidates reach leading employers, and helps money move safely across borders.")}
            </p>
            <div className="home-hero-actions">
              <Link href="/contact" className="btn btn-ink">{t("Talk to our team")} <ArrowRight size={16} /></Link>
              <Link href="/services" className="btn btn-ghost">{t("Explore our services")} <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
        <div className="home-hero-quote-orbit" role="group" aria-label={t("Motivational reminders")}>
          <span className="home-hero-quote-ring home-hero-quote-ring-outer" aria-hidden="true" />
          <span className="home-hero-quote-ring home-hero-quote-ring-inner" aria-hidden="true" />
          <div className="home-hero-quote-track">
            {heroMotivations.map((quote, index) => (
              <div className="home-hero-quote-position" key={quote}>
                <p className={`home-hero-quote-card home-hero-quote-card-${index + 1}`}>
                  <span>0{index + 1} / {t("A little reminder")}</span>
                  {t(quote)}
                </p>
              </div>
            ))}
          </div>
          <span className="home-hero-quote-center" aria-hidden="true"><Sparkles size={28} /></span>
        </div>
      </section>

      <HomeDashboardSection />

      <section className="value-strip border-y border-sand">
        <div className="grid w-full gap-6 px-5 py-8 sm:grid-cols-3">
          {values.map(({ Icon, t: title, d }) => (
            <div key={title} className="flex items-start gap-3">
              <Icon className="mt-1 shrink-0 text-ink" size={26} />
              <div><p className="font-medium text-ink">{t(title)}</p><p className="text-xs">{t(d)}</p></div>
            </div>
          ))}
        </div>
      </section>

      <PlatformShowcase />

      <section className="journey-section">
        <div className="journey-inner">
          <p className="eyebrow">{t("Everything in one journey")}</p>
          <h2>{t("Four steps. One clear way forward.")}</h2>
          <p className="journey-intro">
            {t("From the first conversation to the final outcome, Wavoko keeps every next step connected, visible, and supported.")}
          </p>
          <div className="journey-grid">
            {journeySteps.map(({ Icon, title, description, points, previewType, previewLabel, previewText }, index) => (
              <article className="journey-card" key={title}>
                <div className="journey-card-top">
                  <span className="journey-icon"><Icon size={19} aria-hidden="true" /></span>
                  <span className="journey-number">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{t(title)}</h3>
                <p className="journey-description">{t(description)}</p>
                <ul className="journey-points">
                  {points.map((point) => (
                    <li key={point}><Check size={13} aria-hidden="true" />{t(point)}</li>
                  ))}
                </ul>
                <div className={`journey-preview journey-preview-${previewType}`}>
                  {previewType === "assistant" && <span className="journey-avatar journey-avatar-ink"><span>W</span></span>}
                  {previewType === "specialist" && <span className="journey-avatar"><span>AK</span></span>}
                  {previewType === "complete" && <span className="journey-avatar"><Check size={15} aria-hidden="true" /></span>}
                  {previewType === "progress" ? (
                    <>
                      <div className="journey-progress-heading">
                        <strong>{t(previewLabel)}</strong>
                        <span>{t(previewText)}</span>
                      </div>
                      <div className="journey-progress-track" aria-label={t("Journey progress: on track")}>
                        <span /><span /><span />
                      </div>
                    </>
                  ) : (
                    <div className="journey-preview-copy">
                      <strong>{t(previewLabel)}</strong>
                      <span>{t(previewText)}</span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="outcomes-section">
        <div className="outcomes-inner">
          <div className="outcomes-heading">
            <div>
              <p className="eyebrow">{t("Outcomes that matter")}</p>
              <h2>{t("Progress you can feel.")}</h2>
            </div>
            <p>{t("Not more complexity. Not more noise. Just capable people, thoughtful guidance, and meaningful results.")}</p>
          </div>
          <div className="outcomes-grid">
            {outcomes.map(({ Icon, title, description }, index) => (
              <article className="outcome-card" key={title}>
                <span className="outcome-number">{String(index + 1).padStart(2, "0")}</span>
                <Icon className="outcome-icon" size={21} aria-hidden="true" />
                <h3>{t(title)}</h3>
                <p>{t(description)}</p>
              </article>
            ))}
            <div className="outcome-cta-card">
              <h3>{t("Ready for your next move?")}</h3>
              <Link href="/contact" className="outcome-cta">
                {t("Let’s begin")} <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PartnershipShowcase />
      <ClientStoryShowcase />
      <ConnectedPartnerShowcase />
      <ClosingCallToAction />
    </>
  );
}
