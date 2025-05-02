/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '5.57.39.75',
          port: '5000', // اضافه کردن پورت 5000
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;