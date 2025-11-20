import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import ClientLayout from "@/app/ClientLayout";

// Geist fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Poppins font from Google Fonts (no download needed)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Greenway Lawyer - Expert Legal Services",
    template: "%s | Greenway Lawyer",
  },
  description:
    "Professional legal services including Corporate Law, Family Law, Estate Planning, Immigration, Criminal Defense, Real Estate, Personal Injury, and Employment Law. Expert attorneys ready to help you.",
  keywords: [
    "lawyer",
    "attorney",
    "legal services",
    "corporate law",
    "family law",
    "estate planning",
    "immigration lawyer",
    "criminal defense",
    "real estate law",
    "personal injury",
    "employment law",
    "legal consultation",
    "law firm",
    "legal advice",
    "court representation",
  ],
  authors: [{ name: "Greenway Lawyer" }],
  creator: "Greenway Lawyer",
  publisher: "Greenway Lawyer",
  metadataBase: new URL("https://greenwaylawyer.com"),
  alternates: {
    canonical: "https://greenwaylawyer.com",
  },
  openGraph: {
    type: "website",
    url: "https://greenwaylawyer.com",
    title: "Greenway Lawyer - Expert Legal Services",
    description:
      "Professional legal services including Corporate Law, Family Law, Estate Planning, Immigration, Criminal Defense, Real Estate, Personal Injury, and Employment Law.",
    siteName: "Greenway Lawyer",
    locale: "en_US",
    images: [
      {
        url: "https://greenwaylawyer.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Greenway Lawyer - Professional Legal Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Greenway Lawyer - Expert Legal Services",
    description:
      "Professional legal services including Corporate Law, Family Law, Estate Planning, Immigration, Criminal Defense, Real Estate, Personal Injury, and Employment Law.",
    images: ["https://greenwaylawyer.com/og-image.jpg"],
    creator: "@greenwaylawyer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "Legal Services",
  classification: "Law Firm",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable}`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
