import React, { ReactNode, useEffect } from "react";
import Head from "next/head";
import { Footer, Navbar, TopBar } from "../components/Ecommerce1";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { TWorkSpace } from "../types/types";


interface EcommerceLayout1Props {
  children: ReactNode;
}
export default function EcommerceLayout1({ children }: EcommerceLayout1Props) {

   const { workspace, fetchWorkspace } = useWorkspaceStore();
     useEffect(() => {
    fetchWorkspace();
    }, [fetchWorkspace]);

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>My Ecommerce Store</title>
        <meta name="description" content="Shop best products online" />
      </Head>
      <TopBar />
      <Navbar workspace={workspace as TWorkSpace | null} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
