import { useState, useEffect } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { CircularButton } from "./app/components/circular-button";
import { Button } from "./app/components/button";
import { calculatePrecie } from "./app/utils/calculate-precie";
import { openDatabase } from "./app/utils/open-db";

const db = openDatabase();

export default function App() {
  const [kwh, setKwhs] = useState("0");
  const [precie, setPrecie] = useState(0);
  const [isShowModal, setShowModal] = useState(false);

  const modalHeight = useSharedValue(0);
  const overlayOpacity = useSharedValue(0);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, done int, value text);"
      );
    });
  }, []);

  const styleAnimationModal = useAnimatedStyle(() => {
    return {
      height: withTiming(modalHeight.value, {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
      }),
    };
  });

  const styleAnimationOverlay = useAnimatedStyle(() => {
    return {
      opacity: withTiming(overlayOpacity.value, {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
      }),
    };
  });

  const handlerClick = (value: string) => {
    console.log(value);
    if (kwh === "0") setKwhs(value);
    else if (kwh.length < 9) setKwhs(kwh + value);
  };

  const handlerClear = () => {
    if (kwh.length > 0) {
      const newKwh = kwh.slice(0, -1);
      if (newKwh === "") {
        setKwhs("0");
        setPrecie(0);
      } else setKwhs(newKwh);
    }
  };

  const addPoint = () => {
    if (!kwh.includes(".") && kwh.length < 8) setKwhs(kwh + ".");
  };

  const getToPay = () => {
    if (kwh != "0") setPrecie(calculatePrecie(kwh));
    setShowModal(!isShowModal);
    overlayOpacity.value = 1;
    modalHeight.value = 400;
  };

  const reset = () => {
    setKwhs("0");
    setPrecie(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>kwh</Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 30 }}>
        <Text style={styles.mainText} onPress={reset}>
          {kwh}
        </Text>
      </View>

      <View style={styles.pad}>
        <CircularButton title="1" onPress={() => handlerClick("1")} />
        <CircularButton title="2" onPress={() => handlerClick("2")} />
        <CircularButton title="3" onPress={() => handlerClick("3")} />
      </View>
      <View style={styles.pad}>
        <CircularButton title="4" onPress={() => handlerClick("4")} />
        <CircularButton title="5" onPress={() => handlerClick("5")} />
        <CircularButton title="6" onPress={() => handlerClick("6")} />
      </View>
      <View style={styles.pad}>
        <CircularButton title="7" onPress={() => handlerClick("7")} />
        <CircularButton title="8" onPress={() => handlerClick("8")} />
        <CircularButton title="9" onPress={() => handlerClick("9")} />
      </View>
      <View style={styles.pad}>
        <CircularButton title="." onPress={addPoint} />
        <CircularButton title="0" onPress={() => handlerClick("0")} />
        <CircularButton
          title="C"
          textStyle={{ color: "red", fontWeight: "600" }}
          onPress={handlerClear}
        />
      </View>

      <View style={{ marginBottom: 60 }} />

      <Button title="=" onPress={getToPay} />

      {isShowModal && (
        <Animated.View style={[styles.overlay, styleAnimationOverlay]}>
          <Animated.View style={[styles.modal, styleAnimationModal]}>
            <Text style={[styles.label, { fontSize: 20 }]}>Total a Pagar</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                marginBottom: 64,
              }}
            >
              <Text style={[styles.mainText, { width: "auto", fontSize: 40 }]}>
                {precie}
              </Text>
              <Text style={styles.label}>$</Text>
            </View>
            <Button
              title="="
              onPress={() => {
                modalHeight.value = 0;
                overlayOpacity.value = 0;
                setTimeout(() => {
                  setShowModal(!isShowModal);
                }, 100);
              }}
            />
          </Animated.View>
        </Animated.View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -100,
  },
  mainText: {
    color: "#757575",
    fontSize: 48,
    fontWeight: "700",
    width: 280,
    textAlign: "center",
  },
  label: {
    color: "#757575",
    fontSize: 24,
    fontWeight: "600",
  },
  pad: {
    marginTop: 25,
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    gap: 25,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
  },
  modal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 400,
    backgroundColor: "#fff",
    borderTopRightRadius: 17,
    borderTopStartRadius: 17,
    alignItems: "center",
    paddingTop: 35,
    gap: 5,
  },
});
