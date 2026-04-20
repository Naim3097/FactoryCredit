import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const brandonGrotesque = localFont({
  src: [
    {
      path: "../../public/fonts/BrandonGrotesque-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/BrandonGrotesque-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/BrandonGrotesque-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-brandon",
  display: "swap",
});

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Light.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Factory Credit - Pinjaman Peribadi Patuh Syariah",
  description:
    "Pinjaman peribadi patuh syariah. Urusan di pejabat sahaja. Tak pegang kad bank. Proses mudah & pantas. Berlesen KPKT. Cawangan di Kuching, Kota Samarahan, Miri dan Bintulu.",
  keywords: [
    "pinjaman peribadi",
    "patuh syariah",
    "pinjaman berlesen KPKT",
    "Factory Credit",
    "pinjaman Kuching",
    "pinjaman Sarawak",
    "personal loan Malaysia",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Factory Credit - Pinjaman Peribadi Patuh Syariah",
    description:
      "Urusan di pejabat sahaja. Tak pegang kad bank. Proses mudah & pantas. Berlesen KPKT.",
    type: "website",
    locale: "ms_MY",
    siteName: "Factory Credit",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Factory Credit Sdn. Bhd.",
  description:
    "Agensi pinjaman berlesen di bawah Akta Pemberi Pinjam Wang 1951, dikawal selia oleh KPKT. Pinjaman peribadi patuh syariah.",
  url: "https://factorycredit.my",
  telephone: ["+60162072017", "+60103641788", "+60168868794", "+60143001881"],
  areaServed: "Sarawak, Malaysia",
  currenciesAccepted: "MYR",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "13:00",
    },
  ],
  address: [
    {
      "@type": "PostalAddress",
      name: "Satok Branch",
      streetAddress: "Lot 538, Ground Floor, Section 6, KTLD, Jalan Satok",
      addressLocality: "Kuching",
      addressRegion: "Sarawak",
      postalCode: "93400",
      addressCountry: "MY",
    },
    {
      "@type": "PostalAddress",
      name: "Miri Branch",
      streetAddress:
        "No. 1151, 1st Floor, Miri Waterfront, Jalan Sri Dagang",
      addressLocality: "Miri",
      addressRegion: "Sarawak",
      postalCode: "98000",
      addressCountry: "MY",
    },
    {
      "@type": "PostalAddress",
      name: "Kota Samarahan Branch",
      streetAddress:
        "1st Floor, No. 8 Lot 5604, Kuching - Samarahan Expressway, Taman Uni Square",
      addressLocality: "Kota Samarahan",
      addressRegion: "Sarawak",
      postalCode: "94300",
      addressCountry: "MY",
    },
    {
      "@type": "PostalAddress",
      name: "Bintulu Branch",
      streetAddress:
        "1st Floor, Junction 28 Jalan Keppel Bintulu, Lot 4499 Bintulu Town District",
      addressLocality: "Bintulu",
      addressRegion: "Sarawak",
      postalCode: "97000",
      addressCountry: "MY",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms" className={`${satoshi.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
