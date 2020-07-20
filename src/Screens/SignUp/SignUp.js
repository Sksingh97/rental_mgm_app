import React from 'react';
import { View, Text, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { getStyleProps } from './SignUpStyle'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Color from '../../Constants/Color';
import { getImageByTheme } from '../../Constants/Images';
import * as util from '../../Utilities/Utils';
import APILoadingHOC from "../../Components/HOCS/APILoadingHOC";
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/SignupActions';
import * as loginAction from '../../Store/Actions/LoginActions'
import Toast from 'react-native-simple-toast';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from 'react-native-google-signin';
//   import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import ThemeSingleton from '../../Singleton/Theme';
import { Appearance } from 'react-native-appearance';
import { getLanguageString } from '../../Constants/Message'
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

class SignUp extends React.Component {
    static ROUTE_NAME = "SignUp";
    state = {
        name: "",
        email: "",
        country_code: "",
        phone: "",
        password: "",
        confirm_password: "",
        error_email: false,
        error_country_code: false,
        error_phone: false,
        error_password: false,
        error_confirm_password: false,
        attempt: false,
    }

    componentDidMount() {
        Theme.setup();
        this.setState({
            name: "",
            email: "",
            country_code: "",
            phone: "",
            password: "",
            confirm_password: "",
            error_email: false,
            error_country_code: false,
            error_phone: false,
            error_password: false,
            error_confirm_password: false,
            attempt: false,
        })
    }

    setCreds = (val, prop) => {
        this.setState({
            [prop]: val
        }, () => {
            if (this.state.attempt) {
                this.validate()
            }
        })

    }

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.props.hitSignupApi({token:userInfo.idToken,email:userInfo.user.email,name:userInfo.user.givenName+userInfo.user.familyName,id:userInfo.user.id,sign_up_type:1})
                        .then(
                            (data) => {
                                data.user.token = data.token
                                this.props.RestoreReducer(data.user);
                                Toast.show("Login Success")
                            }
                        ).catch((error) => {
                            if (error.msg) {
                                Toast.show(error.msg)
                            } else {
                                Toast.show("strings.wentWrong")
                            }
                        });
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
            error_email: !error_email,
            error_country_code: !error_country_code,
            error_phone: !error_phone,
            error_password: !error_password,
            error_confirm_password: !error_confirm_password,
            error_name: !error_name,
            attempt: true
        })
        return error_email && error_country_code && error_password && error_phone && error_confirm_password && error_name

    }

    onSuccess = (data) => {
        this.props.navigation.navigate('Otp',
            {
                countryCode: this.state.countryCode,
                phone: this.state.phone,
                email: this.state.email,
            });
    }

    fblogin=()=> {
        LoginManager.logInWithPermissions(["public_profile","email","user_photos"]).then(
           (result)=>{
                if (result.isCancelled) {
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {

                    this.props.hitSignupApi({token:data.accessToken,id:data.userID,sign_up_type:2})
                        .then(
                            (data) => {
                                data.user.token = data.token
                                this.props.RestoreReducer(data.user);
                                Toast.show("Login Success")
                            }
                        ).catch((error) => {
                            if (error.msg) {
                                Toast.show(error.msg)
                            } else {
                                Toast.show("strings.wentWrong")
                            }
                        });
                    });
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }

    create_account() {
        this.setState({
            attempt: true
        })
        let valid = this.validate()
        if (valid) {

                try {
                    this.props.hitSignupApi(this.state)
                        .then(
                            (data) => {
                                this.onSuccess(data);
                                Toast.show("Login Success")
                            }
                        ).catch((error) => {
                            if (error.msg) {
                                Toast.show(error.msg)
                            } else {
                                Toast.show("strings.wentWrong")
                            }
                        });
                } catch (e) {
                    console.log("Error : ", e)
                }
        }
    }

    render() {
        let Style_Var = getStyleProps(this.props.theme.color);
        let String_Var = getLanguageString(this.props.theme.lang);
        let Image_Var = getImageByTheme(this.props.theme.color);
        return (
            <ScrollView>
            <View style={Style_Var.Container}>
                <View style={Style_Var.SubContainer}>
                    <View style={Style_Var.SignUpHeading}>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}><Image source={Image_Var.Back} style={Style_Var.BackButton} /></TouchableOpacity>
                        <Text style={Style_Var.HeaderText}>{String_Var.getting_Started}</Text>
                    </View>
                    <View style={Style_Var.FormContainer}>
                        <View style={Style_Var.InputGroup}>
                            <Text style={Style_Var.lable}>{String_Var.name}</Text>
                            <TextInput style={this.state.error_name ? Style_Var.RongInput : Style_Var.Input} value={this.state.name} onChangeText={val => { this.setCreds(val, "name") }} />
                        </View>
                        <View style={Style_Var.InputGroup}>
                            <Text style={Style_Var.lable}>{String_Var.email}</Text>
                            <TextInput style={this.state.error_email ? Style_Var.RongInput : Style_Var.Input} value={this.state.email} onChangeText={val => { this.setCreds(val, "email") }} />
                        </View>
                        <View style={Style_Var.InputGroup}>
                            <Text style={Style_Var.lable}>{String_Var.phone}</Text>
                            <View style={Style_Var.CountryPhone}>
                                <TextInput style={[this.state.error_country_code ? Style_Var.RongInput : Style_Var.Input, Style_Var.Country]} value={this.state.country_code} placeholder="+91" placeholderTextColor={Color[this.props.theme.color].PlaceHolder} maxLength={4} keyboardType="phone-pad" onChangeText={val => { this.setCreds(val, "country_code") }} />
                                <TextInput style={[this.state.error_phone ? Style_Var.RongInput : Style_Var.Input, Style_Var.Phone]} value={this.state.phone} placeholder="xxx-xxx-xxxx" placeholderTextColor={Color[this.props.theme.color].PlaceHolder} maxLength={10} keyboardType="phone-pad" onChangeText={val => { this.setCreds(val, "phone") }} />
                            </View>
                        </View>
                        <View style={Style_Var.InputGroup}>
                            <Text style={Style_Var.lable}>{String_Var.password}</Text>
                            <TextInput style={this.state.error_password ? Style_Var.RongInput : Style_Var.Input} placeholder="**********" secureTextEntry={true} placeholderTextColor={Color[this.props.theme.color].PlaceHolder} value={this.state.password} onChangeText={val => { this.setCreds(val, "password") }} />
                        </View>
                        <View style={Style_Var.InputGroup}>
                            <Text style={Style_Var.lable}>{String_Var.confirm_password}</Text>
                            <TextInput style={this.state.error_confirm_password ? Style_Var.RongInput : Style_Var.Input} placeholder="**********" secureTextEntry={true} placeholderTextColor={Color[this.props.theme.color].PlaceHolder} value={this.state.confirm_password} onChangeText={val => { this.setCreds(val, "confirm_password") }} />
                        </View>
                    </View>
                    <View style={Style_Var.SubmitButtonContainer}>
                        <TouchableOpacity style={Style_Var.SubmitButton} onPress={() => { this.create_account() }}><Text style={Style_Var.lable}>{String_Var.sign_up}</Text></TouchableOpacity>
                    </View>
                    <View style={Style_Var.SocialLoginSeparetorContainer}>
                        <View><Text style={Style_Var.lable}>- - - - - - - - {String_Var.or} - - - - - - - -</Text></View>
                    </View>
                    <View style={Style_Var.SocialWrapper}>
                        <View style={Style_Var.SocialLoginContainer}>
                            <View>
                                <TouchableOpacity style={Style_Var.SocialButton} onPress={() => { this.signIn() }}><Image source={Image_Var.Google} style={Style_Var.SocialLogo} /></TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style={Style_Var.SocialButton} onPress={() => { this.fblogin() }}><Image source={Image_Var.Facebook} style={Style_Var.SocialLogo} /></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            </ScrollView>
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
let SignupContainer = connect(mapStateToProps, { ...actions,...loginAction })(SignUp);
let SignupWithLoader = APILoadingHOC(SignupContainer);

SignupWithLoader.getIntent = () => {
    return {
        routeName: SignUpScreen.ROUTE_NAME,
    };
};

export default SignupWithLoader;
