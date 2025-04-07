'use client';

import Head from 'next/head'
import Image from 'next/image'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import { useState } from 'react'
import PicnicModal from './components/PicnicModal'

export default function Home() {
  const featuresRef = useScrollAnimation()
  const galleryRef = useScrollAnimation()
  const footerRef = useScrollAnimation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Head>
        <title>Basket & Blanket | Luxury Picnics</title>
        <meta name="description" content="Experience elegant luxury picnics in New York City's iconic Central Park." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="background-layer" />
      <div className="film-grain" />

      <main className="text-[#2f221a]">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 animate-fade-in">
          <div className="absolute inset-0">
            <Image
              src="/hero.jpg"
              alt="Luxury Picnic Setting"
              layout="fill"
              objectFit="cover"
              className="opacity-40"
            />
          </div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold animate-slide-up animate-delay-200" style={{ fontFamily: "'Amasis MT Pro', serif" }}>
              Basket & Blanket
            </h1>
            <p className="mt-4 text-xl md:text-2xl animate-slide-up animate-delay-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              NYC's Premier Picnic Experience
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-8 px-8 py-3 bg-amber-50 text-[#2f221a] font-medium rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300 animate-slide-up animate-delay-600"
            >
              Book Your Picnic
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-16 bg-amber-50 scroll-animate">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/picnic_setup.jpg"
                  alt="Picnic Setup"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Amasis MT Pro', serif" }}>
                  Central Park's Hidden Gems
                </h2>
                <p className="text-lg text-[#2f221a] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  From the Great Lawn to the Bethesda Terrace, our curated picnic experiences showcase Central Park's most enchanting spots. Let us transform these iconic locations into your private oasis of luxury and comfort.
                </p>
                <button className="px-6 py-3 bg-amber-700 text-white font-medium rounded-full shadow-md hover:shadow-xl transition-shadow duration-300">
                  Discover More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section ref={galleryRef} className="py-16 bg-[#3d2a1e] scroll-animate">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-amber-50" style={{ fontFamily: "'Amasis MT Pro', serif" }}>
              Photos From Our Picnics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[10px]">
              {[
                { src: '/gallery1.jpg', height: 125 },
                { src: '/gallery2.jpg', height: 100 },
                { src: '/gallery3.jpg', height: 150 },
                { src: '/gallery4.jpg', height: 110 },
                { src: '/gallery5.jpg', height: 140 },
                { src: '/gallery6.jpg', height: 120 }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden rounded-lg shadow-lg"
                  style={{ gridRow: `span ${Math.ceil(item.height / 10)}` }}
                >
                  <Image
                    src={item.src}
                    alt={`Gallery image ${idx + 1}`}
                    width={400}
                    height={item.height}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer ref={footerRef} className="bg-[#2f221a] py-12 scroll-animate">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6 inline-block">
              <Image
                src="/logo.svg"
                alt="Basket & Blanket Logo"
                width={180}
                height={60}
                className="filter brightness-0 invert"
              />
            </div>
            <p className="text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              &copy; {new Date().getFullYear()} Basket & Blanket NYC. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
      <PicnicModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
