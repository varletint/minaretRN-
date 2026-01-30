import { Text as RNText, TextProps, StyleSheet } from "react-native";
import { FONTS } from "../../lib/theme";

interface CustomTextProps extends TextProps {
  variant?: "heading" | "body";
  weight?: "regular" | "medium" | "semibold" | "bold";
}

/**
 * Custom Text component that applies the app's default fonts.
 * Use this instead of the default React Native Text.
 *
 * @example
 * <Text>Body text with Inter</Text>
 * <Text variant="heading">Heading with Outfit</Text>
 * <Text weight="bold">Bold text</Text>
 */
export function Text({
  style,
  variant = "body",
  weight = "regular",
  children,
  ...props
}: CustomTextProps) {
  const getFontFamily = () => {
    if (variant === "heading") {
      switch (weight) {
        case "bold":
          return FONTS.heading;
        case "semibold":
          return FONTS.headingSemiBold;
        case "medium":
          return FONTS.headingMedium;
        default:
          return FONTS.headingRegular;
      }
    } else {
      switch (weight) {
        case "bold":
          return FONTS.bodyBold;
        case "semibold":
          return FONTS.bodySemiBold;
        case "medium":
          return FONTS.bodyMedium;
        default:
          return FONTS.body;
      }
    }
  };

  return (
    <RNText style={[{ fontFamily: getFontFamily() }, style]} {...props}>
      {children}
    </RNText>
  );
}

export default Text;
