import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";
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
    default: "Your Name - Frontend Developer",
    template: "%s | Your Name",
  },
  description:
    "Portfolio showcasing frontend development expertise with Next.js, TypeScript, and modern web technologies.",
  keywords: [
    "frontend developer",
    "react",
    "nextjs",
    "typescript",
    "portfolio",
  ],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Your Name - Frontend Developer",
    description:
      "Portfolio showcasing frontend development expertise with Next.js, TypeScript, and modern web technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name - Frontend Developer",
    description:
      "Portfolio showcasing frontend development expertise with Next.js, TypeScript, and modern web technologies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
