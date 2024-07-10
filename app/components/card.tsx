import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Register } from "../lib/interfaces";
import { palette } from "../utils/colors";
import { verticalScale, horizontalScale, moderateScale } from "../utils/metrics";

interface CardProps {
  register: Register;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({ register, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={{ color: palette.accents_5, fontSize: moderateScale(18) }}>
        {register.month}
      </Text>
      <Text style={{ color: palette.accents_5, fontSize: moderateScale(18) }}>{register.read}</Text>
      <View style={{ width: horizontalScale(100) }}>
        <Text style={{ color: palette.accents_5, fontSize: moderateScale(18) }}>€</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.accents_1,
    borderRadius: moderateScale(10),
    padding: verticalScale(10),
    margin: verticalScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
