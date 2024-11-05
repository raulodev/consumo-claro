import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import { palette } from "../utils/colors";
import { verticalScale, moderateScale, horizontalScale } from "../utils/metrics";

interface TopBarProps {
  count?: number;
  rightAction?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ count = 0, rightAction }) => {
  const [fontSize, setFontSize] = useState<number>(moderateScale(22));

  useEffect(() => {
    if (count.toString().length > 10) setFontSize(moderateScale(20));
  }, [fontSize, count]);

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={[styles.text, { fontSize: fontSize }]}>$ {count}</Text>
      </View>
      <View style={styles.subcontainer} onTouchStart={rightAction}>
        <Ionicons name="refresh-outline" size={24} color={palette.background} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(80),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
    marginHorizontal: horizontalScale(10),
  },
  text: {
    color: palette.background,
    fontWeight: "500",
  },
  subcontainer: {
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "black",
  },
});
