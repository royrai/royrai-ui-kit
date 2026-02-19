import { useMemo } from "react";
import {
  DataGrid,
  type GridColDef,
  type GridRowsProp,
  type GridRowParams,
  type GridSortModel,
} from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

/**
 * Column definition for RrDataGrid (extends MUI GridColDef)
 */
export type RrGridColDef = GridColDef;

/**
 * Row data type for RrDataGrid
 */
export type RrRowData = GridRowsProp;

/**
 * Props for RrDataGrid component
 */
export interface RrDataGridProps {
  /** Column definitions */
  columns: RrGridColDef[];
  /** Row data - each row must have an `id` field */
  rows: GridRowsProp;
  /** Callback when a row is clicked */
  onRowClick?: (params: GridRowParams) => void;
  /** Hide column headers */
  hideHeaders?: boolean;
  /** Hide footer (pagination, row count) */
  hideFooter?: boolean;
  /** Row height in pixels */
  rowHeight?: number;
  /** Auto height - adjust to content */
  autoHeight?: boolean;
  /** Disable row selection on click */
  disableRowSelectionOnClick?: boolean;
  /** Custom class name */
  className?: string;
  /** RTL support */
  isRTL?: boolean;
  /** Initial sort model */
  initialSortModel?: GridSortModel;
}

/**
 * RrDataGrid - A wrapper around MUI DataGrid
 *
 * Features:
 * - Sorting by column headers
 * - Row click handling
 * - Consistent styling with the app
 * - RTL support
 *
 * @example
 * ```tsx
 * <RrDataGrid
 *   columns={[
 *     { field: 'id', headerName: 'ID', width: 70 },
 *     { field: 'title', headerName: 'Title', flex: 1 },
 *   ]}
 *   rows={[
 *     { id: 1, title: 'Task 1' },
 *     { id: 2, title: 'Task 2' },
 *   ]}
 *   onRowClick={(params) => console.log(params.row)}
 * />
 * ```
 */
export function RrDataGrid({
  columns,
  rows,
  onRowClick,
  hideHeaders = false,
  hideFooter = true,
  rowHeight = 52,
  autoHeight = true,
  disableRowSelectionOnClick = true,
  className = "",
  isRTL = false,
  initialSortModel,
}: RrDataGridProps) {
  // Apply default RTL alignment to columns that don't specify alignment
  const processedColumns = useMemo(() => {
    const defaultAlign = isRTL ? "right" : "left";
    return columns.map((col) => ({
      ...col,
      align: col.align ?? defaultAlign,
      headerAlign: col.headerAlign ?? col.align ?? defaultAlign,
    }));
  }, [columns, isRTL]);

  // Create theme with RTL direction for proper MUI DataGrid RTL support
  const theme = useMemo(
    () => createTheme({ direction: isRTL ? "rtl" : "ltr" }),
    [isRTL],
  );

  return (
    <ThemeProvider theme={theme}>
      <div className={`rr-data-grid ${className}`}>
        <DataGrid
          rows={rows}
          columns={processedColumns}
          onRowClick={onRowClick}
          columnHeaderHeight={hideHeaders ? 0 : 56}
          initialState={
            initialSortModel
              ? { sorting: { sortModel: initialSortModel } }
              : undefined
          }
          rowHeight={rowHeight}
          autoHeight={autoHeight}
          hideFooter={hideFooter}
          disableRowSelectionOnClick={disableRowSelectionOnClick}
          disableColumnMenu
          sx={{
            border: "none",
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid",
              borderColor: "rgba(15, 164, 160, 0.1)", // primary/10
              cursor: onRowClick ? "pointer" : "default",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "rgba(15, 164, 160, 0.05)", // primary/5
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "rgba(15, 164, 160, 0.05)", // primary/5
              borderBottom: "1px solid",
              borderColor: "rgba(15, 164, 160, 0.1)", // primary/10
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 600,
              color: "#333333", // text-dark
            },
            "& .MuiDataGrid-columnHeader--alignRight .MuiDataGrid-columnHeaderTitleContainer":
              {
                justifyContent: "flex-end",
              },
            "& .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer":
              {
                justifyContent: "center",
              },
            "& .MuiDataGrid-columnHeader--alignLeft .MuiDataGrid-columnHeaderTitleContainer":
              {
                justifyContent: "flex-start",
              },
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
              {
                outline: "none",
              },
            // RTL fix: move column separator to left side
            ...(isRTL && {
              "& .MuiDataGrid-columnSeparator": {
                right: "auto",
                left: 0,
                transform: "translateX(-50%)",
              },
            }),
          }}
        />
      </div>
    </ThemeProvider>
  );
}
