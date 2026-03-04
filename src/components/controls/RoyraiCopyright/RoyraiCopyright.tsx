import { RrCopyright } from "../RrCopyright";
import type { CopyrightLanguageCode, CopyrightVariant } from "../RrCopyright";
import logo from "./RoyraiLogo.svg";

// ─── Constants ───────────────────────────────────────────────────

const ROYRAI_NAME = "Royrai Automation";
const ROYRAI_URL = "https://royrai.com";
const ROYRAI_START_YEAR = 2025;

// ─── Types ───────────────────────────────────────────────────────

export interface RoyraiCopyrightProps {
  /** Language for the copyright text (default: "en") */
  language?: CopyrightLanguageCode;
  /** Display variant (default: "footer") */
  variant?: CopyrightVariant;
  /** Optional text color override */
  color?: string;
  /** Logo size in pixels (default: 24 for badge variants, 32 for footer variants) */
  logoSize?: number;
  /** Optional className for additional styling */
  className?: string;
}

// ─── Component ───────────────────────────────────────────────────

/**
 * RoyraiCopyright - Copyright control for Royrai Automation products
 *
 * Wraps RrCopyright with Royrai-specific defaults (name, URL, logo, start year).
 *
 * ## Variants
 *
 * | Variant | Logo | Output |
 * |---------|------|--------|
 * | `footer` | No | © 2025-2026 Royrai Automation. All Rights Reserved. |
 * | `footer-logo` | Yes | [logo] © 2025-2026 Royrai Automation. All Rights Reserved. |
 * | `badge` | No | © Royrai Automation 2026 |
 * | `badge-logo` | Yes | [logo] © Royrai Automation 2026 |
 *
 * @example
 * ```tsx
 * <RoyraiCopyright language="he" variant="footer-logo" />
 * ```
 */
export function RoyraiCopyright({
  language = "en",
  variant = "footer",
  color,
  logoSize,
  className,
}: RoyraiCopyrightProps) {
  return (
    <RrCopyright
      businessName={ROYRAI_NAME}
      businessUrl={ROYRAI_URL}
      startYear={ROYRAI_START_YEAR}
      logo={logo}
      language={language}
      variant={variant}
      color={color}
      logoSize={logoSize}
      className={className}
    />
  );
}
