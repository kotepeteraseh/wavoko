import "./globals.css";
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { LanguageProvider } from "@/components/LanguageProvider";

// Load the site's shared fonts as CSS variables for use throughout the app.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500"] });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", style: ["normal", "italic"] });

// Default metadata for routes that do not provide their own page metadata.
export const metadata: Metadata = {
  title: "Wavoko — Opening doors to possibility",
  description: "Your next job. Your next great hire. Your next financial milestone.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        {/* Shared language state, navigation, page content, reveal effects, and footer. */}
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <ScrollReveal />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
