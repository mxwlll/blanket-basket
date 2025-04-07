'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PicnicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const modalOptions = [
  {
    id: 'classic-picnic',
    name: 'Classic Picnic',
    price: '$150',
    image: '/classic-picnic.jpg',
    description: 'Our classic picnic option is perfect for a relaxing afternoon in the park. Enjoy our carefully curated picnic setup with comfortable seating, beautiful decor, and a touch of Basket & Blanket magic.',
    features: ['2-hour duration', 'Serves 2-4 people', 'Basic picnic setup', 'Bluetooth speaker']
  },
  {
    id: 'luxury-picnic',
    name: 'Luxury Picnic',
    price: '$250',
    image: '/luxury-picnic.jpg',
    description: 'Elevate your picnic experience with our luxury option. Perfect for special occasions, this setup includes premium decor, extra amenities, and the signature Basket & Blanket attention to detail.',
    features: ['3-hour duration', 'Serves 2-6 people', 'Premium picnic setup', 'Bluetooth speaker', 'Photo setup with instant camera']
  },
  {
    id: 'vip-picnic',
    name: 'VIP Experience',
    price: '$400',
    image: '/vip-picnic.jpg', 
    description: 'The ultimate picnic experience for those truly special moments. Our VIP package provides an unforgettable setting with all the amenities and personalized touches that make Basket & Blanket famous.',
    features: ['4-hour duration', 'Serves 4-8 people', 'Luxury picnic setup', 'Bluetooth speaker', 'Photo setup with instant camera', 'Personal attendant']
  }
];

export default function PicnicModal({ isOpen, onClose }: PicnicModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Match the animation duration
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isClosing ? 'backdrop-blur-animate-out' : 'backdrop-blur-animate'}`}
      onClick={handleBackdropClick}
    >
      <div className={`bg-amber-50 rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto ${isClosing ? 'modal-animate-out' : 'modal-animate'}`}>
        <div className="flex items-center mb-6">
          <h2 className="text-3xl font-bold text-[#2f221a] text-center flex-grow" style={{ fontFamily: "'Amasis MT Pro', serif" }}>
            Choose Your Picnic Experience
          </h2>
          <button
            onClick={handleClose}
            className="text-[#2f221a] hover:text-amber-700 transition-colors ml-4"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modalOptions.map((option, index) => (
            <div key={index} className="bg-amber-50 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
              <div className="relative h-48">
                <Image
                  src={option.image}
                  alt={option.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 text-[#2f221a]" style={{ fontFamily: "'Amasis MT Pro', serif" }}>
                  {option.name}
                </h3>
                <p className="text-2xl font-bold text-amber-700 mb-4">
                  {option.price}
                </p>
                <p className="text-[#2f221a] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {option.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-[#2f221a]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      <span className="text-amber-700 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  href={`/purchase?package=${option.id}`}
                  className="mt-auto block w-full"
                  onClick={handleClose}
                >
                  <button className="w-full bg-[#3d2a1e] text-white py-2 rounded-lg hover:bg-[#4e392c] transition-colors">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 