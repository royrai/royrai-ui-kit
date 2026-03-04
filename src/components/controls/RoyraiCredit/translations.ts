/**
 * RoyraiCredit Component - Translations
 *
 * All translations for the RoyraiCredit component in a single file.
 * Separate from app translations because this is a reusable control.
 */

import type { CreditPhrasing } from "./creditOptions";

interface CreditTranslation {
  phrasings: Record<CreditPhrasing, string>;
}

export const creditTranslations: Record<string, CreditTranslation> = {
  en: {
    phrasings: {
      "powered-by": "Powered by",
      "built-by": "Built by",
      "made-by": "Made by",
    },
  },
  he: {
    phrasings: {
      "powered-by": "מופעל על ידי",
      "built-by": "נבנה על ידי",
      "made-by": "נוצר על ידי",
    },
  },
};
