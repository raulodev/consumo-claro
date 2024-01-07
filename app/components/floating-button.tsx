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
      underlayColor={"#3792EC"}
      {...props}
    ></TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    width: horizontalScale(55),
    height: verticalScale(55),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#59adff",
    elevation: 5,
  },
});
