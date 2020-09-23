import Color from '../../Constants/Color'
import {Platform } from 'react-native';
import {heightScale, width, height} from "../../Utilities/Utils"

export const getStyleProps=(theme)=>{
    return {
        Container:{
            backgroundColor:Color[theme]['Main_BackGround'],
            flex:1,
            // height:'100%',
            alignItems:"center",
            // justifyContent:'center'
        },
        HeaderContainer:{
            height:60,
            flexDirection:'row',
            // justifyContent:'',
            alignItems:'center',
            backgroundColor:Color[theme]['Main_BackGround'],

        },
        BackContainer:{
            alignItems:'center',
            justifyContent:'center',
            marginLeft:20
        },
        BackImage:{
            height:30,
            width:30,
            marginLeft:8
        },
        HeaderTitleContainer:{
            // width:'70%',
            alignItems:'center'
            // backgroundColor:'red'
        },
        HeaderTitle:{
            fontSize:20,
            marginLeft:'40%',
            color:Color[theme]['White']
        },
        ContentContainer:{
            // width:"95%",
            // padding:5
        },
        
        
        FavContainer:{
            position: 'absolute',
            top: 20,
            bottom: 0,
            left: '83%',
            right: 0,
            backgroundColor: 'transparent',
            // backgroundColor:'red',
            width:50,
            height:25,
            alignItems:'center',
            justifyContent:'center'
        },
        FavImage:{
            height:30,
            width:30,
            marginLeft:8
        },
        
        FilterContainer:{
            // width:'90%',
            alignItems:'center'
        },
        Filter:{
            width:'90%'
        },
        
        LayoutText:{
            color:Color[theme]['FeatureText']
        },
        PriceText:{
            color:Color[theme]['White'],
            fontSize:25
        },
        SuperScrip:{
            fontSize:12,
            marginLeft:10,
            color:Color[theme]['White'],

        },
        PriceTextContainer:{
            flexDirection:'row',
            marginTop:5
        },
        AddressText:{
            fontSize:20,
            color:Color[theme]['Gray'],
            marginTop:5
        },
        BenifitText:{
            fontSize:16,
            color:Color[theme]['Gray'],
            marginTop:5
        },
        HouseTypeContainer:{
            marginTop:20,
            // alignItems:'center'
        },
        HouseTypeLable:{
            color:Color[theme]['White'],
            fontSize:20
        },
        BenifitItemList:{
            marginTop:15,
            flexDirection:'row',
            // height:
            marginbottom:5
        },
        HouseTypeItem:{
            marginRight:5,
            // marginLeft:5,
            marginTop:10,
            backgroundColor:Color[theme]['ListItem'],
            padding:5,
            borderRadius:5
        },
        ItemText:{
            color:Color[theme]['White']
        },
        PropertyDetailContainer:{
            marginTop:20
        },
        HouseTypeList:{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop:10,
            padding:0,

        },

        ScreenEnd:{
            marginTop:100
        },
        BottomButtonContainer:{
            height:70,
            flexDirection:'row',
            justifyContent:'space-evenly',
            alignItems:'center',
            backgroundColor:Color[theme]['Main_BackGround']
        },
        RentNowButton:{
            height:50,
            backgroundColor:Color[theme]['ButtonColor'],
            width:'60%',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:10
        },
        RentNow:{
            color:Color[theme]['JustAddedText'],
            fontSize:20
        },
        RoomNoItem:{
            marginRight:5,
            // marginLeft:5,
            marginTop:10,
            backgroundColor:Color[theme]['ListItem'],
            // padding:5,
            paddingTop:5,
            paddingBottom:5,
            paddingLeft:20,
            paddingRight:20,
            borderRadius:5
        },
        PriceRangeSliderContainer:{
            marginTop:20
        },
        RangeTextContainer:{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            marginTop:-15
        },
        SliderMinMax:{
            color:Color[theme]['White']
        }
        
}
}