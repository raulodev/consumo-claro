import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

import { palette } from "../utils/colors";

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
    fontSize: 18,
    borderWidth: 0.25,
    borderColor: palette.accents_5,
    borderRadius: 5,
    padding: 8,
    width: "100%",
  },
});
