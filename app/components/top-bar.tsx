import { Image } from "expo-image";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { palette } from "../utils/colors";
import { verticalScale, horizontalScale, moderateScale } from "../utils/metrics";

interface TopBarProps {
  count?: number;
}

export const TopBar: React.FC<TopBarProps> = ({ count = 0 }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../icon.png")} style={styles.logo} />
      <Text style={styles.text}>$ {count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.successLight,
    height: verticalScale(80),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(20),
  },
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: moderateScale(22),
  },
  logo: {
    width: horizontalScale(60),
    height: "100%",
  },
});
