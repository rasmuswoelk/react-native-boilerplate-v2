import type { AppTheme } from '@/src/unistyles';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? ObjectType[Key] extends string
      ? `${Key}`
      : `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type ColorPath = NestedKeyOf<AppTheme['colors']>;

export const getColorFromPath = (colors: any, path: string): string => {
  const keys = path.split('.');
  let current: any = colors;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      throw new Error(`Color path "${path}" not found in theme colors`);
    }
  }

  if (typeof current !== 'string') {
    throw new Error(`Color path "${path}" does not resolve to a color string`);
  }

  return current;
};

export type BorderRadiusPath = keyof AppTheme['borderRadius'];

export const getBorderRadiusFromPath = (
  borderRadius: AppTheme['borderRadius'],
  path: BorderRadiusPath,
): number => {
  const value = borderRadius[path];

  if (typeof value !== 'number') {
    throw new Error(`Border radius path "${path}" does not resolve to a number`);
  }

  return value;
};
