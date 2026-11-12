import type { Metadata } from "next";
import { LegalPage } from "@/components/sites/definomi/legal/LegalPage";
import { AppFooter } from "@/components/sites/definomi/shared/AppFooter";
import { AppHeader } from "@/components/sites/definomi/shared/AppHeader";
import { AppShell } from "@/components/sites/definomi/shared/AppShell";
import { privacy } from "@/data/sites/definomi/legal/privacy";

export const metadata: Metadata = {
  title: privacy.title,
  description: privacy.description,
  alternates: { canonical: "/privacy" },
  openGraph: { title: `${privacy.title} — Definomi`, description: privacy.description, url: "/privacy" },
};

export default function Privacy() {
  return (
    <AppShell header={<AppHeader />} footer={<AppFooter />}>
      <LegalPage doc={privacy} surtitle="Legal" />
    </AppShell>
  );
}
