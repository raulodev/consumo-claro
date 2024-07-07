import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, StyleSheet, Pressable, PressableProps, ViewStyle, View } from "react-native";

import { palette } from "../utils/colors";
interface ButtonProps extends PressableProps {
  title?: string;
  type?: "default" | "secondary" | "success" | "warning" | "error";
  icon?: "camera" | "close" | "backspace";
  style?: ViewStyle;
  circle?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = "default",
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
      {icon && <Ionicons name={icon} size={24} color={getTextTheme(themes, type)} />}

      {title && (
        <View style={styles.content}>
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
    color: palette.accents_7,
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
});

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "600",
    letterSpacing: 0.25,
  },

  button: {
    // align
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // padding
    paddingVertical: 12,
    paddingHorizontal: 32,
    // border
    borderRadius: 5,
    borderWidth: 0.5,
  },
  circle: {
    borderRadius: 70 / 2,
    width: 70,
    height: 70,
    // align
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.9,
  },
});
