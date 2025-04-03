/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  crossOrigin: 'anonymous',
  output: 'standalone',
  images: {
    domains: ['poly-sehs4701-groupproject-s3.s3.ap-east-1.amazonaws.com', 'localhost'],
  },
};

export default nextConfig;
