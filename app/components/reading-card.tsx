import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewProps,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";
import { getMonth } from "../utils/get-month";
import { calculatePrecie } from "../utils/calculate-precie";

interface ReadingCardProps extends ViewProps {
  idReading: number;
  date: number;
  reading: number;
  prevReading: number;
  onDelete: (id: number) => void;
  isSelected: boolean;
}

export const ReadingCard: React.FC<ReadingCardProps> = ({
  style,
  idReading,
  date,
  reading,
  prevReading,
  isSelected,
  onDelete,
  ...props
}) => {
  const [currentDate, setDate] = useState<string>();
  const [consumption, setConsumption] = useState<string>();

  useEffect(() => {
    const newdate = new Date();
    newdate.setTime(date);

    var day = newdate.getDate();
    var mon = newdate.getMonth();

    setDate(`${day} ${getMonth(mon)}`);

    if (!prevReading) setConsumption("Primera lectura");
    else {
      const precie = calculatePrecie(`${reading - prevReading}`);
      setConsumption(`+ $${precie}`);
    }
  }, [prevReading, date, isSelected]);

  return (
    <TouchableWithoutFeedback onLongPress={() => onDelete(idReading)}>
      <View style={styles.card} {...props}>
        {isSelected && (
          <View style={styles.overlay}>
            <View
              style={{
                position: "absolute",
                right: 10,
                top: 10,
              }}
            >
              <Ionicons
                name="checkmark-circle"
                color="white"
                size={moderateScale(24)}
              />
            </View>
          </View>
        )}
        <View style={styles.body}>
          <Text
            style={{
              color: "white",
              fontWeight: "600",
              fontSize: moderateScale(20),
            }}
          >
            {currentDate}
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: moderateScale(18),
            }}
          >
            {reading} kwh
          </Text>
        </View>
        <View style={styles.footer}>
          <Text
            style={{
              color: "white",
            }}
          >
            {consumption}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    height: verticalScale(120),
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(10),
  },
  body: {
    height: "65%",
    backgroundColor: "#59adff",
    padding: moderateScale(10),
    borderTopLeftRadius: moderateScale(5),
    borderTopRightRadius: moderateScale(5),
  },
  footer: {
    height: "35%",
    backgroundColor: "#3792EC",
    padding: moderateScale(10),
    borderBottomLeftRadius: moderateScale(5),
    borderBottomRightRadius: moderateScale(5),
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: moderateScale(5),
  },
});