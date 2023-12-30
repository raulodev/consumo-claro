import React, { useState } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";

interface NewReadModalProps extends ViewProps {
  setIsShow: (value: boolean) => void;
  isShow: boolean;
}

export const NewReadModal: React.FC<NewReadModalProps> = ({
  style,
  setIsShow,
  isShow,
  ...props
}) => {
  return (
    <View
      style={[
        styles.overlay,
        style,
        {
          display: isShow ? "flex" : "none",
        },
      ]}
      {...props}
    >
      <View
        style={styles.touchClose}
        onTouchStart={() => setIsShow(false)}
      ></View>
      <View style={styles.modal}></View>
    </View>
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
    height: "50%",
    backgroundColor: "#fff",
  },
  touchClose: {
    height: "50%",
  },
});
