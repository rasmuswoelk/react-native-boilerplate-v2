import { ThemeProvider } from "@/lib/theme/providers/ThemeProvider";
import { theme } from "@/src/theme";
import { fontMapper, fonts } from "@/src/theme/fonts";
import { useFonts } from "@expo-google-fonts/source-sans-3/useFonts";
import { ReactNode } from "react";

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [loaded] = useFonts(fonts);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider fontMapper={fontMapper} theme={theme}>
      {children}
    </ThemeProvider>
  );
};
