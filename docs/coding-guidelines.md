# Coding Guidelines

> **IMPORTANT:** Read this file before writing any code. These rules are mandatory.

> Adapted from royrai-automation coding guidelines for the royrai-ui-kit component library.

---

## Foundation

### 1. Change Approval Policy

**NEVER make changes without explicit permission.**

- When asked for information → provide information only, do NOT make changes
- When asked for opinion or advice → explain only, do NOT make changes
- When asked "what do you think?" → give advice only, do NOT make changes
- When unsure what is being asked → ASK for clarification before taking any action
- Only make changes when explicitly told: "yes", "do it", "fix it", "make the change", etc.
- Never implement changes that were not requested
- If you notice something that should be changed, suggest it first and wait for approval

### 2. Terminology

| Term | Meaning |
|------|---------|
| MUI | Material-UI library |
| Project prefix | A short (2-3 char) prefix derived from the project/brand name, used consistently for all local wrapper components (e.g., if prefix is `Rr`: `RrButton`, `RrDataGrid`) |
| Mui prefix | Third-party MUI component used inside wrappers (e.g., `MuiDataGrid`) |

---

## Architecture

### 3. File Organization

```
/src
├── components/
│   ├── controls/        # Generic UI primitives (the core of the library)
│   └── layout/          # Structural/layout components
├── constants/
│   └── theme.ts         # rrDefaultTheme and color definitions
└── types/               # TypeScript types/interfaces and MUI module augmentation
```

#### Components Folder Structure

##### `controls/` - Generic UI Primitives

**Purpose:** App-agnostic UI components that can be reused across different applications. This is the core of the royrai-ui-kit library.

**Rules:**
- No app hooks (no `useLanguage`, `useTranslation`, etc.)
- No translations
- No app-specific data
- Pure props in → UI out

**Examples:** `RrBox`, `RrDataGrid`, `RrSocialIcons`

---

##### `layout/` - Structural Components

**Purpose:** Structural components that define layout patterns and composition.

**Examples:** Layout containers, grid wrappers, spacing components

---

#### Decision Guide: Where to Put a Component?

| Question | If YES → | If NO → |
|----------|----------|---------|
| Is it a page structure/layout element? | `layout/` | Continue ↓ |
| Is it a generic, reusable UI primitive? | `controls/` | Reconsider design |

### 4. Barrel Export Policy

**As a component library, everything is exported.** All components, types, constants, and utilities that are part of the public API must be exported through the barrel `index.ts` files.

#### Rules

- Every component in `controls/` and `layout/` must be exported from its folder's `index.ts`
- All public types must be exported from `src/types/index.ts`
- All public constants (including `rrDefaultTheme`) must be exported from `src/constants/`
- The root `src/index.ts` re-exports everything that consumers need

#### When to Export

| Question | Export? |
|----------|---------|
| Is it a component consumers should use? | Yes |
| Is it a type/interface consumers need? | Yes |
| Is it an internal helper used only within a component? | No |

---

## Coding Standards

### 5. No Code Duplication

**Never duplicate code.**

If you notice:
- Similar code blocks
- Repeated logic
- Functions doing almost the same thing

**You must:**
1. Alert about the duplication
2. Suggest a solution (extract to shared function, create a utility, etc.)
3. Wait for approval before refactoring

#### Example Alert

> "I noticed that `ComponentA` and `ComponentB` have similar validation logic (lines X-Y).
> I suggest extracting this to a shared utility function in `utils/validation.ts`.
> Should I proceed with this refactoring?"

#### Consistency

**Always reuse existing components, patterns, and logic.** When a reusable solution already exists in the codebase — whether it's a component, a utility function, a state pattern, a hook, or a styling approach — always use it. Do not implement the same behavior differently in another place.

This applies to everything: UI components, state management patterns, validation logic, styling, and any other recurring code.

Before implementing something new, check if a similar solution already exists. If it does, use it. If the existing solution doesn't fully fit, extend it — don't create an alternative.

**AI instructions:**
- When modifying a page or component, check if other parts of the codebase have the same pattern and flag any inconsistencies.
- When creating a new reusable solution, search for all places that could benefit from it and suggest applying it everywhere.

### 6. Naming Conventions

#### Variable and Constant Names

**Variable names must be at least 2 characters long.**

- No: `i`, `j`, `k`, `x`, `y`, `n`
- Yes: `idx`, `row`, `col`, `item`, `count`

**Variable, constant, and component names must NOT start with a verb.** They describe *things*, not *actions*.

- No: `buildPaymentScope` (as a variable), `CreateProjectEditor` (as a component)
- Yes: `paymentScope` (variable), `ProjectScopeEditor` (component)

##### Common Replacements

| Instead of | Use |
|------------|-----|
| `i` | `idx`, `index`, `row`, `col` |
| `j` | `innerIdx`, `colIdx` |
| `k` | `key`, `keyIdx` |
| `n` | `count`, `total`, `num` |
| `x`, `y` | `posX`, `posY`, `coordX`, `coordY` |
| `e` | `ev`, `eventObj`, `err`, `errorObj`, `element` |

**Note:** Never use `event` or `error` as variable names - they are reserved words in some contexts. Use `ev`/`eventObj` and `err`/`errorObj` instead.

#### Function Names

**Function names must always start with a verb** that indicates what the function does.

- No: `paymentScope()`, `userData()`, `formErrors()`
- Yes: `buildPaymentScope()`, `getUserData()`, `validateForm()`

##### Common Verb Prefixes

| Verb | Usage |
|------|-------|
| `get` | Retrieve/compute a value |
| `set` | Assign a value |
| `build` | Construct a complex object |
| `create` | Instantiate something new |
| `handle` | Event handler |
| `validate` | Check correctness |
| `format` | Transform for display |
| `parse` | Convert from raw input |
| `process` | Apply transformations |
| `calculate` | Compute a result |
| `reset` | Restore to initial state |
| `clear` | Remove/empty something |

#### Interface and Type Names

**Interface and type names must be nouns (or noun phrases), never verbs.**

They describe *things*, not *actions*.

- No: `BuildQuotationDataParams`, `CreateUserResponse`, `FetchResultOptions`
- Yes: `QuotationDataParams`, `UserCreationResponse`, `FetchResultOptions`

#### Generic Type Parameters

**Generic type parameters must be descriptive (not single letters like `T`).**

- No: `<T>`, `<K>`, `<V>`
- Yes: `<TItem>`, `<TOption>`, `<TTranslation>`

```tsx
// BAD
function ItemGroupEditor<T>({ items }: { items: T[] }) { }
interface Column<T> { key: keyof T; }

// GOOD
function ItemGroupEditor<TItem>({ items }: { items: TItem[] }) { }
interface Column<TItem> { key: keyof TItem; }
```

| Instead of | Use |
|------------|-----|
| `<T>` for items | `<TItem>` |
| `<T>` for options | `<TOption>` |
| `<T>` for data | `<TData>` |
| `<K>` for keys | `<TKey>` |
| `<V>` for values | `<TValue>` |

### 7. Always Use Curly Brackets

**All `if`, `else`, `for`, `while`, and `do` statements must use curly brackets, even with a single statement.**

```tsx
// BAD
if (condition) doSomething();
for (const item of items) process(item);

// GOOD
if (condition) {
  doSomething();
}
for (const item of items) {
  process(item);
}
```

### 8. Color Constants

**Never use explicit color values in components.**

Use TypeScript constants (`as const` objects) — **not CSS variables** (`var(--color-xxx)`).

TypeScript constants provide type safety (compile-time error on typos), IDE discoverability (Cmd+click, autocomplete, Find References), and reliable refactoring. CSS variables lack all of these — a misspelled CSS variable silently fails with no error, cannot be navigated to in the IDE, and requires manual find-and-replace across mixed file types.

```tsx
// BAD - Explicit color value
<div style={{ backgroundColor: '#2e7d32' }} />

// BAD - CSS variable (no type safety, no IDE support)
<div style={{ backgroundColor: 'var(--color-success)' }} />

// GOOD - TypeScript constant from rrDefaultTheme
import { rrDefaultTheme } from "../constants/theme";
<div style={{ backgroundColor: rrDefaultTheme.palette.primary.main }} />
```

**Rules:**
- Define colors as named TypeScript constants (in component or shared `constants/theme.ts`)
- Always use `as const` for color objects to get literal type inference
- Control components: define default colors internally, accept optional color props for customization
- Use `rrDefaultTheme` from `src/constants/theme` for all theme-level color references

### 9. Quote Convention

**Always use double quotes (`"`) for strings.** Enforced by Prettier (see `.prettierrc`).

| Quote | When to use |
|-------|------------|
| `"` (double) | Everything — strings, imports, JSX attributes |
| `` ` `` (backtick) | Only for string interpolation: `` `Hello ${name}` `` |
| `'` (single) | Never |

```tsx
// BAD
import { RrTextField } from './controls/RrTextField';
const name = 'hello';

// GOOD
import { RrTextField } from "./controls/RrTextField";
const name = "hello";

// GOOD - backticks for interpolation
const greeting = `Hello ${name}`;
```

### 10. Type Definition Patterns

#### Array-Then-Type Pattern

Define a const array first, then derive the type from it:

```typescript
// GOOD - Single source of truth
export const ALLOWED_LANGUAGES = ['en', 'he'] as const;
export type AppLanguageCode = typeof ALLOWED_LANGUAGES[number];

// BAD - Duplicated, can get out of sync
export type AppLanguageCode = 'en' | 'he';
export const ALLOWED_LANGUAGES = ['en', 'he'];
```

#### Default Values

Always define default constants alongside type definitions. Use `'en'` and `'USD'` as defaults unless the project requires otherwise:

```typescript
export const DEFAULT_LANGUAGE_CODE: AppLanguageCode = 'en';  // Change if the project's primary language differs
export const DEFAULT_CURRENCY_CODE: AppCurrencyCode = 'USD'; // Change if the project's primary currency differs
```

#### Strict Type Safety - No `any` Type

**Never use the `any` type.** It defeats the purpose of TypeScript and hides potential bugs.

```typescript
// BAD - Avoid at all costs
function processData(data: any): any {
  return data.value;
}

// GOOD - Use proper types
function processData(data: { value: string }): string {
  return data.value;
}

// GOOD - Use generics when type varies
function processData<T>(data: T): T {
  return data;
}

// GOOD - Use unknown for truly unknown data, then narrow
function processData(data: unknown): string {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return String((data as { value: unknown }).value);
  }
  throw new Error('Invalid data');
}
```

**Alternatives to `any`:**

| Instead of `any` | Use |
|------------------|-----|
| Unknown structure | `unknown` + type guards |
| Object with any keys | `Record<string, T>` |
| Function with any args | `(...args: unknown[]) => T` |
| Array of anything | `unknown[]` |

**Exception:** In rare cases, `any` may be temporarily approved with explicit code review. Always add a comment explaining why and a TODO to fix it later.

---

## Component Patterns

### 11. Third-Party Component Wrapping

**All third-party components MUST be wrapped with local components.**

This allows future replacement of the underlying implementation without changing consuming code.

#### Naming Convention

Choose a short prefix (2-3 characters) derived from the project or brand name. Use it consistently for all local wrapper components.

- **Local wrapper:** `{ProjectPrefix}` + ComponentName (e.g., if prefix is `Rr`: `RrDataGrid`, `RrButton`)
- **Third-party import:** `Mui` + ComponentName (e.g., `MuiDataGrid`, `MuiButton`)

#### Example

```tsx
// components/controls/RrDataGrid.tsx
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';

interface RrDataGridProps {
  // Define your own props interface
}

export const RrDataGrid: React.FC<RrDataGridProps> = (props) => {
  return <MuiDataGrid {...props} />;
};
```

#### Usage

```tsx
// Always use the local wrapper, never the MUI component directly
import { RrDataGrid } from "@royrai/ui-kit";

<RrDataGrid columns={columns} rows={rows} />
```

### 12. Selector Pattern Architecture

This section describes the architecture pattern used for selector controls (LanguageSelector, CurrencySelector, etc.) and explains the "dumb controls" principle.

#### Core Principle: Complete Isolation

**Selector controls are fully isolated and NEVER import from application-level files.**

A selector control:
- Has its own internal types
- Has its own internal options/data
- Has its own translation files
- Returns a complete option object when selection changes
- Does NOT know about or depend on any app-level types, contexts, or hooks

#### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      Selector Control                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Internal Types │  │     Options     │  │  Translations   │ │
│  │  (e.g. Language │  │  (source of     │  │  (per language) │ │
│  │   Option)       │  │   truth)        │  │                 │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
│  Props:                                                         │
│  - value: internal code type                                    │
│  - currentLanguage: string (for translations)                   │
│  - onChange: (option: InternalOption) => void                   │
│  - allowedXxx?: code[] (optional filter)                        │
│                                                                 │
│  Returns: Full option object with translated name               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ onChange returns full option
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Consuming Component                           │
│                                                                 │
│  Converts selector's option to app type:                        │
│                                                                 │
│  const handleChange = (option: LanguageOption) => {             │
│    const appLanguage: AppLanguage = {                           │
│      code: option.code,                                         │
│      caption: option.name,        // name -> caption            │
│      isRTL: option.direction === 'rtl',  // direction -> isRTL  │
│      locale: option.locale,                                     │
│    };                                                           │
│    setLanguage(appLanguage);                                    │
│  };                                                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Why This Pattern?

| Benefit | Explanation |
|---------|-------------|
| **Single Source of Truth** | The selector owns all the data about its options. No duplication across the app. |
| **Maximum Reusability** | Selectors can be used in any project without modification. |
| **Clear Responsibility** | Selector knows its domain; consuming component knows app types. |
| **Type Safety Without Coupling** | Each layer has its own types that make sense for its responsibility. |

#### Implementation Details

##### Selector Internal Types

```typescript
// languageOptions.ts
export type Language = 'en' | 'he' | 'es' | 'fr' | ...;

export interface LanguageOption {
  code: Language;
  name: string;        // Native name
  direction: 'ltr' | 'rtl';
  locale: string;      // e.g., 'en-US'
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', name: 'English', direction: 'ltr', locale: 'en-US' },
  { code: 'he', name: 'עברית', direction: 'rtl', locale: 'he-IL' },
  // ...
];
```

##### App Types

```typescript
// appTypes.ts
export interface AppLanguage {
  code: string;
  caption: string;    // Translated display name
  isRTL: boolean;     // Boolean instead of 'ltr'/'rtl'
  locale: string;
}

export interface AppCurrency {
  code: string;
  symbol: string;
  caption: string;    // Translated display name
}
```

##### Selector Props

```typescript
export interface LanguageSelectorProps {
  /** Current selected language code */
  value: Language;
  /** Current app language for displaying translated names */
  currentLanguage: string;
  /** Callback when language changes - returns full LanguageOption */
  onChange: (option: LanguageOption) => void;
  /** Optional: limit which languages to show */
  allowedLanguages?: Language[];
  className?: string;
}
```

##### Consuming Component Conversion

```typescript
// In the consuming app
const handleLanguageChange = (option: LanguageOption) => {
  // Convert from selector's type to app's type
  const appLanguage: AppLanguage = {
    code: option.code,
    caption: option.name,              // selector: name -> app: caption
    isRTL: option.direction === 'rtl', // selector: direction -> app: isRTL
    locale: option.locale,
  };
  setLanguage(appLanguage);
};
```

#### Selector Translation Files

Each selector has its own translation files:

```
CurrencySelector/
├── CurrencySelector.tsx
├── currencyOptions.ts
├── currency.en.ts
├── currency.he.ts
└── index.ts
```

Translation files contain translated names for the selector's UI:

```typescript
// currency.en.ts
export const currencySelectorEn = {
  currencies: {
    ILS: 'Israeli Shekel',
    USD: 'US Dollar',
    EUR: 'Euro',
  },
};
```

The selector uses `currentLanguage` prop to select the right translation:

```typescript
const currentTranslation = translations[currentLanguage] || translations.en;
const translatedName = currentTranslation.currencies[code] || option.name;
```

#### Form Data Considerations

For form data that needs currency/language info:
- Store just the **code** (string) in form data
- Use utility functions for symbol/name lookup when needed
- This keeps form data simple and serializable

```typescript
// formTypes.ts
export interface PriceRange {
  min: number;
  max: number;
  currency: string;  // Just the code, not full object
}

// utils/currencySymbols.ts
export function getCurrencySymbol(code: string): string {
  return CURRENCY_SYMBOLS[code] || code;
}
```

#### Summary

| Aspect | Selector | App |
|--------|----------|-----|
| Types | `LanguageOption`, `CurrencyOption` | `AppLanguage`, `AppCurrency` |
| Direction | `'ltr'` \| `'rtl'` | `isRTL: boolean` |
| Name field | `name` | `caption` |
| Data source | Internal `OPTIONS` array | Context/State |
| Translations | Internal translation files | App translation files |
| Dependencies | None (isolated) | Uses selectors, converts types |

---

## Validation

### 13. Validation Organization

#### Where to Put Validation Functions

| Validation Type | Location |
|-----------------|----------|
| General (required, min/max length, URL) | Shared utility module |
| Field-specific (email format, phone format) | In the input component itself |

```typescript
// General validations (shared utility)
export function validateRequired(value: string): boolean
export function validateMinLength(value: string, min: number): boolean
export function validateUrl(value: string): boolean

// Field-specific (inside the component)
// e.g., in components/controls/EmailInput.tsx
export function validateEmail(email: string): boolean

// e.g., in components/controls/PhoneInput.tsx
export function validatePhoneNumber(data: PhoneInputData): boolean
```

---

## RTL Handling

### 14. RTL Handling

#### Phone Numbers Always LTR

Phone numbers are international and must always display left-to-right:

```tsx
// In PhoneInput component
<div dir="ltr">  {/* Force LTR for phone input */}
  <input type="tel" ... />
</div>
```

#### Document Direction

Set on the document element by the consuming application:

```typescript
document.documentElement.dir = language.isRTL ? 'rtl' : 'ltr';
```

---

## Release & Versioning

### 15. Version Updates

When updating the project version:

1. Update `package.json` → `"version": "x.x.x"`

**Note:** This project uses yarn. There is no `package-lock.json` to update. The `yarn.lock` file is auto-managed by yarn and should not be manually edited.

#### Semantic Versioning (MAJOR.MINOR.PATCH)

The version format is `MAJOR.MINOR.PATCH`. When incrementing, determine which part to bump:

| Part | When to increment | Reset | Example |
|------|-------------------|-------|---------|
| **MAJOR** | Breaking changes — existing functionality stops working or APIs change incompatibly | Reset MINOR and PATCH to 0 | `1.1.32` → `2.0.0` |
| **MINOR** | New features or significant enhancements — everything existing still works | Reset PATCH to 0 | `1.1.32` → `1.2.0` |
| **PATCH** | Bug fixes, small refactors, internal improvements — no new features, nothing breaks | — | `1.1.32` → `1.1.33` |

**AI instructions:**

- Determine the correct version part to bump based on the staged changes.
- Most commits (refactors, fixes, small additions) → bump **PATCH**.
- Adding a whole new component or significant capability → bump **MINOR**.
- Redesigning the library structure or making breaking API changes → bump **MAJOR**.
- If there is a dilemma (e.g., changes could be considered either minor or patch), **ask the user** whether to bump MAJOR, MINOR, or PATCH.
- If the user instructs a specific version bump, always follow the user's instruction regardless of the above guidelines.

### 16. Git Commit Description

Write a single headline line in the format:

```
v{version}: {Main action} — {change1}, {change2}, {change3}
```

- Start with the version prefix (e.g., `v1.1.32:`)
- Describe the main theme/action of the commit
- Use an em-dash (`—`) to separate from a list of key changes
- Each change should be 2-5 words, comma-separated
- No bullet points or multi-line details

**Example:**

```
v1.1.32: Refactor RrDataGrid — extract utils, consolidate props, add column type safety
```

### 17. PR Description

#### PR Title

Write a single-line title in the format:

```
v{last version}: {Main theme} — {key highlight 1}, {key highlight 2}
```

- Prefix with the **last (most recent) version** in the PR
- Describe the main theme/purpose of the PR
- Use an em-dash (`—`) to separate from key highlights
- Keep under 80 characters

#### PR Body

Write a detailed description summarizing **all changes** across all commits in the PR (from the branch's divergence point to HEAD). Use `git log` and `git diff` against the base branch to discover all changes.

**Every change must be included** — do not omit or skip any change from any commit.

#### Default format: By Topic

Group all changes by topic/concern. Related changes stay together regardless of which commit introduced them.

```
## {Branch purpose / main theme}

### {Topic 1}
- {change detail}
- {change detail}

### {Topic 2}
- {change detail}
- {change detail}

### Summary

{1-2 sentences summarizing the overall goal and outcome of the PR}
```

#### Alternative format: By Change Type

```
### New
- {new feature or addition}

### Refactored
- {refactoring change}

### Fixed
- {bug fix or correction}

### Documentation
- {docs change}
```

#### AI instructions

- Default to the **By Topic** format.
- After writing the description, ask the user if they prefer a rewrite using the **By Change Type** format. If the user says yes, rewrite the full description in that format.
- If the user instructs a specific format, follow the user's instruction.

---

### Summary Checklist

Before submitting any code:

**Approval & Standards:**
- [ ] Did I get approval for this change?
- [ ] Are all variable names at least 2 characters?
- [ ] Is there any code duplication?

**Components:**
- [ ] Are all third-party components wrapped with the project prefix?
- [ ] Is the component in the correct folder (controls/layout)?
- [ ] Do controls follow the "dumb controls" principle?

**Types & Validation:**
- [ ] Are types using array-then-type pattern where applicable?
- [ ] Is field-specific validation in the input component?
- [ ] Is general validation in a shared utility?
- [ ] Is there any use of the `any` type?

**Colors & Styling:**
- [ ] Are all colors referenced via `rrDefaultTheme` or named constants?
- [ ] Are there any hardcoded color values?

**RTL:**
- [ ] Are phone numbers forced to LTR direction?

**Exports:**
- [ ] Are all public components and types exported through barrel files?
