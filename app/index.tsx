import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import { Calculator } from "./calculator";
import { Card } from "./components/card";
import { FloatingButton } from "./components/floating-buttons";
import { TopBar } from "./components/top-bar";
import { createTables, getAllRegisters } from "./lib/database";
import { Register } from "./lib/interfaces";
import { palette } from "./utils/colors";
import { moderateScale } from "./utils/metrics";

export default function Page() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [registers, setRegisters] = useState<Register[]>([]);

  useEffect(() => {
    async function init() {
      await createTables();
      const allRegisters = await getAllRegisters();
      setRegisters(allRegisters);
    }

    init();
  }, []);

  if (showCalculator) return <Calculator onClose={() => setShowCalculator(false)} />;

  return (
    <View style={styles.container}>
      <TopBar />
      <ScrollView>
        {registers.map((r, index) => (
          <Card key={index} register={r} />
        ))}
      </ScrollView>
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
