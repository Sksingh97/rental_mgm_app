import Color from '../../Constants/Color'
import {heightScale, width} from "../../Utilities/Utils"

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
            justifyContent:'space-between'
        },
        HeaderText:{
            color:Color[theme]['White'],
            fontSize:30
        },
        SignUpHeading:{
            marginTop:heightScale(70),
            
        },
        FormContainer:{
            marginTop:heightScale(20)
        },
        InputGroup:{
            marginTop:heightScale(25)
        },
        Input:{
            borderBottomWidth:1,
            marginTop:5,
            borderBottomColor:Color[theme]['Gray'],
            padding:4,
            color:Color[theme]['White'],
            fontSize:15
            // backgroundColor:'red'
        },
        RongInput:{
            borderBottomWidth:1,
            marginTop:5,
            borderBottomColor:Color[theme]['Red'],
            padding:4,
            color:Color[theme]['White'],
            fontSize:15
            // backgroundColor:'red'
        },
        lable:{
            color:Color[theme]['OffWhite']
        },
        CountryPhone:{
            flexDirection:'row'
        },
        Country:{
            width:'11%'
        },
        Phone:{
            marginLeft:6,
            width:'87%'
        },
        SubmitButtonContainer:{
            marginTop:40,
            alignItems:'center'
        },
        SubmitButton:{
            width:150,
            padding:10,
            backgroundColor:Color[theme]['LightPurple'],
            justifyContent:"center",
            alignItems:'center',
            borderRadius:20
        },
        SocialLoginSeparetorContainer:{
            marginTop:30,
            width:"100%",
            alignItems:'center'
        },
        SocialLoginContainer:{
            marginTop:30,
            width:'80%',
            justifyContent:'space-around',
            flexDirection:'row',
        },
        SocialLogo:{
            width:50,
            height:50
        },
        SocialWrapper:{
            width:'100%',
            alignItems:'center'
        },
        SocialButton:{
            width:70,
            height:70,
            backgroundColor:Color[theme]['LightPurple'],
            alignItems:'center',
            justifyContent:'center',
            borderRadius:35
        },
        DoNotHaveContainer:{
            alignItems:'center',
            justifyContent:'center',
            width:"100%",
            // backgroundColor:'red'
        },
        DoNotText:{
            color:Color[theme].NAV_TEXT,
            textDecorationLine: 'underline',
            marginBottom:20
        }
    
    }
}