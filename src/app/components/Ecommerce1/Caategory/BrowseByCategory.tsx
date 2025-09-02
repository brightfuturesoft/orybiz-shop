'use client'; 
import { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Category } from '@/app/types/types';

interface BrowseByCategoryProps {
  categories?: Category[];
}

const BrowseByCategory: React.FC<BrowseByCategoryProps> = ({ categories = [] }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollOffset;
      setTimeout(updateScrollState, 300);
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
      {/* Header and Arrows */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-4 h-8 bg-red-500 rounded-sm"></div>
          <div>
            <p className="text-red-500 font-semibold mb-1">Categories</p>
            <h2 className="text-2xl md:text-3xl font-semibold mt-5">Browse By Category</h2>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll(-300)}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full transition-colors ${canScrollLeft ? 'bg-gray-200 hover:bg-gray-300 cursor-pointer' : 'bg-gray-100 cursor-not-allowed'}`}
          >
            <ArrowLeft className="h-6 w-6 text-black" />
          </button>
          <button
            onClick={() => scroll(300)}
            disabled={!canScrollRight}
            className={`p-2 rounded-full transition-colors ${canScrollRight ? 'bg-gray-200 hover:bg-gray-300 cursor-pointer' : 'bg-gray-100 cursor-not-allowed'}`}
          >
            <ArrowRight className="h-6 w-6 text-black" />
          </button>
        </div>
      </div>

      {/* Categories Grid (with horizontal scroll) */}
      <div
        ref={scrollContainerRef}
        onScroll={updateScrollState}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar space-x-6 pb-4"
      >
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex-shrink-0 w-[170px] snap-center p-6 border border-gray-300 rounded-md text-center cursor-pointer hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] transition-colors duration-300"
          >
            <div className="flex items-center justify-center font-semibold h-24 w-full relative">
              {category.image && (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <p className="mt-5 text-lg">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseByCategory;
