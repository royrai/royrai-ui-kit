import { useCallback } from "react";
import { RrTimeWheelColumn } from "./RrTimeWheelColumn";

export interface RrTimeWheelPickerValue {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface RrTimeWheelPickerLabels {
  title: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export interface RrTimeWheelPickerColors {
  primary?: string;
  container?: string;
  containerShadow?: string;
  titleText?: string;
  labelText?: string;
  fadeBackground?: string;
  highlightBackground?: string;
}

const DEFAULT_COLORS = {
  primary: "#0fa4a0",
  container: "rgba(255, 255, 255, 0.7)",
  containerShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
  titleText: "#666666",
  labelText: "#888888",
  fadeBackground: "rgba(248, 246, 241, 0.95)",
  highlightBackground: "rgba(15, 164, 160, 0.1)",
} as const;

export interface RrTimeWheelPickerProps {
  selectedTime: RrTimeWheelPickerValue;
  onChange: (time: RrTimeWheelPickerValue) => void;
  labels: RrTimeWheelPickerLabels;
  colors?: RrTimeWheelPickerColors;
}

export function RrTimeWheelPicker({
  selectedTime,
  onChange,
  labels,
  colors = {},
}: RrTimeWheelPickerProps) {
  const resolved = {
    primary: colors.primary ?? DEFAULT_COLORS.primary,
    container: colors.container ?? DEFAULT_COLORS.container,
    containerShadow: colors.containerShadow ?? DEFAULT_COLORS.containerShadow,
    titleText: colors.titleText ?? DEFAULT_COLORS.titleText,
    labelText: colors.labelText ?? DEFAULT_COLORS.labelText,
    fadeBackground: colors.fadeBackground ?? DEFAULT_COLORS.fadeBackground,
    highlightBackground: colors.highlightBackground ?? DEFAULT_COLORS.highlightBackground,
  };

  const handleHoursChange = useCallback(
    (val: number) => onChange({ ...selectedTime, hours: val }),
    [selectedTime, onChange]
  );

  const handleMinutesChange = useCallback(
    (val: number) => onChange({ ...selectedTime, minutes: val }),
    [selectedTime, onChange]
  );

  const handleSecondsChange = useCallback(
    (val: number) => onChange({ ...selectedTime, seconds: val }),
    [selectedTime, onChange]
  );

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 320,
        marginBottom: 20,
        backgroundColor: resolved.container,
        borderRadius: 16,
        padding: 16,
        boxShadow: resolved.containerShadow,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: "0.9rem",
          color: resolved.titleText,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        {labels.title}
      </div>

      {/* Wheel columns */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
          direction: "ltr",
        }}
      >
        <RrTimeWheelColumn
          maxValue={24}
          value={selectedTime.hours}
          onChange={handleHoursChange}
          primaryColor={resolved.primary}
          highlightBackground={resolved.highlightBackground}
          fadeColor={resolved.fadeBackground}
        />
        <span
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: resolved.primary,
            padding: "0 2px",
          }}
        >
          :
        </span>
        <RrTimeWheelColumn
          maxValue={60}
          value={selectedTime.minutes}
          onChange={handleMinutesChange}
          primaryColor={resolved.primary}
          highlightBackground={resolved.highlightBackground}
          fadeColor={resolved.fadeBackground}
        />
        <span
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: resolved.primary,
            padding: "0 2px",
          }}
        >
          :
        </span>
        <RrTimeWheelColumn
          maxValue={60}
          value={selectedTime.seconds}
          onChange={handleSecondsChange}
          primaryColor={resolved.primary}
          highlightBackground={resolved.highlightBackground}
          fadeColor={resolved.fadeBackground}
        />
      </div>

      {/* Labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 50,
          marginTop: 8,
          direction: "ltr",
        }}
      >
        <span style={{ fontSize: "0.75rem", color: resolved.labelText, textAlign: "center" }}>
          {labels.hours}
        </span>
        <span style={{ fontSize: "0.75rem", color: resolved.labelText, textAlign: "center" }}>
          {labels.minutes}
        </span>
        <span style={{ fontSize: "0.75rem", color: resolved.labelText, textAlign: "center" }}>
          {labels.seconds}
        </span>
      </div>
    </div>
  );
}
