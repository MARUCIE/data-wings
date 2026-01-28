/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@data-wings/ui"],
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
