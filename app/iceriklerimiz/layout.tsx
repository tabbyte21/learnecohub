import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İçeriklerimiz — LearnecoHub | Sosyal Beceri İçerik Kütüphanesi",
  description:
    "500+ dijital içerik, 200+ video, 80+ oyun ve daha fazlası. Sosyal-duygusal becerileri geliştiren zengin içerik kütüphanemizi keşfedin.",
};

export default function IceriklerimizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
