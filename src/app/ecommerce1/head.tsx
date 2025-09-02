import { useWorkspaceStore } from "@/store/workspaceStore";


export default function Head() {
  const workspace = useWorkspaceStore((state) => state.workspace);

  const siteName = workspace?.name || "My Ecommerce Store";
  const description =
    workspace?.basic_info?.description || "Shop best products online";
  const url = workspace?.domain_info?.domain || "https://example.com";
  const imageUrl =
    workspace?.image ||
    "https://th.bing.com/th/id/R.7fe3baa7d14308d15d0a46180d460949?rik=KnMDMWpoV%2fy82Q&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ffavicon-png-favicon-1024.png&ehk=%2bqV5vS87IkGxoQ9CGodbGHtJdQuFWcL1ZerjusSBDCE%3d&risl=&pid=ImgRaw&r=0";

  return (
    <>
      <title>{siteName}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="ecommerce, shop, online store, products" />
      <meta name="author" content={siteName} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteName} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Favicon */}
      <link rel="icon" href={imageUrl} />
    </>
  );
}
