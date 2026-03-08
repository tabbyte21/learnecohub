import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
          { key: "CDN-Cache-Control", value: "no-store" },
          { key: "Vercel-CDN-Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/contact", destination: "/iletisim", permanent: true },
      { source: "/hikayemiz", destination: "/misyonumuz", permanent: true },
      { source: "/is-birlikleri", destination: "/basari-hikayeleri", permanent: true },
      { source: "/basarilar", destination: "/basari-hikayeleri", permanent: true },
      { source: "/kurslarimiz", destination: "/platform", permanent: true },
      { source: "/ogrenciler-icin", destination: "/platform", permanent: true },
      { source: "/ogretmenler-icin", destination: "/profesyoneller-icin", permanent: true },
      { source: "/iceriklerimiz", destination: "/platform", permanent: true },
    ];
  },
};

export default nextConfig;
