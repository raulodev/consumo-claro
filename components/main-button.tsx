import {
  TouchableHighlight,
  Text,
  StyleSheet,
  TouchableHighlightProps,
} from "react-native";

interface ButtonProps extends TouchableHighlightProps {
  title: string;
}

export const MainButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  ...props
}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.button, style]}
      activeOpacity={0.6}
      underlayColor={"#0D63C6"}
      {...props}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0070F0",
    borderRadius: 8,
    width: 300,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
