import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import Animated, { SlideInDown, SlideOutDown, FadeIn, FadeOut } from "react-native-reanimated";

import { palette } from "../utils/colors";
import { moderateScale, verticalScale } from "../utils/metrics";

interface ModalProps extends ViewProps {
  open: boolean;
  onAction: () => void;
}

export const Modal: React.FC<ModalProps> = ({ open = false, onAction, ...props }) => {
  if (open)
    return (
      <Animated.View style={styles.overlay} entering={FadeIn} exiting={FadeOut}>
        <Animated.View entering={SlideInDown} exiting={SlideOutDown} style={styles.container}>
          <View style={{ flex: 1 }} onTouchStart={onAction} />
          <View style={styles.modal} {...props}></View>
        </Animated.View>
      </Animated.View>
    );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.1)",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: palette.background,
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    padding: moderateScale(10),
    paddingBottom: verticalScale(40),
  },
});
