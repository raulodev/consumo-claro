import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavBar } from "./components/navbar";

export default function Page() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Text>settings page</Text>
      </View>
      <NavBar screen="settings" />
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
});
