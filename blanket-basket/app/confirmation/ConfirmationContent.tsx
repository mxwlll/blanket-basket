'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const packages = {
  'classic-picnic': {
    name: 'Classic Picnic',
    price: '$150'
  },
  'luxury-picnic': {
    name: 'Luxury Picnic',
    price: '$250'
  }
};

export default function ConfirmationContent() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get('package');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  
  const [packageDetails, setPackageDetails] = useState<{name: string, price: string} | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [formattedTime, setFormattedTime] = useState<string>('');
  const [bookingId, setBookingId] = useState<number>(0);

  useEffect(() => {
    // Generate booking ID only on the client
    setBookingId(Math.floor(100000 + Math.random() * 900000));

    if (packageId && packages[packageId as keyof typeof packages]) {
      setPackageDetails(packages[packageId as keyof typeof packages]);
    }
    
    if (date) {
      const dateObj = new Date(date);
      setFormattedDate(dateObj.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }));
    }
    
    if (time) {
      const [hours, minutes] = time.split(':');
      const timeObj = new Date();
      timeObj.setHours(parseInt(hours));
      timeObj.setMinutes(parseInt(minutes) || 0);
      setFormattedTime(timeObj.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit' 
      }));
    }
  }, [packageId, date, time]); // Dependencies ensure this runs when query params are available

  return (
    <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="w-20 h-20 mx-auto mb-6 bg-[#3d2a1e] rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-[#2f221a]" style={{ fontFamily: "'Amasis MT Pro', serif" }}>
        Booking Confirmed!
      </h1>
      
      <p className="text-lg mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        We've received your booking and can't wait to prepare your perfect picnic experience.
      </p>
      
      <div className="bg-amber-100 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-[#2f221a]" style={{ fontFamily: "'Amasis MT Pro', serif" }}>
          Booking Details
        </h2>
        
        <div className="grid grid-cols-2 gap-4 text-left">
          <div>
            <p className="text-sm text-[#2f221a]/70">Package</p>
            <p className="font-semibold text-[#2f221a]">{packageDetails?.name || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-[#2f221a]/70">Booking ID</p>
            <p className="font-semibold text-[#2f221a]">{bookingId ? `#${bookingId}` : '-'}</p>
          </div>
          <div>
            <p className="text-sm text-[#2f221a]/70">Date</p>
            <p className="font-semibold text-[#2f221a]">{formattedDate || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-[#2f221a]/70">Time</p>
            <p className="font-semibold text-[#2f221a]">{formattedTime || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-[#2f221a]/70">Total</p>
            <p className="font-semibold text-amber-700">{packageDetails?.price || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-[#2f221a]/70">Status</p>
            <p className="font-semibold text-green-600">Confirmed</p>
          </div>
        </div>
      </div>
      
      <p className="text-sm mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        We've sent a confirmation email with all the details. If you have any questions, please contact us at support@basketandblanket.com
        <br /><br />
        <small className="text-amber-700">Our team has been notified of your booking and will contact you shortly to confirm your reservation.</small>
      </p>
      
      <Link href="/">
        <button className="px-8 py-3 bg-[#3d2a1e] text-white rounded-md hover:bg-[#4e392c] transition-colors">
          Return to Home
        </button>
      </Link>
    </div>
  );
} 