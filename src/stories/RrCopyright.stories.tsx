import type { Meta, StoryObj } from "@storybook/react";
import { RrCopyright } from "../components/controls/RrCopyright";
import royraiLogo from "../components/controls/RoyraiCredit/RoyraiLogo.svg";

const meta: Meta<typeof RrCopyright> = {
  title: "Controls/RrCopyright",
  component: RrCopyright,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RrCopyright>;

export const Footer: Story = {
  args: {
    businessName: "Acme Corp",
    businessUrl: "https://example.com",
    variant: "footer",
  },
};

export const FooterWithYearRange: Story = {
  args: {
    businessName: "Acme Corp",
    businessUrl: "https://example.com",
    variant: "footer",
    startYear: 2020,
  },
};

export const FooterWithLogo: Story = {
  args: {
    businessName: "Acme Corp",
    businessUrl: "https://example.com",
    variant: "footer-logo",
    logo: royraiLogo,
    startYear: 2020,
  },
};

export const Badge: Story = {
  args: {
    businessName: "Acme Corp",
    businessUrl: "https://example.com",
    variant: "badge",
  },
};

export const BadgeWithLogo: Story = {
  args: {
    businessName: "Acme Corp",
    businessUrl: "https://example.com",
    variant: "badge-logo",
    logo: royraiLogo,
  },
};

export const Hebrew: Story = {
  args: {
    businessName: "חברת אקמה",
    businessUrl: "https://example.com",
    variant: "footer",
    language: "he",
    startYear: 2022,
  },
};

export const CustomColor: Story = {
  args: {
    businessName: "Acme Corp",
    businessUrl: "https://example.com",
    variant: "footer-logo",
    logo: royraiLogo,
    color: "#0fa4a0",
    startYear: 2023,
  },
};
