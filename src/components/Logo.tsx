import Link from "next/link";

// Animated brand wordmark that links back to the homepage.
export default function Logo() {
  return (
    <Link href="/" className="brand-logo text-2xl text-ink" aria-label="./WAVOKO home">
      <span className="brand-logo-prefix">./</span>
      {"WΛVOKO".split("").map((letter, index) => (
        <span className="brand-logo-letter" key={index} style={{ animationDelay: `${180 + index * 70}ms` }}>
          {letter}
        </span>
      ))}
      <span className="brand-logo-period">.</span>
    </Link>
  );
}
