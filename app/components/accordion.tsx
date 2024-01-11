import { useState } from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  View,
  Text,
  ViewProps,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";

interface AccordionProps extends ViewProps {
  style?: ViewStyle;
  title: string;
  bodyStyle?: ViewStyle;
}

export const Accordion: React.FC<AccordionProps> = ({
  style,
  title,
  bodyStyle,
  ...props
}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <View style={[styles.main, style]}>
      <View
        style={styles.container_title}
        onTouchStart={() => setOpen(!isOpen)}
      >
        <Text style={styles.title}>{title}</Text>
        <Ionicons
          name={isOpen ? "arrow-up-circle" : "arrow-down-circle"}
          color="white"
          size={22}
        />
      </View>
      <ScrollView>
        <View
          style={[
            styles.container_body,
            bodyStyle,
            {
              display: isOpen ? "flex" : "none",
            },
          ]}
          {...props}
        ></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
  },
  container_title: {
    backgroundColor: "#59adff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: moderateScale(5),
    borderRadius: moderateScale(5),
  },
  title: {
    color: "white",
    fontSize: moderateScale(18),
    fontWeight: "600",
  },
  container_body: {
    display: "none",
    padding: moderateScale(5),
  },
});
