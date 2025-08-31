import { BannerSection, BestSellingProduct, BrowseByCategory, ExploreProducts, ExploreService, FeatureSection, MusicSection } from "../components/Ecommerce1";



export default function HomePage() {
  return (
    <div>
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
    </div>
  );
}
