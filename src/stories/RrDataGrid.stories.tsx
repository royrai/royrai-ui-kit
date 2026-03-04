import type { Meta, StoryObj } from "@storybook/react";
import { RrDataGrid } from "../components/controls/RrDataGrid";

const meta: Meta<typeof RrDataGrid> = {
  title: "Controls/RrDataGrid",
  component: RrDataGrid,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RrDataGrid>;

const sampleColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "role", headerName: "Role", width: 120 },
];

const sampleRows = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor" },
  { id: 3, name: "Carol Lee", email: "carol@example.com", role: "Viewer" },
  { id: 4, name: "David Kim", email: "david@example.com", role: "Editor" },
];

export const Default: Story = {
  args: {
    columns: sampleColumns,
    rows: sampleRows,
  },
};

export const WithHeaders: Story = {
  args: {
    columns: sampleColumns,
    rows: sampleRows,
    hideHeaders: false,
  },
};

export const RTL: Story = {
  args: {
    columns: [
      { field: "id", headerName: "מזהה", width: 70 },
      { field: "name", headerName: "שם", flex: 1 },
      { field: "email", headerName: "אימייל", flex: 1 },
      { field: "role", headerName: "תפקיד", width: 120 },
    ],
    rows: sampleRows,
    isRTL: true,
    hideHeaders: false,
  },
};

export const WithRowClick: Story = {
  args: {
    columns: sampleColumns,
    rows: sampleRows,
    onRowClick: (params) => alert(`Clicked: ${params.row.name}`),
  },
};
