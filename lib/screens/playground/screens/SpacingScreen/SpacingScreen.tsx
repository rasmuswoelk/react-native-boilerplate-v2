import { Box } from "@/lib/components/Box";
import { Container } from "@/lib/components/Container";
import { Typography } from "@/lib/components/Typography";
import { useTheme } from "@/lib/theme/hooks/useTheme";
import { ScrollView, View } from "react-native";

export const SpacingScreen = () => {
  const { theme } = useTheme();

  return (
    <ScrollView>
      <Container>
        <Box paddingBottom="lg">
          <Typography variant="body" fontWeight="black" marginBottom="sm">
            Spacing Values
          </Typography>
          {Object.entries(theme.spacing).map(([key, value]) => (
            <Box key={key} marginBottom="md">
              <Typography variant="caption" marginBottom="xs">
                {key}: {value}px
              </Typography>
              <View
                style={{
                  height: 20,
                  width: value,
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.borderRadius.xs,
                }}
              />
            </Box>
          ))}
        </Box>

        <Box paddingBottom="lg">
          <Typography variant="body" fontWeight="black" marginBottom="sm">
            Margin Examples
          </Typography>
          <Box
            style={{ backgroundColor: theme.colors.gray[200] }}
            padding="md"
            marginBottom="md"
          >
            <Typography variant="caption" marginBottom="xs">
              {`marginBottom="xs" (4px)`}
            </Typography>
            <Box
              style={{ backgroundColor: theme.colors.gray[200] }}
              padding="sm"
              marginBottom="xs"
            >
              <Typography variant="caption">Content</Typography>
            </Box>
            <Box
              style={{ backgroundColor: theme.colors.gray[200] }}
              padding="sm"
            >
              <Typography variant="caption">Content</Typography>
            </Box>
          </Box>

          <Box
            style={{ backgroundColor: theme.colors.gray[200] }}
            padding="md"
            marginBottom="md"
          >
            <Typography variant="caption" marginBottom="xs">
              {`marginBottom="sm" (8px)`}
            </Typography>
            <Box
              style={{ backgroundColor: theme.colors.gray[200] }}
              padding="sm"
              marginBottom="sm"
            >
              <Typography variant="caption">Content</Typography>
            </Box>
            <Box
              style={{ backgroundColor: theme.colors.gray[200] }}
              padding="sm"
            >
              <Typography variant="caption">Content</Typography>
            </Box>
          </Box>

          <Box
            style={{ backgroundColor: theme.colors.gray[200] }}
            padding="md"
            marginBottom="md"
          >
            <Typography variant="caption" marginBottom="xs">
              {`marginBottom="md" (16px)`}
            </Typography>
            <Box
              style={{ backgroundColor: theme.colors.gray[200] }}
              padding="sm"
              marginBottom="md"
            >
              <Typography variant="caption">Content</Typography>
            </Box>
            <Box
              style={{ backgroundColor: theme.colors.gray[200] }}
              padding="sm"
            >
              <Typography variant="caption">Content</Typography>
            </Box>
          </Box>

          <Box
            style={{ backgroundColor: theme.colors.gray[200] }}
            padding="md"
            marginBottom="md"
          >
            <Typography variant="caption" marginBottom="xs">
              {`marginBottom="lg" (24px)`}
            </Typography>
            <Box
              style={{ backgroundColor: theme.colors.gray[200] }}
              padding="sm"
              marginBottom="lg"
            >
              <Typography variant="caption">Content</Typography>
            </Box>
            <Box
              style={{ backgroundColor: theme.colors.gray[200] }}
              padding="sm"
            >
              <Typography variant="caption">Content</Typography>
            </Box>
          </Box>
        </Box>

        <Box paddingBottom="lg">
          <Typography variant="body" fontWeight="black" marginBottom="sm">
            Padding Examples
          </Typography>
          <Box
            style={{ backgroundColor: theme.colors.gray[200] }}
            marginBottom="md"
          >
            <Typography variant="caption">{`padding="xs" (4px)`}</Typography>
            <Box
              style={{ backgroundColor: theme.colors.gray[200] }}
              padding="xs"
            >
              <Typography variant="caption">Padded content</Typography>
            </Box>
          </Box>

          <Box
            style={{ backgroundColor: theme.colors.gray[200] }}
            marginBottom="md"
          >
            <Typography variant="caption">{`padding="sm" (8px)`}</Typography>
            <Box
              style={{ backgroundColor: theme.colors.gray[200] }}
              padding="sm"
            >
              <Typography variant="caption">Padded content</Typography>
            </Box>
          </Box>

          <Box
            style={{ backgroundColor: theme.colors.gray[200] }}
            marginBottom="md"
          >
            <Typography variant="caption">{`padding="md" (16px)`}</Typography>
            <Box
              style={{ backgroundColor: theme.colors.gray[200] }}
              padding="md"
            >
              <Typography variant="caption">Padded content</Typography>
            </Box>
          </Box>

          <Box
            style={{ backgroundColor: theme.colors.gray[200] }}
            marginBottom="md"
          >
            <Typography variant="caption">{`padding="lg" (24px)`}</Typography>
            <Box
              style={{ backgroundColor: theme.colors.gray[200] }}
              padding="lg"
            >
              <Typography variant="caption">Padded content</Typography>
            </Box>
          </Box>

          <Box
            style={{ backgroundColor: theme.colors.gray[200] }}
            marginBottom="md"
          >
            <Typography variant="caption">{`padding="xl" (32px)`}</Typography>
            <Box
              style={{ backgroundColor: theme.colors.gray[200] }}
              padding="xl"
            >
              <Typography variant="caption">Padded content</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </ScrollView>
  );
};
