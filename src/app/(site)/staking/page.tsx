import type { Metadata } from "next";
import { AppFooter } from "@/components/sites/definomi/shared/AppFooter";
import { AppHeader } from "@/components/sites/definomi/shared/AppHeader";
import { AppShell } from "@/components/sites/definomi/shared/AppShell";
import { staking } from "@/components/sites/definomi/staking/content";
import { StakingPage } from "@/components/sites/definomi/staking/StakingPage";

const { title, description } = staking.seo;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/staking" },
  openGraph: { title: `${title} — Definomi`, description, siteName: "Definomi", locale: "en_GB", type: "website", url: "/staking" },
  twitter: { card: "summary_large_image", title: `${title} — Definomi`, description, site: "@definomicom" },
};

export default function Staking() {
  return (
    <AppShell header={<AppHeader />} footer={<AppFooter />}>
      <StakingPage />
    </AppShell>
  );
}
