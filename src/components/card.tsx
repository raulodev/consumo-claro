import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { View, Text, StyleSheet, Pressable, Vibration } from "react-native";
import Animated, { SlideInRight, StretchInY } from "react-native-reanimated";

import { Register } from "../lib/interfaces";
import { palette } from "../utils/colors";
import { month } from "../utils/get-month";
import { verticalScale, moderateScale, horizontalScale } from "../utils/metrics";
import { calculateElectricityCost } from "../utils/tariff";

interface CardProps {
  register: Register;
  onSelect: (id: number) => void;
  isSelectQuick?: boolean;
  selected: number[];
  onGetImage: (image: string) => void;
  prevRegister: Register;
}

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export const Card: React.FC<CardProps> = ({
  register,
  onSelect,
  isSelectQuick,
  selected,
  onGetImage,
  prevRegister,
}) => {
  const select = (vibrate = true) => {
    onSelect(register.id);
    if (vibrate) Vibration.vibrate(50);
  };

  return (
    <Animated.View entering={SlideInRight}>
      <Pressable
        onLongPress={() => {
          if (!isSelectQuick) select();
          else select(false);
        }}
        onPress={() => {
          if (isSelectQuick) select(false);
        }}>
        <View style={[styles.view]}>
          <View style={styles.container}>
            <View
              style={{
                width: 45,
                height: 45,
                backgroundColor: palette.accents_2,
                borderRadius: 45 / 2,
                justifyContent: "center",
                alignItems: "center",
              }}
              onTouchStart={() => {
                if (register.image && register.image !== "undefined") {
                  onGetImage(register.image);
                }
              }}>
              {register.image !== "undefined" ? (
                <Image
                  source={{ uri: register.image }}
                  transition={1000}
                  style={{ height: 45, width: 45, borderRadius: 45 / 2 }}
                />
              ) : (
                <Ionicons name="image-sharp" size={24} color={palette.accents_5} />
              )}

              {selected.includes(register.id) && (
                <View
                  style={{
                    height: 25,
                    width: 25,
                    borderRadius: 25 / 2,
                    backgroundColor: "white",
                    zIndex: 100,
                    position: "absolute",
                    right: -5,
                    bottom: -5,
                  }}>
                  <AnimatedIcon
                    entering={StretchInY.springify(300)}
                    name="checkmark-circle"
                    size={25}
                    color={palette.successLight}
                  />
                </View>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ marginBottom: verticalScale(2) }}>
                <Text
                  style={{
                    color: palette.accents_7,
                    fontSize: moderateScale(16),
                    fontWeight: 500,
                  }}>
                  {`${register.day} ${month(register.month)}`}
                </Text>
              </View>
              <View>
                <Text style={{ color: palette.accents_4, fontSize: moderateScale(18) }}>
                  {register.read} kwh
                </Text>
              </View>
            </View>
            <View style={{ padding: 4 }}>
              {prevRegister && (
                <Text style={{ color: palette.accents_7 }}>
                  + {calculateElectricityCost(register.read - prevRegister.read)} $
                </Text>
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
    gap: moderateScale(20),
    alignItems: "center",
    elevation: 0.8,
  },
  view: {
    justifyContent: "center",
  },
});
