import React from 'react';
import { View, Text, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { getStyleProps } from './LoginStyle'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Color from '../../Constants/Color';
import { getImageByTheme } from '../../Constants/Images';
import * as util from '../../Utilities/Utils';
import APILoadingHOC from "../../Components/HOCS/APILoadingHOC";
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/LoginActions';
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
    // iosClientId:'659153366205-25dsl9dcaim3dj117p1qi97op50jtom4.apps.googleusercontent.com',
});

class LogIn extends React.Component {
    static ROUTE_NAME = "SignUp";
    state = {
        email: "",
        password: "",
        error_email: false,
        attempt: false,
    }

    componentDidMount() {
        Theme.setup();
        this.setState({
            email: "shudhanshu88@gmail.com",
            password: "Qwerty@123",
            error_email: false,
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
            //   this.setState({ userInfo });
            this.props.hitUserLoginApi({token:userInfo.idToken,email:userInfo.user.email,id:userInfo.user.id,log_in_type:1})
                        .then(
                            (data) => {
                                let user = {...data.user,token:data.token}
                                this.props.RestoreReducer(user);
                                // this.onSuccess(data);
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
                console.log("ERROR !",error)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("ERROR @",error)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("ERROR #",error)
            } else {
                console.log("ERROR $",error)
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
        var error_email = emailPat.test(this.state.email);
        this.setState({
            error_email: !error_email,
            attempt: true
        })
        return error_email 

    }

    onSuccess = (data) => {
        // this.props.navigation.navigate('Otp',
        //     {
        //         countryCode: this.state.countryCode,
        //         phone: this.state.phone,
        //         email: this.state.email,
        //     });
    }

    fblogin=()=> {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            (result) => {
                if (result.isCancelled) {
                } else {
                    
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            
                          this.props.hitUserLoginApi({token:data.accessToken,id:data.userID,log_in_type:2})
                        .then(
                            (data) => {
                                data.user.token = data.token
                                this.props.RestoreReducer(data.user);
                                // this.onSuccess(data);
                                Toast.show("Login Success")
                            }
                        ).catch((error) => {
                            if (error.msg) {
                                Toast.show(error.msg)
                            } else {
                                Toast.show("Something Went Wrong")
                            }
                        });
                        }
                      )
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }

    login=()=> {
        this.setState({
            attempt: true
        })
        let valid = this.validate();
        if (valid) {

                try {
                    this.props.hitUserLoginApi(this.state)
                        .then(
                            (data) => {
                                this.onSuccess(data);
                                // Toast.show("Login Success")
                            }
                        ).catch((error) => {
                            if (error.msg) {
                                Toast.show(error.msg)
                            } else {
                                Toast.show("strings.wentWrong")
                            }
                            // this.setState({
                            //     password: old_password,
                            //     confirm_password: old_password
                            // })
                        });
                } catch (e) {
                    console.log("Error : ", e)
                }
        }
    }

    render() {
        let Style_Var = getStyleProps(this.props.theme.color);
        let String_Var = getLanguageString(this.props.theme.lang);
        let Image_Var = getImageByTheme(this.props.theme.color);;
        return (
            <View style={Style_Var.Container}>
                <View style={Style_Var.SubContainer}>
                    <View>
                        <View style={Style_Var.SignUpHeading}>
                            <Text style={Style_Var.HeaderText}>{String_Var.LOGIN}</Text>
                        </View>
                        <View style={Style_Var.FormContainer}>
                            <View style={Style_Var.InputGroup}>
                                <Text style={Style_Var.lable}>{String_Var.email}</Text>
                                <TextInput style={this.state.error_email ? Style_Var.RongInput : Style_Var.Input} value={this.state.email} onChangeText={val => { this.setCreds(val, "email") }} />
                            </View>
                            <View style={Style_Var.InputGroup}>
                                <Text style={Style_Var.lable}>{String_Var.password}</Text>
                                <TextInput style={this.state.error_password ? Style_Var.RongInput : Style_Var.Input} placeholder="**********" secureTextEntry={true} placeholderTextColor={Color[this.props.theme.color].PlaceHolder} value={this.state.password} onChangeText={val => { this.setCreds(val, "password") }} />
                            </View>
                        </View>
                        <View style={Style_Var.SubmitButtonContainer}>
                            <TouchableOpacity style={Style_Var.SubmitButton} onPress={this.login}><Text style={Style_Var.lable}>{String_Var.LOGIN}</Text></TouchableOpacity>
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
                    <View style={Style_Var.DoNotHaveContainer}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('signup')}}>
                            <Text style={getStyleProps(this.props.theme.colo).DoNotText}>{String_Var.DO_NOT_HAVE_AN_ACCOUNT}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {


    const {
        loginResponse,
    } = state.loginReducer;

    const {
        themeReducer
    } = state;



    return {
        loginResponse: loginResponse,
        theme: themeReducer.theme
    };

};
let LoginContainer = connect(mapStateToProps, { ...actions })(LogIn);
let LoginWithLoader = APILoadingHOC(LoginContainer);

LoginWithLoader.getIntent = () => {
    return {
        routeName: LogIn.ROUTE_NAME,
    };
};

export default LoginWithLoader;
