import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

import { palette } from "../utils/colors";

interface AlertProps {
  open?: boolean;
  message: string;
  onClose: () => void;
}

export const Alert: React.FC<AlertProps> = ({ open = false, message, onClose }) => {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 5000);
  }, [open]);

  if (open)
    return (
      <View style={styles.container}>
        <Animated.View entering={FadeInUp} exiting={FadeOutUp} style={styles.subContainer}>
          <Ionicons name="alert-circle" color={palette.background} size={20} />
          <Text style={{ color: palette.background, textAlign: "center" }}>{message}</Text>
        </Animated.View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    marginTop: 50,
    zIndex: 100,
  },
  subContainer: {
    backgroundColor: palette.foreground,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    width: "60%",
    alignItems: "center",
  },
});
