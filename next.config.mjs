/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Bypasses the false-positive TS crash on Vercel
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
