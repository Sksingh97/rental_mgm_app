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
            // justifyContent:'center'
        },
        ContentContainer:{
            width:"95%",
            padding:5,
            marginTop:10
        },
        HeaderContainer:{
            width:'100%',
            // backgroundColor:'red',
            marginTop:20,
            alignItems:'flex-end',
            height:60,
            justifyContent:'center'
        },
        FilterImage:{
            height:35,
            width:35,
            opacity:.5,
            marginRight:5
        },
        SearchImage:{
            height:30,
            width:30,
            opacity:.5,
            marginLeft:8
        },
        SearchContainer:{
            width:'90%',
            backgroundColor:'',
            marginTop:20,
            marginBottom:10,

            backgroundColor:Color[theme]['searchBackground'],
            height:60,
            alignItems:'center',
            justifyContent:'space-around',
            flexDirection:'row',
            shadowOffset:{  width: 0,  height: 0,  },
            shadowColor: 'black',
            shadowOpacity: .5,
            elevation:10
        },
        SearchInput:{
            // borderColor:'red',
            // borderWidth:1,
            width:'80%',
            justifyContent:'space-between',
            height:60,
            fontSize:18,
            margin:0,
            padding:0,
            color:Color[theme]['White']
        },
        TextContainer:{
            marginTop:10,
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
            height:250
        },
        TagContainer:{
            position: 'absolute',
            top: 20,
            bottom: 0,
            left: 20,
            right: 0,
            backgroundColor: 'transparent',
            // backgroundColor:'red',
            width:100,
            height:25
        },
        TagTextContainer:{
            width:100,
            alignItems:'center',
            justifyContent:'center',
            height:25,
            borderRadius:5
        },
        JustAdded:{
            backgroundColor:Color[theme]['JustAdded']
        },
        Premium:{
            backgroundColor:Color[theme]['Premium']
        },
        New:{
            backgroundColor:Color[theme]['New'] 
        },
        TagText:{
            color:Color[theme]['JustAddedText'],
            fontWeight:'bold'
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
        ScreenEnd:{
            marginTop:20
        },
        
}
}