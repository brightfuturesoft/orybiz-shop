'use client';
import React, { ReactNode } from "react";
import Ecommerce1Layout from "../layout/EcommerceLayout1";

interface EcommerceLayoutProps {
  children: ReactNode;
}

export default function EcommerceLayout({ children }: EcommerceLayoutProps) {
  const brand = "ecommerce1";

  if (brand === "ecommerce1") {
    return <Ecommerce1Layout>{children}</Ecommerce1Layout>;
  }

  return <>{children}</>;
}
