import { HomePage } from "@/components/sites/definomi/root-8a5edab2/HomePage";
import { AppFooter } from "@/components/sites/definomi/shared/AppFooter";
import { AppHeader } from "@/components/sites/definomi/shared/AppHeader";
import { AppShell } from "@/components/sites/definomi/shared/AppShell";

export default function Home() {
  return (
    <AppShell header={<AppHeader />} footer={<AppFooter />}>
      <HomePage />
    </AppShell>
  );
}
