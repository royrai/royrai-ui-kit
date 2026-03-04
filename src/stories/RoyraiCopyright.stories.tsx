import type { Meta, StoryObj } from "@storybook/react";
import { RoyraiCopyright } from "../components/controls/RoyraiCopyright";

const meta: Meta<typeof RoyraiCopyright> = {
  title: "Controls/RoyraiCopyright",
  component: RoyraiCopyright,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RoyraiCopyright>;

export const Footer: Story = {
  args: {
    variant: "footer",
  },
};

export const FooterWithLogo: Story = {
  args: {
    variant: "footer-logo",
  },
};

export const Badge: Story = {
  args: {
    variant: "badge",
  },
};

export const BadgeWithLogo: Story = {
  args: {
    variant: "badge-logo",
  },
};

export const Hebrew: Story = {
  args: {
    variant: "footer-logo",
    language: "he",
  },
};

export const CustomColor: Story = {
  args: {
    variant: "footer-logo",
    color: "#0fa4a0",
  },
};
