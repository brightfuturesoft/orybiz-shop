'use client';
import Head from "next/head";

interface FaviconProps {
  url?: string;
}

export default function Favicon({ url }: FaviconProps) {
  if (!url) return null;

  return (
    <Head>
      <link key={url} rel="icon" href={url} type="image/png" />
    </Head>
  );
}
