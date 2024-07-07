import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

import { Button } from "./components/button";
import { calculatePrecie } from "./utils/calculate-precie";
import { palette } from "./utils/colors";
import { horizontalScale, moderateScale, verticalScale } from "./utils/metrics";

interface CalculatorProps {
  onClose?: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onClose }) => {
  const [kwh, setKwhs] = useState("0");
  const [precie, setPrecie] = useState(0);

  const reset = () => {
    setKwhs("0");
    setPrecie(0);
  };

  const handlerClick = (value: string) => {
    let newKwh = "";
    if (kwh === "0") {
      newKwh = value;
      setKwhs(newKwh);
      getToPay(newKwh);
    } else if (kwh.length < 9) {
      newKwh = kwh + value;
      setKwhs(newKwh);
      getToPay(newKwh);
    }
  };

  const clear = () => {
    if (kwh.length > 0) {
      const newKwh = kwh.slice(0, -1);

      if (newKwh === "") {
        setKwhs("0");
        setPrecie(0);
      } else {
        setKwhs(newKwh);
        getToPay(newKwh);
      }
    }
  };

  const getToPay = (newKwh: string) => {
    if (newKwh !== "0") setPrecie(calculatePrecie(newKwh));
  };
  return (
    <Animated.View style={[styles.container]} entering={FadeInUp} exiting={FadeOutUp}>
      <Ionicons name="close" size={24} onPress={onClose} />
      <View
        style={{
          alignItems: "center",
        }}>
        <Text
          style={{
            color: "#757575",
            fontSize: moderateScale(24),
            fontWeight: "600",
          }}>
          kwh
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
        }}>
        <Text style={styles.first_text}>{kwh}</Text>
      </View>
      <View
        style={{
          alignItems: "flex-start",
        }}>
        <Text style={styles.first_text}>$ {precie}</Text>
      </View>
      <View style={{ paddingVertical: verticalScale(20) }}>
        <View style={styles.row_btns}>
          <Button circle title="1" type="success" onPress={() => handlerClick("1")} />
          <Button circle title="2" type="success" onPress={() => handlerClick("2")} />
          <Button circle title="3" type="success" onPress={() => handlerClick("3")} />
        </View>
        <View style={styles.row_btns}>
          <Button circle title="4" type="success" onPress={() => handlerClick("4")} />
          <Button circle title="5" type="success" onPress={() => handlerClick("5")} />
          <Button circle title="6" type="success" onPress={() => handlerClick("6")} />
        </View>
        <View style={styles.row_btns}>
          <Button circle title="7" type="success" onPress={() => handlerClick("7")} />
          <Button circle title="8" type="success" onPress={() => handlerClick("8")} />
          <Button circle title="9" type="success" onPress={() => handlerClick("9")} />
        </View>
        <View style={styles.row_btns}>
          <Button
            circle
            title="."
            type="success"
            onPress={() => {
              if (!kwh.includes(".") && kwh.length < 8) setKwhs(kwh + ".");
            }}
          />
          <Button circle title="0" type="success" onPress={() => handlerClick("0")} />
          <Button circle type="warning" icon="backspace" onPress={clear} onLongPress={reset} />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.accents_1,
    padding: 10,
    justifyContent: "space-between",
  },

  row_btns: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    gap: moderateScale(30),
    marginTop: verticalScale(35),
  },
  first_text: {
    color: palette.accents_5,
    fontSize: moderateScale(40),
    fontWeight: "700",
    paddingHorizontal: horizontalScale(10),
    textAlign: "center",
  },
});
