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
      setConsumption(`+ ${precie}$`);
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
                color="#3792EC"
                size={moderateScale(24)}
              />
            </View>
          </View>
        )}
        <View style={styles.body}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Ionicons
              name="calendar"
              color="#757575"
              size={moderateScale(20)}
            />
            <Text
              style={{
                color: "#757575",
                fontWeight: "600",
                fontSize: moderateScale(20),
              }}
            >
              {currentDate}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Ionicons
              name="reader-outline"
              color="#757575"
              size={moderateScale(18)}
            />
            <Text
              style={{
                color: "#757575",
                fontSize: moderateScale(18),
              }}
            >
              {reading} kwh
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text
            style={{
              color: "#fff",
              fontWeight: "400",
              fontSize: moderateScale(16),
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
    height: verticalScale(125),
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(10),
    shadowOffset: { width: 10, height: 10 },
  },
  body: {
    height: "65%",
    padding: moderateScale(10),
    backgroundColor: "#fff",
    borderTopWidth: 0.25,
    borderLeftWidth: 0.25,
    borderRightWidth: 0.25,
    borderColor: "#bdbdbd",
    borderTopLeftRadius: moderateScale(5),
    borderTopRightRadius: moderateScale(5),
  },
  footer: {
    height: "35%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: horizontalScale(15),
    backgroundColor: "#59adff",
    borderLeftWidth: 0.25,
    borderRightWidth: 0.25,
    borderBottomWidth: 0.25,
    borderTopWidth: 0.25,
    borderColor: "#59adff",
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
