import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    // Main entry — backwards compatible "."
    "index": "src/lib/index.ts",

    // Per-component entries — @royrai/ui-kit/controls/<Component>
    "controls/RrBox/index": "src/lib/components/controls/RrBox/index.ts",
    "controls/RrDataGrid/index": "src/lib/components/controls/RrDataGrid/index.ts",
    "controls/RrSocialIcons/index": "src/lib/components/controls/RrSocialIcons/index.ts",
    "controls/RrTimeWheelColumn/index": "src/lib/components/controls/RrTimeWheelColumn/index.ts",
    "controls/RrTimeWheelPicker/index": "src/lib/components/controls/RrTimeWheelPicker/index.ts",
    "controls/RoyraiCopyright/index": "src/lib/components/controls/RoyraiCopyright/index.ts",
    "controls/RoyraiCredit/index": "src/lib/components/controls/RoyraiCredit/index.ts",
    "controls/RrCopyright/index": "src/lib/components/controls/RrCopyright/index.ts",

    // Variant-specific entries — @royrai/ui-kit/controls/<Component>/mui
    "controls/RrBox/mui/index": "src/lib/components/controls/RrBox/mui/index.ts",
    "controls/RrDataGrid/mui/index": "src/lib/components/controls/RrDataGrid/mui/index.ts",
  },
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
