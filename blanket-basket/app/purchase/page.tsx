'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Define packages
const packages = {
  'classic-picnic': {
    name: 'Classic Picnic',
    price: '$150',
    image: '/classic-picnic.jpg',
    description: 'Perfect for couples or small groups. Includes a cozy blanket, wicker basket, and basic picnic setup.',
    features: ['2-hour duration', 'Basic picnic setup', 'Up to 4 people']
  },
  'luxury-picnic': {
    name: 'Luxury Picnic',
    price: '$250',
    image: '/luxury-picnic.jpg',
    description: 'Elevate your experience with premium amenities and a more elaborate setup.',
    features: ['3-hour duration', 'Premium picnic setup', 'Up to 6 people', 'Charcuterie board']
  },
  'vip-picnic': {
    name: 'VIP Experience',
    price: '$400',
    image: '/vip-picnic.jpg',
    description: 'The ultimate picnic experience with all the bells and whistles.',
    features: ['4-hour duration', 'Luxury picnic setup', 'Up to 8 people', 'Gourmet food selection', 'Personal attendant']
  }
};

// Define locations
const locations = [
  {
    id: 'sheep-meadow',
    name: 'Sheep Meadow',
    description: 'A spacious and sunny meadow perfect for large groups and sunbathing.'
  },
  {
    id: 'bethesda-fountain',
    name: 'Bethesda Fountain',
    description: 'An iconic location with a beautiful fountain and terrace views.'
  },
  {
    id: 'bow-bridge',
    name: 'Bow Bridge',
    description: 'A romantic spot overlooking the Lake and rowboats.'
  },
  {
    id: 'cherry-hill',
    name: 'Cherry Hill',
    description: 'A gentle slope near the Lake, famous for its cherry blossoms in spring.'
  },
  {
    id: 'conservatory-garden',
    name: 'Conservatory Garden',
    description: 'A formal garden with Italian, French, and English-style sections.'
  }
];

export default function Purchase() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const packageId = searchParams.get('package');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    locationId: '',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  
  // Form validation state
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  useEffect(() => {
    if (packageId && packages[packageId as keyof typeof packages]) {
      setSelectedPackage(packages[packageId as keyof typeof packages]);
    }
    setLoading(false);
  }, [packageId]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.locationId) newErrors.locationId = 'Location is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Get the location name
        const selectedLocation = locations.find(loc => loc.id === formData.locationId);
        
        // Send email notification
        const response = await fetch('/api/send-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            packageName: selectedPackage.name,
            packagePrice: selectedPackage.price,
            date: formData.date,
            time: formData.time,
            guests: formData.guests,
            location: selectedLocation?.name || formData.locationId,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            specialRequests: formData.specialRequests
          }),
        });

        if (!response.ok) {
          console.error('Failed to send email notification');
        }
      } catch (error) {
        console.error('Error sending notification:', error);
      }
      
      // Navigate to confirmation page with query params
      router.push(`/confirmation?package=${packageId}&date=${formData.date}&time=${formData.time}`);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center">
        <p className="text-2xl text-[#2f221a]">Loading...</p>
      </div>
    );
  }
  
  if (!selectedPackage) {
    return (
      <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center">
        <p className="text-2xl text-[#2f221a] mb-6">Invalid package selected.</p>
        <Link href="/">
          <button className="px-8 py-3 bg-[#3d2a1e] text-white rounded-md hover:bg-[#4e392c] transition-colors">
            Return to Home
          </button>
        </Link>
      </div>
    );
  }
  
  // Get current date in YYYY-MM-DD format for min date input
  const today = new Date().toISOString().split('T')[0];
  
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-10 text-[#2f221a]" style={{ fontFamily: "'Amasis MT Pro', serif" }}>
            Book Your Picnic Experience
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Package details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-6">
                <div className="relative h-48">
                  <Image
                    src={selectedPackage.image}
                    alt={selectedPackage.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-[#2f221a]" style={{ fontFamily: "'Amasis MT Pro', serif" }}>
                    {selectedPackage.name}
                  </h2>
                  <p className="text-2xl font-bold text-amber-700 mb-4">
                    {selectedPackage.price}
                  </p>
                  <p className="text-[#2f221a] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {selectedPackage.description}
                  </p>
                  <div className="border-t border-amber-200 pt-4 mt-4">
                    <h3 className="font-bold mb-2 text-[#2f221a]">What's Included:</h3>
                    <ul className="space-y-2">
                      {selectedPackage.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-center text-[#2f221a]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          <span className="text-amber-700 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Booking form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-[#2f221a]" style={{ fontFamily: "'Amasis MT Pro', serif" }}>
                  Complete Your Booking
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Date */}
                      <div>
                        <label htmlFor="date" className="block mb-2 font-medium text-[#2f221a]">
                          Date *
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          min={today}
                          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 text-[#2f221a] ${errors.date ? 'border-red-500 focus:ring-red-500' : 'border-amber-300 focus:ring-amber-500'}`}
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                      </div>
                      
                      {/* Time */}
                      <div>
                        <label htmlFor="time" className="block mb-2 font-medium text-[#2f221a]">
                          Time *
                        </label>
                        <input
                          type="time"
                          id="time"
                          name="time"
                          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 text-[#2f221a] ${errors.time ? 'border-red-500 focus:ring-red-500' : 'border-amber-300 focus:ring-amber-500'}`}
                          value={formData.time}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
                      </div>
                      
                      {/* Number of Guests */}
                      <div>
                        <label htmlFor="guests" className="block mb-2 font-medium text-[#2f221a]">
                          Number of Guests *
                        </label>
                        <input
                          type="number"
                          id="guests"
                          name="guests"
                          min="1"
                          max="10"
                          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 text-[#2f221a] border-amber-300 focus:ring-amber-500`}
                          value={formData.guests}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      {/* Location */}
                      <div>
                        <label htmlFor="locationId" className="block mb-2 font-medium text-[#2f221a]">
                          Location *
                        </label>
                        <select
                          id="locationId"
                          name="locationId"
                          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 text-[#2f221a] ${errors.locationId ? 'border-red-500 focus:ring-red-500' : 'border-amber-300 focus:ring-amber-500'}`}
                          value={formData.locationId}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select a location</option>
                          {locations.map(location => (
                            <option key={location.id} value={location.id}>
                              {location.name}
                            </option>
                          ))}
                        </select>
                        {errors.locationId && <p className="mt-1 text-sm text-red-500">{errors.locationId}</p>}
                      </div>
                    </div>
                    
                    <div className="border-t border-amber-200 pt-6 mt-6">
                      <h3 className="text-xl font-bold mb-4 text-[#2f221a]" style={{ fontFamily: "'Amasis MT Pro', serif" }}>
                        Your Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                          <label htmlFor="name" className="block mb-2 font-medium text-[#2f221a]">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 text-[#2f221a] ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-amber-300 focus:ring-amber-500'}`}
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>
                        
                        {/* Email */}
                        <div>
                          <label htmlFor="email" className="block mb-2 font-medium text-[#2f221a]">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 text-[#2f221a] ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-amber-300 focus:ring-amber-500'}`}
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>
                        
                        {/* Phone */}
                        <div>
                          <label htmlFor="phone" className="block mb-2 font-medium text-[#2f221a]">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 text-[#2f221a] ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-amber-300 focus:ring-amber-500'}`}
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                        </div>
                      </div>
                      
                      {/* Special Requests */}
                      <div className="mt-6">
                        <label htmlFor="specialRequests" className="block mb-2 font-medium text-[#2f221a]">
                          Special Requests (Optional)
                        </label>
                        <textarea
                          id="specialRequests"
                          name="specialRequests"
                          rows={4}
                          className="w-full px-4 py-3 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-[#2f221a]"
                          value={formData.specialRequests}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <button
                        type="submit"
                        className="w-full px-6 py-4 bg-[#3d2a1e] text-white font-medium rounded-md hover:bg-[#4e392c] transition-colors"
                      >
                        Complete Booking
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}