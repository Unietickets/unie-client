import React from 'react';
import { Raleway } from "next/font/google";

import "./globals.css";

import { Container, Header } from "@shared/ui";

const raleWaySans = Raleway({
  variable: "--font-raleway-sans",
  subsets: ["latin"],
  weight: ['400', '500', '600']
});

const raleWayMono = Raleway({
  variable: "--font-raleway-mono",
  subsets: ["latin"],
  weight: ['400', '500', '600']
});

export const metadata = {
  title: "Unie",
  description: "Entertaining events tickets selling platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body
        className={`${raleWaySans.variable} ${raleWayMono.variable} antialiased`}
      >
        <Container>
          <Header />
          {children}
        </Container>
      </body>
    </html>
  );
}
