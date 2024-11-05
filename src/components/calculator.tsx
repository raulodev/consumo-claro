import React, { useState } from "react";
import { StyleSheet, Text, View, Vibration } from "react-native";

import { Button } from "./button";
import { palette } from "../utils/colors";
import { moderateScale, verticalScale } from "../utils/metrics";
import { calculateElectricityCost } from "../utils/tariff";

const style = {
  borderRadius: 60 / 2,
  width: 60,
  height: 60,
};

export default function Calculator() {
  const [kwh, setKwhs] = useState("0");
  const [precie, setPrecie] = useState(0);

  const getCost = (newKwh: string) => {
    if (newKwh !== "0") setPrecie(calculateElectricityCost(Number(newKwh)));
  };

  const handlerClick = (value: string) => {
    let newKwh = "";
    if (kwh === "0") {
      newKwh = value;
      setKwhs(newKwh);
      getCost(newKwh);
    } else if (kwh.length < 15) {
      newKwh = kwh + value;
      setKwhs(newKwh);
      getCost(newKwh);
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
        getCost(newKwh);
      }
    }
  };

  const reset = () => {
    setKwhs("0");
    setPrecie(0);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: palette.accents_7,
          fontSize: moderateScale(20),
        }}>
        {kwh} kwh
      </Text>
      <Text
        style={{
          color: palette.accents_7,
          fontSize: moderateScale(28),
          fontWeight: 600,
        }}>
        {precie} $
      </Text>

      <View style={{ paddingVertical: verticalScale(20) }}>
        <View style={styles.row_btns}>
          <Button
            circle
            title="1"
            style={style}
            type="successLight"
            onPress={() => handlerClick("1")}
          />
          <Button
            circle
            title="2"
            style={style}
            type="successLight"
            onPress={() => handlerClick("2")}
          />
          <Button
            circle
            title="3"
            style={style}
            type="successLight"
            onPress={() => handlerClick("3")}
          />
        </View>
        <View style={styles.row_btns}>
          <Button
            circle
            title="4"
            style={style}
            type="successLight"
            onPress={() => handlerClick("4")}
          />
          <Button
            circle
            title="5"
            style={style}
            type="successLight"
            onPress={() => handlerClick("5")}
          />
          <Button
            circle
            title="6"
            style={style}
            type="successLight"
            onPress={() => handlerClick("6")}
          />
        </View>
        <View style={styles.row_btns}>
          <Button
            circle
            title="7"
            style={style}
            type="successLight"
            onPress={() => handlerClick("7")}
          />
          <Button
            circle
            title="8"
            style={style}
            type="successLight"
            onPress={() => handlerClick("8")}
          />
          <Button
            circle
            title="9"
            style={style}
            type="successLight"
            onPress={() => handlerClick("9")}
          />
        </View>
        <View style={styles.row_btns}>
          <Button
            circle
            title="."
            style={style}
            type="successLight"
            onPress={() => {
              if (!kwh.includes(".") && kwh.length < 8) setKwhs(kwh + ".");
            }}
          />
          <Button
            circle
            title="0"
            style={style}
            type="successLight"
            onPress={() => handlerClick("0")}
          />
          <Button
            circle
            type="warning"
            style={style}
            icon="backspace"
            onPress={clear}
            onLongPress={() => {
              Vibration.vibrate(50);
              reset();
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: palette.background,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
  },
  row_btns: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    gap: moderateScale(15),
    marginTop: verticalScale(10),
  },
});
