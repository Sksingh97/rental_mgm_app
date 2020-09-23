import Color from '../../Constants/Color'
import {heightScale, width, widthPer} from "../../Utilities/Utils"

export const getStyleProps=(theme='light')=>{
    return {
        Container:{
            backgroundColor:Color[theme]['Main_BackGround'],
            flex:1,
            alignItems:"center"
        },
        SubContainer:{
            width:'80%',
            flex:1,
            // justifyContent:'space-between'
        },
        HeaderContainer:{
            alignItems:'center',
            justifyContent:'center',
        },
        BackButton:{
            height:20,
            width:20,
            marginLeft:5
        },
        HeaderText:{
            color:Color[theme]['White'],
            fontSize:30,
            // marginLeft:20
        },
        SignUpHeading:{
            marginTop:heightScale(50),
            width:'100%',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
        },
        ContinueButton:{
            flexDirection:'row'
        },
        LableContainer:{
            marginTop:30
        },
        Lable:{
            fontSize:20,
            color:Color[theme]['OffWhite'],
        },
        ThemeSelectorContainer:{
            marginTop:20,
            flexDirection:'row',
            justifyContent:"space-around",
            alignItems:'center',
            // backgroundColor:'red'
        },
        ThemeSelectorItem:{
            shadowOffset:{  width: 0,  height: 0,  },
            shadowColor: 'black',
            shadowOpacity: .5,
            elevation:10,
            height:210,
            justifyContent:'center',
            
            // width:'%'
            // width:'50%'
        },
        SelectedThemeItem:{
            borderRadius:5,
            backgroundColor:Color[theme]['Selected'],
        },
        ThemeSelector:{
            height:200,
            resizeMode:'contain',
            width:100
        },
        CheckMark:{
            position:"absolute",
            top:10,
            left:70,
            width:20,
            height:20
        },
        ThemeName:{
            color:Color[theme]['White'],
            fontSize:16,
            fontWeight:'bold'
        },
        DropDown:{
            backgroundColor: Color[theme]['JustAddedText'],
            shadowOffset:{  width: 0,  height: 0,  },
            shadowColor: 'black',
            shadowOpacity: .5,
            elevation:10,
        },
        // LanguageSelectContainer:{
        //     flexDirection:'row',
        //     backgroundColor:'red',
        //     // marginTop:20,
        //     // width:'100%',
        //     // justifyContent:'center',
        //     // alignItems:'center',
        // },
        // LanguageButton:{
        //     // width:'50%',
        //     // height:40,
        //     // backgroundColor:'red',
        //     // justifyContent:'center',
        //     // alignItems:'center',
        //     // height:30,
        //     paddingTop:10,
        //     paddingBottom:10,
        //     // width:'100%',

        //     backgroundColor:Color[theme]['Orange'],
        //     // margin:1,
        // },
        WhiteText:{
            color:Color[theme]['JustAddedText'],
            fontWeight:'bold'
        },
        // LangButtonContainer:{
        //     // justifyContent:"center",
        //     // flexDirection:'row',
        //     // alignItems:'center',
        //     // // backgroundColor:'red',
        //     // width:'100%',
        // },
        LeftButton:{
            borderBottomLeftRadius:10,
            borderTopLeftRadius:10
        },
        RightButton:{
            borderBottomRightRadius:10,
            borderTopRightRadius:10
        },
        LanguageSelectContainer:{
            flexDirection:'row',
            justifyContent:'center',
            marginTop:20
        },
        LanguageButton:{
            width: widthPer(35),
            paddingTop:10,
            paddingBottom:10,
            alignItems:'center',
            margin:1,
            backgroundColor:Color[theme]['Gray']
        },
        SelectedLanguage:{
            backgroundColor:Color[theme]['Orange'],
        },
        AppRoleSelectorContainer:{
            marginTop:20,
            flexDirection:'row',
            justifyContent:'space-around'
        },
        ImageStyle:{
            height:50,
            width:50,
            resizeMode:'contain',
        },
        AppRoleItemContaine:{
            height:70,
            width:70,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:Color[theme]['Gray']
        }
    }
}