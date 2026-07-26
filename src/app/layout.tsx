import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
    default: "Mihir Chavan - Frontend Developer",
    template: "%s | Mihir Chavan",
  },
  description:
    "Frontend developer specializing in React, Next.js, and TypeScript. Explore my portfolio showcasing projects, skills, and achievements.",
  keywords: [
    "Mihir Chavan",
    "frontend developer",
    "react",
    "nextjs",
    "typescript",
    "portfolio",
    "web developer",
    "UI developer",
  ],
  authors: [{ name: "Mihir Chavan" }],
  openGraph: {
    title: "Mihir Chavan - Frontend Developer",
    description:
      "Frontend developer specializing in React, Next.js, and TypeScript. Explore my portfolio showcasing projects, skills, and achievements.",
    type: "website",
    locale: "en_US",
    siteName: "Mihir Chavan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mihir Chavan - Frontend Developer",
    description:
      "Frontend developer specializing in React, Next.js, and TypeScript. Explore my portfolio showcasing projects, skills, and achievements.",
  },
  robots: {
    index: true,
    follow: true,
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
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
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
