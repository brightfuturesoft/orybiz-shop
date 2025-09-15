'use client';
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ReactNode, useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./context/queryClient";
import EcommerceLayout1 from "./layout/EcommerceLayout1";
import Favicon from "./ui/Favicon/Favicon";
import { Toaster } from "react-hot-toast";
import Spinner from "./ui/Spinner/Spinner";
import { useWorkspaceStore } from "@/store/workspaceStore";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["400","500","600","700"] });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [localLoading, setLocalLoading] = useState(true);
  const workspace = useWorkspaceStore((state) => state.workspace);
  const fetchWorkspace = useWorkspaceStore((state) => state.fetchWorkspace);

  useEffect(() => {
    async function loadWorkspace() {
      setLocalLoading(true);
      await fetchWorkspace();
      setLocalLoading(false);
    }
    loadWorkspace();
  }, [fetchWorkspace]);

  const siteName = workspace?.name || "My Ecommerce Store";
  const description = workspace?.basic_info?.description || "Shop best products online";
  const url = workspace?.domain_info?.domain || "https://example.com";
  const imageUrl = "https://th.bing.com/th/id/R.7fe3baa7d14308d15d0a46180d460949?rik=KnMDMWpoV%2fy82Q&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ffavicon-png-favicon-1024.png&ehk=%2bqV5vS87IkGxoQ9CGodbGHtJdQuFWcL1ZerjusSBDCE%3d&risl=&pid=ImgRaw&r=0";

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <title>{siteName}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="ecommerce, shop, online store, products" />
        <meta name="author" content={siteName} />
        <link key={imageUrl} rel="icon" href={imageUrl} type="image/png" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteName} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteName} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Favicon url={imageUrl} /> 
        <QueryClientProvider client={queryClient}>
          {localLoading ? (
            <div className="flex items-center justify-center min-h-screen">
              <Spinner message="Loading workspace..." size={64} color="red-500" />
            </div>
          ) : (
            <EcommerceLayout1>{children}</EcommerceLayout1>
          )}
          <Toaster position="top-center" reverseOrder={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
