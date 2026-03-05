# Coding Guidelines

> **IMPORTANT:** Read this file before writing any code. These rules are mandatory.

---

## 1. Foundation

### 1.1. Change Approval Policy

**NEVER make changes without explicit permission.**

- When asked for information → provide information only, do NOT make changes
- When asked for opinion or advice → explain only, do NOT make changes
- When asked "what do you think?" → give advice only, do NOT make changes
- When unsure what is being asked → ASK for clarification before taking any action
- Only make changes when explicitly told: "yes", "do it", "fix it", "make the change", etc.
- Never implement changes that were not requested
- If you notice something that should be changed, suggest it first and wait for approval
- When the implementation requires choosing between approaches (e.g., using an existing component vs creating a new one, native HTML vs a library wrapper), present the options and ask — don't decide on your own
- When replicating a pattern from another project, replicate the architecture exactly. If the target project is missing a dependency, flag it and ask

### 1.2. Terminology

| Term | Meaning |
|------|---------|
| MUI | Material-UI library |
| Project prefix | A short (2-3 char) prefix derived from the project/brand name, used consistently for all local wrapper components (e.g., if prefix is `Rr`: `RrButton`, `RrDataGrid`) |
| Mui prefix | Third-party MUI component used inside wrappers (e.g., `MuiDataGrid`) |

---

## 2. Architecture

### 2.1. File Organization

```
/src
├── components/
│   ├── controls/        # Generic UI primitives
│   ├── features/        # App-specific reusable components
│   └── layout/          # Page structure components
├── services/
│   └── api/             # API and webhook services
├── utils/               # Utility functions
├── hooks/               # Custom hooks
└── types/               # TypeScript types/interfaces
```

#### Components Folder Structure

##### `controls/` - Generic UI Primitives

**Purpose:** App-agnostic UI components that can be reused across different applications.

**Rules:**
- No app hooks (no `useLanguage`, `useTranslation`, etc.)
- No translations
- No app-specific data
- Pure props in → UI out

**Examples:** `PriceInput`, `PhoneInput`, `SocialMediaButtons`

---

##### `features/` - App-Specific Reusable Components

**Purpose:** Higher-level components that combine controls with app-specific logic.

**Rules:**
- Can use app hooks (`useLanguage`, `useTranslation`)
- Can use translations
- Can use app-specific data
- Built from controls combined with app logic

**Examples:** `PaymentFrequency`, `ProjectScopeEditor`, `ThirdPartyScopeEditor`, `ChatBot`, `SEO`

---

##### `layout/` - Page Structure Components

**Purpose:** Structural components that define overall page layout and navigation.

**Examples:** `Header`, `Footer`, `InnerPageHeader`, `InnerPageLayout`, `ScrollToTop`

---

#### Decision Guide: Where to Put a Component?

| Question | If YES → | If NO → |
|----------|----------|---------|
| Does it use app hooks or translations? | `features/` | Continue ↓ |
| Is it a page structure/navigation element? | `layout/` | Continue ↓ |
| Is it a generic, reusable UI primitive? | `controls/` | Reconsider design |

### 2.2. Barrel Export Policy

#### components/index.ts Rules

**Exported (Public):** Components imported by `pages/`, `layout/`, or `context/`

**Not Exported (Internal):**
- Wrapped controls (use wrapper instead: `PhoneInput` → `FormPhoneInput`)
- Internal building blocks (`RrDropDown`, `RrDataGrid`, `PriceRangeInput`, `PaymentFrequency`)

#### When to Export

| Question | If YES → Export | If NO → Don't Export |
|----------|----------------|---------------------|
| Is it used by pages or layout? | ✅ | ❌ |
| Is it a wrapped control? | ❌ Export wrapper | ❌ |
| Is it only used by other components? | ❌ | ❌ |

---

## 3. Coding Standards

### 3.1. No Code Duplication

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

This applies to everything: UI components, state management patterns, validation logic, API call patterns, error handling, styling, and any other recurring code.

Before implementing something new, check if a similar solution already exists. If it does, use it. If the existing solution doesn't fully fit, extend it — don't create an alternative.

**AI instructions:**
- When modifying a page or component, check if other parts of the codebase have the same pattern and flag any inconsistencies.
- When creating a new reusable solution, search for all places that could benefit from it and suggest applying it everywhere.

### 3.2. Dead Code

**Do not remove dead code automatically.**

Dead code includes: unused imports, unreferenced functions or components, obsolete CSS keyframes/animations, orphaned files, and variables that are no longer read.

When you notice dead code — whether introduced by your own changes (e.g., switching implementation approach) or found during exploration — **alert the user** and suggest a cleanup. Only remove after explicit approval.

#### Clean Up Dead Code Action

When approved, a "clean up dead code" pass includes:

1. Scan for unused imports in modified files
2. Search for unreferenced functions, components, and constants
3. Check for orphaned CSS/animation definitions (keyframes, classes)
4. Identify files that are no longer imported anywhere
5. Remove all confirmed dead code and verify with `tsc --noEmit`

### 3.3. Naming Conventions

#### Variable and Constant Names

**Variable names must be at least 2 characters long.**

- ❌ `i`, `j`, `k`, `x`, `y`, `n`
- ✅ `idx`, `row`, `col`, `item`, `count`

**Variable, constant, and component names must NOT start with a verb.** They describe *things*, not *actions*.

- ❌ `buildPaymentScope` (as a variable), `CreateProjectEditor` (as a component)
- ✅ `paymentScope` (variable), `ProjectScopeEditor` (component)

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

- ❌ `paymentScope()`, `userData()`, `formErrors()`
- ✅ `buildPaymentScope()`, `getUserData()`, `validateForm()`

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

- ❌ `BuildQuotationDataParams`, `CreateUserResponse`, `FetchResultOptions`
- ✅ `QuotationWebhookDataParams`, `UserCreationResponse`, `FetchResultOptions`

#### Generic Type Parameters

**Generic type parameters must be descriptive (not single letters like `T`).**

- ❌ `<T>`, `<K>`, `<V>`
- ✅ `<TItem>`, `<TOption>`, `<TTranslation>`

```tsx
// ❌ BAD
function ItemGroupEditor<T>({ items }: { items: T[] }) {}
interface Column<T> {
  key: keyof T;
}

// ✅ GOOD
function ItemGroupEditor<TItem>({ items }: { items: TItem[] }) {}
interface Column<TItem> {
  key: keyof TItem;
}
```

| Instead of | Use |
|------------|-----|
| `<T>` for items | `<TItem>` |
| `<T>` for options | `<TOption>` |
| `<T>` for data | `<TData>` |
| `<K>` for keys | `<TKey>` |
| `<V>` for values | `<TValue>` |

### 3.4. Always Use Curly Brackets

**All `if`, `else`, `for`, `while`, and `do` statements must use curly brackets, even with a single statement.**

```tsx
// ❌ BAD
if (condition) doSomething();
for (const item of items) process(item);

// ✅ GOOD
if (condition) {
  doSomething();
}
for (const item of items) {
  process(item);
}
```

### 3.5. Styling

This project uses a layered styling approach. Each layer has a specific purpose — use the **first approach that fits** from the priority order below.

#### 3.5.1 Styling Priority Order

| Priority | Approach | When to use |
|----------|----------|-------------|
| **1st** | **Tailwind classes** | All static styling — layout, spacing, typography, responsive, static colors |
| **2nd** | **`appTheme` constants** | Colors and tokens not available in Tailwind, and dynamic colors keyed by runtime variables |
| **3rd** | **MUI `sx` prop** | Only on MUI components (inside Rr wrappers). Never on plain HTML elements |
| **4th** | **CSS file + CSS variables** | Reusable controls that consumers need to restyle externally |
| **5th** | **Inline `style={}`** | Only for values that are truly dynamic at runtime |

---

#### 3.5.2 Tailwind Classes (Primary)

Tailwind is the project's primary styling method, used across all pages, layout components, and feature components.

```tsx
// ✅ GOOD - Tailwind for layout, spacing, typography, colors
<div className="flex items-center gap-4 p-6 bg-primary text-white rounded-lg">

// ❌ BAD - Inline style for static values
<div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "24px" }}>
```

**Rules:**
- Use Tailwind for all static styling that doesn't change based on props, state, or computed data
- Custom Tailwind utilities and component classes are defined in `src/styles/globals.css` using `@layer`
- The Tailwind theme is configured in `tailwind.config.js`

---

#### 3.5.3 appTheme Constants

`appTheme` (defined in `constants/theme.ts` via MUI `createTheme`) provides semantic color tokens used throughout the app. It is the **single source of truth** for colors that Tailwind doesn't cover — field states, menu states, task status/priority colors, shadows, and opacity variants.

**When to use appTheme:**

| Scenario | Example |
|----------|---------|
| Color keyed by a runtime variable | `appTheme.palette.tasks.taskStatus[status].color` |
| Semantic tokens with no Tailwind equivalent | `appTheme.palette.field.borderFocused`, `appTheme.palette.menu.itemHover` |
| Inside MUI `sx` prop helpers | `getMuiTextFieldSx()` uses `appTheme.palette.field.*` |
| Opacity variants of theme colors | `appTheme.palette.primary` has `.alpha10`, `.alpha20`, etc. |

**When NOT to use appTheme (use Tailwind instead):**

| Scenario | Use |
|----------|-----|
| Static primary/secondary color | `text-primary`, `bg-secondary` (Tailwind classes) |
| Static background color | `bg-background` (Tailwind class) |
| Static text color | `text-text-dark`, `text-text-light` (Tailwind classes) |
| Layout, spacing, typography | Tailwind classes |

```tsx
// ✅ GOOD - appTheme for dynamic runtime color
<span style={{ color: appTheme.palette.tasks.taskStatus[task.status].color }}>

// ✅ GOOD - appTheme for semantic token not in Tailwind
sx={{ backgroundColor: appTheme.palette.field.backgroundFocused }}

// ❌ BAD - appTheme for static primary color (use Tailwind instead)
<div style={{ color: appTheme.palette.primary.main }}>
// ✅ GOOD
<div className="text-primary">
```

**Important:** Colors shared between Tailwind and appTheme (primary, secondary, background) must use identical values. Both systems must stay in sync. If a color value changes, update both `tailwind.config.js` and `constants/theme.ts`.

---

#### 3.5.4 MUI `sx` Prop

Used **only on MUI components** (components prefixed with `Mui` inside Rr wrappers) to style internal MUI slots that Tailwind cannot reach (e.g., `.MuiOutlinedInput-root`, `fieldset`, `&.Mui-focused`).

```tsx
// ✅ GOOD - sx on MUI component to target internal slots
<MuiTextField sx={getMuiTextFieldSx(variant)} />

// ❌ BAD - sx on a plain HTML element (use Tailwind)
<div sx={{ padding: 2 }} />
```

**Rules:**
- MUI styling helpers are centralized in `RrMuiThemeWrapper.tsx` (`getMuiTextFieldSx`, `getMuiSelectSx`, etc.)
- Individual Rr wrappers call these helpers — avoid writing raw `sx` in consuming components
- Never use `sx` on non-MUI elements

---

#### 3.5.5 CSS File + CSS Variables (Reusable Controls)

Used for **reusable control components** that consumers need to restyle externally (e.g., controls intended for a UI kit).

**Pattern:**
1. Create a `.css` file with BEM-named classes and CSS custom properties for customizable values
2. Export a `*_CLASSES` constant so consumers can reference class names
3. Set CSS variable values via inline `style` from props

```tsx
// Component exports class names
export const COPYRIGHT_CLASSES = {
  root: "rr-copyright",
  link: "rr-copyright__link",
  logo: "rr-copyright__logo",
} as const;

// CSS file uses custom properties with defaults
.rr-copyright__link {
  color: var(--rr-copyright-color, #666666);
  font-size: var(--rr-copyright-font-size, 14px);
}

// Component sets CSS variables from props
const cssVars = {
  ...(color ? { "--rr-copyright-color": color } : {}),
} as React.CSSProperties;
<div className={cls.root} style={cssVars} />
```

**When to use this pattern:**
- The control is app-agnostic and may be used in other projects
- Consumers need to override specific visual properties without modifying the component source

---

#### 3.5.6 Inline `style={}` (Dynamic Runtime Values Only)

**Only for values that are truly dynamic at runtime.** If the value doesn't change based on props, state, or computed data, use Tailwind instead.

**Allowed uses:**

| Use case | Example |
|----------|---------|
| CSS custom properties from props | `style={{ "--rr-copyright-color": color }}` |
| Calculated positions/dimensions | `style={{ left: underlinePos.left, width: underlinePos.width }}` |
| Colors from a runtime key | `style={{ color: appTheme.palette.tasks.taskStatus[status].color }}` |
| Dynamic grid templates | `style={{ gridTemplateColumns: gridColumns }}` |
| Hidden elements | `style={{ display: "none" }}` |

**Not allowed:**

```tsx
// ❌ BAD - Static font size (use Tailwind: text-2xl)
<span style={{ fontSize: "1.5rem" }}>

// ❌ BAD - Static spacing (use Tailwind: max-h-[250px] overflow-y-auto)
<div style={{ maxHeight: 250, overflowY: "auto" }}>

// ❌ BAD - Hardcoded color (use appTheme or Tailwind)
<Search size={16} style={{ color: "#9ca3af" }} />
```

---

#### 3.5.7 Color Constants

**Never use explicit color values in components.**

Use TypeScript constants (`as const` objects) — **not CSS variables** (`var(--color-xxx)`).

TypeScript constants provide type safety (compile-time error on typos), IDE discoverability (Cmd+click, autocomplete, Find References), and reliable refactoring. CSS variables lack all of these — a misspelled CSS variable silently fails with no error, cannot be navigated to in the IDE, and requires manual find-and-replace across mixed file types.

```tsx
// ❌ BAD - Explicit color value
<div style={{ backgroundColor: '#2e7d32' }} />

// ❌ BAD - CSS variable (no type safety, no IDE support)
<div style={{ backgroundColor: 'var(--color-success)' }} />

// ✅ GOOD - TypeScript constant
import { appTheme } from '@/constants/theme';
<div style={{ backgroundColor: appTheme.palette.primary.main }} />
```

**Rules:**
- Define colors as named TypeScript constants (in component or shared `constants/theme.ts`)
- Always use `as const` for color objects to get literal type inference
- Control components: define default colors internally, accept optional color props for customization

---

#### 3.5.8 Styling Approaches Not Used in This Project

The following approaches are valid in other projects but are **not part of this project's stack**. To keep styling consistent, do not introduce them without discussion.

| Approach | Why it's not used here |
|----------|------------------------|
| CSS Modules (`.module.css`) | Project uses Tailwind + CSS files with BEM; adding CSS Modules would create a third pattern |
| `styled()` API (emotion/styled-components) | Creates wrapper components; `sx` + centralized helpers in `RrMuiThemeWrapper.tsx` achieve the same reuse without extra component layers |
| Emotion template tags (`` css`...` ``) | Emotion is used internally by MUI, but custom styling uses Tailwind; adding `css` tags would mix a third approach |
| Headless UI | MUI already provides accessible UI primitives (menus, dialogs, selects); Headless UI would duplicate this |

### 3.6. Quote Convention

**Always use double quotes (`"`) for strings.** Enforced by Prettier (see `.prettierrc`).

| Quote | When to use |
|-------|------------|
| `"` (double) | Everything — strings, imports, JSX attributes |
| `` ` `` (backtick) | Only for string interpolation: `` `Hello ${name}` `` |
| `'` (single) | Never |

```tsx
// ❌ BAD
import { RrTextField } from "./controls/RrTextField";
const name = "hello";

// ✅ GOOD
import { RrTextField } from "./controls/RrTextField";
const name = "hello";

// ✅ GOOD - backticks for interpolation
const greeting = `Hello ${name}`;
```

### 3.7. Type Definition Patterns

#### Array-Then-Type Pattern

Define a const array first, then derive the type from it:

```typescript
// ✅ GOOD - Single source of truth
export const ALLOWED_LANGUAGES = ["en", "he"] as const;
export type AppLanguageCode = (typeof ALLOWED_LANGUAGES)[number];

// ❌ BAD - Duplicated, can get out of sync
export type AppLanguageCode = "en" | "he";
export const ALLOWED_LANGUAGES = ["en", "he"];
```

#### Default Values

Always define default constants alongside type definitions. Use `'en'` and `'USD'` as defaults unless the project requires otherwise:

```typescript
export const DEFAULT_LANGUAGE_CODE: AppLanguageCode = "en"; // Change if the project's primary language differs
export const DEFAULT_CURRENCY_CODE: AppCurrencyCode = "USD"; // Change if the project's primary currency differs
```

#### DateField Structure

Standard structure for date/time in webhook data:

```typescript
export interface DateField {
  utc: string; // "YYYY-MM-DD HH:mm:ss" in UTC
  local: string; // "YYYY-MM-DD HH:mm:ss" in local time
  utc_offset: string; // e.g., "UTC+2", "UTC-5:30"
  local_display: string; // Locale-formatted with offset
}
```

#### Form Error Types

Use `Partial<FormData>` for error types:

```typescript
export interface UserProfileFormData {
  displayName: string;
  email: string;
  // ...
}

// Error type - all fields optional
export type UserProfileFormErrors = Partial<UserProfileFormData>;
```

#### Strict Type Safety - No `any` Type

**Never use the `any` type.** It defeats the purpose of TypeScript and hides potential bugs.

```typescript
// ❌ BAD - Avoid at all costs
function processData(data: any): any {
  return data.value;
}

// ✅ GOOD - Use proper types
function processData(data: { value: string }): string {
  return data.value;
}

// ✅ GOOD - Use generics when type varies
function processData<T>(data: T): T {
  return data;
}

// ✅ GOOD - Use unknown for truly unknown data, then narrow
function processData(data: unknown): string {
  if (typeof data === "object" && data !== null && "value" in data) {
    return String((data as { value: unknown }).value);
  }
  throw new Error("Invalid data");
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

## 4. Component Patterns

### 4.1. Third-Party Component Wrapping

**All third-party components MUST be wrapped with local components.**

This allows future replacement of the underlying implementation without changing consuming code.

#### Naming Convention

Choose a short prefix (2-3 characters) derived from the project or brand name. Use it consistently for all local wrapper components.

- **Local wrapper:** `{ProjectPrefix}` + ComponentName (e.g., if prefix is `Rr`: `RrDataGrid`, `RrButton`)
- **Third-party import:** `Mui` + ComponentName (e.g., `MuiDataGrid`, `MuiButton`)

#### Example

```tsx
// components/controls/RrDataGrid.tsx
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";

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
import { RrDataGrid } from "@/components/controls/RrDataGrid";

<RrDataGrid columns={columns} rows={rows} />;
```

### 4.2. Selector Pattern Architecture

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
  caption: string; // Translated display name
  isRTL: boolean; // Boolean instead of 'ltr'/'rtl'
  locale: string;
}

export interface AppCurrency {
  code: string;
  symbol: string;
  caption: string; // Translated display name
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
// In Header.tsx or similar
const handleLanguageChange = (option: LanguageOption) => {
  // Convert from selector's type to app's type
  const appLanguage: AppLanguage = {
    code: option.code,
    caption: option.name, // selector: name -> app: caption
    isRTL: option.direction === "rtl", // selector: direction -> app: isRTL
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
    ILS: "Israeli Shekel",
    USD: "US Dollar",
    EUR: "Euro",
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
  currency: string; // Just the code, not full object
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

## 5. Integration & Services

### 5.1. External API Calls

**All external calls (webhooks, APIs) must go through a dedicated service/wrapper.**

- Create a dedicated service for external communications
- Never call external endpoints directly from components
- Centralize error handling and logging

#### Data Object Field Names

When sending data to external services (webhooks, APIs), field names must use **snake_case** format:
- Lowercase letters only
- Words separated by underscores (`_`)
- No spaces, no Hebrew characters

```tsx
// ❌ BAD
const data = {
  "Nom du client": customerName,
  "Customer Name": customerName,
  customerName: customerName,
};

// ✅ GOOD
const data = {
  customer_name: customerName,
  total_price: totalPrice,
  project_scope: projectScope,
};
```

#### Example Structure

```tsx
// services/api/webhookService.ts
export const webhookService = {
  send: async (endpoint: string, data: unknown) => {
    // Centralized logic, error handling, logging
  },
};
```

### 5.2. Configuration Patterns

#### Environment Variables

- Prefix with `VITE_` to expose to browser
- Always provide fallback values
- Define types in `vite-env.d.ts`

```typescript
// config/index.ts
webhooks: {
  contactForm: import.meta.env.VITE_WEBHOOK_CONTACT || '',
}

// vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_WEBHOOK_CONTACT: string;
}
```

#### Webhook Service Pattern

All webhooks go through `sendWebhook()` in `config/index.ts`:

```typescript
const result = await sendWebhook(config.webhooks.contactForm, data);
// Returns: { success: boolean; error?: string }
```

Features:
- Auto-adds `timestamp` and `source` metadata
- Console log fallback for development (no webhook URL)
- Centralized error handling

#### Site Data Organization

`config/site-data.ts` structure:

| Section | Contains |
|---------|----------|
| `brand` | Name, owner |
| `webhooks` | URL endpoints (from env vars) |
| `contact` | Email, phone (display + WhatsApp formats) |
| `social` | URLs only (labels in translations) |
| `scheduling` | External scheduling service config |
| `seo` | Site metadata |
| `images` | Image paths |

**Phone number formats:**
```typescript
contact: {
  phoneDisplay: '+1-555-123-4567',     // For UI display (formatted with dashes)
  whatsappNumber: '15551234567',       // For WhatsApp API (no +, no dashes, no spaces)
}
```

### 5.3. Context and Hooks

#### Language Detection Priority

`LanguageContext` detects language in this order:

1. **Stored preference** (localStorage key named `'{app-name}-language'`, e.g., `'myapp-language'`)
2. **Browser language** (navigator.language, if in allowed languages)
3. **Default fallback** (DEFAULT_LANGUAGE_CODE)

#### DOM Synchronization

Context updates document element when language changes:

```typescript
document.documentElement.lang = language.code;
document.documentElement.dir = language.isRTL ? "rtl" : "ltr";
```

#### Hook Error Pattern

Hooks that require a provider should throw if used outside:

```typescript
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
```

---

## 6. Error Handling & Validation

### 6.1. Error Handling

#### Error Boundary Pattern

Use class component for Error Boundaries (React requirement):

```tsx
class ErrorBoundary extends Component<Props, State> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught:", error, errorInfo);
  }
}
```

#### Development-Only Error Details

Show detailed error info only in development:

```tsx
{
  import.meta.env.DEV && this.state.error && (
    <pre>{this.state.error.message}</pre>
  );
}
```

### 6.2. Validation Organization

#### Where to Put Validation Functions

| Validation Type | Location |
|-----------------|----------|
| General (required, min/max length, URL) | `utils/validation.ts` |
| Field-specific (email format, phone format) | In the input component itself |

```typescript
// utils/validation.ts - General validations
export function validateRequired(value: string): boolean;
export function validateMinLength(value: string, min: number): boolean;
export function validateUrl(value: string): boolean;

// components/controls/EmailInput.tsx - Field-specific
export function validateEmail(email: string): boolean;

// components/controls/PhoneInput.tsx - Field-specific
export function validatePhoneNumber(data: PhoneInputData): boolean;
```

---

## 7. i18n Patterns

### 7.1. Translation System

#### useTranslation Hook

The `useTranslation` hook provides two methods:

```typescript
const { translate, getTranslationObject } = useTranslation();

// For strings (with optional placeholder replacement)
translate("pages.home.title"); // Returns string
// If translation for "greeting" is "Hello, {name}!"
translate("greeting", { name: "John" }); // Returns "Hello, John!"

// For arrays or objects
getTranslationObject<ServiceItem[]>("services.items"); // Returns typed array/object
```

#### Translation Keys

- Use **dot-notation** to navigate nested translation objects
- Keys that don't exist return the key itself as fallback
- Placeholder syntax: `{placeholderName}`

#### Translation File Location

| Content Type | Location |
|--------------|----------|
| App translations | `src/data/translations/` |
| Component-specific translations | Inside the component folder (e.g., `PhoneInput/phone.en.ts`) |
| Site data labels | Translation files, NOT in `site-data.ts` |

### 7.2. RTL Handling

#### Phone Numbers Always LTR

Phone numbers are international and must always display left-to-right:

```tsx
// In PhoneInput component
<div dir="ltr">  {/* Force LTR for phone input */}
  <input type="tel" ... />
</div>
```

#### Document Direction

Set on the document element via LanguageContext:

```typescript
document.documentElement.dir = language.isRTL ? "rtl" : "ltr";
```

---

## 8. Reference

### 8.1. Utility Functions

#### URL Builders

Generic URL builders live in `utils/urlBuilders.ts`:

```typescript
// Generic - can be used anywhere
buildWhatsAppUrl(phoneNumber: string, message?: string): string
buildGmailComposeUrl({ to, subject, body }): string
buildOutlookComposeUrl({ to, subject, body }): string
buildMailtoUrl(email: string): string
```

App-specific helpers that use config live in `config/index.ts`:

```typescript
// Uses app's WhatsApp number from config
getWhatsAppUrl(message?: string): string
```

#### Number Formatting

Use locale-aware formatting:

```typescript
import { formatNumberWithSeparators, parseFormattedNumber } from "../utils";

// Format for display (locale-aware)
formatNumberWithSeparators("1000000", "en-US"); // "1,000,000"
formatNumberWithSeparators("1000000", "de-DE"); // "1.000.000"

// Parse back to number (removes all non-numeric)
parseFormattedNumber("1,000,000"); // "1000000"
```

---

## 9. Release & Versioning

### 9.1. Version Updates

When updating the project version:

1. Update `package.json` → `"version": "x.x.x"`
2. Update `package-lock.json` → both `"version"` fields (root level and inside `packages[""]`)

Both files must always have matching versions.

#### Semantic Versioning (MAJOR.MINOR.PATCH)

The version format is `MAJOR.MINOR.PATCH`. **PATCH is always 2 digits** (zero-padded), e.g., `1.2.01`, `1.2.09`, `1.2.10`.

**Important:** Do NOT use `npm version` to bump the version — it strips leading zeros. Instead, manually edit the version string in `package.json` and `package-lock.json`.

When incrementing, determine which part to bump:

| Part | When to increment | Reset | Example |
|------|-------------------|-------|---------|
| **MAJOR** | Breaking changes — existing functionality stops working or APIs change incompatibly | Reset MINOR and PATCH to 00 | `1.1.32` → `2.0.00` |
| **MINOR** | New features or significant enhancements — everything existing still works | Reset PATCH to 00 | `1.1.32` → `1.2.00` |
| **PATCH** | Bug fixes, small refactors, internal improvements — no new features, nothing breaks | — | `1.1.32` → `1.1.33` |

**AI instructions:**

- Determine the correct version part to bump based on the staged changes.
- Most commits (refactors, fixes, small additions) → bump **PATCH**.
- Adding a whole new page or significant capability → bump **MINOR**.
- Redesigning the app structure or making breaking API changes → bump **MAJOR**.
- If there is a dilemma (e.g., changes could be considered either minor or patch), **ask the user** whether to bump MAJOR, MINOR, or PATCH.
- If the user instructs a specific version bump, always follow the user's instruction regardless of the above guidelines.

### 9.2. Git Commit Description

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
v1.1.32: Refactor QuotationDocGenerator — extract utils, consolidate payment state, add JSON parse validation
```

### 9.3. PR Description

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

### 9.4. Preparing a Commit

When asked to **"prepare the commit"**, perform both steps:

1. **Update the version** (as defined in section 9.1)
2. **Write the commit description** (as defined in section 9.2)

After writing the commit description, **ask the user** whether they also want a PR description written (as defined in section 9.3).

When asked only to **"write the commit description"** — write the description only, do not update the version.

When asked only to **"update the version"** — update the version only, do not write the description.

When asked only to **"write the PR description"** — write the PR description only.

#### Staging Policy

**NEVER stage files (git add).** Only the user decides which files to stage. When preparing a commit:
- Edit the files that need changes (e.g., version updates)
- Write the commit description
- Do NOT run `git add` on any file — the user will stage files themselves

---

## 10. Task Management

### 10.1. Task Management

#### Task Files

Tasks are stored in three files that must stay synchronized:

| File | Contains |
|------|----------|
| `src/data/tasks.ts` | Task records (id, status, priority, requires, etc.) |
| `docs/translations/tasks.en.ts` | English title and description |
| `docs/translations/tasks.he.ts` | Hebrew title and description |

For types and constants, see `src/types/taskTypes.ts`.

#### Before Adding or Updating a Task

1. Search all existing tasks (in tasks.en.ts) for keywords related to the new/updated task
2. If an existing task already covers the same or similar scope — inform the user and ask whether to update the existing task or create a new one
3. If an existing task partially overlaps — inform the user about the overlap and ask how to proceed (adjust scope, add dependency, add to "related", or keep as-is)
4. If the new task is connected to existing tasks — inform the user and suggest adding references between them using `requires` (if one blocks the other) or `related` (if they share context but don't block each other), and wait for the user's approval
5. Never merge, split, skip a task, or add references between tasks without the user's explicit approval

#### Adding a New Task

1. Add translation in `docs/translations/tasks.en.ts` and `tasks.he.ts`
2. Add task entry in `src/data/tasks.ts` with `status: "new"`
3. Set `createdTime` in UTC with Z suffix (e.g., `"2026-02-04T05:00:00Z"`)
   - To get current UTC time: `date -u '+%Y-%m-%dT%H:%M:%SZ'`

#### Updating a Task as Committed

1. Set `status: "committed"`
2. Add `version: "x.x.x"` — the version where this task was committed
3. Add `lastCommitHash: "abc1234"` — the short commit hash (7 characters)

#### Ordering Rules

Tasks must be kept in **ascending order by ID** in all three files.

- New tasks are always appended at the end of the pending tasks section (before the completed tasks section in `tasks.ts`)
- New translations are always appended at the end of the `tasks` object in both translation files
- Never insert a task between existing tasks in a way that breaks ID order
- When adding multiple tasks at once, add them in ascending ID order
- The order in all three files must stay synchronized

---

### 10.2. Summary Checklist

Before submitting any code:

**Approval & Standards:**
- [ ] Did I get approval for this change?
- [ ] Are all variable names at least 2 characters?
- [ ] Is there any code duplication?

**Components:**
- [ ] Are all third-party components wrapped with the project prefix?
- [ ] Is the component in the correct folder (controls/features/layout)?
- [ ] Do controls follow the "dumb controls" principle?
- [ ] Are wrapped controls NOT exported directly?

**External Communication:**
- [ ] Are external calls going through the dedicated service?
- [ ] Are external API field names in snake_case?
- [ ] Is DateField used for timestamps in webhook data?

**Types & Validation:**
- [ ] Are types using array-then-type pattern where applicable?
- [ ] Is field-specific validation in the input component?
- [ ] Is general validation in utils/validation.ts?

**Translations & i18n:**
- [ ] Are translation keys using dot-notation?
- [ ] Are labels in translation files (not in site-data.ts)?
- [ ] Are phone numbers forced to LTR direction?
