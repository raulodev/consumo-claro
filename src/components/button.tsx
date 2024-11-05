import React from "react";
import { Text, StyleSheet, Pressable, PressableProps, ViewStyle, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "../utils/colors";
import { verticalScale, horizontalScale, moderateScale } from "../utils/metrics";

interface ButtonProps extends PressableProps {
  title?: string;
  type?:
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "successLighter"
    | "successLight";
  icon?:
    | "camera"
    | "close"
    | "backspace"
    | "settings"
    | "return-up-back"
    | "refresh-outline"
    | "flash"
    | "flash-off";
  iconSize?: number;
  style?: ViewStyle;
  circle?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = "default",
  iconSize = 24,
  style,
  icon,
  circle,
  ...props
}) => {
  const getTheme = (style: typeof themes, key: keyof typeof themes) => {
    return style[key] as ViewStyle;
  };

  const getTextTheme = (style: typeof themes, key: keyof typeof themes) => {
    return style[key].color;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        circle ? styles.circle : styles.button,
        getTheme(themes, type),
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
      {...props}>
      {icon && (
        <Ionicons
          style={[{ position: "absolute" }, !circle && { left: 20 }]}
          name={icon}
          size={iconSize}
          color={getTextTheme(themes, type)}
        />
      )}

      {title && (
        <View style={styles.textContent}>
          <Text style={[styles.text, { color: getTextTheme(themes, type) }]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
};

const themes = StyleSheet.create({
  default: {
    backgroundColor: palette.background,
    borderColor: palette.accents_3,
    color: palette.accents_5,
  },
  secondary: {
    backgroundColor: palette.foreground,
    borderColor: palette.foreground,
    color: palette.background,
  },
  success: {
    backgroundColor: palette.success,
    borderColor: palette.success,
    color: palette.background,
  },
  warning: {
    backgroundColor: palette.warning,
    borderColor: palette.warning,
    color: palette.background,
  },
  error: {
    backgroundColor: palette.error,
    borderColor: palette.error,
    color: palette.background,
  },
  successLighter: {
    backgroundColor: palette.successLighter,
    borderColor: palette.successLighter,
    color: palette.accents_7,
  },
  successLight: {
    backgroundColor: palette.successLight,
    borderColor: palette.successLight,
    color: palette.background,
  },
});

const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(15),
    lineHeight: moderateScale(21),
    fontWeight: "600",
    letterSpacing: 0.25,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(32),
    borderRadius: 5,
    borderWidth: 0.5,
    height: verticalScale(45),
  },
  circle: {
    borderRadius: 45 / 2,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  textContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.9,
  },
});
