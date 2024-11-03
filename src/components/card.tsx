import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Vibration } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { SlideInRight, StretchInY, StretchOutY } from "react-native-reanimated";
import { Register } from "../lib/interfaces";
import { palette } from "../utils/colors";
import { verticalScale, moderateScale, horizontalScale } from "../utils/metrics";
import { month } from "../utils/get-month";

interface CardProps {
  register: Register;
  onSelect: (id: number) => void;
  selectQuick?: boolean;
  selected: number[];
}

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export const Card: React.FC<CardProps> = ({ register, onSelect, selectQuick, selected }) => {
  const [currentDate, setDate] = useState<string>();

  useEffect(() => {
    const date = new Date();
    date.setTime(register.date);
    setDate(`${date.getDate()} ${month(date.getMonth())}, ${date.getHours()}:${date.getMinutes()}`);
  }, []);

  const select = (vibrate = true) => {
    onSelect(register.id);
    if (vibrate) Vibration.vibrate(50);
  };

  return (
    <Animated.View entering={SlideInRight}>
      <Pressable
        onLongPress={() => {
          if (!selectQuick) select();
        }}
        onPress={() => {
          if (selectQuick) select(false);
        }}>
        <View style={[styles.view]}>
          <View style={styles.container}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: palette.accents_2,
                borderRadius: 40 / 2,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Ionicons name="image-outline" size={24} color={palette.accents_5} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ marginBottom: verticalScale(2) }}>
                <Text
                  style={{
                    color: palette.accents_7,
                    fontSize: moderateScale(16),
                    fontWeight: 500,
                  }}>
                  {currentDate}
                </Text>
              </View>
              <View>
                <Text style={{ color: palette.accents_4, fontSize: moderateScale(18) }}>
                  {register.read} kwh
                </Text>
              </View>
            </View>
            <View>
              {selected.includes(register.id) && (
                <AnimatedIcon
                  entering={StretchInY.springify(300)}
                  name="checkmark-circle"
                  size={28}
                  color={palette.successLight}
                />
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.background,
    borderRadius: moderateScale(10),
    padding: verticalScale(10),
    marginVertical: verticalScale(2),
    marginHorizontal: horizontalScale(10),
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    alignItems: "center",
    elevation: 0.8,
  },
  view: {
    justifyContent: "center",
  },
});
