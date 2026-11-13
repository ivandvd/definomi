import { icons } from "@/components/sites/definomi/shared/icons";
import { cn } from "@/lib/utils";

/* The Definomi marks, as drawn in the landing page's phone walkthrough: the D with the asterisk cut out, and the asterisk alone. */

export const MARK_D =
  "M0 0.25H10.3A11.7128 11.7128 0 0 1 10.3 23.6757H0ZM11.18 13.7815L11.63 18.4128L8.63 18.4128L9.08 13.7815L5.2941 16.4869L3.7941 13.8888L8.03 11.9628L3.7941 10.0369L5.2941 7.4388L9.08 10.1442L8.63 5.5128L11.63 5.5128L11.18 10.1442L14.9659 7.4388L16.4659 10.0369L12.23 11.9628L16.4659 13.8888L14.9659 16.4869Z";
export const MARK_STAR =
  "M11.18 13.7815L11.63 18.4128L8.63 18.4128L9.08 13.7815L5.2941 16.4869L3.7941 13.8888L8.03 11.9628L3.7941 10.0369L5.2941 7.4388L9.08 10.1442L8.63 5.5128L11.63 5.5128L11.18 10.1442L14.9659 7.4388L16.4659 10.0369L12.23 11.9628L16.4659 13.8888L14.9659 16.4869Z";

/** The Definomi "D" mark: a solid D with the asterisk cut out, boxed so the asterisk (its optical centre) sits in the middle. `accent` fills the asterisk (lime on light backgrounds); `accent: null` leaves it open for the lime-on-ink version. */
export function DefinomiMark({ className, color = "currentColor", accent = "#d1f500" }: { className?: string; color?: string; accent?: string | null }) {
  return (
    <svg className={className} viewBox="-1.7528 0 23.7657 24" aria-hidden="true" focusable="false">
      <path fillRule="evenodd" clipRule="evenodd" d={MARK_D} fill={color} />
      {accent ? <path d={MARK_STAR} fill={accent} /> : null}
    </svg>
  );
}

/** The Definomi wordmark (the site's logo asset). */
export function DefinomiLogo({ className }: { className?: string }) {
  return <span className={cn("block [&_svg]:block [&_svg]:h-full [&_svg]:w-auto", className)} dangerouslySetInnerHTML={{ __html: icons["definomi-logo"] }} />;
}

/** The mark on a white tile, as in the walkthrough's top bar. */
export function MarkTile({ className }: { className?: string }) {
  return (
    <span className={cn("flex size-10 items-center justify-center rounded-control bg-card", className)}>
      <DefinomiMark className="h-5 w-5" color="#0f0f0f" />
    </span>
  );
}

const HEX = "M23.5 3.2a7 7 0 0 1 7 0l15.3 8.8a7 7 0 0 1 3.5 6.1v17.7a7 7 0 0 1-3.5 6.1L30.5 50.8a7 7 0 0 1-7 0L8.2 41.9a7 7 0 0 1-3.5-6.1V18.1a7 7 0 0 1 3.5-6.1Z";

/** The ink hexagon with the lime D: the centre of the phone tab bar. */
export function HexMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 54 54" aria-hidden="true" focusable="false">
      <path d={HEX} fill="#0f0f0f" />
      <g transform="translate(17.6804 15.96) scale(0.92)">
        <path fillRule="evenodd" clipRule="evenodd" d={MARK_D} fill="#d1f500" />
      </g>
    </svg>
  );
}

/** The Ethereum diamond, in one colour. */
export function EthDiamond({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 26" aria-hidden="true" focusable="false">
      <path d="M8 0.8 15.1 12.6 8 16.8 0.9 12.6Z" fill={color} />
      <path d="M0.9 14.2 8 18.4l7.1-4.2L8 25.2Z" fill={color} opacity="0.65" />
    </svg>
  );
}

/** A wallet avatar: a deterministic two-tone gradient from the address. */
export function AddressAvatar({ address, className }: { address: string; className?: string }) {
  const seed = parseInt(address.slice(2, 8), 16) || 0;
  const hue = seed % 360;
  const hue2 = (hue + 70) % 360;
  return (
    <span
      className={cn("inline-block shrink-0 rounded-full ring-2 ring-white", className)}
      style={{ background: `linear-gradient(135deg, hsl(${hue} 70% 62%), hsl(${hue2} 80% 52%))` }}
      aria-hidden="true"
    />
  );
}
