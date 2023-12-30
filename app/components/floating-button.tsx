import {
  TouchableHighlight,
  StyleSheet,
  TouchableHighlightProps,
} from "react-native";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";

export const FloatingButton: React.FC<TouchableHighlightProps> = ({
  onPress,
  style,
  ...props
}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.button, style]}
      activeOpacity={0.6}
      {...props}
    ></TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    width: horizontalScale(50),
    height: verticalScale(50),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#59adff",
    elevation: 5,
  },
});
