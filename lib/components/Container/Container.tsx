import { Box, BoxProps } from "@/lib/components/Box";

export type ContainerProps = BoxProps;

export const Container = ({ children, ...props }: ContainerProps) => {
  return (
    <Box gutter {...props}>
      {children}
    </Box>
  );
};
