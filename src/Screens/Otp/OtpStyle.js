import Color from '../../Constants/Color'
import {Platform } from 'react-native';
import {heightScale, width} from "../../Utilities/Utils"

export const getStyleProps=(theme)=>{
    return {
    fullScreen: { flex: 1,backgroundColor:Color.Main_BackGround },
    input: {
        width: 47,
        height: 47,
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily:'Gill Sans',
        borderBottomWidth: 1,
        borderColor: Color.White
    },
    navbarContainer: {
        paddingTop: 10,
        paddingBottom: 10


    },
    inputContainer: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    buttonContainer: {
        marginTop: 44,
        alignItems: 'center'
    },
    forgetText: {
        fontSize: 14,
        color: Color.Main_BackGround,
        marginRight: 28
    },
    textContainer: {
        marginTop: heightScale(80),
        width: '90%',
        marginHorizontal: 25,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'center',
        justifyContent:'center',
    },
    text: {
        fontSize: 20,
        fontFamily:'Gill Sans',
        color:Color.White
    },
    notRecievedContainer: {
        marginTop: 42,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notRecText: {
        color: Color.White,
        fontSize: 16,
        fontFamily:'Gill Sans',
    },

    resendContainer: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resend: {
        color: Color.White,
        fontSize: 16,
        fontFamily:'Gill Sans',
        textDecorationLine: 'underline',
        textDecorationColor:Color.OffWhite
    },
    number: {
        fontSize: 20,
        fontFamily: Platform == 'android' ? 'Gill Sans Bold' : 'GillSans-SemiBold',
        color: Color.OffWhite
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
    lable:{
        color:Color.OffWhite
    },
    HeaderText:{
        color:Color.White,
        fontSize:30,
        marginLeft:20
    },
    SignUpHeading:{
        marginTop:heightScale(70),
        width:'90%',
        flexDirection:'row',
        alignItems:'center'
    },
    HeaderContainer:{
        alignItems:'center',
        justifyContent:'center',
    },
    BackButton:{
        height:20,
        width:20
    }
}
}