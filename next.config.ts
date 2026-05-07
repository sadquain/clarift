import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  typedRoutes: true,
  output: "standalone",
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@tanstack/react-query"],
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com",
      "font-src 'self' data:",
      "connect-src 'self' https://api.groq.com https://api.openai.com https://api.resend.com https://*.sanity.io",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "report-uri /api/security/csp-report",
    ].join("; ");
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
