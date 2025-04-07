/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true, // Removed as it's deprecated in Next.js 15
  transpilePackages: ['framer-motion'],
}

module.exports = nextConfig 