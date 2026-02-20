import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — LearnecoHub | Eğitim Blogu",
  description:
    "Sosyal-duygusal öğrenme, çocuk gelişimi, ebeveyn rehberliği ve eğitim teknolojileri hakkında güncel blog yazıları. Uzman içerikleriyle LearnecoHub Eğitim Blogu.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
