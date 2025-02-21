import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { View, Text, StyleSheet, Pressable, Vibration } from "react-native";
import Animated, { SlideInRight, StretchInY } from "react-native-reanimated";

import { Register } from "../lib/interfaces";
import { palette } from "../utils/colors";
import { month } from "../utils/get-month";

interface CardProps {
  register: Register;
  onSelect: (id: number) => void;
  isSelectQuick?: boolean;
  selected: number[];
  onGetImage: (image: string) => void;
}

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export const Card: React.FC<CardProps> = ({
  register,
  onSelect,
  isSelectQuick,
  selected,
  onGetImage,
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
              <View
                style={{
                  marginBottom: 2,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Text numberOfLines={1} style={styles.kwh}>
                  {register.read} kwh
                </Text>
                <Text style={styles.date}>{`${register.day} ${month(register.month)}`}</Text>
              </View>
              <View>
                <Text style={styles.price}>
                  {register.cost === 0 ? "Lectura inicial" : `${register.cost} $`}
                </Text>
              </View>
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
    borderRadius: 10,
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    alignItems: "center",
    elevation: 0.8,
  },
  view: {
    justifyContent: "center",
  },

  date: {
    color: palette.accents_7,
    fontSize: 14,
    fontWeight: 500,
  },
  kwh: {
    color: palette.accents_7,
    fontSize: 17,
    fontWeight: 500,
  },
  price: { color: palette.accents_4 },
});
