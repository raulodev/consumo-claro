import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import { Button } from "./button";
import { palette } from "../utils/colors";
import { horizontalScale, moderateScale, verticalScale } from "../utils/metrics";
import { calculateElectricityCost } from "../utils/tariff";

interface CalculatorProp {
  onClose: () => void;
}

export const Calculator: React.FC<CalculatorProp> = ({ onClose }) => {
  const [firstMeterCounter, setFirstMeterCounter] = useState<string>();
  const [secondMeterCounter, setSecondMeterCounter] = useState<string>();
  const [precie, setPrecie] = useState(0);

  useEffect(() => {
    const firstCounter = Number(firstMeterCounter);
    const secondCounter = Number(secondMeterCounter);

    if (firstMeterCounter && !secondMeterCounter) {
      setPrecie(calculateElectricityCost(firstCounter));
    } else if (firstMeterCounter && secondMeterCounter) {
      if (secondCounter < firstCounter) {
        setPrecie(calculateElectricityCost(firstCounter - secondCounter));
      } else {
        setPrecie(calculateElectricityCost(secondCounter - firstCounter));
      }
    }
  }, [firstMeterCounter, secondMeterCounter]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>$ {precie}</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        cursorColor={palette.successLight}
        selectionColor={palette.successLight}
        placeholder="Lectura 1 (o consumo en kwh)"
        autoFocus
        onChangeText={(text) => setFirstMeterCounter(text)}
        value={firstMeterCounter}
      />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        cursorColor={palette.successLight}
        selectionColor={palette.successLight}
        placeholder="Lectura 2"
        onChangeText={(text) => setSecondMeterCounter(text)}
        value={secondMeterCounter}
      />

      <Button title="Cerrar" type="secondary" onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    paddingHorizontal: horizontalScale(15),
    gap: moderateScale(20),
    marginTop: verticalScale(20),
  },
  input: {
    fontSize: moderateScale(18),
    borderWidth: 0.25,
    borderColor: palette.accents_5,
    borderRadius: moderateScale(5),
    padding: moderateScale(8),
  },
  text: {
    color: palette.accents_7,
    fontSize: moderateScale(20),
    fontWeight: "600",
  },
});
