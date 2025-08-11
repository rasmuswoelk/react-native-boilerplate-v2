import { useMemo } from "react";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "./useTheme";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const useStyles = <T extends NamedStyles<T>>(
  createStyles: (props: { theme: Theme.AppTheme }) => T
) => {
  const { theme } = useTheme();
  return useMemo(
    () => StyleSheet.create(createStyles({ theme })),
    [theme, createStyles]
  );
};

export const createStyles = <T extends NamedStyles<T> | NamedStyles<any>>(
  stylesFn: (props: { theme: Theme.AppTheme }) => T & NamedStyles<any>
) => stylesFn;
