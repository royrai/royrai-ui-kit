import { Box } from "@mui/material";
import { RoyraiCopyright } from "@lib/components/controls/RoyraiCopyright";

export function SiteFooter() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        textAlign: "center",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <RoyraiCopyright variant="footer-logo" />
    </Box>
  );
}
