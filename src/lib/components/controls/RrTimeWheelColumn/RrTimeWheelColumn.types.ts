/**
 * Props for RrTimeWheelColumn.
 */
export interface RrTimeWheelColumnProps {
  maxValue: number;
  value: number;
  onChange: (value: number) => void;
  primaryColor: string;
  highlightBackground: string;
  fadeColor: string;
}
