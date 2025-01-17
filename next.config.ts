import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  env: {
    BASE_URL: "https://baigiamasis-darbas-backend.onrender.com",
  },
};

export default nextConfig;
