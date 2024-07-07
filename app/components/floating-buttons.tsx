import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Pressable, PressableProps, ViewStyle } from "react-native";

import { palette } from "../utils/colors";

interface FloatingButtonProps extends PressableProps {
  icon?: "add" | "calculator-sharp";
  style?: ViewStyle;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon = "add",
  style,
  ...props
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
      {...props}>
      <Ionicons name={icon} color="white" size={24} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: palette.successLight,
    borderRadius: 55 / 2,
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    position: "absolute",
  },
  pressed: {
    opacity: 0.9,
  },
});
