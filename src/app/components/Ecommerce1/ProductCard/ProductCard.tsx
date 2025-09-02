import Image from 'next/image';
import { HeartIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Product } from '@/app/types/product';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {


const handleAddToCart = () => {
  if (!product) return;
  const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
  const isProductInCart = existingCart.some((item: Product) => item._id === product._id);
  if (!isProductInCart) {
    const updatedCart = [...existingCart, { ...product, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated')); 
    toast.success(`${product.item_name} added to cart!`);
  } else {
    toast.error('Product already in cart!');
  }
};

const handleAddToWishlist = () => {
  if (!product) return;
  const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const isProductInWishlist = existingWishlist.some((item: Product) => item._id === product._id);
  if (!isProductInWishlist) {
    const updatedWishlist = [...existingWishlist, product];
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('wishlistUpdated')); 
    toast.success(`${product.item_name} added to wishlist!`);
  } else {
    toast.error('Product already in wishlist!');
  }
};


  return (
    <>
      <div className="flex flex-col gap-4 rounded p-3 group">
        {/* Image Section */}
        <div className="relative flex justify-center items-center w-[250px] h-[250px] bg-gray-100 rounded">
          <Image
            src={product.attachments?.[0]}
            alt={product.item_name}
            width={150}
            height={150}
            className="transition-transform duration-300 group-hover:scale-110"
          />
          {/* Hover Actions */}
          <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* 🆕 Wishlist Button */}
            <button
              onClick={handleAddToWishlist}
              className="p-2 rounded-full cursor-pointer bg-white text-gray-700 hover:bg-red-500 hover:text-white"
            >
              <HeartIcon className="h-5 w-5" />
            </button>
            <Link
              className="p-2 rounded-full cursor-pointer bg-white text-gray-700 hover:bg-red-500 hover:text-white"
              href={`/ecommerce1/products/${product._id}`}
            >
              <EyeIcon className="h-5 w-5" />
            </Link>
          </div>

          {/* Add to Cart Button */}
          <div className="absolute bottom-0 w-full flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleAddToCart}
              className="p-2 cursor-pointer bg-black text-white"
            >
              Add To Cart
            </button>
          </div>
        </div>

        {/* Details */}
        <p className="text-black font-medium text-[16px] leading-6 truncate">{product.item_name}</p>
        <div className="flex items-center gap-2 -mt-2">
          <span className="text-red-500 font-bold">${product.selling_price}</span>
          <span className="text-gray-500 ml-2">
            Stock:({product.stock_quantites ? product.stock_quantites : 0})
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
