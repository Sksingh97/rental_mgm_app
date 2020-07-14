import Message from '../Constants/Message';
import Color from '../Constants/Color';
import Image from '../Constants/Images';
import AppAsync from './AsyncStorage';
import Settings from '../Constants/Settings';
const AppSingleton = AppAsync.getInstance()


class Theme {

    static mInstance = null;
    static language = 'en';
    static color = 'dark'
    static getInstance() {
        if (Theme.mInstance == null) {
            Theme.mInstance = new Theme();
        }
        return Theme.mInstance;
    }

     setup= async()=>{
        console.log("SETTING IT UP")
        Theme.language = await AppSingleton.getAsyncData('lang');
        Theme.color = await AppSingleton.getAsyncData('colorScheme')
        console.log("SETTING IT UP done : : : ",Theme.color, Theme.language)

    }

    printValue(){
        console.log("Printing valuee : : : ",Theme.color, Theme.language)
    }

    getColorScheme(){
        return Theme.color
    }

    getMessage = (name) => {
        return Message[language][name];
    }

    getImage = (name) => {
        return Image[Theme.color][name];
    }

    getColor = (name) => {
        return Color[Theme.color][name];
    }

    getSettings = (name) => {
        console.log("SETTINGS: : : ",Settings)
        console.log("COLOR : : ",Theme.color)
        return Settings[Theme.color][name];
    }

}

export default Theme;

