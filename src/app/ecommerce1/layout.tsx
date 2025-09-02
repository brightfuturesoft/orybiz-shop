'use client';
import React, { ReactNode, useEffect } from "react";
import Ecommerce1Layout from "../layout/EcommerceLayout1";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Toaster } from 'react-hot-toast';

interface EcommerceLayoutProps {
  children: ReactNode;
}

export default function EcommerceLayout({ children }: EcommerceLayoutProps) {
  const { workspace, fetchWorkspace } = useWorkspaceStore();
  useEffect(() => {
    fetchWorkspace();
  }, [fetchWorkspace]);
  const brand = "ecommerce1";
  if (brand === "ecommerce1") {
    return <Ecommerce1Layout>{children}</Ecommerce1Layout>;
  }

  return <>{children}</>;
}
