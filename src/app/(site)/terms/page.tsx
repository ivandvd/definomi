import type { Metadata } from "next";
import { LegalPage } from "@/components/sites/definomi/legal/LegalPage";
import { AppFooter } from "@/components/sites/definomi/shared/AppFooter";
import { AppHeader } from "@/components/sites/definomi/shared/AppHeader";
import { AppShell } from "@/components/sites/definomi/shared/AppShell";
import { terms } from "@/data/sites/definomi/legal/terms";

export const metadata: Metadata = {
  title: terms.title,
  description: terms.description,
  alternates: { canonical: "/terms" },
  openGraph: { title: `${terms.title} — Definomi`, description: terms.description, url: "/terms" },
};

export default function Terms() {
  return (
    <AppShell header={<AppHeader />} footer={<AppFooter />}>
      <LegalPage doc={terms} surtitle="Legal" />
    </AppShell>
  );
}
