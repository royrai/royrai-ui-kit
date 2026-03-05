import type {
  CopyrightLanguageCode,
  CopyrightVariant,
  CopyrightLogoVariant,
  CopyrightNoLogoVariant,
} from "./copyrightOptions";
import { copyrightTranslations } from "./translations";
import "./RrCopyright.css";

// ─── Constants ───────────────────────────────────────────────────

/** CSS class names used by RrCopyright. Import to style from the parent. */
export const COPYRIGHT_CLASSES = {
  root: "rr-copyright",
  link: "rr-copyright__link",
  logo: "rr-copyright__logo",
  text: "rr-copyright__text",
} as const;

// ─── Types ───────────────────────────────────────────────────────

interface RrCopyrightBaseProps {
  /** Business or product name displayed in the copyright text */
  businessName: string;
  /** URL the copyright links to */
  businessUrl: string;
  /** Language for the copyright text (default: "en") */
  language?: CopyrightLanguageCode;
  /** Optional text color override */
  color?: string;
  /** Logo size in pixels (default: 24 for badge variants, 32 for footer variants) */
  logoSize?: number;
  /** Year the business/product was established (used in footer variants for year range) */
  startYear?: number;
  /** Optional className for additional styling */
  className?: string;
}

/** When variant includes a logo, the logo prop is required */
type RrCopyrightWithLogo = RrCopyrightBaseProps & {
  variant: CopyrightLogoVariant;
  /** Logo image URL (required for logo variants) */
  logo: string;
};

/** When variant has no logo, the logo prop is optional */
type RrCopyrightWithoutLogo = RrCopyrightBaseProps & {
  variant?: CopyrightNoLogoVariant;
  /** Logo image URL (not used in non-logo variants) */
  logo?: string;
};

export type RrCopyrightProps = RrCopyrightWithLogo | RrCopyrightWithoutLogo;

// ─── Helpers ─────────────────────────────────────────────────────

function hasLogo(variant: CopyrightVariant): boolean {
  return variant === "footer-logo" || variant === "badge-logo";
}

function isBadge(variant: CopyrightVariant): boolean {
  return variant === "badge" || variant === "badge-logo";
}

// ─── Component ───────────────────────────────────────────────────

/**
 * RrCopyright - Generic copyright control
 *
 * A clickable copyright notice that links to the business URL.
 * Supports multiple display variants with optional logo.
 * The logo prop is required when using a logo variant.
 *
 * ## Variants
 *
 * | Variant | Logo | Output |
 * |---------|------|--------|
 * | `footer` | No | © 2025-2026 Business Name. All Rights Reserved. |
 * | `footer-logo` | Yes | [logo] © 2025-2026 Business Name. All Rights Reserved. |
 * | `badge` | No | © Business Name 2026 |
 * | `badge-logo` | Yes | [logo] © Business Name 2026 |
 *
 * ## Styling
 *
 * All styles are defined in `RrCopyright.css` using CSS variables.
 * Override any variable on the root element or via CSS specificity:
 *
 * - `--rr-copyright-color` (default: #666666)
 * - `--rr-copyright-font-size` (default: 14px)
 * - `--rr-copyright-gap` (default: 8px)
 * - `--rr-copyright-logo-size` (default: 32px)
 * - `--rr-copyright-logo-url` (set automatically from logo prop)
 *
 * @example
 * ```tsx
 * <RrCopyright
 *   businessName="Acme Corp"
 *   businessUrl="https://acme.com"
 *   language="en"
 *   variant="footer"
 * />
 * ```
 */
export function RrCopyright(props: RrCopyrightProps) {
  const {
    businessName,
    businessUrl,
    language = "en",
    variant = "footer",
    color,
    logoSize,
    logo,
    startYear,
    className = "",
  } = props;

  const currentYear = new Date().getFullYear();
  const currentTranslation =
    copyrightTranslations[language] || copyrightTranslations.en;
  const allRightsReserved = currentTranslation.allRightsReserved;
  const yearDisplay =
    startYear && startYear < currentYear
      ? `${startYear}-${currentYear}`
      : `${currentYear}`;
  const copyrightText = isBadge(variant)
    ? `\u00A9 ${businessName} ${currentYear}`
    : `\u00A9 ${yearDisplay} ${businessName}. ${allRightsReserved}.`;
  const showLogo = hasLogo(variant) && logo;
  const cls = COPYRIGHT_CLASSES;

  const cssVars = {
    ...(color ? { "--rr-copyright-color": color } : {}),
    ...(isBadge(variant) ? { "--rr-copyright-font-size": "12px" } : {}),
    ...(logoSize ? { "--rr-copyright-logo-size": `${logoSize}px` } : {}),
    ...(isBadge(variant) && !logoSize
      ? { "--rr-copyright-logo-size": "24px" }
      : {}),
    ...(logo ? { "--rr-copyright-logo-url": `url(${logo})` } : {}),
  } as React.CSSProperties;

  return (
    <div
      className={`${cls.root}${className ? ` ${className}` : ""}`}
      style={cssVars}
    >
      <a
        href={businessUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cls.link}
      >
        {showLogo && (
          <span
            role="img"
            aria-label={businessName}
            className={cls.logo}
          />
        )}
        <span className={cls.text}>{copyrightText}</span>
      </a>
    </div>
  );
}
