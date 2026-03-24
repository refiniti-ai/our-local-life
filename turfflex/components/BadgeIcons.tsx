/**
 * Simple Americana-style badge shapes for Turfflex.
 * Stroke-based, works with currentColor for brand colors.
 */

interface IconProps {
  className?: string;
  size?: number;
}

export function BadgeShield({ className = "", size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path
        d="M24 4L8 10v10c0 10 8 18 16 22 8-4 16-12 16-22V10L24 4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function BadgeStar({ className = "", size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path
        d="M24 4l6 14 15 2-11 10 3 15-13-8-13 8 3-15-11-10 15-2 6-14z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function BadgeCheck({ className = "", size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M14 24l8 8 12-16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BadgeMedallion({ className = "", size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function BadgeRibbon({ className = "", size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path
        d="M24 8c-4 0-8 4-8 10v14c0 4 3 6 8 8 5-2 8-4 8-8V18c0-6-4-10-8-10z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
