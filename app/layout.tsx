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
  title: "Alfi Candra Dinata | Software Engineer",
  description:
    "Portofolio Alfi Candra Dinata — Full-Stack Software Engineer dari Pekanbaru. Pengembangan aplikasi web, mobile, dan sistem berbasis data.",
  keywords: [
    "Alfi Candra Dinata",
    "Alfi Candra",
    "Software Engineer",
    "Web Developer Pekanbaru",
    "Next.js",
    "React Native",
    "Python",
    "Portofolio",
  ],
  authors: [{ name: "Alfi Candra Dinata" }],
  openGraph: {
    title: "Alfi Candra Dinata | Software Engineer",
    description:
      "Portofolio Alfi Candra Dinata — pengembangan aplikasi web, mobile, dan solusi berbasis data.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-ink-soft font-sans">
        {children}
      </body>
    </html>
  );
}
