import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEET Zoology QGen - AI Question Paper Generator",
  description:
    "AI-powered question paper generation system for Telangana Zoology and NEET coaching. Generate syllabus-aligned, NEET-standard weekly test papers in minutes.",
  keywords: [
    "NEET",
    "Zoology",
    "Question Paper",
    "AI",
    "Telangana",
    "Coaching",
    "MCQ",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
