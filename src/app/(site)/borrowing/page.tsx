import type { Metadata } from "next";
import { BorrowingPage } from "@/components/sites/definomi/borrowing/BorrowingPage";
import { borrowing } from "@/components/sites/definomi/borrowing/content";
import { AppFooter } from "@/components/sites/definomi/shared/AppFooter";
import { AppHeader } from "@/components/sites/definomi/shared/AppHeader";
import { AppShell } from "@/components/sites/definomi/shared/AppShell";

const { title, description } = borrowing.seo;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/borrowing" },
  openGraph: { title: `${title} — Definomi`, description, siteName: "Definomi", locale: "en_GB", type: "website", url: "/borrowing" },
  twitter: { card: "summary_large_image", title: `${title} — Definomi`, description, site: "@definomicom" },
};

export default function Borrowing() {
  return (
    <AppShell header={<AppHeader />} footer={<AppFooter />}>
      <BorrowingPage />
    </AppShell>
  );
}
