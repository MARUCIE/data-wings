/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@data-wings/ui"],
  output: "standalone",
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
