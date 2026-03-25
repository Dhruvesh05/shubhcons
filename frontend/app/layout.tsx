import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import TopButton from '@/components/TopButton';
import CallButton from "@/components/CallButton";
import { SITE_URL } from "@/utils/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Shubh Construction | Civil & Industrial Construction Company",
    template: "%s | Shubh Construction",
  },

  description:
    "Shubh Construction is a trusted civil and industrial construction company in Bharuch, Gujarat, delivering quality projects on time.",

  openGraph: {
    title: "Shubh Construction",
    description: "Civil & industrial construction company in Bharuch, Gujarat",
    url: SITE_URL,
    siteName: "Shubh Construction",
    images: [
      {
        url: "/og-image.png", // ✅ now resolves correctly
        width: 1200,
        height: 630,
        alt: "Shubh Construction",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ConstructionCompany"],
      name: "Shubh Construction",
      url: SITE_URL,
      logo: `${SITE_URL}/shubh-construction-logo.png`,
      telephone: "+919601940724",
      email: "J.talpada@shubhconstructions.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Office No. C-408, Narayan Luxuria, Umraj",
        addressLocality: "Bharuch",
        addressRegion: "Gujarat",
        postalCode: "392015",
        addressCountry: "IN",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Gujarat",
      },
      sameAs: [
        "https://www.facebook.com/shubhconstruction2017/",
        "https://in.linkedin.com/in/shubh-construction-85850791",
      ],
    }),
  },
};





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
        <TopButton/>
        <CallButton />
      </body>
    </html>
  );
}
