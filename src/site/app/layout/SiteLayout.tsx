import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

export function SiteLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <SiteNav />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <SiteFooter />
    </Box>
  );
}
