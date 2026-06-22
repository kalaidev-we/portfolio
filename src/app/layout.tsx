import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import MouseGradient from "@/components/MouseGradient";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Kalaiarasu Subramaniam | Full Stack Developer, Founder & AI Enthusiast",
  description: "Immersive storytelling portfolio of Kalaiarasu Subramaniam, diploma graduate from PSG Polytechnic College and Founder of AriseAgency. Specializing in Full Stack, AI & IoT systems.",
  keywords: ["Kalaiarasu Subramaniam", "PSG Polytechnic College", "AriseAgency", "Full Stack Developer", "IoT Specialist", "Portfolio", "Namakkal Developer"],
  authors: [{ name: "Kalaiarasu Subramaniam" }],
  openGraph: {
    title: "Kalaiarasu Subramaniam | Full Stack Developer & Founder",
    description: "Cinematic portfolio website for Kalaiarasu Subramaniam, showing projects in Web, AI, IoT, and AriseAgency's entrepreneurial journey.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalaiarasu Subramaniam | Portfolio",
    description: "Cinematic portfolio website showing projects in Web, AI, IoT, and AriseAgency's entrepreneurial journey.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${spaceMono.variable} antialiased bg-bgDark text-cream font-sans`}
      >
        <SmoothScroll>
          <MouseGradient />
          <div className="relative z-10">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
