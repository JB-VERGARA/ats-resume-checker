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

const siteUrl = "https://YOUR-DOMAIN.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ATS Resume Checker",
  url: siteUrl,
  description:
    "A free AI-powered ATS resume checker that compares your resume against a job description. No signup and no paywall.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Person",
    name: "John Bryan Vergara",
    url: "https://johnbryanvergara.vercel.app",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Free ATS Resume Checker — No Signup, No Paywall",
    template: "%s | ATS Resume Checker",
  },

  description:
    "Check how well your resume matches a job description with a free AI-powered ATS resume checker. No signup, no account, and no paywall.",

  authors: [
    {
      name: "John Bryan Vergara",
      url: "https://johnbryanvergara.vercel.app",
    },
  ],

  creator: "John Bryan Vergara",

  icons: {
    icon: "/favicon.svg?v=2",
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Free ATS Resume Checker — No Signup, No Paywall",
    description:
      "Check how well your resume matches a job description. Free AI-powered resume analysis for job seekers and recruiters.",
    siteName: "ATS Resume Checker",
  },

  twitter: {
    card: "summary_large_image",
    title: "Free ATS Resume Checker — No Signup, No Paywall",
    description:
      "Check how well your resume matches a job description. Free, no signup, no paywall.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </body>
    </html>
  );
}