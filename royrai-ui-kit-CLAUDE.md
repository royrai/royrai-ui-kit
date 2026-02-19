# Claude Code Instructions for royrai-ui-kit

---

## Global Rules

**NEVER make changes without explicit permission from the user.**

- When asked for information → provide information only, do NOT make changes
- When asked for opinion or advice → explain only, do NOT make changes
- When unsure what is being asked → ASK for clarification before taking any action
- Only make changes when explicitly told: "yes", "do it", "fix it", "make the change", etc.

---

## Project Overview

**royrai-ui-kit** is a public, open-source React/TypeScript UI component library built on top of MUI (Material-UI). It provides reusable, bilingual (Hebrew/English) wrapper components with the `Rr` prefix.

- **License:** MIT
- **Package name:** `@royrai/ui-kit`
- **Registry:** npm (public)
- **Build tool:** tsup
- **Source project:** Components originate from `royrai-automation` (`src/components/controls/`)

### Important Files

Before making any changes, read these files:

1. **[coding-guidelines.md](./docs/coding-guidelines.md)** - Code standards and best practices (MUST READ)

---

## Project Structure

```
royrai-ui-kit/
├── src/
│   ├── components/
│   │   ├── controls/             # All Rr-prefixed controls (mirrors royrai-automation)
│   │   │   ├── RrBox.tsx
│   │   │   ├── RrDataGrid.tsx
│   │   │   ├── RrSocialIcons.tsx
│   │   │   └── index.ts          # Barrel export for all controls
│   │   ├── layout/               # Layout components (future)
│   │   │   └── index.ts
│   │   └── index.ts              # Barrel export for all components
│   ├── constants/                # Theme and configuration
│   │   └── theme.ts              # Default Royrai theme (rrDefaultTheme)
│   ├── types/                    # Shared types + MUI module augmentation
│   │   └── index.ts
│   └── index.ts                  # Main entry point (exports everything)
├── docs/
│   └── coding-guidelines.md     # Code standards (adapted from royrai-automation)
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── .gitignore
├── .npmignore
├── LICENSE                       # MIT
├── README.md
└── CLAUDE.md                     # This file
```

---

## Naming Conventions

- **Rr prefix** = Royrai wrapper components (e.g., `RrButton`, `RrDataGrid`)
- **Mui prefix** = Third-party MUI components used inside Rr wrappers (e.g., `MuiDataGrid`)
- File names match component names: `RrTextField.tsx` exports `RrTextField`
- Multi-file components get their own folder with an `index.ts` barrel export
- Types files use `.types.ts` suffix (e.g., `RrFormList.types.ts`)
- Translation files use language suffix: `*.en.ts`, `*.he.ts`

---

## Dependencies

### peerDependencies (consumer must provide)

```json
{
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0",
  "@mui/material": "^5.0.0 || ^6.0.0",
  "@mui/icons-material": "^5.0.0 || ^6.0.0",
  "@mui/x-data-grid": "^6.0.0 || ^7.0.0",
  "@mui/x-date-pickers": "^6.0.0 || ^7.0.0",
  "@emotion/react": "^11.0.0",
  "@emotion/styled": "^11.0.0"
}
```

### devDependencies (for development and build)

- `typescript`
- `tsup` (bundler)
- `react`, `react-dom` (for type checking)
- `@mui/material`, `@mui/icons-material`, `@mui/x-data-grid`, `@mui/x-date-pickers`
- `@emotion/react`, `@emotion/styled`
- `@types/react`, `@types/react-dom`

### dependencies (none ideally)

Keep this empty. All dependencies should be peer or dev.

---

## Build Configuration

### tsup.config.ts

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "@mui/material",
    "@mui/icons-material",
    "@mui/x-data-grid",
    "@mui/x-date-pickers",
    "@emotion/react",
    "@emotion/styled",
  ],
});
```

### package.json scripts

```json
{
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src/",
    "prepublishOnly": "yarn typecheck && yarn build"
  }
}
```

### package.json exports

```json
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist", "README.md", "LICENSE"]
}
```

---

## Key Rules for Components

### 1. No project-specific imports

Components must NOT import anything from `royrai-automation`. They must be fully self-contained. When copying components from the source project:

- Remove imports from `../../types/appTypes` or any app-specific types
- Remove imports from `../../data/` or any app-specific data
- Remove references to app-specific context providers
- Move any required types into `src/types/`

### 2. Translations must be self-contained

Specialized controls (CurrencySelector, PhoneInput, LanguageSelector) include their own translation files (`.en.ts`, `.he.ts`). These should remain bundled with the component, not rely on an external i18n system.

### 3. MUI as peer dependency

Never bundle MUI. It must be listed as a peerDependency so consumers use their own MUI instance. This prevents duplicate MUI installations and theme conflicts.

### 4. Props should extend MUI props

Where applicable, component props should extend the underlying MUI component's props:

```typescript
interface RrTextFieldProps extends TextFieldProps {
  // Additional Rr-specific props here
}
```

### 5. Export everything from index.ts

The main `src/index.ts` must re-export all components, types, and utilities:

```typescript
export * from "./components";
export * from "./types";
```

---

## Workflow: Adding a New Control

1. Create the component file in the appropriate folder (`components/controls/` or `components/layout/`)
2. Follow the `Rr` prefix naming convention
3. Export from the folder's `index.ts`
4. Export from `src/index.ts`
5. Run `yarn typecheck` to verify no type errors
6. Run `yarn build` to verify the build succeeds

## Workflow: Copying a Control from royrai-automation

1. Copy the file(s) from `royrai-automation/src/components/controls/`
2. Remove all project-specific imports
3. Replace app-specific types with local equivalents in `src/types/`
4. Verify the component compiles: `yarn typecheck`
5. Verify the build: `yarn build`

## Workflow: Publishing

1. Update version in `package.json` (follow semver)
2. Run `yarn typecheck && yarn build`
3. Commit and push
4. Run `npm publish --access public` (npm is used for publishing even with yarn)

---

## Version Strategy

Follow semantic versioning (semver):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes to component props or behavior
- **MINOR** (1.0.0 → 1.1.0): New components or new non-breaking props
- **PATCH** (1.0.0 → 1.0.1): Bug fixes, style tweaks

Start at version **0.1.0** (pre-release) until the library is stable.

---

## Integration with royrai-automation

After publishing, the source project (`royrai-automation`) should:

1. Install: `yarn add @royrai/ui-kit`
2. Replace local imports:
   ```typescript
   // Before
   import { RrTextField } from "../components/controls/RrTextField";
   // After
   import { RrTextField } from "@royrai/ui-kit";
   ```
3. Eventually remove the local `src/components/controls/` folder
