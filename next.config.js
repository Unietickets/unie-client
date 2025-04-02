/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    disableOptimizedLoading: true,
  },
};

module.exports = nextConfig;
