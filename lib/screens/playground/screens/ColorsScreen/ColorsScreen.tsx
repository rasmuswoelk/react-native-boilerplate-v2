import { Box, BoxProps } from "@/lib/components/Box";
import { Container } from "@/lib/components/Container";
import { Stack } from "@/lib/components/Stack";
import { Typography } from "@/lib/components/Typography";
import { createStyles, useStyles } from "@/lib/theme/hooks/useStyles";
import { useTheme } from "@/lib/theme/hooks/useTheme";
import { FC, ReactNode } from "react";
import { ScrollView } from "react-native";

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

const ColorSwatch: FC<{
  color: string;
  name: string;
  showBorder?: boolean;
}> = ({ color, name, showBorder = false }) => {
  const styles = useStyles(stylesDefinition);

  return (
    <Box style={styles.colorSwatchContainer}>
      <Box
        style={[
          styles.colorSwatch,
          { backgroundColor: color },
          showBorder && styles.colorSwatchBorder,
        ]}
      />
      <Typography variant="caption" style={styles.colorName} numberOfLines={1}>
        {name}
      </Typography>
      <Typography variant="caption" style={styles.colorValue} numberOfLines={1}>
        {color}
      </Typography>
    </Box>
  );
};

export const ColorsScreen = () => {
  const { theme } = useTheme();

  // Helper function to check if a color is light (to determine if we need a border)
  const isLightColor = (color: string): boolean => {
    // Simple check for white/light colors that need a border
    return color === "#fff" || color === "#ffffff" || color.includes("f5f5f5");
  };

  // Separate single colors from color palettes
  const singleColors = {
    ground: theme.colors.ground,
    figure: theme.colors.figure,
    white: theme.colors.white,
    black: theme.colors.black,
  };

  const colorPalettes = {
    brand: theme.colors.brand,
    red: theme.colors.red,
    green: theme.colors.green,
    gray: theme.colors.gray,
  };

  return (
    <ScrollView>
      <Container paddingBottom="lg">
        <Stack direction="vertical" gap="md">
          <Card title="Base Colors">
            <Stack direction="horizontal" gap="md" style={{ flexWrap: "wrap" }}>
              {Object.entries(singleColors).map(([name, color]) => (
                <ColorSwatch
                  key={name}
                  color={color}
                  name={name}
                  showBorder={isLightColor(color)}
                />
              ))}
            </Stack>
          </Card>

          {Object.entries(colorPalettes).map(([paletteName, palette]) => (
            <Card
              key={paletteName}
              title={`${
                paletteName.charAt(0).toUpperCase() + paletteName.slice(1)
              } Palette`}
            >
              <Stack
                direction="horizontal"
                gap="sm"
                style={{ flexWrap: "wrap" }}
              >
                {Object.entries(palette).map(([shade, color]) => (
                  <ColorSwatch
                    key={`${paletteName}-${shade}`}
                    color={color}
                    name={`${paletteName} ${shade}`}
                    showBorder={isLightColor(color)}
                  />
                ))}
              </Stack>
            </Card>
          ))}
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
  colorSwatchContainer: {
    alignItems: "center",
    minWidth: 80,
    marginBottom: theme.spacing.sm,
  },
  colorSwatch: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xs,
  },
  colorSwatchBorder: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
  },
  colorName: {
    textAlign: "center",
    color: theme.colors.gray[700],
    fontWeight: "600",
    fontSize: 12,
  },
  colorValue: {
    textAlign: "center",
    color: theme.colors.gray[500],
    fontSize: 10,
  },
}));
