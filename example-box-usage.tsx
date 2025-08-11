import { Box } from "@/lib/components/Box";
import { Typography } from "@/lib/components/Typography";

export default function ExampleBoxUsage() {
  return (
    <Box
      backgroundColor="background.secondary"
      borderRadius="md"
      padding="lg"
      margin="md"
    >
      <Typography variant="body1" color="text.primary">
        This is a Box with border radius!
      </Typography>

      <Box
        backgroundColor="primary.main"
        borderRadius="xl"
        padding="sm"
        marginTop="md"
      >
        <Typography variant="caption" color="primary.contrastText">
          Nested box with larger border radius
        </Typography>
      </Box>
    </Box>
  );
}
