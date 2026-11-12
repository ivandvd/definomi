import type { MetadataRoute } from "next";

const ICONS = "/sites/definomi/shared/seo";

/** Web app manifest: the name and icons used when Definomi is saved to a home screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Definomi",
    short_name: "Definomi",
    description: "Pooled ETH staking, committed liquidity and borrowing, in three phases.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: `${ICONS}/icon-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${ICONS}/icon-512.png`, sizes: "512x512", type: "image/png" },
      { src: `${ICONS}/icon-maskable-512.png`, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
