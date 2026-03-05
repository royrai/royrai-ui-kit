/**
 * Credit options - internal to RoyraiCredit
 * Contains language codes, variant types, and phrasing options
 */

// Supported language codes
export const CREDIT_LANGUAGE_CODES = ["en", "he"] as const;
export type CreditLanguageCode = (typeof CREDIT_LANGUAGE_CODES)[number];

// Display variants
export const CREDIT_VARIANTS = [
  "footer",
  "footer-logo",
  "badge",
  "badge-logo",
] as const;
export type CreditVariant = (typeof CREDIT_VARIANTS)[number];

// Phrasing options
export const CREDIT_PHRASINGS = [
  "powered-by",
  "built-by",
  "made-by",
] as const;
export type CreditPhrasing = (typeof CREDIT_PHRASINGS)[number];

// Business constants
export const ROYRAI_NAME = "Royrai Automation";
export const ROYRAI_URL = "https://royrai.com";
