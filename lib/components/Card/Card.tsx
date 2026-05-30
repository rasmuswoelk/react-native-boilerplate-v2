import { FC, ReactNode } from 'react';
import { Box, BoxProps } from '@/lib/components/Box';
import { Typography } from '@/lib/components/Typography';

export type CardProps = BoxProps & {
  title?: ReactNode;
};

export const Card: FC<CardProps> = ({ title, children, ...props }) => {
  return (
    <Box backgroundColor="ground" padding="md" borderRadius="sm" {...props}>
      {title ? (
        <Typography variant="body" fontWeight="black" marginBottom="md" color="text">
          {title}
        </Typography>
      ) : null}
      {children}
    </Box>
  );
};
