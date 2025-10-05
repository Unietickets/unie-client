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
  // Переменные окружения для сборки
  env: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

module.exports = nextConfig;
