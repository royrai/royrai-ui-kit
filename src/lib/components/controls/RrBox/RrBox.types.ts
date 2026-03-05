import { type ReactNode, type ElementType } from "react";

/**
 * Base props for RrBox — variant-agnostic.
 * Variant implementations may extend this with framework-specific props.
 */
export interface RrBoxBaseProps {
  /** Box content */
  children?: ReactNode;
  /** The component type to render as */
  component?: ElementType;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Additional CSS class */
  className?: string;
}
