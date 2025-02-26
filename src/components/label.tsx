import React from "react";
import { StyleSheet, Text } from "react-native";

import { palette } from "../utils/colors";

interface LabelProps {
  text: string;
}

export const Label: React.FC<LabelProps> = ({ text }) => {
  return <Text style={styles.label}>{text}</Text>;
};

const styles = StyleSheet.create({
  label: {
    color: palette.accents_7,
    fontSize: 18,
    fontWeight: "500",
  },
});
