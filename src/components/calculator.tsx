import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { palette } from "../utils/colors";
import { calculateElectricityCost } from "../utils/tariff";

interface CalculatorProps {
  onClose: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onClose }) => {
  const [firstMeterCounter, setFirstMeterCounter] = useState<string>();
  const [secondMeterCounter, setSecondMeterCounter] = useState<string>();
  const [precie, setPrecie] = useState(0);

  useEffect(() => {
    const firstCounter = Number(firstMeterCounter);
    const secondCounter = Number(secondMeterCounter);

    if (firstMeterCounter && !secondMeterCounter) {
      setPrecie(calculateElectricityCost(firstCounter).cost);
    } else if (firstMeterCounter && secondMeterCounter) {
      if (secondCounter < firstCounter) {
        setPrecie(calculateElectricityCost(firstCounter - secondCounter).cost);
      } else {
        setPrecie(calculateElectricityCost(secondCounter - firstCounter).cost);
      }
    }
  }, [firstMeterCounter, secondMeterCounter]);

  return (
    <View style={styles.container}>
      <Label text={`$ ${precie.toString()}`} />

      <Input
        onGetValue={(value) => {
          setFirstMeterCounter(value ? value.toString() : "0");
        }}
        placeholder="Lectura 1 (o consumo en kwh)"
        autoFocus
      />

      <Input
        onGetValue={(value) => {
          setSecondMeterCounter(value ? value.toString() : "0");
        }}
        placeholder="Lectura 2"
      />

      <Button title="Cerrar" type="secondary" onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.background,
    gap: 20,
  },
});
