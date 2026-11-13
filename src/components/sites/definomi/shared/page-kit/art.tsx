import type { CSSProperties, ReactNode } from "react";
import { BLOB_PATH } from "../SurtitleWithDot";
import styles from "./kit.module.css";

/*
 * The building blocks of the content pages' illustrations, drawn in the site's sticker style:
 * flat pastel shapes, a thin ink outline, small sparkles and bold Tomato Grotesk lettering.
 * Every piece is a `<g>` placed in its parent drawing's own units, so a scene is one SVG.
 * Decorative only: the drawings are hidden from assistive technology, the text says it all.
 */

export const INK = "#001405";
export const FONT = '"Tomato Grotesk", Arial, sans-serif';

/** The site's colours: the blob fills, the card tones, lime, coral and big blue. */
export const C = {
  ink: INK,
  lime: "#d1f500",
  green: "#05c92f",
  sky: "#9dc4f5",
  skyLight: "#a7cbf6",
  baby: "#ffcadc",
  babyLight: "#ffd0e2",
  lemonade: "#fbe74e",
  lemonadeLight: "#fcea59",
  mint: "#d6eedb",
  lightGreen: "#e2f2e5",
  coral: "#ff5a4d",
  blue: "#2a5cd3",
  white: "#ffffff",
  paper: "#f9faf9",
  stone: "#d1d6d2",
  grey: "#ecefec",
} as const;

/** The ink outline every shape wears. */
export const LINE = { stroke: INK, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" } as const;
/** A lighter line, for details inside a shape. */
export const THIN = { stroke: INK, strokeWidth: 1.4, strokeLinejoin: "round", strokeLinecap: "round" } as const;

export type Motion =
  | "float"
  | "bob"
  | "sway"
  | "tilt"
  | "twinkle"
  | "spin"
  | "turn"
  | "drift"
  | "pulse"
  | "wobble"
  | "blink"
  | "drop"
  | "slide"
  | "thump"
  | "flash"
  | "notch"
  | "spark"
  | "pop"
  | "queue";

const MOTION: Record<Motion, string> = {
  float: styles.float,
  bob: styles.bob,
  sway: styles.sway,
  tilt: styles.tilt,
  twinkle: styles.twinkle,
  spin: styles.spin,
  turn: styles.turn,
  drift: styles.drift,
  pulse: styles.pulse,
  wobble: styles.wobble,
  blink: styles.blink,
  drop: styles.drop,
  slide: styles.slide,
  thump: styles.thump,
  flash: styles.flash,
  notch: styles.notch,
  spark: styles.spark,
  pop: styles.pop,
  queue: styles.queue,
};

interface MoveProps {
  motion: Motion;
  /** Cycle length in seconds. */
  dur?: number;
  delay?: number;
  /** CSS transform-origin, relative to the group's own box ("50% 100%" sways from the foot). */
  origin?: string;
  /** Custom properties the keyframes read: `--amp`, `--dx`, `--dy`, `--fall`, `--sink`, `--rest`. */
  vars?: Record<string, string>;
  className?: string;
  children: ReactNode;
}

/**
 * A group that moves on a loop (see the keyframes in kit.module.css); it holds still under
 * reduced motion. Position its contents with a transform on a parent group, never on this one:
 * the animation owns this group's transform.
 */
export function Move({ motion, dur, delay, origin, vars, className, children }: MoveProps) {
  const style: Record<string, string> = { ...vars };
  if (dur) style.animationDuration = `${dur}s`;
  if (delay) style.animationDelay = `${delay}s`;
  if (origin) style.transformOrigin = origin;
  return (
    <g className={className ? `${MOTION[motion]} ${className}` : MOTION[motion]} style={style as CSSProperties}>
      {children}
    </g>
  );
}

/** The outer `<svg>` of a drawing. */
export function ArtSvg({ viewBox, className, children }: { viewBox: string; className?: string; children: ReactNode }) {
  return (
    <svg
      className={className ? `${styles.art} ${className}` : styles.art}
      viewBox={viewBox}
      overflow="visible"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const n = (value: number) => Number(value.toFixed(2));

/** A four-point sparkle of radius `r`, centred on the origin (the site's sparkle, any size). */
export function sparklePath(r: number) {
  const a = n(0.076 * r);
  const b = n(0.438 * r);
  const R = n(r);
  return `M0 ${-R}C${a} ${-b} ${b} ${-a} ${R} 0 ${b} ${a} ${a} ${b} 0 ${R} ${-a} ${b} ${-b} ${a} ${-R} 0 ${-b} ${-a} ${-a} ${-b} 0 ${-R}Z`;
}

interface PlaceProps {
  x: number;
  y: number;
}

/** A sparkle that twinkles. */
export function Sparkle({
  x,
  y,
  r = 9,
  fill = C.lime,
  delay = 0,
  dur = 3,
  still = false,
}: PlaceProps & { r?: number; fill?: string; delay?: number; dur?: number; still?: boolean }) {
  const path = <path d={sparklePath(r)} fill={fill} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />;
  return (
    <g transform={`translate(${x} ${y})`}>
      {still ? (
        path
      ) : (
        <Move motion="twinkle" dur={dur} delay={delay}>
          {path}
        </Move>
      )}
    </g>
  );
}

/** The site's blob, centred on (x, y). */
export function Blob({ x, y, size = 24, fill = C.green }: PlaceProps & { size?: number; fill?: string }) {
  const k = size / 24;
  return (
    <path
      d={BLOB_PATH}
      transform={`translate(${n(x - size / 2)} ${n(y - size / 2)}) scale(${n(k)})`}
      fill={fill}
      stroke={INK}
      strokeWidth={n(1.8 / k)}
      strokeLinejoin="round"
    />
  );
}

/** The Ethereum diamond, `h` tall, centred on (x, y). */
export function Eth({ x, y, h = 24, fill = INK, outline = false }: PlaceProps & { h?: number; fill?: string; outline?: boolean }) {
  const k = h / 24.5;
  const stroke = outline ? { stroke: INK, strokeWidth: n(1.4 / k), strokeLinejoin: "round" as const } : null;
  return (
    <g transform={`translate(${n(x)} ${n(y - 0.25 * k)}) scale(${n(k)})`} fill={fill}>
      <path d="M0-12 7.5 0.5 0 5-7.5 0.5Z" {...stroke} />
      <path d="M-7.5 2.4 0 6.9 7.5 2.4 0 12.5Z" {...stroke} />
    </g>
  );
}

/** A coin seen face on: rim, inner ring and the ETH diamond (white with an outline, or ink). */
export function Coin({
  x,
  y,
  r = 20,
  fill = C.lemonade,
  diamond = "ink",
}: PlaceProps & { r?: number; fill?: string; diamond?: "ink" | "white" | "none" }) {
  return (
    <g transform={`translate(${n(x)} ${n(y)})`}>
      <circle r={r} fill={fill} {...LINE} />
      <circle r={n(r * 0.74)} fill="none" stroke={INK} strokeWidth={1.2} opacity={0.4} />
      {diamond === "ink" ? <Eth x={0} y={0} h={r * 0.95} /> : null}
      {diamond === "white" ? <Eth x={0} y={0} h={r * 1.02} fill={C.white} outline /> : null}
    </g>
  );
}

/** A coin seen edge on, as a piece of a stack: the top face at (x, y). */
export function Chip({
  x,
  y,
  rx = 26,
  ry = 8.5,
  h = 7,
  fill = C.lemonade,
}: PlaceProps & { rx?: number; ry?: number; h?: number; fill?: string }) {
  return (
    <g>
      <path d={`M${n(x - rx)} ${n(y)}v${h}a${rx} ${ry} 0 0 0 ${rx * 2} 0v${-h}`} fill={fill} {...LINE} />
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={fill} {...LINE} />
      <ellipse cx={x} cy={y} rx={n(rx * 0.68)} ry={n(ry * 0.62)} fill="none" stroke={INK} strokeWidth={1.1} opacity={0.35} />
    </g>
  );
}

/** A soft shadow under a piece. */
export function Shadow({ x, y, rx, ry = 6 }: PlaceProps & { rx: number; ry?: number }) {
  return <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={INK} opacity={0.08} />;
}

/** A pill with an uppercase label, centred on (x, y): "VAULT", "AAVE V3". */
export function Tag({
  x,
  y,
  text,
  fill = C.white,
  size = 11,
  width,
}: PlaceProps & { text: string; fill?: string; size?: number; width?: number }) {
  const w = width ?? n(text.length * size * 0.72 + size * 1.7);
  const h = n(size * 2.1);
  return (
    <g transform={`translate(${n(x)} ${n(y)})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={fill} {...LINE} strokeWidth={1.6} />
      <text
        x={0}
        y={n(size * 0.36)}
        textAnchor="middle"
        fontFamily={FONT}
        fontWeight={700}
        fontSize={size}
        letterSpacing={n(size * 0.06)}
        fill={INK}
      >
        {text}
      </text>
    </g>
  );
}

/** Bold lettering, centred on (x, y). */
export function Letters({
  x,
  y,
  text,
  size = 14,
  fill = INK,
  weight = 700,
  anchor = "middle",
}: PlaceProps & { text: string; size?: number; fill?: string; weight?: number; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={n(y + size * 0.35)} textAnchor={anchor} fontFamily={FONT} fontWeight={weight} fontSize={size} fill={fill}>
      {text}
    </text>
  );
}

/** The Definomi mark's paths: the D with the asterisk cut out, and the asterisk alone, in a 22 × 24 box. */
const MARK_D =
  "M0 0.25H10.3A11.7128 11.7128 0 0 1 10.3 23.6757H0ZM11.18 13.7815L11.63 18.4128L8.63 18.4128L9.08 13.7815L5.2941 16.4869L3.7941 13.8888L8.03 11.9628L3.7941 10.0369L5.2941 7.4388L9.08 10.1442L8.63 5.5128L11.63 5.5128L11.18 10.1442L14.9659 7.4388L16.4659 10.0369L12.23 11.9628L16.4659 13.8888L14.9659 16.4869Z";
const MARK_STAR =
  "M11.18 13.7815L11.63 18.4128L8.63 18.4128L9.08 13.7815L5.2941 16.4869L3.7941 13.8888L8.03 11.9628L3.7941 10.0369L5.2941 7.4388L9.08 10.1442L8.63 5.5128L11.63 5.5128L11.18 10.1442L14.9659 7.4388L16.4659 10.0369L12.23 11.9628L16.4659 13.8888L14.9659 16.4869Z";

/** The Definomi mark, `size` tall, with its asterisk (the optical centre) on (x, y): the D in `color`; `accent` fills the asterisk (lime by default), `null` leaves it open. */
export function Mark({ x, y, size = 24, color = INK, accent = C.lime }: PlaceProps & { size?: number; color?: string; accent?: string | null }) {
  const k = size / 24;
  return (
    <g transform={`translate(${n(x - 10.13 * k)} ${n(y - 12 * k)}) scale(${n(k)})`}>
      <path fillRule="evenodd" clipRule="evenodd" d={MARK_D} fill={color} />
      {accent ? <path d={MARK_STAR} fill={accent} /> : null}
    </g>
  );
}

/** A chunky two-tone stroke: an ink outline around a coloured band, for arrows and pipes. */
export function Band({ d, color = C.lime, width = 6, dash }: { d: string; color?: string; width?: number; dash?: string }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={INK} strokeWidth={width + 3.4} />
      <path d={d} stroke={color} strokeWidth={width} strokeDasharray={dash} />
    </g>
  );
}

/** A dashed connector. */
export function Dashes({ d, opacity = 0.45 }: { d: string; opacity?: number }) {
  return <path d={d} fill="none" stroke={INK} strokeWidth={1.6} strokeDasharray="4 5" strokeLinecap="round" opacity={opacity} />;
}

/** A dashed connector whose dashes march along it, in the direction it is drawn (still under reduced motion). */
export function Flowline({ d, color = INK, width = 2.4, opacity = 0.7 }: { d: string; color?: string; width?: number; opacity?: number }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeDasharray="6 12"
      strokeLinecap="round"
      opacity={opacity}
      className={styles.march}
    />
  );
}
