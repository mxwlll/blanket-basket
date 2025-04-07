import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ConfirmationContent from './ConfirmationContent'; // Import the new client component

export default function ConfirmationPage() {
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

      <div className="container mx-auto px-4 py-12 flex-grow flex flex-col items-center justify-center">
        <Suspense fallback={<LoadingFallback />}>
          <ConfirmationContent />
        </Suspense>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
      <h1 className="text-2xl font-bold text-[#2f221a]">Loading Booking Details...</h1>
    </div>
  );
} 