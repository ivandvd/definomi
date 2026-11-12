import type { Metadata } from "next";
import { liquidity } from "@/components/sites/definomi/liquidity/content";
import { LiquidityPage } from "@/components/sites/definomi/liquidity/LiquidityPage";
import { AppFooter } from "@/components/sites/definomi/shared/AppFooter";
import { AppHeader } from "@/components/sites/definomi/shared/AppHeader";
import { AppShell } from "@/components/sites/definomi/shared/AppShell";

const { title, description } = liquidity.seo;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/liquidity" },
  openGraph: { title: `${title} — Definomi`, description, siteName: "Definomi", locale: "en_GB", type: "website", url: "/liquidity" },
  twitter: { card: "summary_large_image", title: `${title} — Definomi`, description, site: "@definomicom" },
};

export default function Liquidity() {
  return (
    <AppShell header={<AppHeader />} footer={<AppFooter />}>
      <LiquidityPage />
    </AppShell>
  );
}
