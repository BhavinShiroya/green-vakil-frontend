/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable image optimization
    formats: ["image/avif", "image/webp"],

    // Compression quality (1-100, lower = smaller files)
    minimumCacheTTL: 60,

    // Remote image domains - add your API image domains here
    remotePatterns: [
      {
        protocol: "https",
        hostname: "autepwflbluvddhmwpii.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],

    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Enable SVG support
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable experimental features if needed
  experimental: {
    optimizePackageImports: ["@mui/material", "@mui/icons-material"],
  },
};

module.exports = nextConfig;
