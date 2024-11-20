import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

import { palette } from "../utils/colors";
import { horizontalScale, verticalScale } from "../utils/metrics";

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
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          alignItems: "center",
          marginTop: verticalScale(50),
          zIndex: 100,
        }}>
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutUp}
          style={{
            backgroundColor: palette.foreground,

            paddingHorizontal: horizontalScale(20),
            paddingVertical: verticalScale(8),
            borderRadius: 5,
            width: "60%",
            alignItems: "center",
          }}>
          <Ionicons name="alert-circle" color={palette.background} size={20} />
          <Text style={{ color: palette.background, textAlign: "center" }}>{message}</Text>
        </Animated.View>
      </View>
    );
};
