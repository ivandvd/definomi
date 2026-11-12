import type { Metadata } from "next";
import { NotFoundPage } from "@/components/sites/definomi/shared/NotFoundPage";
import "./globals.css";
import "@/styles/sites/definomi/site.css";
import "@/styles/sites/definomi/definomi.css";

/* Any URL that matches no page, on the site or in the app. It bypasses the layouts, hence the imports. */
export const metadata: Metadata = {
  title: "Page not found — Definomi",
  description: "This page doesn’t exist. Go back to the Definomi home page, the roadmap or the docs.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr">
      <body>
        <NotFoundPage />
      </body>
    </html>
  );
}
