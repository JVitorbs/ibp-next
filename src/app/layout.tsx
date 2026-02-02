import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IBP - Igreja Batista do Pirangi",
  description: "Bem-vindo à Nossa Comunidade",
  icons: {
    icon: "/logos_Ibp/logo_redonda.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-gray-900 antialiased overflow-x-hidden`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
