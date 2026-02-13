import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "LearnecoHub — Sosyal Beceri Eğitim Platformu",
  description:
    "Çocuklar ve gençler için sosyal-duygusal becerileri öğrenmenin en kolay yolu. 500+ dijital içerik, etkileşimli oyunlar ve bilimsel temelli müfredat.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={poppins.variable}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
