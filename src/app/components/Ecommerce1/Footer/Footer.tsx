"use client" 
import Link from 'next/link';
import Image from 'next/image';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon, WhatsAppIcon, YouTubeIcon } from '../CustomIcons/CustomIcons';
import { useWorkspaceStore } from '@/store/workspaceStore';
// import QRCode from 'react-qr-code';


const Footer = () => {
  const workspace = useWorkspaceStore((state) => state.workspace);
  //  const qr_data = workspace
  //   ? `Name: ${workspace.name}\nID: ${workspace.unique_id}\nDomain: ${workspace.domain_info.domain}`
  //   : '';

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Exclusive */}
          <div className="space-y-4">
         <Link href="/">  <Image
                  src={workspace?.image || ""}
                  alt={workspace?.name || "Logo"}
                  width={150}
                  height={150}
                  className="transition-transform duration-300 group-hover:scale-110"
                /> </Link>
            <h4 className="font-semibold mb-1 my-2">Subscribe</h4>
            {/* <p className="text-sm text-gray-400">Get 10% off your first order</p> */}
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border border-gray-500 rounded-sm py-2 px-4 pr-10 text-white placeholder-gray-500 text-sm focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white">
              <svg width="16" height="16" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.91199 9.9998H2.99999L1.02299 2.1348C1.01033 2.0891 1.00262 2.04216 0.999989 1.9948C0.977989 1.2738 1.77199 0.773804 2.45999 1.1038L21 9.9998L2.45999 18.8958C1.77999 19.2228 0.995989 18.7368 0.999989 18.0288C1.00201 17.9655 1.01313 17.9029 1.03299 17.8428L2.49999 12.9998" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

              </span>
            </div>
          </div>

          {/* Column 2: Support */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-2">Support</h3>
     <p className="text-sm text-gray-400">
  {`${workspace?.address_info?.zip_code}, ${workspace?.address_info?.address}, ${workspace?.address_info?.city}, ${workspace?.address_info?.state}, ${workspace?.address_info?.country}.`}
</p>

            <p className="text-sm text-gray-400">{workspace?.contact_info?.support_email}</p>
            <p className="text-sm text-gray-400">{workspace?.contact_info?.phone_number[0]}</p>
          </div>

          {/* Column 3: Account */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-2">Account</h3>
            <Link href="/ecommerce1/profile" className="block text-sm text-gray-400 hover:text-white transition-colors">My Account</Link>
            <Link href="/ecommerce1/signup" className="block text-sm text-gray-400 hover:text-white transition-colors">Login / Register</Link>
            <Link href="/ecommerce1/cart" className="block text-sm text-gray-400 hover:text-white transition-colors">Cart</Link>
            <Link href="/ecommerce1/wishlist" className="block text-sm text-gray-400 hover:text-white transition-colors">Wishlist</Link>
            {/* <Link href="/ecommerce1/shop" className="block text-sm text-gray-400 hover:text-white transition-colors">Shop</Link> */}
          </div>

          {/* Column 4: Quick Link */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-2">Quick Link</h3>
            {/* <Link href="/ecommerce1/privacy-policy" className="block text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/ecommerce1/terms" className="block text-sm text-gray-400 hover:text-white transition-colors">Terms Of Use</Link> */}
            <Link href="/ecommerce1/about" className="block text-sm text-gray-400 hover:text-white transition-colors">About</Link>
            <Link href="/ecommerce1/contact" className="block text-sm text-gray-400 hover:text-white transition-colors">Contact</Link>
          </div>

          {/* Column 5: Download App */}
       {/* <div className="space-y-4 flex flex-col">
            <h3 className="text-xl font-bold mb-2">Download App</h3>
            <p className="text-sm text-gray-400">Save $3 with App New User Only</p>
            <div className="flex justify-between items-center gap-5">
              <div className="w-10 h-10 bg-white p-1">
                {workspace && <QRCode value={qrData} size={150} />}
              </div>

              
            </div>
          </div> */}
        </div>

 <div className='flex justify-center items-center gap-5 mt-5 md:mt-10'>
    {/* <div className="flex flex-col md:flex-row gap-2">
                <Image
                  src="/Footer/png-transparent-google-play-store-logo-google-play-app-store-android-wallets-text-label-logo.png"
                  alt="Google Play"
                  width={150}
                  height={150}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <Image
                  src="/Footer/download-appstore.png"
                  alt="App Store"
                  width={150}
                  height={150}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div> */}
          <div className="flex space-x-4 pt-2">
              <Link href={`${workspace?.social_info?.facebook}`} aria-label="Facebook"><FacebookIcon className="h-6 w-6 text-white hover:text-gray-400 transition-colors" /></Link>
              <Link href={`${workspace?.social_info?.twitter}`} aria-label="Twitter"><TwitterIcon className="h-6 w-6 text-white hover:text-gray-400 transition-colors" /></Link>
              <Link href={`${workspace?.social_info?.instagram}`} aria-label="Instagram"><InstagramIcon className="h-6 w-6 text-white hover:text-gray-400 transition-colors" /></Link>
              <Link href={`${workspace?.social_info?.linkedin}`}aria-label="LinkedIn"><LinkedinIcon className="h-6 w-6 text-white hover:text-gray-400 transition-colors" /></Link>
              <Link href={`${workspace?.social_info?.whatsapp}`}aria-label="Whatsapp"><WhatsAppIcon className="h-6 w-6 text-white hover:text-gray-400 transition-colors" /></Link>
              <Link href={`${workspace?.social_info?.youtube}`}aria-label="Youtube"><YouTubeIcon className="h-6 w-6 text-white hover:text-gray-400 transition-colors" /></Link>
            </div>
 </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
          &copy; Copyright {workspace?.name} 2022. All right reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;