import React from 'react';
import { fetchEcommerceData } from './utils/api/api';
import Ecommerce1Layout from './layout/EcommerceLayout1';

interface Product {
  id: string | number;
  name: string;
  price: number;
  image?: string;

}

interface SEO {
  title?: string;
  description?: string;
}

interface EcommerceData {
  seo?: SEO;
  banner?: string;
  products?: Product[];
}

export default async function Page() {
 const data: EcommerceData | null = await fetchEcommerceData('1');
return <Ecommerce1Layout data={data ?? undefined} />;

}
