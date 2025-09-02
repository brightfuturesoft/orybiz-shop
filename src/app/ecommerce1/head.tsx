// 'use client';

// import { useWorkspaceStore } from "@/store/workspaceStore";
// import { useProductStore } from "@/store/productStore";
// import { useEffect, useState } from "react";

// export default function Head() {
//   const workspace = useWorkspaceStore((state) => state.workspace);
//   const { products, fetchProducts } = useProductStore();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [firstProduct, setFirstProduct] = useState<any>(null);

//   useEffect(() => {
//     if (workspace?._id) {
//       fetchProducts(workspace._id);
//     }
//   }, [workspace, fetchProducts]);

//   useEffect(() => {
//     if (products && products.length > 0) {
//       const product = products.find(p => p.item_type === "product");
//       setFirstProduct(product || null);
//     }
//   }, [products]);

//   const siteName = workspace?.name || "My Ecommerce Store";
//   const defaultDescription =
//     workspace?.basic_info?.description || "Shop best products online";
//   const url = workspace?.domain_info?.domain || "https://example.com";

//   // Product-specific metadata
//   const title = firstProduct?.item_name || siteName;
//   const description = firstProduct?.item_description || defaultDescription;
//   const imageUrl = firstProduct?.attachments?.[0] || workspace?.image || null;

//   const keywords =
//     products && products.length > 0
//       ? products.map(p => p.item_name).join(", ")
//       : "ecommerce, shop, online store, products";

//   return (
//     <>
//       <title>{title}</title>
//       <meta name="description" content={description} />
//       <meta name="keywords" content={keywords} />
//       <meta name="author" content={siteName} />

//       {/* Open Graph */}
//       <meta property="og:type" content="website" />
//       <meta property="og:title" content={title} />
//       <meta property="og:description" content={description} />
//       <meta property="og:url" content={url} />
//       {imageUrl && <meta property="og:image" content={imageUrl} />}

//       {/* Twitter */}
//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:title" content={title} />
//       <meta name="twitter:description" content={description} />
//       {imageUrl && <meta name="twitter:image" content={imageUrl} />}

//       {/* Favicon */}
//       {workspace?.image && <link rel="icon" href={workspace.image} />}
//     </>
//   );
// }
