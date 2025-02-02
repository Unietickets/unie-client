import React from 'react';
import { Raleway } from "next/font/google";

import { Container, Header } from "@shared/ui";

import { Providers } from './providers'
import StyledComponentsRegistry from './registry'

import "./globals.css";

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
      <body className={`${raleWaySans.variable} ${raleWayMono.variable} antialiased`}>
        <StyledComponentsRegistry>
          <Providers>
            <Container>
              <Header />
            </Container>
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
