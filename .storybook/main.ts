import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/site/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: "@storybook/react-vite",
  staticDirs: ["../docs"],
  viteFinal: async (config) => {
    if (config.mode === "production") {
      config.base = "/storybook/";
    }
    return config;
  },
};

export default config;
