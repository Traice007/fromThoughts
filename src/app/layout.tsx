import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SessionProvider } from "@/components/providers/session-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "fromThoughts - AI-Powered Revenue Operations for Growing Companies",
  description: "Transform your revenue targets into a clear revenue roadmap. fromThoughts helps SMBs bridge the gap between revenue goals and operational execution without hiring a VP of Commercial too early.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
  openGraph: {
    title: "fromThoughts - AI-Powered Revenue Operations",
    description: "Transform revenue targets into a clear revenue roadmap. Bridge the gap between goals and execution.",
    siteName: "fromThoughts",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "fromThoughts - AI-Powered Revenue Operations",
    description: "Transform revenue targets into a clear revenue roadmap for growing companies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}
      >
        <SessionProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </SessionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
