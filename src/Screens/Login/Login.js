import React from 'react';
import { View, Text, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import style from './LoginStyle'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as Color from '../../Constants/Color';
import * as Images from '../../Constants/Images';
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
//   659153366205-ht7h6sdjjr890e5ejh2n0pgqp7rv57s1.apps.googleusercontent.com
// web secret: TU4CIbEQr9cCIpKG92beG610
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '659153366205-2e9ir8g196l41idvfdu1k3mc0vs3o5o0.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    // iosClientId: '659153366205-25dsl9dcaim3dj117p1qi97op50jtom4.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });

class LogIn extends React.Component{
    static ROUTE_NAME = "LogIn";
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
        attempt:false
    }

    componentDidMount(){
        // this.getCurrentUser();
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
        <View style={style.Container}>
            {/* <ScrollView> */}
                <View style={style.SubContainer}>
                    <View style={style.SignUpHeading}>
                        <Text style={style.HeaderText}>Login</Text>
                    </View>
                    <View style={style.FormContainer}>
                        {/* <View style={style.InputGroup}>
                            <Text style={style.lable}>Name</Text>
                            <TextInput style={this.state.error_name?style.RongInput:style.Input} value={this.state.name} onChangeText={val => { this.setCreds(val, "name") }}/>
                        </View> */}
                        <View style={style.InputGroup}>
                            <Text style={style.lable}>Email</Text>
                            <TextInput style={this.state.error_email?style.RongInput:style.Input} value={this.state.email} onChangeText={val => { this.setCreds(val, "email") }}/>
                        </View>
                        {/* <View style={style.InputGroup}>
                            <Text style={style.lable}>Phone</Text>
                            <View style={style.CountryPhone}>
                                <TextInput style={[this.state.error_country_code?style.RongInput:style.Input,style.Country]} value={this.state.country_code} placeholder="+91" placeholderTextColor={Color.OffWhite} maxLength={4} keyboardType="phone-pad" onChangeText={val => { this.setCreds(val, "country_code") }}/>
                                <TextInput style={[this.state.error_phone?style.RongInput:style.Input,style.Phone]} value={this.state.phone} placeholder="xxx-xxx-xxxx" placeholderTextColor={Color.OffWhite} maxLength={10} keyboardType="phone-pad" onChangeText={val => { this.setCreds(val, "phone") }} />
                            </View>
                        </View> */}
                        <View style={style.InputGroup}>
                            <Text style={style.lable}>Password</Text>
                            <TextInput style={this.state.error_password?style.RongInput:style.Input} placeholder="**********" secureTextEntry={true} placeholderTextColor={Color.OffWhite} value={this.state.password} onChangeText={val => { this.setCreds(val, "password") }}/>
                        </View>
                        {/* <View style={style.InputGroup}>
                            <Text style={style.lable}>Confirm Password</Text>
                            <TextInput style={this.state.error_confirm_password?style.RongInput:style.Input}  placeholder="**********" secureTextEntry={true} placeholderTextColor={Color.OffWhite} value={this.state.confirm_password} onChangeText={val => { this.setCreds(val, "confirm_password") }}/>
                        </View> */}
                    </View>
                    <View style={style.SubmitButtonContainer}>
                        <TouchableOpacity style={style.SubmitButton} onPress={()=>{this.create_account()}}><Text style={style.lable}>Log In</Text></TouchableOpacity>
                    </View>
                    <View style={style.SocialLoginSeparetorContainer}>
                        <View><Text style={style.lable}>- - - - - - - - OR - - - - - - - -</Text></View>
                    </View>
                    <View style={style.SocialWrapper}>
                        <View style={style.SocialLoginContainer}>
                            <View>
                                <TouchableOpacity style={style.SocialButton} onPress={()=>{this.signIn()}}><Image source={Images.Google} style={style.SocialLogo}/></TouchableOpacity>
                            </View>
                            <View>
                            {/* <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/> */}
                                <TouchableOpacity style={style.SocialButton} onPress={()=>{this.fblogin()}}><Image source={Images.Facebook} style={style.SocialLogo}/></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            {/* </ScrollView> */}
        </View>
        )
    }
}

const mapStateToProps = (state) => {


    const {
        loginResponse
    } = state.loginReducer;



    return {
        loginResponse: loginResponse
    };

};
let LoginContainer = connect(mapStateToProps, { ...actions })(LogIn);
let LoginWithLoader = APILoadingHOC(LoginContainer);

LoginWithLoader.getIntent = () => {
    return {
        routeName: LoginScreen.ROUTE_NAME,
    };
};

export default LoginWithLoader;
    