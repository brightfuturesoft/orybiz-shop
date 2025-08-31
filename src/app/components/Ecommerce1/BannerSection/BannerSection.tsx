import MainContent from "./MainContent";
import Sidebar from "./Sidebar";


const BannerSection = () => {
    return (
      <div className="flex p-4 container mx-auto flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 ml-4">
        <MainContent />
      </div>
    </div>
    );
};

export default BannerSection;