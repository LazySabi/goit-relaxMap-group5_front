import type { Metadata } from "next";

import "./globals.css";
import Header from "../components/sections/Header/Header";
import Footer from "../components/sections/Footer/Footer";
import TanStackQueryProvider from "../components/providers/TanStackQueryProvider/TanStackQueryProvider";
import { Montserrat } from "next/font/google";
import AuthProvider from "../components/providers/AuthProvider/AuthProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RelaxMap",
  description: "RelaxMap",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={montserrat.variable}>
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
