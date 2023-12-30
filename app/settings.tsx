import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavBar } from "./components/navbar";

export default function Page() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text>Settings</Text>
        <Text>v1.0.0</Text>
      </View>
      <NavBar screen="settings" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
});
