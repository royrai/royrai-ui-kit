import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { siteTheme } from "./theme";
import { SiteLayout } from "./layout/SiteLayout";
import { HomePage } from "./pages/HomePage";
import { ComponentsPage } from "./pages/ComponentsPage";
import { GuidesPage } from "./pages/GuidesPage";

export function App() {
  return (
    <ThemeProvider theme={siteTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="components" element={<ComponentsPage />} />
            <Route path="guides" element={<GuidesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
