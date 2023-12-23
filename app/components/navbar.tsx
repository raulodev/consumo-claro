import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

interface NavBarProps {
  screen: "main" | "calculator" | "settings";
}

export const NavBar: React.FC<NavBarProps> = ({ screen }) => {
  const icon_size = 20;
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
            name="home"
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#59adff",
    borderRadius: 5,
  },

  btn_active: {
    padding: 5,
    backgroundColor: "white",
    borderRadius: 5,
  },
  btn: {
    padding: 5,
    borderRadius: 5,
  },
});
