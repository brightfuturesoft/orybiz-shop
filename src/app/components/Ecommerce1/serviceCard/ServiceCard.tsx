import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { Product } from '@/app/types/product';
import toast from 'react-hot-toast';

interface ServiceCardProps {
  product: Product;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ product }) => {
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
    <div className="bg-white w-[350px] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
      {/* Image */}
      <Link href={`/services/${product._id}`}>
        <div className="relative w-full h-52 bg-gray-100 cursor-pointer overflow-hidden rounded-t-xl group-hover:scale-105 transition-transform duration-300">
          <Image
            src={product.attachments?.[0] || '/placeholder.png'}
            alt={product.item_name}
            fill
            className="object-cover rounded-t-xl"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="p-5 flex flex-col gap-3">
        <Link href={`/services/${product._id}`}>
          <h3 className="text-lg font-bold text-gray-900 truncate cursor-pointer hover:text-red-500 transition">
            {product.item_name}
          </h3>
        </Link>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {product.categories?.map((cat) => (
            <span
              key={cat.value}
              className="text-xs px-3 py-1 bg-gray-200 text-gray-700 rounded-full"
            >
              {cat.label}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-red-600 font-semibold text-sm">
            {product.selling_price && Number(product.selling_price) > 0
              ? `$${product.selling_price}`
              : 'Contact for Price'}
          </span>
          {product.stock_quantites && Number(product.stock_quantites) > 0 && (
            <span className="text-gray-400 text-xs">Stock: {product.stock_quantites}</span>
          )}
        </div>

        {/* Contact Details (Dummy) */}
        <div className="mt-3 flex flex-col gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-700">
            <PhoneIcon className="w-5 h-5 text-gray-500" />
            <span>+880 123 456 789</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <EnvelopeIcon className="w-5 h-5 text-gray-500" />
            <span>support@example.com</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          {product.is_purchasable && (
            <button
              onClick={handleAddToCart}
              className="flex-1 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition"
            >
              Add To Cart
            </button>
          )}
          <button
            onClick={handleAddToWishlist}
            className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded hover:bg-red-500 hover:text-white transition"
          >
            <HeartIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
