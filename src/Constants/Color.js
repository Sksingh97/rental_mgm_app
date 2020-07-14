export const Main_BackGround ="#2A2942"
export const White = "#fff"
export const OffWhite = "#D2D2D2"
export const Gray = "#B7B7B7"
export const LightPurple = "#5D5AA8"
export const Red = "red"
export const INPUT_BORDER = "blue"

const Theme_Color = {
    dark:{
        Main_BackGround :"#2A2942",
        White :"#fff",
        OffWhite :"#D2D2D2",
        PlaceHolder:"#808080",
        Gray : "#B7B7B7",
        LightPurple : "#5D5AA8",
        Red : "red",
        INPUT_BORDER : "blue"
    },
    light:{
        Main_BackGround :"#d7d7d7",
        White :"#000",
        OffWhite :"#000",
        PlaceHolder:"#808080",
        Gray : "#B7B7B7",
        LightPurple : "#5D5AA8",
        Red : "red",
        INPUT_BORDER : "blue"
    }
}

export default Theme_Color

export const getThemeColor = (theme) => {
    return Theme_Color[theme]
}