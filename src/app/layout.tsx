"use client";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./context/queryClient";
import { WorkspaceProvider } from "./context/WorkspaceContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["400","500","600","700"] });

interface RootLayoutProps { children: ReactNode }

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryClientProvider client={queryClient}>
          <WorkspaceProvider>
            {children}
          </WorkspaceProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
