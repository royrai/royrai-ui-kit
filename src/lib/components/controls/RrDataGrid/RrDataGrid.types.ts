/**
 * Base column definition — variant-agnostic.
 * Variant implementations may use richer column types from their framework.
 */
export interface RrDataGridColumnBase {
  field: string;
  headerName?: string;
  width?: number;
  flex?: number;
  align?: "left" | "center" | "right";
  headerAlign?: "left" | "center" | "right";
}

/**
 * Base row type — variant-agnostic.
 * Rows must have an `id` field.
 */
export interface RrDataGridRowBase {
  id: string | number;
  [key: string]: unknown;
}

/**
 * Base props for RrDataGrid — variant-agnostic.
 * Variant implementations may extend this with framework-specific props.
 */
export interface RrDataGridBaseProps {
  /** Column definitions */
  columns: RrDataGridColumnBase[];
  /** Row data — each row must have an `id` field */
  rows: RrDataGridRowBase[];
  /** Callback when a row is clicked */
  onRowClick?: (params: { row: RrDataGridRowBase }) => void;
  /** Hide column headers */
  hideHeaders?: boolean;
  /** Hide footer (pagination, row count) */
  hideFooter?: boolean;
  /** Row height in pixels */
  rowHeight?: number;
  /** Auto height — adjust to content */
  autoHeight?: boolean;
  /** Disable row selection on click */
  disableRowSelectionOnClick?: boolean;
  /** Custom class name */
  className?: string;
  /** RTL support */
  isRTL?: boolean;
}
