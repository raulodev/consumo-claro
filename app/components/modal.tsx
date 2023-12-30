import React, { useState } from "react";
import { StyleSheet, Text, View, ViewProps, TextInput } from "react-native";
import { Button } from "./button";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";

interface NewReadModalProps extends ViewProps {
  setIsShow: (value: boolean) => void;
  isShow: boolean;
}

export const NewReadModal: React.FC<NewReadModalProps> = ({
  style,
  setIsShow,
  isShow,
  ...props
}) => {
  const [reading, setReading] = useState<string>("");

  return (
    <View
      style={[
        styles.overlay,
        style,
        {
          display: isShow ? "flex" : "none",
        },
      ]}
      {...props}
    >
      <View
        style={styles.touchClose}
        onTouchStart={() => setIsShow(false)}
      ></View>
      <View style={styles.modal}>
        <Text style={styles.label}>Lectura del Metrocontador</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setReading(text)}
          value={reading}
          cursorColor={"#424242"}
          selectionColor={"rgba(0,0,0,0.1)"}
          placeholder="Escribe aquí"
        />
        <Button title="OK" />
        <Button
          title="Cancelar"
          style={{ backgroundColor: "#424242" }}
          onPress={() => setIsShow(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.2)",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  modal: {
    height: "50%",
    backgroundColor: "#fff",
    padding: moderateScale(20),
    gap: moderateScale(20),
  },
  touchClose: {
    height: "50%",
  },
  input: {
    height: verticalScale(45),
    borderColor: "#757575",
    borderWidth: 0.5,
    borderRadius: moderateScale(5),
    color: "#757575",
    fontSize: moderateScale(18),
    paddingHorizontal: moderateScale(10),
  },
  label: {
    color: "#757575",
    fontSize: moderateScale(20),
    fontWeight: "600",
    textAlign: "center",
  },
});
