
export const ThemeImage = {
    dark:{
        Google : require("../Assets/Images/google.png"),
        Facebook : require("../Assets/Images/facebook.png"),
        Back : require("../Assets/Images/back_dark.png"),
    },
    light:{
        Google : require("../Assets/Images/google.png"),
        Facebook : require("../Assets/Images/facebook.png"),
        Back : require("../Assets/Images/back_light.png"),
    }
}

export const getImageByTheme = (theme) => {
    return ThemeImage[theme]
}

