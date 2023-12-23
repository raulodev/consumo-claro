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
    borderRadius: moderateScale(50),
    width: horizontalScale(70),
    height: verticalScale(70),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#757575",
    fontSize: moderateScale(24),
  },
});
