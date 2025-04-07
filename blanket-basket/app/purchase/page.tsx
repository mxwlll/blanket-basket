import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PurchaseContent from './PurchaseContent'; // Import the new client component

export default function PurchasePage() {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <div className="bg-[#3d2a1e] text-white py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Image
              src="/logo.svg"
              alt="Basket & Blanket Logo"
              width={30}
              height={30}
              className="filter brightness-0 invert"
            />
            <span className="ml-2 font-semibold" style={{ fontFamily: "'Amasis MT Pro', serif" }}>
              Basket & Blanket
            </span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Suspense fallback={<LoadingFallback />}>
          <PurchaseContent />
        </Suspense>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-[#2f221a]" style={{ fontFamily: "'Amasis MT Pro', serif" }}>
        Loading Booking Options...
      </h1>
      {/* You can add a more sophisticated skeleton loader here */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 bg-gray-200 h-96 rounded-lg animate-pulse"></div>
        <div className="lg:col-span-2 bg-gray-200 h-96 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}