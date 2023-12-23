import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavBar } from "./components/navbar";
import { CircularButton } from "./components/circular-button";
import { calculatePrecie } from "./utils/calculate-precie";
import { verticalScale, horizontalScale, moderateScale } from "./utils/metrics";

export default function Page() {
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

  const addPoint = () => {
    if (!kwh.includes(".") && kwh.length < 8) setKwhs(kwh + ".");
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
    if (newKwh != "0") setPrecie(calculatePrecie(newKwh));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* calculator */}
      <View style={styles.calculator_container}>
        {/* display text */}
        <Text
          style={{
            color: "#757575",
            fontSize: moderateScale(24),
            fontWeight: "600",
          }}
        >
          kwh
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.display_text} onPress={reset}>
            {kwh}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: moderateScale(10),
          }}
        >
          <Text
            style={{
              color: "#757575",
              fontSize: moderateScale(24),
              fontWeight: "600",
            }}
          >
            $
          </Text>
          <Text
            style={[
              styles.display_text,
              {
                textAlign: "left",
                fontSize:
                  precie.toString().length < 9
                    ? styles.display_text.fontSize
                    : moderateScale(38),
              },
            ]}
            onPress={reset}
          >
            {precie}
          </Text>
        </View>

        {/* keypad */}
        <View>
          <View style={styles.row_btns}>
            <CircularButton title="1" onPress={() => handlerClick("1")} />
            <CircularButton title="2" onPress={() => handlerClick("2")} />
            <CircularButton title="3" onPress={() => handlerClick("3")} />
          </View>
          <View style={styles.row_btns}>
            <CircularButton title="4" onPress={() => handlerClick("4")} />
            <CircularButton title="5" onPress={() => handlerClick("5")} />
            <CircularButton title="6" onPress={() => handlerClick("6")} />
          </View>
          <View style={styles.row_btns}>
            <CircularButton title="7" onPress={() => handlerClick("7")} />
            <CircularButton title="8" onPress={() => handlerClick("8")} />
            <CircularButton title="9" onPress={() => handlerClick("9")} />
          </View>
          <View style={styles.row_btns}>
            <CircularButton title="." onPress={addPoint} />
            <CircularButton title="0" onPress={() => handlerClick("0")} />
            <CircularButton
              title="C"
              textStyle={{ color: "red", fontWeight: "600" }}
              onPress={clear}
            />
          </View>
        </View>
      </View>

      <NavBar screen="calculator" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: moderateScale(10),
    justifyContent: "space-between",
  },
  calculator_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: moderateScale(20),
    paddingVertical: verticalScale(30),
  },
  display_text: {
    flex: 1,
    color: "#757575",
    fontSize: moderateScale(48),
    fontWeight: "700",
    paddingHorizontal: horizontalScale(10),
    textAlign: "center",
  },
  row_btns: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    gap: moderateScale(25),
    marginTop: verticalScale(35),
  },
});
