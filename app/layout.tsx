import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Krunal Baldha",
    template: "%s | Krunal Baldha",
  },
  description:
    "Product Manager with strong technical background in SaaS, UX, automation, and strategy. Explore my projects, experience, and case studies.",
  keywords: [
    "Krunal Baldha",
    "Product Manager",
    "QA Automation",
    "SaaS Products",
    "UX Optimization",
    "Product Strategy",
    "Roadmapping",
    "Market Research",
    "User Research",
    "Ahmedabad",
    "Portfolio",
  ],
  authors: [{ name: "Krunal Baldha" }],
  creator: "Krunal Baldha",
  publisher: "Krunal Baldha",
  metadataBase: new URL("https://krunal.live"),
  openGraph: {
    type: "website",
    url: "https://krunal.live",
    title: "Krunal Baldha — Product Manager",
    description:
      "I design and build impactful digital products through strategy, research, and quality engineering.",
    siteName: "Krunal Baldha Portfolio",
    images: [
      {
        url: "https://krunal.live/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Krunal Baldha Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krunal Baldha — Product Manager",
    description:
      "Product Manager specializing in SaaS, UX, automation, and research. Explore my experience and work.",
    images: ["https://krunal.live/og-image.jpg"],
  },
  icons: {
    icon: "images/apple.png",
  },
  themeColor: "#0a0f1f",
  category: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
