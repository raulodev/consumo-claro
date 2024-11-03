import React from "react";
import Animated, { SlideInDown, SlideOutDown, FadeIn, FadeOut } from "react-native-reanimated";
import { StyleSheet, View, ViewProps } from "react-native";
import { palette } from "../utils/colors";
import { moderateScale } from "../utils/metrics";

interface ModalProps extends ViewProps {
  open: boolean;
  onAction: () => void;
}

export const Modal: React.FC<ModalProps> = ({ open = false, onAction, ...props }) => {
  if (open)
    return (
      <Animated.View style={styles.overlay} entering={FadeIn} exiting={FadeOut}>
        <Animated.View entering={SlideInDown} exiting={SlideOutDown}>
          <View style={styles.touchClose} onTouchStart={onAction}></View>
          <View style={styles.modal} {...props}></View>
        </Animated.View>
      </Animated.View>
    );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.2)",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },

  modal: {
    height: "70%",
    backgroundColor: palette.accents_2,
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
  },
  touchClose: {
    height: "30%",
  },
});
