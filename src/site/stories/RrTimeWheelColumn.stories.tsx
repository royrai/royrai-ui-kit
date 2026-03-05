import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RrTimeWheelColumn } from "../../lib/components/controls/RrTimeWheelColumn";

const meta: Meta<typeof RrTimeWheelColumn> = {
  title: "Controls/RrTimeWheelColumn",
  component: RrTimeWheelColumn,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RrTimeWheelColumn>;

export const Default: Story = {
  args: {
    maxValue: 60,
    value: 15,
    onChange: () => {},
    primaryColor: "#0fa4a0",
    highlightBackground: "rgba(15, 164, 160, 0.1)",
    fadeColor: "rgba(248, 246, 241, 0.95)",
  },
};

export const Hours: Story = {
  args: {
    maxValue: 24,
    value: 8,
    onChange: () => {},
    primaryColor: "#0fa4a0",
    highlightBackground: "rgba(15, 164, 160, 0.1)",
    fadeColor: "rgba(248, 246, 241, 0.95)",
  },
};

export const Interactive: Story = {
  render: () => {
    const [val, setVal] = useState(5);

    return (
      <div>
        <RrTimeWheelColumn
          maxValue={60}
          value={val}
          onChange={setVal}
          primaryColor="#0fa4a0"
          highlightBackground="rgba(15, 164, 160, 0.1)"
          fadeColor="rgba(248, 246, 241, 0.95)"
        />
        <p style={{ textAlign: "center", marginTop: 8, color: "#666" }}>
          Selected: {String(val).padStart(2, "0")}
        </p>
      </div>
    );
  },
};

export const CustomColors: Story = {
  args: {
    maxValue: 12,
    value: 3,
    onChange: () => {},
    primaryColor: "#1877F2",
    highlightBackground: "rgba(24, 119, 242, 0.1)",
    fadeColor: "rgba(255, 255, 255, 0.95)",
  },
};
