
export const ThemeImage = {
    dark:{
        Google : require("../Assets/Images/google.png"),
        Facebook : require("../Assets/Images/facebook.png"),
        Back : require("../Assets/Images/back_dark.png"),
        Filter : require("../Assets/Images/filter_dark.png"),
        Search : require("../Assets/Images/search_dark.png"),
        Fav: require("../Assets/Images/fav.png"),
        FavSelected: require("../Assets/Images/fav_selected.png"),
        WhiteBack: require("../Assets/Images/back_dark.png"),
        Cross: require("../Assets/Images/cross_dark.png"),
        Dark_Selector:require("../Assets/Images/dark_theme.png"),
        Light_Selector:require("../Assets/Images/light_theme.png"),
        Check_Selector:require("../Assets/Images/check_selected.png"),
        Check_Dark_Unselected:require("../Assets/Images/dark_check_unselected.png"),
        Check_Light_Unselected:require("../Assets/Images/light_check_unselected.png"),
        PropertyOwner:require('../Assets/Images/property_owner_dark.png'),
        SearchProperty:require('../Assets/Images/search_property_dark.png'),
        Right : require("../Assets/Images/right_dark.png"),


    },
    light:{
        Google : require("../Assets/Images/google.png"),
        Facebook : require("../Assets/Images/facebook.png"),
        Back : require("../Assets/Images/back_light.png"),
        Filter : require("../Assets/Images/filter_light.png"),
        Search : require("../Assets/Images/search_light.png"),
        Fav: require("../Assets/Images/fav.png"),
        FavSelected: require("../Assets/Images/fav_selected.png"),
        WhiteBack: require("../Assets/Images/back_dark.png"),
        Cross: require("../Assets/Images/cross_light.png"),
        Dark_Selector:require("../Assets/Images/dark_theme.png"),
        Light_Selector:require("../Assets/Images/light_theme.png"),
        Check_Selector:require("../Assets/Images/check_selected.png"),
        Check_Dark_Unselected:require("../Assets/Images/dark_check_unselected.png"),
        Check_Light_Unselected:require("../Assets/Images/light_check_unselected.png"),
        PropertyOwner:require('../Assets/Images/property_owner_dark.png'),
        SearchProperty:require('../Assets/Images/search_property_dark.png'),
        Right : require("../Assets/Images/right_light.png"),


    }
}

export const getImageByTheme = (theme) => {
    return ThemeImage[theme]
}

