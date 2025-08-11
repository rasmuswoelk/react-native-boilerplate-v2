import { createContext, ReactNode, useMemo } from "react";

export type ThemeContextType = {
  theme: Theme.AppTheme;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export type ThemeProviderProps = {
  children: ReactNode;
  theme: Theme.AppTheme;
};

export const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {
  const contextValue = useMemo(
    () => ({
      theme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
