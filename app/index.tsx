import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import { Calculator } from "./calculator";
import { FloatingButton } from "./components/floating-buttons";
import { TopBar } from "./components/top-bar";
import { palette } from "./utils/colors";
import { moderateScale } from "./utils/metrics";

export default function Page() {
  const [showCalculator, setShowCalculator] = useState(false);

  if (showCalculator) return <Calculator onClose={() => setShowCalculator(false)} />;

  return (
    <View style={styles.container}>
      <TopBar />
      <FloatingButton style={{ bottom: moderateScale(100), right: moderateScale(20) }} />
      <FloatingButton
        icon="calculator-sharp"
        style={{ bottom: moderateScale(20), right: moderateScale(20) }}
        onPress={() => setShowCalculator(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.accents_1,
    justifyContent: "space-between",
  },
});
