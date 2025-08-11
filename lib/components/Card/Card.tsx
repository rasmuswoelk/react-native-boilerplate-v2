import { Box, BoxProps } from "@/lib/components/Box";
import { Typography } from "@/lib/components/Typography";
import { FC, ReactNode } from "react";

export type CardProps = BoxProps & {
  title?: ReactNode;
};

export const Card: FC<CardProps> = ({ title, children, ...props }) => {
  return (
    <Box {...props} backgroundColor="gray.200" padding="md" borderRadius="sm">
      {title ? (
        <Typography
          variant="body"
          fontWeight="black"
          marginBottom="md"
          color="gray.700"
        >
          {title}
        </Typography>
      ) : null}
      {children}
    </Box>
  );
};
