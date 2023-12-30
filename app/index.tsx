import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { verticalScale, horizontalScale, moderateScale } from "./utils/metrics";
import { NavBar } from "./components/navbar";
import { FloatingButton } from "./components/floating-button";
import { NewReadModal } from "./components/modal";

const list_counters = [
  // {
  // id: 1,
  // name: "casa",
  // },
];

export default function Page() {
  const [isShowModal, setShowModal] = useState(false);

  const handlerModal = (value: boolean) => {
    setShowModal(value);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.counters_container}>
        {!list_counters.length && <NoReadings />}

        <FloatingButton
          style={{
            position: "absolute",
            bottom: moderateScale(20),
            right: moderateScale(20),
          }}
          onPress={() => setShowModal(true)}
        >
          <Ionicons name="add" color="white" size={moderateScale(24)} />
        </FloatingButton>
      </View>
      <NavBar screen="main" />
      <NewReadModal setIsShow={handlerModal} isShow={isShowModal} />
    </View>
  );
}

function NoReadings() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "#757575",
          fontSize: moderateScale(20),
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        No hay lecturas
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  counters_container: {
    flex: 1,
  },
});
