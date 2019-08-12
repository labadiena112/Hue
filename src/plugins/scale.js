import { Dimensions } from 'react-native';
const { windowWidth, windowHeight } = Dimensions.get('window');
const { screenWidth, screenHeight } = Dimensions.get('screen');
//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const window = {
    width: windowWidth,
    height: windowHeight
};
const screen = {
    width: screenWidth,
    height: screenHeight
};
const scale = size => windowWidth / guidelineBaseWidth * size;
const verticalScale = size => windowHeight / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale, window, screen };