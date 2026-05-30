import { useFonts } from '@expo-google-fonts/source-sans-3/useFonts';
import { ReactNode } from 'react';
import { fonts } from '@/src/theme/fonts';

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [loaded] = useFonts(fonts);

  if (!loaded) {
    return null;
  }

  return <>{children}</>;
};
