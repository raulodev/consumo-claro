import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const guideWidth = 375;
const guideHeight = 812;

const verticalScale = (size: number) => (height / guideHeight) * size;
const horizontalScale = (size: number) => (width / guideWidth) * size;
const moderateScale = (size: number, factor: number = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };

/*
FUNCTIONS           USAGE

verticalScale       height , maringTop , marginBottom , marginVertical , line-height
                    paddingTop , paddingBottom , paddingVertical , likewise 

horizontalScale     width . marginLeft , marginRight , marginHorizontal , paddingLeft,
                    paddindRight , paddingHorizontal , likewise

moderateScale       font-size , borderRadius


*/
