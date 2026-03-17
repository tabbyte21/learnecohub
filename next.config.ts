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
      { source: "/misyonumuz", destination: "/hakkimizda", permanent: true },
      { source: "/akademik-yaklasimimiz", destination: "/hakkimizda", permanent: true },
      { source: "/ilkelerimiz", destination: "/hakkimizda", permanent: true },
      { source: "/neden-learnecohub", destination: "/hakkimizda", permanent: true },
      { source: "/ekibimiz", destination: "/hakkimizda", permanent: true },
      { source: "/basari-hikayeleri", destination: "/hakkimizda", permanent: true },
      { source: "/hikayemiz", destination: "/hakkimizda", permanent: true },
      { source: "/is-birlikleri", destination: "/hakkimizda", permanent: true },
      { source: "/basarilar", destination: "/hakkimizda", permanent: true },
      { source: "/kurslarimiz", destination: "/platform", permanent: true },
      { source: "/ogrenciler-icin", destination: "/platform", permanent: true },
      { source: "/ogretmenler-icin", destination: "/profesyoneller-icin", permanent: true },
      { source: "/iceriklerimiz", destination: "/platform", permanent: true },
    ];
  },
};

export default nextConfig;
