import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";

const COMPONENTS = [
  { name: "RrBox", sbPath: "controls-rrbox--default" },
  { name: "RrDataGrid", sbPath: "controls-rrdatagrid--default" },
  { name: "RrSocialIcons", sbPath: "controls-rrsocialicons--default" },
  { name: "RrTimeWheelPicker", sbPath: "controls-rrtimewheelpicker--default" },
  { name: "RrTimeWheelColumn", sbPath: "controls-rrtimewheelcolumn--default" },
  { name: "RrCopyright", sbPath: "controls-rrcopyright--default" },
  { name: "RoyraiCopyright", sbPath: "controls-royraicopyright--default" },
  { name: "RoyraiCredit", sbPath: "controls-royraicredit--default" },
];

export function ComponentsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Components
      </Typography>
      <Grid container spacing={3}>
        {COMPONENTS.map((comp) => (
          <Grid item xs={12} sm={6} md={4} key={comp.name}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{comp.name}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  component="a"
                  href={`/storybook/?path=/story/${comp.sbPath}`}
                >
                  View in Storybook
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
