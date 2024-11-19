import React from "react";
import { moderateScale } from "../utils/metrics";
import { StyleSheet, TextInput } from "react-native";
import { palette } from "../utils/colors";

interface InputProps {
  onGetValue: (value: number) => void;
  defaultValue?: string;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({ defaultValue, placeholder, onGetValue }) => {
  return (
    <TextInput
      keyboardType="numeric"
      cursorColor={palette.successLight}
      selectionColor={palette.successLight}
      placeholder={placeholder}
      style={styles.input}
      onChangeText={(text) => {
        if (!text) {
          onGetValue(0);
        } else {
          onGetValue(parseInt(text));
        }
      }}
      defaultValue={defaultValue}
      autoFocus
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
    flex: 1,
  },
});
