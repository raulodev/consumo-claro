import React from "react";
import { moderateScale } from "../utils/metrics";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { palette } from "../utils/colors";

interface InputProps extends TextInputProps {
  onGetValue: (value: number) => void;
}

export const Input: React.FC<InputProps> = ({ onGetValue, style, ...prop }) => {
  return (
    <TextInput
      keyboardType="numeric"
      cursorColor={palette.successLight}
      selectionColor={palette.successLight}
      style={[styles.input, style]}
      onChangeText={(text) => {
        if (!text) {
          onGetValue(0);
        } else {
          onGetValue(parseInt(text));
        }
      }}
      autoFocus
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
