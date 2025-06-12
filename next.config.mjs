/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'api.source1.ir',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.source1.ir',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;