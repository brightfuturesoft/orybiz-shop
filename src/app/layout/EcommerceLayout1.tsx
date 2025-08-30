import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import TopBar from "../components/TopBar/TopBar";
import BannerSection from "../components/BannerSection/BannerSection";
import BrowseByCategory from "../components/Caategory/BrowseByCategory";
import ExploreProducts from "../components/ExploreProducts/ExploreProducts";
import BestSellingProduct from "../components/BestSellingProduct/BestSellingProduct";
import MusicSection from "../components/MusicSection/MusicSection";
import ExploreService from "../components/Service/ExploreService";
import FeatureSection from "../components/FeatureSection/FeatureSection";

interface Product {
  id: string | number;
  name: string;
  price: number;
  image?: string;
}

export default function Ecommerce1Layout() {
  // Hardcoded data
  const data = {
    seo: {
      title: "My Ecommerce Store",
      description: "Shop best products online",
    },
    banner: {
      title: "Discover Our New Collection",
      subtitle: "Exclusive deals just for you",
      image: "https://example.com/banner.jpg",
      ctaText: "Shop Now",
      ctaLink: "/shop",
    },
    products: [
      {
        id: 1,
        name: "Product One",
        price: 29.99,
        image: "https://example.com/product1.jpg",
      },
      {
        id: 2,
        name: "Product Two",
        price: 49.99,
        image: "https://example.com/product2.jpg",
      },
      {
        id: 3,
        name: "Product Three",
        price: 19.99,
        image: "https://example.com/product3.jpg",
      },
    ] as Product[],
  };

  return (
    <div>
      <Head>
        <title>{data.seo.title}</title>
        <meta name="description" content={data.seo.description} />
      </Head>

      <TopBar />
      <Navbar />
      <BannerSection />
      <BrowseByCategory />
      <div className="container my-5 h-[2px] mx-auto bg-gray-500 opacity-30"></div>
      <BestSellingProduct />
      <div className="container my-5 h-[2px] mx-auto bg-gray-500 opacity-30"></div>
      <ExploreProducts />
      <div className="container my-5 h-[2px] mx-auto bg-gray-500 opacity-30"></div>
      <MusicSection />
      <div className="container my-5 h-[2px] mx-auto bg-gray-500 opacity-30"></div>
      <ExploreService />
      <div className="container my-5 h-[2px] mx-auto bg-gray-500 opacity-30"></div>
      <FeatureSection />

      <main className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"></main>

      <Footer />
    </div>
  );
}
