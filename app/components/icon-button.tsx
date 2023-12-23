import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle,
} from "react-native";

interface IconButtonProps {
  onPress?: () => void;
  iconSource: any;
  style?: ViewStyle;
  iconStyle?: ImageStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  iconSource,
  style,
  iconStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Image source={iconSource} style={[styles.icon, iconStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
});
