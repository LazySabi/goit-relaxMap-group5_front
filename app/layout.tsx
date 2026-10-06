import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";

import Header from "@/components/sections/Header/Header";
import Footer from "@/components/sections/Footer/Footer";
import TanStackQueryProvider from "@/components/providers/TanStackQueryProvider/TanStackQueryProvider";
import AuthProvider from "@/components/providers/AuthProvider/AuthProvider";
import EditProfileModal from "@/components/profile/EditProfileModal/EditProfileModal";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
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
            <EditProfileModal />
            <Toaster position="top-right" />
          </AuthProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}