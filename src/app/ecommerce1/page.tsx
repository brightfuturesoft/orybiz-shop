'use client';
import { BannerSection, BestSellingProduct, BrowseByCategory, ExploreProducts, ExploreService, FeatureSection, MusicSection } from "../components/Ecommerce1";





export default function HomePage() {
  // const {data} = useWorkspace();
  // const workspaceId = data?._id || ""
  // console.log(workspaceId)
  return (
    <div>
      {/* <BannerSection workspaceId={workspaceId}/> */}
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
