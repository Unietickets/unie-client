import { Geist, Geist_Mono } from "next/font/google";

import { AuthProvider, Header } from "@core/components/business";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Unie",
  description: "Entertaining events tickets selling platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
