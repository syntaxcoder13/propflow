import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  title: "PropFlow — AI-Powered Real Estate Intelligence Platform",
  description:
    "A modern real estate intelligence dashboard combining predictive analytics, pipeline CRM, and automated property matching for data-driven teams.",
  keywords: [
    "PropFlow",
    "Real Estate CRM",
    "AI Real Estate Intelligence",
    "Real Estate Agency Software",
    "Property Matching AI",
    "Broker CRM",
    "Executive Real Estate Dashboard",
  ],
  authors: [{ name: "PropFlow Team" }],
  creator: "PropFlow",
  openGraph: {
    title: "PropFlow — AI-Powered Real Estate Intelligence Platform",
    description:
      "A modern real estate intelligence dashboard combining predictive analytics, pipeline CRM, and automated property matching.",
    type: "website",
    locale: "en_US",
    siteName: "PropFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "PropFlow — AI-Powered Real Estate Intelligence Platform",
    description:
      "Modern real estate intelligence dashboard combining predictive analytics and automated matching.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${sansFont.variable} ${interFont.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#FAFBFC] text-[#0F172A] selection:bg-[#00A3FF] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
