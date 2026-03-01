import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/contact", destination: "/iletisim", permanent: true },
      { source: "/hikayemiz", destination: "/misyonumuz", permanent: true },
      { source: "/is-birlikleri", destination: "/basari-hikayeleri", permanent: true },
      { source: "/basarilar", destination: "/basari-hikayeleri", permanent: true },
      { source: "/arsiv", destination: "/ucretsiz-kaynaklar", permanent: true },
      { source: "/kurslarimiz", destination: "/platform", permanent: true },
      { source: "/ogrenciler-icin", destination: "/platform", permanent: true },
      { source: "/ogretmenler-icin", destination: "/profesyoneller-icin", permanent: true },
      { source: "/iceriklerimiz", destination: "/platform", permanent: true },
    ];
  },
};

export default nextConfig;
