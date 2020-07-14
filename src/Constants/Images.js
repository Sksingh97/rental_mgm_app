export const Google = require("../Assets/Images/google.png")
export const Facebook = require("../Assets/Images/facebook.png")
export const Back = require("../Assets/Images/back.png")

export const ThemeImage = {
    dark:{
        Google : require("../Assets/Images/google.png"),
        Facebook : require("../Assets/Images/facebook.png"),
        Back : require("../Assets/Images/back.png"),
    },
    light:{
        Google : require("../Assets/Images/google.png"),
        Facebook : require("../Assets/Images/facebook.png"),
        Back : require("../Assets/Images/back.png"),
    }
}

export const getImageByTheme = (theme) => {
    return ThemeImage[theme]
}

