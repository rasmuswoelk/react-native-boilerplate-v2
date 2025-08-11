// Utility type to create dot notation paths for nested objects
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? ObjectType[Key] extends string
      ? `${Key}`
      : `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

// Generate dot-notated color paths from theme colors
export type ColorPath = NestedKeyOf<Theme.AppTheme["colors"]>;

// Utility function to get color value from dot-notated path
export const getColorFromPath = (colors: any, path: string): string => {
  const keys = path.split(".");
  let current: any = colors;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      throw new Error(`Color path "${path}" not found in theme colors`);
    }
  }

  if (typeof current !== "string") {
    throw new Error(`Color path "${path}" does not resolve to a color string`);
  }

  return current;
};

// Border radius types and utilities
export type BorderRadiusPath = keyof Theme.AppTheme["borderRadius"];

// Utility function to get border radius value from theme
export const getBorderRadiusFromPath = (
  borderRadius: Theme.AppTheme["borderRadius"],
  path: BorderRadiusPath
): number => {
  const value = borderRadius[path];

  if (typeof value !== "number") {
    throw new Error(
      `Border radius path "${path}" does not resolve to a number`
    );
  }

  return value;
};
