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
            // paddingTop:Platform.OS=='android'?20:0

        },
        ContentContainer:{
            // width:"95%",
            // padding:5
        },
        
        TextContainer:{
            marginTop:20,
            marginBottom:10,
        },
        Greeting:{
            color:Color[theme]['White'],
            fontSize:30
        },
        HouseCard:{
            marginTop:10,
            marginBottom:10,
            width:'100%',
        },
        ImageSliderContainer:{
            // width:'100%',
            height:300,
            marginTop:5
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
        BackContainer:{
            position: 'absolute',
            top: 20,
            bottom: 0,
            left: 10,
            right: 0,
            backgroundColor: 'transparent',
            // backgroundColor:'red',
            width:50,
            height:25,
            alignItems:'center',
            justifyContent:'center'
        },
        BackImage:{
            height:30,
            width:30,
            marginLeft:8
        },
        DetailContainer:{
            // width:'90%',
            alignItems:'center'
        },
        Details:{
            width:'90%'
        },
        FeatureContainer:{
            marginTop:10,
            marginLeft:5
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
        BenifitContainer:{
            marginTop:20,
            // alignItems:'center'
        },
        BenifitLable:{
            color:Color[theme]['White'],
            fontSize:20
        },
        BenifitItemList:{
            marginTop:15,
            flexDirection:'row',
            // height:
            marginbottom:5
        },
        BenifitItem:{
            marginRight:10,
            marginLeft:10,
            backgroundColor:Color[theme]['ListItem'],
            padding:5,
            borderRadius:5
        },
        BenifitText:{
            color:Color[theme]['White']
        },
        PropertyDetailContainer:{
            marginTop:20
        },
        PropertyDetailList:{
            justifyContent: 'space-around',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop:10,
            padding:0,

        },
        PropertyDetailItem:{
            flexDirection:'column',
            alignItems:'center',
            margin:10,

        },
        MoreDetailTextContainer:{
            marginTop:10,
            // alignItems:'center'
        },
        MoreDetailText:{
            color:Color[theme]['OffWhite'],
            fontSize:15,
            textAlign:'justify',
            lineHeight:20,
        },
        ScreenEnd:{
            marginTop:20
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
        SchedualeButton:{
            flexDirection:'column',
            alignItems:'center',
            margin:10,
            borderWidth:1,
            padding:4,
            borderRadius:5,
            height:50,
            borderColor:Color[theme]['OffWhite']
        },
        PriceSliderContainer:{
            marginTop:20,
            alignItems:'center',
            justifyContent:'center',
            width:'100%'
        }
        
}
}