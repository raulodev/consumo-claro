import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavBar } from "./components/navbar";
import { FloatingButton } from "./components/floating-button";
import Ionicons from "@expo/vector-icons/Ionicons";

const list_counters = [
  // {
  // id: 1,
  // name: "casa",
  // },
];

export default function Page() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.counters_container}>
        {!list_counters.length && <NoCounteres />}

        <FloatingButton
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
          }}
        >
          <Ionicons name="add" color="white" size={24} />
        </FloatingButton>
      </View>
      <NavBar screen="main" />
    </View>
  );
}

function NoCounteres() {
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
          fontSize: 24,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        No hay contadores
        {"\n"}
        use el botón "+"
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "space-between",
  },
  counters_container: {
    flex: 1,
  },
});
