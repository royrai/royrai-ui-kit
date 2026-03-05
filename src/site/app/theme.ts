import { createTheme } from "@mui/material/styles";

export const siteTheme = createTheme({
  palette: {
    primary: {
      main: "#0FA4A0",
      dark: "#0A7A77",
      light: "#4DBFBC",
    },
    secondary: {
      main: "#F7CE46",
      dark: "#D4A830",
      light: "#FBDF7A",
    },
  },
  typography: {
    fontFamily: "'Rubik', sans-serif",
  },
});
