import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const CircularButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, style]}
      {...props}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#E5E5E5",
    padding: moderateScale(10),
    borderRadius: 70 / 2,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#757575",
    fontSize: moderateScale(24),
  },
});
