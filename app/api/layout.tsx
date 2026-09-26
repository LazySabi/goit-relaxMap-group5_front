import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/Header/Header";
import Footer from "@/components/sections/Footer/Footer";
import { Toaster } from "react-hot-toast";
import TanStackQueryProvider from "@/components/providers/TanStackQueryProvider/TanStackQueryProvider";
import AuthProvider from "@/components/providers/AuthProvider/AuthProvider";

const montserrat = Montserrat({
  style: "normal",
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Relax Map",
  description: "Service for searching places to relax",
  openGraph: {
    title: "Relax Map",
    description: "Service for searching places to relax",
    images: [
      {
        url: "/opengraph-image.jpg",
        height: 1200,
        width: 630,
        alt: "Relax Map",
      },
    ],
    url: process.env.NEXT_PUBLIC_SITE_URL,
    type: "article",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body>
        <TanStackQueryProvider>
          <AuthProvider>
            <Toaster />
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}