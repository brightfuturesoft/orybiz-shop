'use client';
import ProductCard from '../ProductCard/ProductCard';


// Hard-coded data for all products
const allProducts = [
  {
    name: 'Breed Dry Dog Food',
    price: 100,
    rating: 4,
    reviews: 35,
    image: '/products/ideapad-gaming-3i-01-500x500 1.png', 
  },
  {
    name: 'CANON EOS DSLR Camera',
    price: 360,
    originalPrice: 500,
    rating: 5,
    reviews: 95,
    image: '/products/Copa_Sense 1.png',
  },
  {
    name: 'ASUS FHD Gaming Laptop',
    price: 700,
    originalPrice: 1000,
    rating: 4.5,
    reviews: 325,
    image: '/products/GP11_PRD3 1.png',
  },
  {
    name: 'Curology Product Set',
    price: 500,
    rating: 4,
    reviews: 145,
    image: '/products/New-Mercedes-Benz-Gtr-Licensed-Ride-on-Car-Kids-Electric-Toy-Car 1.png',
  },
  {
    name: 'Kids Electric Car',
    price: 960,
    rating: 5,
    reviews: 65,
    image: '/products/New-Mercedes-Benz-Gtr-Licensed-Ride-on-Car-Kids-Electric-Toy-Car 1.png',
    isNew: true,
    colors: ['#DB4444', '#000000'],
  }

];


const BestSellingProduct = () => {
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
        <button className="bg-red-500 text-white px-10 py-4 rounded cursor-pointer hover:bg-red-600 transition-colors duration-300">
          View All 
        </button>
      </div>
      </div>

      {/* Products Grid with Horizontal Scrolling */}
      <div
 
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar space-x-6 pb-4 "
      >
        {allProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {/* "View All Products" Button */}
     
    </div>
  );
};

export default BestSellingProduct;