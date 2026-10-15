"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Adds the reveal classes to page sections and cards as they enter the viewport.
export default function ScrollReveal() {
  const pathname = usePathname();

  // Recreate the observer after route changes so the new page content is animated.
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      "main > section, main > div.wrap, main .card"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("scroll-reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
    );

    targets.forEach((target) => {
      target.classList.add("scroll-reveal");
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
