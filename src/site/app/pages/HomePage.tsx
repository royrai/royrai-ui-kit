import { Container, Typography, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Royrai UI Kit
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Reusable React/TypeScript UI components built on MUI
        with bilingual (Hebrew/English) support.
      </Typography>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/components"
        >
          Browse Components
        </Button>
        <Button
          variant="outlined"
          size="large"
          component="a"
          href="/storybook"
        >
          Open Storybook
        </Button>
      </Box>
    </Container>
  );
}
