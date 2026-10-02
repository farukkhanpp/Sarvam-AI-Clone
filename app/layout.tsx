import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sarvam.ai"),
  title: "Sarvam | India's Full-Stack Sovereign AI Platform",
  description: "Sarvam is India's full-stack sovereign AI platform, with speech-to-text, text-to-speech, translation, and conversational agents across 22 Indian languages. Start free.",
  alternates: { canonical: "https://www.sarvam.ai/" },
  icons: { icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/favicon.svg", type: "image/svg+xml" }], apple: "/favicon.svg" },
  openGraph: {
    type: "website", siteName: "Sarvam AI", title: "Sarvam | India's Full-Stack Sovereign AI Platform", description: "Sarvam is India's full-stack sovereign AI platform, with speech-to-text, text-to-speech, translation, and conversational agents across 22 Indian languages. Start free.",
    url: "https://www.sarvam.ai/", locale: "en_US",
    images: [{ url: "https://assets.sarvam.ai/tr:q-70,f-auto,dpr-auto/assets/og-images/home-og.png", width: 1200, height: 630, alt: "Sarvam | India's Full-Stack Sovereign AI Platform" }],
  },
  twitter: { card: "summary_large_image", site: "@SarvamAI", title: "Sarvam | India's Full-Stack Sovereign AI Platform", description: "Sarvam is India's full-stack sovereign AI platform, with speech-to-text, text-to-speech, translation, and conversational agents across 22 Indian languages. Start free.",
    images: ["https://assets.sarvam.ai/tr:q-70,f-auto,dpr-auto/assets/og-images/home-og.png"] },
  other: { google: "notranslate" },
};

export const viewport: Viewport = { width: "device-width" };

const orgLd = {"@context":"https://schema.org","@type":"Organization","name":"Sarvam AI","legalName":"Axonwise Private Limited","url":"https://www.sarvam.ai","logo":"https://www.sarvam.ai/favicon-96.png","sameAs":["https://x.com/SarvamAI","https://www.linkedin.com/company/sarvam-ai","https://github.com/sarvamai"]};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://js.hsforms.net" crossOrigin="" />
        <link rel="preconnect" href="https://js-eu1.hs-scripts.com" crossOrigin="" />
        <link rel="preload" href="/fonts/MatterUprights-VF.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/SeasonMixVFUprights.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="stylesheet" href="/_astro/CookieConsent.aX-sdnLM.css" />
        <link rel="stylesheet" href="/_astro/katex.BHXxHCKA.css" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </head>
      <body className="flex flex-col mx-auto min-h-screen overflow-x-clip overscroll-none font-matter">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
