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
  title: "Alfi Candra Dinata | Software Engineer & Builder",
  description: "Portofolio interaktif Alfi Candra Dinata — Full-Stack Web Architect, Mobile Developer.",
  keywords: [
    "Alfi Candra Dinata",
    "Alfi Candra",
    "Software Engineer",
    "Web Developer Pekanbaru",
    "Next.js",
    "React Native",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Alfi Candra Dinata" }],
  openGraph: {
    title: "Alfi Candra Dinata | Software Engineer & Builder",
    description: "Portofolio interaktif Alfi Candra Dinata — Web, Mobile, & Data Solutions.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
