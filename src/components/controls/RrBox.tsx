import { type ReactNode, type ElementType } from "react";
import { Box as MuiBox, type SxProps, type Theme } from "@mui/material";

/**
 * RrBox - Styled box/container wrapping MUI Box.
 * A flexible container component for layout purposes.
 */
export interface RrBoxProps {
  /** Box content */
  children?: ReactNode;
  /** Custom styles via MUI sx prop */
  sx?: SxProps<Theme>;
  /** The component type to render as */
  component?: ElementType;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Additional CSS class */
  className?: string;
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
