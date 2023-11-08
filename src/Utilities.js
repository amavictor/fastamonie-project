import {
    moderateScale,
    scale,
    moderateVerticalScale,
    verticalScale
} from "react-native-size-matters"

export const mScale = (size, scaleFactor) => Math.ceil(moderateScale(size, scaleFactor))
export const nScale = (size) => Math.round(scale(size))
export const mVScale = (size) => Math.round(moderateVerticalScale(size))
export const vScale = (size) => Math.round(verticalScale(size))



//Colors

export const COLORS = {
    primary: "#FF9B63",
    white: "#FFFF",
    black: "#161616",
    grayLine: "#979797",
    lightText: "#595959",
    blackText: "#000000",
    backdrop:"#faede6"
}


