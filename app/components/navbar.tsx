import React from "react";
import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";

interface NavBarProps {
  screen: "main" | "calculator" | "settings";
}

export const NavBar: React.FC<NavBarProps> = ({ screen }) => {
  const icon_size = moderateScale(20);
  const icon_color_active = styles.container.backgroundColor;
  const icon_color = "white";

  return (
    <View style={styles.container}>
      <View>
        <Link
          href="/"
          style={screen === "main" ? styles.btn_active : styles.btn}
        >
          <Ionicons
            name="analytics"
            size={icon_size}
            color={screen === "main" ? icon_color_active : icon_color}
          />
        </Link>
      </View>
      <View>
        <Link
          href="/calculator"
          style={screen === "calculator" ? styles.btn_active : styles.btn}
        >
          <Ionicons
            name="calculator"
            size={icon_size}
            color={screen === "calculator" ? icon_color_active : icon_color}
          />
        </Link>
      </View>
      <View>
        <Link
          href="/settings"
          style={screen === "settings" ? styles.btn_active : styles.btn}
        >
          <Ionicons
            name="settings"
            size={icon_size}
            color={screen === "settings" ? icon_color_active : icon_color}
          />
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(30),
    paddingVertical: verticalScale(10),
    backgroundColor: "#59adff",
  },

  btn_active: {
    padding: moderateScale(5),
    backgroundColor: "white",
    borderRadius: moderateScale(5),
  },
  btn: {
    padding: moderateScale(5),
    borderRadius: moderateScale(5),
  },
});
