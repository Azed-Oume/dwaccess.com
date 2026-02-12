import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "192.168.1.105",
  ],
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
