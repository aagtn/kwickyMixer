/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ytimg.com'],
  },
  reactStrictMode: false,
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,  

};

export default nextConfig;
