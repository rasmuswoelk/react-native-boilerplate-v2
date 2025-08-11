import { ThemeProvider } from "@/lib/theme/providers/ThemeProvider";
import { theme } from "@/src/theme";
import { useFonts } from "expo-font";
import { ReactNode } from "react";

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
