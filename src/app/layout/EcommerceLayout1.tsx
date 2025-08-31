import React, { ReactNode } from "react";
import Head from "next/head";
import { Footer, Navbar, TopBar } from "../components/Ecommerce1";


interface EcommerceLayout1Props {
  children: ReactNode;
}
export default function EcommerceLayout1({ children }: EcommerceLayout1Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>My Ecommerce Store</title>
        <meta name="description" content="Shop best products online" />
      </Head>
      <TopBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
