"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./LaunchTransition.module.css";

/* The Definomi "D", in lime on the ink curtain (the app's tab-bar hexagon colours). */
const MARK_D =
  "M0 0.25H10.3A11.7128 11.7128 0 0 1 10.3 23.6757H0ZM11.18 13.7815L11.63 18.4128L8.63 18.4128L9.08 13.7815L5.2941 16.4869L3.7941 13.8888L8.03 11.9628L3.7941 10.0369L5.2941 7.4388L9.08 10.1442L8.63 5.5128L11.63 5.5128L11.18 10.1442L14.9659 7.4388L16.4659 10.0369L12.23 11.9628L16.4659 13.8888L14.9659 16.4869Z";

/** How long the curtain takes to close before the app loads behind it. */
const CLOSE_MS = 640;

/** The flag the app reads to lift the same curtain on arrival (see the app's root layout). */
const FLAG = "definomi:launch";

function isAppLink(url: URL) {
  if (url.origin === window.location.origin) return url.pathname === "/app" || url.pathname.startsWith("/app/");
  return url.hostname.startsWith("app.");
}

/**
 * Launch App, with a transition: a lime then an ink curtain sweep up over the page (the brand
 * buttons' green sweep, scaled up) with the Definomi mark in the middle, then the app loads behind
 * it and lifts the same curtain. Plain navigation with reduced motion or a modified click.
 */
export function LaunchTransition() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (!isAppLink(url) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      event.preventDefault();
      event.stopPropagation();
      try {
        window.sessionStorage.setItem(FLAG, String(Date.now()));
      } catch {
        // Without storage the app simply opens without its reveal.
      }
      // The app may sit on another address (or be redirected there), which can't read this tab's
      // storage: say it in the URL too. The app takes it out of the address bar on arrival.
      url.searchParams.set("launch", "1");
      setActive(true);
      window.setTimeout(() => window.location.assign(url.href), CLOSE_MS);
    };
    // Coming back with the back button restores this page from the cache, curtain and all.
    const onShow = (event: PageTransitionEvent) => {
      if (event.persisted) setActive(false);
    };
    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("pageshow", onShow);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("pageshow", onShow);
    };
  }, []);

  if (!active) return null;
  return createPortal(
    <div className={styles.root} aria-hidden="true">
      <div className={styles.lime} />
      <div className={styles.ink}>
        <svg className={styles.mark} viewBox="-1.7528 0 23.7657 24" focusable="false">
          <path fillRule="evenodd" clipRule="evenodd" d={MARK_D} fill="#d1f500" />
        </svg>
      </div>
    </div>,
    document.body,
  );
}
