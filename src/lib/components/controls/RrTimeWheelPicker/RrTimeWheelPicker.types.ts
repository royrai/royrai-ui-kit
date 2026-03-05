/**
 * Types for RrTimeWheelPicker.
 */
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

export interface RrTimeWheelPickerProps {
  selectedTime: RrTimeWheelPickerValue;
  onChange: (time: RrTimeWheelPickerValue) => void;
  labels: RrTimeWheelPickerLabels;
  colors?: RrTimeWheelPickerColors;
}
