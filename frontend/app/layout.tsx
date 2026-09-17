import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const serifFont = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#111111",
};

export const metadata: Metadata = {
  title: "PropFlow — AI-Powered Real Estate Intelligence & Scraper Platform",
  description:
    "A modern real estate intelligence platform combining automated property portal scraping, predictive analytics, pipeline CRM, and automated property matching.",
  keywords: [
    "PropFlow",
    "Real Estate Scraper",
    "Real Estate CRM",
    "AI Real Estate Intelligence",
    "Playwright Property Scraper",
    "Property Matching AI",
    "Broker CRM",
  ],
  authors: [{ name: "PropFlow Team" }],
  creator: "PropFlow",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#111111] selection:bg-[#FF5C1C] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
