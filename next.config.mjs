/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ytimg.com'],
  },
  reactStrictMode: false,
  // next.config.js

  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,  

};

export default nextConfig;
