/**
 * RrCopyright Component - Translations
 *
 * All translations for the RrCopyright component in a single file.
 * Separate from app translations because this is a reusable control.
 */

interface CopyrightTranslation {
  allRightsReserved: string;
}

export const copyrightTranslations: Record<string, CopyrightTranslation> = {
  en: {
    allRightsReserved: "All Rights Reserved",
  },
  he: {
    allRightsReserved: "כל הזכויות שמורות",
  },
};
