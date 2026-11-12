import type { Metadata } from "next";
import { roadmap } from "@/components/sites/definomi/roadmap/content";
import { RoadmapPage } from "@/components/sites/definomi/roadmap/RoadmapPage";
import { AppFooter } from "@/components/sites/definomi/shared/AppFooter";
import { AppHeader } from "@/components/sites/definomi/shared/AppHeader";
import { AppShell } from "@/components/sites/definomi/shared/AppShell";

const { title, description } = roadmap.seo;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/roadmap" },
  openGraph: { title: `${title} — Definomi`, description, siteName: "Definomi", locale: "en_GB", type: "website", url: "/roadmap" },
  twitter: { card: "summary_large_image", title: `${title} — Definomi`, description, site: "@definomicom" },
};

export default function Roadmap() {
  return (
    <AppShell header={<AppHeader />} footer={<AppFooter />}>
      <RoadmapPage />
    </AppShell>
  );
}
