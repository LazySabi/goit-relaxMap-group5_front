import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";

import Header from "@/components/sections/Header/Header";
import Footer from "@/components/sections/Footer/Footer";
import TanStackQueryProvider from "@/components/providers/TanStackQueryProvider/TanStackQueryProvider";
import AuthProvider from "@/components/providers/AuthProvider/AuthProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Notehub",
  description: "Notes app",
  openGraph: {
    title: "Notehub",
    description: "Notes app",
    url: "https://notehub.example.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
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
    <html lang="en" className={montserrat.variable}>
      <body>
        <TanStackQueryProvider>
          <AuthProvider>
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