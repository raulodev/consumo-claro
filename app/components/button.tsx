import {
  TouchableHighlight,
  Text,
  StyleSheet,
  TouchableHighlightProps,
} from "react-native";

import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";

interface ButtonProps extends TouchableHighlightProps {
  title: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
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
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#59adff",
    borderRadius: moderateScale(5),
    height: verticalScale(45),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
