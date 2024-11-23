import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

import { palette } from "../utils/colors";
import { moderateScale } from "../utils/metrics";

interface InputProps extends TextInputProps {
  onGetValue: (value: number | undefined) => void;
}

export const Input: React.FC<InputProps> = ({ onGetValue, style, ...prop }) => {
  return (
    <TextInput
      keyboardType="numeric"
      cursorColor={palette.successLight}
      selectionColor={palette.successLight}
      style={[styles.input, style]}
      onChangeText={(text) => {
        onGetValue(text ? parseInt(text, 10) : undefined);
      }}
      {...prop}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: moderateScale(18),
    borderWidth: 0.25,
    borderColor: palette.accents_5,
    borderRadius: moderateScale(5),
    padding: moderateScale(8),
    width: "100%",
  },
});
