'use client';
import React, { ReactNode } from "react";
import Ecommerce1Layout from "../layout/EcommerceLayout1";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

interface EcommerceLayoutProps {
  children: ReactNode;
}
export default function EcommerceLayout({ children }: EcommerceLayoutProps) {

  const {
        data: workspace,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['workspace'],
        queryFn: async () => {
            const response = await fetch(
                        'api/get-workspace',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (!response.ok) throw new Error('Failed to fetch categories');
            const data = await response.json();
            return data.data;
        },
    });


    console.log(workspace)




  const brand = "ecommerce1";
  if (brand === "ecommerce1") {
    return <Ecommerce1Layout>{children}</Ecommerce1Layout>;
  }
  return <>{children}</>;
}
