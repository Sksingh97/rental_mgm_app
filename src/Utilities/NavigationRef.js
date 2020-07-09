import { Dimensions } from 'react-native';

const standardWidth = 375.0;
const standardHeight = 667.0;
var navigationReference = null;


function handleSize (num) {
    if (num <= 0) return 0;
    if (num > 100) return 1;
    return num / 100;
};

export const myWidth = Dimensions.get('window').width;
export const myHeight = Dimensions.get('window').height;

export function width (num) {
    return myWidth * handleSize(num);
}

export function height (num) {
    return myHeight * handleSize(num);
}

export function widthScale(dimension) {
    return (dimension / standardWidth) * myWidth;
}

export function heightScale(dimension) {
    return (dimension / standardHeight) * myHeight;
}

export function setNavigationReference (ref) {
    navigationReference = ref;
}

export function getNavigationReference () {
    return navigationReference;
}