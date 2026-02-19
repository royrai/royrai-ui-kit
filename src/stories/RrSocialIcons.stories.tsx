import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  WhatsAppIcon,
  InstagramIcon,
  LinkedInIcon,
  FacebookIcon,
  EmailIcon,
} from "../components/controls/RrSocialIcons";

const meta: Meta = {
  title: "Controls/RrSocialIcons",
  tags: ["autodocs"],
};

export default meta;

export const AllIcons: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <WhatsAppIcon size={32} />
      <InstagramIcon size={32} />
      <LinkedInIcon size={32} />
      <FacebookIcon size={32} />
      <EmailIcon size={32} />
    </div>
  ),
};

export const CustomSizes: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <WhatsAppIcon size={16} />
      <WhatsAppIcon size={24} />
      <WhatsAppIcon size={32} />
      <WhatsAppIcon size={48} />
    </div>
  ),
};

export const WhiteOnDark: StoryObj = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "center",
        backgroundColor: "#333",
        padding: 16,
        borderRadius: 8,
      }}
    >
      <WhatsAppIcon size={32} color="white" />
      <InstagramIcon size={32} color="white" />
      <LinkedInIcon size={32} color="white" />
      <FacebookIcon size={32} color="white" />
      <EmailIcon size={32} color="white" />
    </div>
  ),
};
