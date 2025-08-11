import { createContext, ReactNode, useMemo } from "react";

export type ThemeContextType = {
  theme: Theme.AppTheme;
  fontMapper: Record<string, Record<string, Record<string, string>>>;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export type ThemeProviderProps = {
  children: ReactNode;
  theme: Theme.AppTheme;
  fontMapper: ThemeContextType["fontMapper"];
};

export const ThemeProvider = ({
  children,
  theme,
  fontMapper,
}: ThemeProviderProps) => {
  const contextValue = useMemo(
    () => ({
      theme,
      fontMapper,
    }),
    [theme, fontMapper]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
