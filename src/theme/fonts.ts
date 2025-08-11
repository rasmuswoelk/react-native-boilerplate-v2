import { SourceSans3_200ExtraLight } from "@expo-google-fonts/source-sans-3/200ExtraLight";
import { SourceSans3_300Light } from "@expo-google-fonts/source-sans-3/300Light";
import { SourceSans3_400Regular } from "@expo-google-fonts/source-sans-3/400Regular";
import { SourceSans3_500Medium } from "@expo-google-fonts/source-sans-3/500Medium";
import { SourceSans3_600SemiBold } from "@expo-google-fonts/source-sans-3/600SemiBold";
import { SourceSans3_700Bold } from "@expo-google-fonts/source-sans-3/700Bold";
import { SourceSans3_800ExtraBold } from "@expo-google-fonts/source-sans-3/800ExtraBold";
import { SourceSans3_900Black } from "@expo-google-fonts/source-sans-3/900Black";
import { SourceSans3_200ExtraLight_Italic } from "@expo-google-fonts/source-sans-3/200ExtraLight_Italic";
import { SourceSans3_300Light_Italic } from "@expo-google-fonts/source-sans-3/300Light_Italic";
import { SourceSans3_400Regular_Italic } from "@expo-google-fonts/source-sans-3/400Regular_Italic";
import { SourceSans3_500Medium_Italic } from "@expo-google-fonts/source-sans-3/500Medium_Italic";
import { SourceSans3_600SemiBold_Italic } from "@expo-google-fonts/source-sans-3/600SemiBold_Italic";
import { SourceSans3_700Bold_Italic } from "@expo-google-fonts/source-sans-3/700Bold_Italic";
import { SourceSans3_800ExtraBold_Italic } from "@expo-google-fonts/source-sans-3/800ExtraBold_Italic";
import { SourceSans3_900Black_Italic } from "@expo-google-fonts/source-sans-3/900Black_Italic";

export const fonts = {
  SourceSans3_200ExtraLight,
  SourceSans3_300Light,
  SourceSans3_400Regular,
  SourceSans3_500Medium,
  SourceSans3_600SemiBold,
  SourceSans3_700Bold,
  SourceSans3_800ExtraBold,
  SourceSans3_900Black,
  SourceSans3_200ExtraLight_Italic,
  SourceSans3_300Light_Italic,
  SourceSans3_400Regular_Italic,
  SourceSans3_500Medium_Italic,
  SourceSans3_600SemiBold_Italic,
  SourceSans3_700Bold_Italic,
  SourceSans3_800ExtraBold_Italic,
  SourceSans3_900Black_Italic,
};

export type AvailableFontKeysType = keyof typeof fonts;

export const availableFontKeys = Object.keys(fonts).reduce((acc, key) => {
  acc[key as AvailableFontKeysType] = key as AvailableFontKeysType;
  return acc;
}, {} as Record<AvailableFontKeysType, AvailableFontKeysType>);

export const fontMapper: Record<
  string,
  Record<string, Record<string, AvailableFontKeysType>>
> = {
  primary: {
    light: {
      normal: availableFontKeys.SourceSans3_300Light,
      italic: availableFontKeys.SourceSans3_300Light_Italic,
    },
    regular: {
      normal: availableFontKeys.SourceSans3_400Regular,
      italic: availableFontKeys.SourceSans3_400Regular_Italic,
    },
    medium: {
      normal: availableFontKeys.SourceSans3_500Medium,
      italic: availableFontKeys.SourceSans3_500Medium_Italic,
    },
    bold: {
      normal: availableFontKeys.SourceSans3_600SemiBold,
      italic: availableFontKeys.SourceSans3_600SemiBold_Italic,
    },
    black: {
      normal: availableFontKeys.SourceSans3_900Black,
      italic: availableFontKeys.SourceSans3_900Black_Italic,
    },
  },
} as const;
