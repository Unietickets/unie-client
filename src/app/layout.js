import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { Container, Header } from "@/shared/ui";

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
        <Container>
          <Header />
          {children}
        </Container>
      </body>
    </html>
  );
}
