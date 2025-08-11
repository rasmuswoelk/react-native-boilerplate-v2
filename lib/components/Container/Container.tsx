import { Box, BoxProps } from "@/lib/components/Box";
import { SpacingKeyType } from "@/lib/theme/variables/spacing";
import { useMemo } from "react";

export type ContainerProps = BoxProps & {
  gutter?: SpacingKeyType | boolean;
};

export const Container = ({
  children,
  gutter = true,
  ...props
}: ContainerProps) => {
  const gutterValue = useMemo(() => {
    if (typeof gutter === "boolean") {
      return gutter ? "gutter" : undefined;
    }

    return gutter;
  }, [gutter]);

  return (
    <Box paddingHorizontal={gutterValue} {...props}>
      {children}
    </Box>
  );
};
