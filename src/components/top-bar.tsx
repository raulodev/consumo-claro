import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { palette } from "../utils/colors";
import { verticalScale, moderateScale } from "../utils/metrics";

interface TopBarProps {
  count?: number;
}

export const TopBar: React.FC<TopBarProps> = ({ count = 0 }) => {
  return (
    <View style={styles.container}>
      {/* <MaterialIcons
        name="settings"
        size={20}
        color={palette.background}
        style={{ position: "absolute", left: 20 }}
      /> */}
      <Text style={styles.text}>{count} $</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(80),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(20),
  },
  text: {
    color: palette.background,
    fontWeight: "500",
    fontSize: moderateScale(25),
  },
});
