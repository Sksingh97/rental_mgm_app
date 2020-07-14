import * as Color from '../../Constants/Color'
import {heightScale, width} from "../../Utilities/Utils"
export default {
    Container:{
        backgroundColor:Color.Main_BackGround,
        flex:1,
        alignItems:"center"
    },
    SubContainer:{
        width:'80%',
        // backgroundColor:'red',
        flex:1,
    },
    HeaderText:{
        color:Color.White,
        fontSize:30
    },
    SignUpHeading:{
        marginTop:heightScale(90),
        
    },
    FormContainer:{
        marginTop:heightScale(20)
    },
    InputGroup:{
        marginTop:heightScale(25)
    },
    Input:{
        borderBottomWidth:1,
        borderBottomColor:Color.Gray,
        padding:0,
        color:Color.White,
        fontSize:15
        // backgroundColor:'red'
    },
    RongInput:{
        borderBottomWidth:1,
        borderBottomColor:Color.Red,
        padding:0,
        color:Color.White,
        fontSize:15
        // backgroundColor:'red'
    },
    lable:{
        color:Color.OffWhite
    },
    CountryPhone:{
        flexDirection:'row'
    },
    Country:{
        width:'11%'
    },
    Phone:{
        marginLeft:6,
        // backgroundColor:'red',
        width:'87%'
    },
    SubmitButtonContainer:{
        marginTop:40,
        // backgroundColor:'red'
        alignItems:'center'
    },
    SubmitButton:{
        width:150,
        padding:10,
        backgroundColor:Color.LightPurple,
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
        // backgroundColor:'red'
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
        backgroundColor:Color.LightPurple,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:35
    }

}