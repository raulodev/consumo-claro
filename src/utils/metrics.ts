import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const heightScreen = height;

const guideWidth = 384;
const guideHeight = 785;

/**
    height , maringTop , marginBottom , marginVertical , line-height
    paddingTop , paddingBottom , paddingVertical , etc 
 */
const verticalScale = (size: number) => (height / guideHeight) * size;

/**
    width , marginLeft , marginRight , marginHorizontal , paddingLeft,
    paddindRight , paddingHorizontal , etc
 */
const horizontalScale = (size: number) => (width / guideWidth) * size;

/**
    font-size , borderRadius , gap  , padding , etc
 */
const moderateScale = (size: number, factor: number = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale, heightScreen };

/*
FUNCTIONS           USAGE

verticalScale       height , maringTop , marginBottom , marginVertical , line-height
                    paddingTop , paddingBottom , paddingVertical , likewise 

horizontalScale     width . marginLeft , marginRight , marginHorizontal , paddingLeft,
                    paddindRight , paddingHorizontal , likewise

moderateScale       font-size , borderRadius , gap 


*/
