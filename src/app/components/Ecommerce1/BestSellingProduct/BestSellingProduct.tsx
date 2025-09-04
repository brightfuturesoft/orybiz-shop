'use client';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '@/app/types/product';

interface BestSellingProductProps {
  products: Product[]; 
}

const BestSellingProduct: React.FC<BestSellingProductProps> = ({ products }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Header with Navigation */}
      <div className="flex justify-between items-end mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-4 h-8 bg-red-500 rounded-sm"></div>
          <div>
            <p className="text-red-500 font-semibold mb-1">This Month</p>
            <h2 className="text-2xl md:text-3xl font-semibold mt-5">Best Selling Products</h2>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          {
            products?.length < 4 ? null : 
            <button className="bg-red-500 text-white px-10 py-4 rounded cursor-pointer hover:bg-red-600 transition-colors duration-300">
            View All 
          </button>
          }
          
        </div>
      </div>

      {/* Products Grid with Horizontal Scrolling */}
      <div className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar space-x-6 pb-4">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellingProduct;
