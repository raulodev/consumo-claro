import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Vibration } from "react-native";

import { palette } from "../utils/colors";

interface TopBarProps {
  count?: number;
  rightAction: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ count = 0, rightAction }) => {
  const [fontSize, setFontSize] = useState<number>(22);

  useEffect(() => {
    if (count.toString().length > 10) setFontSize(20);
  }, [fontSize, count]);

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={[styles.text, { fontSize }]}>$ {count}</Text>
      </View>
      <View
        style={styles.subcontainer}
        onTouchStart={() => {
          rightAction();
          Vibration.vibrate(50);
        }}>
        <Ionicons name="refresh-outline" size={24} color={palette.background} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 10,
  },
  text: {
    color: palette.background,
    fontWeight: "500",
  },
  subcontainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
