import type {
  CreditLanguageCode,
  CreditVariant,
  CreditPhrasing,
} from "./creditOptions";
import { ROYRAI_NAME, ROYRAI_URL } from "./creditOptions";
import { creditTranslations } from "./translations";
import logo from "./RoyraiLogo.svg";
import "./RoyraiCredit.css";

// ─── Constants ───────────────────────────────────────────────────

/** CSS class names used by RoyraiCredit. Import to style from the parent. */
export const CREDIT_CLASSES = {
  root: "royrai-credit",
  link: "royrai-credit__link",
  logo: "royrai-credit__logo",
  text: "royrai-credit__text",
  phrasing: "royrai-credit__phrasing",
  name: "royrai-credit__name",
} as const;

// ─── Types ───────────────────────────────────────────────────────

export interface RoyraiCreditProps {
  /** Language for the credit text (default: "en") */
  language?: CreditLanguageCode;
  /** Display variant (default: "badge") */
  variant?: CreditVariant;
  /** Credit phrasing (default: "powered-by") */
  phrasing?: CreditPhrasing;
  /** Optional text color override */
  color?: string;
  /** Logo size in pixels (default: 24 for badge variants, 32 for footer variants) */
  logoSize?: number;
  /** Optional className for additional styling */
  className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────

function hasLogo(variant: CreditVariant): boolean {
  return variant === "footer-logo" || variant === "badge-logo";
}

function isBadge(variant: CreditVariant): boolean {
  return variant === "badge" || variant === "badge-logo";
}

// ─── Component ───────────────────────────────────────────────────

/**
 * RoyraiCredit - Attribution badge for products built by Royrai Automation
 *
 * A clickable "Powered by" / "Built by" / "Made by" credit that links to royrai.com.
 * Intended for use in customer products to attribute the creator.
 *
 * ## Variants
 *
 * | Variant | Logo | Output |
 * |---------|------|--------|
 * | `footer` | No | Powered by Royrai Automation |
 * | `footer-logo` | Yes | [logo] Powered by Royrai Automation |
 * | `badge` | No | Powered by Royrai Automation |
 * | `badge-logo` | Yes | [logo] Powered by Royrai Automation |
 *
 * ## Phrasing Options
 *
 * | Phrasing | English | Hebrew |
 * |----------|---------|--------|
 * | `powered-by` (default) | Powered by | מופעל על ידי |
 * | `built-by` | Built by | נבנה על ידי |
 * | `made-by` | Made by | נוצר על ידי |
 *
 * ## Styling
 *
 * All styles are defined in `RoyraiCredit.css` using CSS variables.
 * Override any variable on the root element or via CSS specificity:
 *
 * - `--royrai-credit-color` (default: #666666)
 * - `--royrai-credit-font-size` (default: 14px)
 * - `--royrai-credit-gap` (default: 8px)
 * - `--royrai-credit-logo-size` (default: 32px)
 * - `--royrai-credit-logo-url` (set automatically)
 *
 * @example
 * ```tsx
 * <RoyraiCredit language="he" variant="badge-logo" phrasing="built-by" />
 * ```
 */
export function RoyraiCredit({
  language = "en",
  variant = "badge",
  phrasing = "made-by",
  color,
  logoSize,
  className = "",
}: RoyraiCreditProps) {
  const currentTranslation =
    creditTranslations[language] || creditTranslations.en;
  const phrasingText = currentTranslation.phrasings[phrasing];
  const showLogo = hasLogo(variant);
  const cls = CREDIT_CLASSES;

  const cssVars = {
    ...(color ? { "--royrai-credit-color": color } : {}),
    ...(isBadge(variant) ? { "--royrai-credit-font-size": "12px" } : {}),
    ...(logoSize ? { "--royrai-credit-logo-size": `${logoSize}px` } : {}),
    ...(isBadge(variant) && !logoSize
      ? { "--royrai-credit-logo-size": "24px" }
      : {}),
    "--royrai-credit-logo-url": `url(${logo})`,
  } as React.CSSProperties;

  return (
    <div
      className={`${cls.root}${className ? ` ${className}` : ""}`}
      style={cssVars}
    >
      <a
        href={ROYRAI_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cls.link}
      >
        {showLogo && (
          <span
            role="img"
            aria-label={ROYRAI_NAME}
            className={cls.logo}
          />
        )}
        <span className={cls.text}>
          <span className={cls.phrasing}>{phrasingText} </span>
          <span className={cls.name} dir="ltr">{ROYRAI_NAME}</span>
        </span>
      </a>
    </div>
  );
}
