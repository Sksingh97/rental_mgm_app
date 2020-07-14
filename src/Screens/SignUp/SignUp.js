import React from 'react';
import { View, Text, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import {getStyleProps} from './SignUpStyle'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Color from '../../Constants/Color';
import {getImageByTheme} from '../../Constants/Images';
import * as util from '../../Utilities/Utils';
import APILoadingHOC from "../../Components/HOCS/APILoadingHOC";
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/SignupActions';
import Toast from 'react-native-simple-toast';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from 'react-native-google-signin';
//   import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { LoginManager } from "react-native-fbsdk";
import ThemeSingleton from '../../Singleton/Theme';
import {Appearance} from 'react-native-appearance';
import {getLanguageString} from '../../Constants/Message'
let Theme = ThemeSingleton.getInstance()

GoogleSignin.configure({
scopes: ['https://www.googleapis.com/auth/drive.readonly'],
webClientId: '659153366205-2e9ir8g196l41idvfdu1k3mc0vs3o5o0.apps.googleusercontent.com', 
offlineAccess: true, 
hostedDomain: '', 
loginHint: '', 
forceCodeForRefreshToken: true,
accountName: '',
});

class SignUp extends React.Component{
    static ROUTE_NAME = "SignUp";
    state={
        name:"Goku",
        email:"test1@mailinator.com",
        country_code:"+91",
        phone:"0000000000",
        password:"Qwerty@123",
        confirm_password:"Qwerty@123",
        error_email:false,
        error_country_code:false,
        error_phone: false,
        error_password: false,
        error_confirm_password: false,
        attempt:false,
        color:'dark'
    }

    componentDidMount(){
        Theme.setup();
    }

    setCreds = (val, prop) => {
        this.setState({
            [prop]: val
        },()=>{
            if(this.state.attempt){
                this.validate()
            }
        })
        
    }

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("USER INFO FROM GOOGLE : : : ",userInfo)
        //   this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            } else {
            // some other error happened
            }
        }
    };

    isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        this.setState({ isLoginScreenPresented: !isSignedIn });
    };

    getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        console.log("CURRENT USER : : : :",currentUser)
        // this.setState({ currentUser });
    };

    signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
          console.error(error);
        }
      };

      revokeAccess = async () => {
        try {
          await GoogleSignin.revokeAccess();
          console.log('deleted');
        } catch (error) {
          console.error(error);
        }
      };

      

    validate = () => {
        let emailPat = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g
        let countryCodePat = /^([+][0-9]).{0,2}$/gm
        var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        var phonePat = /^(\d+).{9}$/
        var error_email = emailPat.test(this.state.email);
        var error_country_code = countryCodePat.test(this.state.country_code);
        var error_password = mediumRegex.test(this.state.password);
        var error_phone = phonePat.test(this.state.phone)
        var error_confirm_password = this.state.password == this.state.confirm_password
        var error_name = this.state.name != ""
        this.setState({
            error_email:!error_email,
            error_country_code:!error_country_code,
            error_phone: !error_phone,
            error_password: !error_password,
            error_confirm_password: !error_confirm_password,
            error_name:!error_name,
            attempt:true
        })
        return error_email&&error_country_code&&error_password&&error_phone&&error_confirm_password&&error_name
        
    }

    onSuccess = (data) => {
        console.log("Data On Succes", data, "Phone", this.state.phone);
        this.props.navigation.navigate('Otp',
            {
                countryCode: this.state.countryCode,
                phone: this.state.phone,
                email: this.state.email,
            });
    }

    fblogin(){
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function(result) {
              if (result.isCancelled) {
                console.log("Login cancelled");
              } else {
                console.log(
                  "Login success with permissions: " +
                    result.grantedPermissions.toString()
                );
              }
            },
            function(error) {
              console.log("Login fail with error: " + error);
            }
          );
    }

    create_account(){
        this.setState({
            attempt:true
        })
        let valid = this.validate()
        let old_password = this.state.password
        console.log(valid)
        if(valid){
            this.setState({
                password:util.SHA256(this.state.password),
                confirm_password:util.SHA256(this.state.confirm_password)
            },()=>{
                
                try{
                    this.props.hitSignupApi(this.state)
                    .then(
                        (data) => {
                            this.onSuccess(data);
                            console.log("REsponse : : : ",data)
                            Toast.show("Login Success")
                        }
                    ).catch((error) => {
                        console.log("ERROR AI H BHAI : : ",error)
                        if (error.msg) {
                            Toast.show(error.msg)
                        } else {
                            Toast.show("strings.wentWrong")
                        }
                        this.setState({
                            password:old_password,
                            confirm_password:old_password
                        })
                    });
                }catch(e){
                    console.log("Error : ",e)
                }
            })
        }
    }

    render(){
        return (
        <View style={getStyleProps(this.props.theme.color).Container}>
                <View style={getStyleProps(this.props.theme.color).SubContainer}>
                    <View style={getStyleProps(this.props.theme.color).SignUpHeading}>
                        <Text style={getStyleProps(this.props.theme.color).HeaderText}>{getLanguageString(this.props.theme.lang).getting_Started}</Text>
                    </View>
                    <View style={getStyleProps(this.props.theme.color).FormContainer}>
                        <View style={getStyleProps(this.props.theme.color).InputGroup}>
                            <Text style={getStyleProps(this.props.theme.color).lable}>{getLanguageString(this.props.theme.lang).name}</Text>
                            <TextInput style={this.state.error_name?getStyleProps(this.props.theme.color).RongInput:getStyleProps(this.props.theme.color).Input} value={this.state.name} onChangeText={val => { this.setCreds(val, "name") }}/>
                        </View>
                        <View style={getStyleProps(this.props.theme.color).InputGroup}>
                            <Text style={getStyleProps(this.props.theme.color).lable}>{getLanguageString(this.props.theme.lang).email}</Text>
                            <TextInput style={this.state.error_email?getStyleProps(this.props.theme.color).RongInput:getStyleProps(this.props.theme.color).Input} value={this.state.email} onChangeText={val => { this.setCreds(val, "email") }}/>
                        </View>
                        <View style={getStyleProps(this.props.theme.color).InputGroup}>
                            <Text style={getStyleProps(this.props.theme.color).lable}>{getLanguageString(this.props.theme.lang).phone}</Text>
                            <View style={getStyleProps(this.props.theme.color).CountryPhone}>
                                <TextInput style={[this.state.error_country_code?getStyleProps(this.props.theme.color).RongInput:getStyleProps(this.props.theme.color).Input,getStyleProps(this.props.theme.color).Country]} value={this.state.country_code} placeholder="+91" placeholderTextColor={Color[this.props.theme.color].PlaceHolder} maxLength={4} keyboardType="phone-pad" onChangeText={val => { this.setCreds(val, "country_code") }}/>
                                <TextInput style={[this.state.error_phone?getStyleProps(this.props.theme.color).RongInput:getStyleProps(this.props.theme.color).Input,getStyleProps(this.props.theme.color).Phone]} value={this.state.phone} placeholder="xxx-xxx-xxxx" placeholderTextColor={Color[this.props.theme.color].PlaceHolder} maxLength={10} keyboardType="phone-pad" onChangeText={val => { this.setCreds(val, "phone") }} />
                            </View>
                        </View>
                        <View style={getStyleProps(this.props.theme.color).InputGroup}>
                            <Text style={getStyleProps(this.props.theme.color).lable}>{getLanguageString(this.props.theme.lang).password}</Text>
                            <TextInput style={this.state.error_password?getStyleProps(this.props.theme.color).RongInput:getStyleProps(this.props.theme.color).Input} placeholder="**********" secureTextEntry={true} placeholderTextColor={Color[this.props.theme.color].PlaceHolder} value={this.state.password} onChangeText={val => { this.setCreds(val, "password") }}/>
                        </View>
                        <View style={getStyleProps(this.props.theme.color).InputGroup}>
                            <Text style={getStyleProps(this.props.theme.color).lable}>{getLanguageString(this.props.theme.lang).confirm_password}</Text>
                            <TextInput style={this.state.error_confirm_password?getStyleProps(this.props.theme.color).RongInput:getStyleProps(this.props.theme.color).Input}  placeholder="**********" secureTextEntry={true} placeholderTextColor={Color[this.props.theme.color].PlaceHolder} value={this.state.confirm_password} onChangeText={val => { this.setCreds(val, "confirm_password") }}/>
                        </View>
                    </View>
                    <View style={getStyleProps(this.props.theme.color).SubmitButtonContainer}>
                        <TouchableOpacity style={getStyleProps(this.props.theme.color).SubmitButton} onPress={()=>{this.create_account()}}><Text style={getStyleProps(this.props.theme.color).lable}>{getLanguageString(this.props.theme.lang).sign_up}</Text></TouchableOpacity>
                    </View>
                    <View style={getStyleProps(this.props.theme.color).SocialLoginSeparetorContainer}>
                        <View><Text style={getStyleProps(this.props.theme.color).lable}>- - - - - - - - {getLanguageString(this.props.theme.lang).or} - - - - - - - -</Text></View>
                    </View>
                    <View style={getStyleProps(this.props.theme.color).SocialWrapper}>
                        <View style={getStyleProps(this.props.theme.color).SocialLoginContainer}>
                            <View>
                                <TouchableOpacity style={getStyleProps(this.props.theme.color).SocialButton} onPress={()=>{this.signIn()}}><Image source={getImageByTheme(this.props.theme.color).Google} style={getStyleProps(this.props.theme.color).SocialLogo}/></TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style={getStyleProps(this.props.theme.color).SocialButton} onPress={()=>{this.fblogin()}}><Image source={getImageByTheme(this.props.theme.color).Facebook} style={getStyleProps(this.props.theme.color).SocialLogo}/></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
        </View>
        )
    }
}

const mapStateToProps = (state) => {


    const {
        signupResponse,
    } = state.signupReducer;

    const {
        themeReducer
      } = state;



    return {
        signupResponse: signupResponse,
        theme: themeReducer.theme
    };

};
let SignupContainer = connect(mapStateToProps, { ...actions })(SignUp);
let SignupWithLoader = APILoadingHOC(SignupContainer);

SignupWithLoader.getIntent = () => {
    return {
        routeName: SignUpScreen.ROUTE_NAME,
    };
};

export default SignupWithLoader;
    