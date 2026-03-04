import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RrTimeWheelPicker, type RrTimeWheelPickerValue } from "../components/controls/RrTimeWheelPicker";

const meta: Meta<typeof RrTimeWheelPicker> = {
  title: "Controls/RrTimeWheelPicker",
  component: RrTimeWheelPicker,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RrTimeWheelPicker>;

export const Default: Story = {
  args: {
    selectedTime: { hours: 0, minutes: 5, seconds: 0 },
    labels: {
      title: "Set Timer",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    onChange: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [time, setTime] = useState<RrTimeWheelPickerValue>({
      hours: 0,
      minutes: 1,
      seconds: 30,
    });

    return (
      <div>
        <RrTimeWheelPicker
          selectedTime={time}
          onChange={setTime}
          labels={{
            title: "Set Timer",
            hours: "Hours",
            minutes: "Minutes",
            seconds: "Seconds",
          }}
        />
        <p style={{ textAlign: "center", marginTop: 8, color: "#666" }}>
          Selected: {String(time.hours).padStart(2, "0")}:
          {String(time.minutes).padStart(2, "0")}:
          {String(time.seconds).padStart(2, "0")}
        </p>
      </div>
    );
  },
};

export const HebrewLabels: Story = {
  args: {
    selectedTime: { hours: 1, minutes: 0, seconds: 0 },
    labels: {
      title: "בחר זמן",
      hours: "שעות",
      minutes: "דקות",
      seconds: "שניות",
    },
    onChange: () => {},
  },
};
