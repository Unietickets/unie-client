/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  experimental: {
    disableOptimizedLoading: true,
    disableStaticImages: true,
  },
};

module.exports = nextConfig;
