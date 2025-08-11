import { PixelRatio } from "react-native";

export const getLineHeight = (fontSize: number, lineHeight: number) => {
  return PixelRatio.roundToNearestPixel(fontSize * lineHeight);
};
