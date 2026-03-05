import type { Meta, StoryObj } from "@storybook/react";
import { RoyraiCredit } from "../../lib/components/controls/RoyraiCredit";

const meta: Meta<typeof RoyraiCredit> = {
  title: "Controls/RoyraiCredit",
  component: RoyraiCredit,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RoyraiCredit>;

export const Badge: Story = {
  args: {
    variant: "badge",
    phrasing: "made-by",
  },
};

export const BadgeWithLogo: Story = {
  args: {
    variant: "badge-logo",
    phrasing: "made-by",
  },
};

export const Footer: Story = {
  args: {
    variant: "footer",
    phrasing: "powered-by",
  },
};

export const FooterWithLogo: Story = {
  args: {
    variant: "footer-logo",
    phrasing: "powered-by",
  },
};

export const BuiltBy: Story = {
  args: {
    variant: "badge-logo",
    phrasing: "built-by",
  },
};

export const Hebrew: Story = {
  args: {
    variant: "footer-logo",
    language: "he",
    phrasing: "built-by",
  },
};

export const CustomColor: Story = {
  args: {
    variant: "badge-logo",
    phrasing: "made-by",
    color: "#0fa4a0",
  },
};
