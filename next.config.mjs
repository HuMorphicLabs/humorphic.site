/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.DOCKER_BUILD ? "standalone" : undefined,
  reactStrictMode: true,
  transpilePackages: ["three"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*",
      },
      {
        source: "/media/:path*",
        destination: "http://127.0.0.1:8000/media/:path*",
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf|bin)$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
