/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/aesthetic-axis' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/aesthetic-axis/' : '',
  images: {
    unoptimized: true,
  },
  output: 'export',
};

export default nextConfig;
