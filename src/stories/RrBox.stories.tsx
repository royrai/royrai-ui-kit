import type { Meta, StoryObj } from "@storybook/react";
import { RrBox } from "../components/controls/RrBox";

const meta: Meta<typeof RrBox> = {
  title: "Controls/RrBox",
  component: RrBox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RrBox>;

export const Default: Story = {
  args: {
    children: "Hello from RrBox",
    sx: { padding: 2, border: "1px solid #ccc", borderRadius: 1 },
  },
};

export const Styled: Story = {
  args: {
    children: "Styled RrBox",
    sx: {
      padding: 3,
      backgroundColor: "rgba(15, 164, 160, 0.1)",
      borderRadius: 2,
      color: "#1f2937",
      fontWeight: 600,
    },
  },
};

export const Clickable: Story = {
  args: {
    children: "Click me",
    onClick: () => alert("RrBox clicked!"),
    sx: {
      padding: 2,
      backgroundColor: "#0fa4a0",
      color: "white",
      borderRadius: 1,
      cursor: "pointer",
      textAlign: "center",
      "&:hover": { backgroundColor: "#0c8380" },
    },
  },
};
