import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Components", to: "/components" },
  { label: "Guides", to: "/guides" },
];

export function SiteNav() {
  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ mr: 4, fontWeight: 700 }}>
          Royrai UI Kit
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.to}
              component={RouterLink}
              to={item.to}
              color="inherit"
            >
              {item.label}
            </Button>
          ))}
          <Button
            component="a"
            href="/storybook"
            color="inherit"
            sx={{ fontWeight: 600 }}
          >
            Storybook
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
