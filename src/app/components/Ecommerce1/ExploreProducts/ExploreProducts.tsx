'use client';
import { useState, useRef } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Product } from '@/app/types/product';

interface ExploreProductProps {
  products: Product[]; 
}


const ExploreProducts: React.FC<ExploreProductProps> = ({products}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollOffset;
      setTimeout(() => {
        updateScrollState();
      }, 300);
    }
  };

  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Header with Navigation */}
      <div className="flex justify-between items-end mb-6">

           <div className="flex items-center space-x-4">
          <div className="w-4 h-8 bg-red-500 rounded-sm"></div>
          <div>
            <p className="text-red-500 font-semibold mb-1">Our Products</p>
            <h2 className="text-2xl md:text-3xl font-semibold mt-5">Explore Our Products</h2>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => scroll(-300)}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full transition-colors ${
              canScrollLeft ? 'bg-gray-200 hover:bg-gray-300 cursor-pointer' : 'bg-gray-100 cursor-not-allowed'
            }`}
          >
            <ArrowLeft className="h-6 w-6 text-black " />
          </button>
          <button
            onClick={() => scroll(300)}
            disabled={!canScrollRight}
            className={`p-2 rounded-full transition-colors ${
              canScrollRight ? 'bg-gray-200 hover:bg-gray-300 cursor-pointer' : 'bg-gray-100 cursor-not-allowed'
            }`}
          >
            <ArrowRight className="h-6 w-6 text-black" />
          </button>
        </div>
      </div>

      {/* Products Grid with Horizontal Scrolling */}
      <div
        ref={scrollContainerRef}
        onScroll={updateScrollState}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar space-x-6 pb-4 "
      >
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {/* "View All Products" Button */}
      <div className="flex justify-center mt-12">
        <button className="bg-red-500 cursor-pointer text-white px-10 py-4 rounded  hover:bg-red-600 transition-colors duration-300">
          View All Products
        </button>
      </div>
    </div>
  );
};

export default ExploreProducts;