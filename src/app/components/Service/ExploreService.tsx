'use client';
import { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ServiceCard from '../serviceCard/ServiceCard';


// Hard-coded data for all products
const allProducts = [
  {
    name: 'Digital Marketing Course',
    price: 100,
    rating: 4,
    reviews: 35,
    image: '/service/digital-messaging-services-9622168-7869757.webp', 
  },
  {
    name: 'Graphics Design Course',
    price: 360,
    originalPrice: 500,
    rating: 5,
    reviews: 95,
    image: '/service/graphics.webp',
  },
  {
    name: 'Web Development Course',
    price: 700,
    originalPrice: 1000,
    rating: 4.5,
    reviews: 325,
    image: '/service/web-development.webp',
  },
  {
    name: 'AI development L1',
    price: 500,
    rating: 4,
    reviews: 145,
    image: '/service/ai.webp',
  },
  {
    name: 'AI development L2',
    price: 960,
    rating: 5,
    reviews: 65,
    image: '/service/ai2.webp',
    isNew: true,
    colors: ['#DB4444', '#000000'],
  },
  {
    name: 'Jr. Zoom Soccer Cleats',
    price: 1160,
    rating: 4,
    reviews: 35,
    image: '/service/digital-messaging-services-9622168-7869757.webp',
    isNew: true,
    colors: ['#000000', '#DB4444'],
  },
  {
    name: 'GP11 Shooter USB Gamepad',
    price: 660,
    originalPrice: 800,
    rating: 4.5,
    reviews: 55,
    image: '/service/digital-messaging-services-9622168-7869757.webp',
    isNew: true,
    colors: ['#DB4444', '#000000'],
  },
  {
    name: 'Quilted Satin Jacket',
    price: 660,
    rating: 4.5,
    reviews: 55,
    image: '/service/digital-messaging-services-9622168-7869757.webp',
    colors: ['#3A3C42', '#DB4444'],
  },
];


const ExploreService = () => {
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
            <p className="text-red-500 font-semibold mb-1">Our Service</p>
            <h2 className="text-2xl md:text-3xl font-semibold mt-5">Explore Our Service</h2>
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
        {allProducts.map((product, index) => (
          <ServiceCard key={index} product={product} />
        ))}
      </div>

      {/* "View All Products" Button */}
      <div className="flex justify-center mt-12">
        <button className="bg-red-500 cursor-pointer text-white px-10 py-4 rounded  hover:bg-red-600 transition-colors duration-300">
          View All Service
        </button>
      </div>
    </div>
  );
};

export default ExploreService;