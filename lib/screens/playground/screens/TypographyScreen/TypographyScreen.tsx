import { Box, BoxProps } from "@/lib/components/Box";
import { Container } from "@/lib/components/Container";
import { Stack } from "@/lib/components/Stack";
import { Typography } from "@/lib/components/Typography";
import { createStyles, useStyles } from "@/lib/theme/hooks/useStyles";
import { useTheme } from "@/lib/theme/hooks/useTheme";
import { getLineHeight } from "@/lib/theme/utils/getLineHeight";
import { FC, ReactNode } from "react";
import { ScrollView } from "react-native";

const MAP_VARIANT_TO_TEXT = {
  paragraph:
    "Paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

const Card: FC<BoxProps & { title?: ReactNode }> = ({
  title,
  children,
  ...props
}) => {
  const styles = useStyles(stylesDefinition);

  return (
    <Box style={styles.card} {...props}>
      {title ? (
        <Typography
          style={styles.cardTitle}
          variant="body"
          fontWeight="black"
          marginBottom="md"
        >
          {title}
        </Typography>
      ) : null}
      {children}
    </Box>
  );
};

export const TypographyScreen = () => {
  const { theme } = useTheme();

  return (
    <ScrollView>
      <Container paddingBottom="lg">
        <Stack direction="vertical" gap="md">
          <Card title="Variants">
            {Object.entries(theme.typography.variant).map(([key]) => (
              <Typography
                key={key}
                variant={key as keyof typeof theme.typography.variant}
                marginBottom="sm"
              >
                {MAP_VARIANT_TO_TEXT[key as keyof typeof MAP_VARIANT_TO_TEXT] ||
                  key}
              </Typography>
            ))}
          </Card>
          <Card title="Font sizes">
            <Stack>
              {Object.entries(theme.typography.fontSize).map(([key, value]) => (
                <Typography
                  key={key}
                  style={{
                    fontSize: value,
                    lineHeight: getLineHeight(
                      value,
                      theme.typography.lineHeight.md
                    ),
                  }}
                >
                  {key} ({value})
                </Typography>
              ))}
            </Stack>
          </Card>
          <Card title="Font weights">
            <Stack direction="vertical" gap="md">
              {Object.entries(theme.typography.fontWeight).map(
                ([key, value]) => (
                  <Typography
                    key={key}
                    variant="body"
                    fontWeight={key as keyof typeof theme.typography.fontWeight}
                  >
                    {key} ({value})
                  </Typography>
                )
              )}
            </Stack>
          </Card>
        </Stack>
      </Container>
    </ScrollView>
  );
};

const stylesDefinition = createStyles(({ theme }) => ({
  card: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.md,
  },
  cardTitle: {
    color: theme.colors.gray[600],
  },
}));
