import { Box as MuiBox, type SxProps, type Theme } from "@mui/material";
import { type RrBoxBaseProps } from "../RrBox.types";

/**
 * RrBox MUI variant — Styled box/container wrapping MUI Box.
 * A flexible container component for layout purposes.
 */
export interface RrBoxProps extends RrBoxBaseProps {
  /** Custom styles via MUI sx prop */
  sx?: SxProps<Theme>;
}

export function RrBox({
  children,
  sx,
  component = "div",
  onClick,
  className,
}: RrBoxProps) {
  return (
    <MuiBox
      component={component}
      sx={sx}
      onClick={onClick}
      className={className}
    >
      {children}
    </MuiBox>
  );
}
