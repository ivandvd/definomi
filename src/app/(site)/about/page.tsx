import type { Metadata } from "next";
import { about } from "@/components/sites/definomi/about/content";
import { AboutPage } from "@/components/sites/definomi/about/AboutPage";
import { AppFooter } from "@/components/sites/definomi/shared/AppFooter";
import { AppHeader } from "@/components/sites/definomi/shared/AppHeader";
import { AppShell } from "@/components/sites/definomi/shared/AppShell";

const { title, description } = about.seo;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: `${title} — Definomi`, description, siteName: "Definomi", locale: "en_GB", type: "website", url: "/about" },
  twitter: { card: "summary_large_image", title: `${title} — Definomi`, description, site: "@definomicom" },
};

export default function About() {
  return (
    <AppShell header={<AppHeader />} footer={<AppFooter />}>
      <AboutPage />
    </AppShell>
  );
}
