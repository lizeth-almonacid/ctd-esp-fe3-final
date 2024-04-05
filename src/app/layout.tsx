/* eslint-disable no-unused-vars */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { CartProvider } from "@/context/CarContext";
import { SessionProvider } from "@/context/SessionAuthProvider";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Pixel Palace",
  description: "App videogames",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/logo.png" />
        {/* @ts-ignore */}
        <title>{metadata?.title}</title>
      </head>

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body>
        <CartProvider>
          <SessionProvider>{children}</SessionProvider>
        </CartProvider>
      </body>
    </html>
  );
}
