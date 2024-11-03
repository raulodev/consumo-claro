import React from "react";
import { View, Text } from "react-native";
import { palette } from "../utils/colors";

export const ListEmpty: React.FC = () => {
  return (
    <View>
      <Text style={{ color: palette.background, textAlign: "center" }}>
        No hay nada para mostrar
      </Text>
    </View>
  );
};
