
const Theme_Color = {
    dark:{
        Main_BackGround :"#2A2942",
        White :"#fff",
        OffWhite :"#D2D2D2",
        PlaceHolder:"#808080",
        Gray : "#B7B7B7",
        LightPurple : "#5D5AA8",
        Red : "red",
        INPUT_BORDER : "blue",
        NAV_TEXT:"#fff",
        TabBackground:'#2A2942',
        searchBackground:'#35314E',
        JustAdded:'#8F00FF',
        JustAddedText:'#fff',
        FeatureText:'#FF6100',
        Premium:'#45AC31',
        New:'#0044D5',
        ListItem:'#f57242',
        ButtonContainer:'#B1C5F1',
        ButtonColor:'#769EFF',
        Selected:'#8DFFBC',
        Orange:'#FF9933'

    },
    light:{
        Main_BackGround :"#eee",
        White :"#000",
        OffWhite :"#000",
        PlaceHolder:"#808080",
        Gray : "#444",
        LightPurple : "#5D5AA8",
        Red : "red",
        INPUT_BORDER : "blue",
        NAV_TEXT:"blue",
        TabBackground:'#eee',
        searchBackground:'#eee',
        JustAdded:'#8F00FF',
        JustAddedText:'#fff',
        FeatureText:'#FF6100',
        Premium:'#2AFF00',
        New:'#0044D5',
        ListItem:'#f57242',
        ButtonContainer:'#B1C5F1',
        ButtonColor:'#769EFF',
        Selected:'#8DFFBC',
        Orange:'#FF9933'




    }
}

export default Theme_Color

export const getThemeColor = (theme) => {
    return Theme_Color[theme]
}