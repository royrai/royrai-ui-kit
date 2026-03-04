/**
 * Copyright options - internal to RrCopyright
 * Contains language codes and variant types the control supports
 */

// Supported language codes
export const COPYRIGHT_LANGUAGE_CODES = ["en", "he"] as const;
export type CopyrightLanguageCode =
  (typeof COPYRIGHT_LANGUAGE_CODES)[number];

// Display variants
export const COPYRIGHT_VARIANTS = [
  "footer",
  "footer-logo",
  "badge",
  "badge-logo",
] as const;
export type CopyrightVariant = (typeof COPYRIGHT_VARIANTS)[number];

// Variant subsets for conditional props
export type CopyrightLogoVariant = "footer-logo" | "badge-logo";
export type CopyrightNoLogoVariant = "footer" | "badge";
