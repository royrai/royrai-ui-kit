import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const GUIDES = [
  {
    title: "How to Publish an npm Package",
    description: "Step-by-step guide for publishing @royrai/ui-kit to npm.",
    href: "/storybook/npm-publish-guide-20260304.html",
  },
];

export function GuidesPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Guides
      </Typography>
      <List>
        {GUIDES.map((guide) => (
          <ListItem key={guide.href} disablePadding>
            <ListItemButton component="a" href={guide.href}>
              <ListItemText
                primary={guide.title}
                secondary={guide.description}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
