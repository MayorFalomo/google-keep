const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"], // Specify the domains for images

    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
        pathname: "/account123/**",
      },
      {
        protocol: "https",
        hostname: "https://www.gstatic.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
