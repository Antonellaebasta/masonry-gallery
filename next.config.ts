import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['images.pexels.com'],
  },
  compiler: {
    styledComponents: true,
  }
};

export default nextConfig;
