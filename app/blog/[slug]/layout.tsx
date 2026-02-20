import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Yazısı — LearnecoHub | Eğitim Blogu",
  description:
    "Sosyal-duygusal öğrenme, çocuk gelişimi ve eğitim hakkında uzman görüşleri ve rehberler.",
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
