import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Pressable, PressableProps, ViewStyle } from "react-native";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";
import { palette } from "../utils/colors";

interface FloatingButtonProps extends PressableProps {
  icon?: "add" | "calculator" | "trash" | "pencil";
  iconColor?: string;
  animate?: boolean;
  style?: ViewStyle;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon = "add",
  style,
  iconColor,
  animate,
  ...props
}) => {
  return (
    <Animated.View
      entering={animate ? FadeInRight.delay(200) : undefined}
      exiting={animate ? FadeOutRight : undefined}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
        {...props}>
        <Ionicons name={icon} color={iconColor || palette.accents_7} size={28} />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: palette.successLighter,
    borderRadius: 55 / 2,
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  pressed: {
    opacity: 0.9,
  },
});
