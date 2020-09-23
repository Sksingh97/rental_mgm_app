const Theme_Setting =  {
    dark:{
        Status_bar:'light-content',
        
    },
    light:{
        Status_bar:'dark-content',

    }
}

export default Theme_Setting;

export const getThemeSettings = (theme) => {
    return Theme_Setting[theme]
}