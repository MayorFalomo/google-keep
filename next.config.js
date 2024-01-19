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
        hostname: "i.pinimg.com ",
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
  //You need to include the Api Keys into the next.config
  env: {
    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    MESSENGER_ID: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    APP_ID: process.env.NEXT_PUBLIC_APP_ID,
    NEWS_KEY: process.env.NEXT_PUBLIC_NEWS_KEY,
  },
};

module.exports = withPWA(nextConfig);
