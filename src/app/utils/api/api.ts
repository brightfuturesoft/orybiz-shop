export interface Product {
  id: number;
  name: string;
  price: number;

}

export interface SEO {
  title: string;
  description: string;
}

export interface EcommerceData {
  seo: SEO;
  products: Product[];
}

export async function fetchEcommerceData(type: string): Promise<EcommerceData | null> {
  if (type === '1') {
    return {
      seo: { title: 'Ecommerce 1', description: 'Best products Ecommerce 1' },
      products: [
        { id: 1, name: 'Product A', price: 25 },
        { id: 2, name: 'Product B', price: 40 },
      ],
    };
  }
  if (type === '2') {
    return {
      seo: { title: 'Ecommerce 2', description: 'Best products Ecommerce 2' },
      products: [
        { id: 1, name: 'Product C', price: 30 },
        { id: 2, name: 'Product D', price: 50 },
      ],
    };
  }
  if (type === '3') {
    return {
      seo: { title: 'Ecommerce 3', description: 'Best products Ecommerce 3' },
      products: [
        { id: 1, name: 'Product E', price: 20 },
        { id: 2, name: 'Product F', price: 45 },
      ],
    };
  }
  return null;
}
