import React, { Component } from 'react';
import { TextInput, View, Text, TouchableOpacity, SafeAreaView, Keyboard, Platform, Image } from 'react-native';
import style from './OtpStyle'
import * as Images from '../../Constants/Images'
// import Header from '../../components/Header/HeaderComponent'

// import CustomButton from '../../components/Button/CustomButton'
import strings from '../../Constants/Message';
import * as actions from '../../Store/Actions/OtpActions'
import APILoadingHOC from "../../Components/HOCS/APILoadingHOC";
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
// import AppUser  from '../../utilities/AppUser'
// import AsyncStorage from '@react-native-community/async-storage';
// import { isPlatformIOS } from '../../utilities/Utils'

class OtpScreen extends Component {
    static ROUTE_NAME = "Otp";

    constructor(props) {
        super(props);
        const { navigation, route } = this.props;
        console.log(navigation,"\n\n\n",route)
        this.screen = route.name;
        email = route.params.email
        this.state = {
            otp: ["", "", "", ""],
            current: 0,
            emailId: email
        }
    }

    componentDidMount() {
        console.log("===================================ComponentDidMount", this.screen)
        if (this.screen != "") {

            Keyboard.dismiss();
            // this.props.hitResendOtpApi(this.state.emailId)
            //     .then(
            //         (data) => {
            //             this.onResendOtpSuccess(data);
            //         }
            //     ).catch((error) => {
            //         if (error.msg) {
            //             Toast.show(error.msg)
            //         } else {
            //             Toast.show(strings.wentWrong)
            //         }
            //     });
        }
    }


    otpChangeHandler = (index, text) => {
        if (text === "" || text === " ") {
            if (this.state.current >= 0) {
                let newOtp = this.state.otp.map((item, loc) => {
                    if (loc === index) {
                        return "";
                    } else {
                        return item;
                    }
                })
                this.setState({
                    otp: newOtp,
                    current: (this.state.current === 0) ? this.state.current : this.state.current - 1,
                }, () => {
                    this.focusNextField(this.state.current)
                })
            }
        } else {
            let newOtp = this.state.otp.map((item, loc) => {
                if (loc === index) {
                    return text;
                } else {
                    return item;
                }
            })
            this.setState({
                otp: newOtp,
                current: (this.state.current < this.state.otp.length - 1) ? this.state.current + 1 : this.state.current,
            }, () => {
                this.focusNextField(this.state.current)
            })
        }

    }

    focusNextField(nextField) {
        this.refs[nextField].focus();
    }

    validate = () => {
        const code = this.state.otp;
        if (code[0] == "") {
            Toast.show(strings.errorEnterOtp)
            return false;
        } else if (code[1] == "") {
            Toast.show(strings.errorEnterOtp)
            return false;
        }
        else if (code[2] == "") {
            Toast.show(strings.errorEnterOtp)
            return false;
        }
        else if (code[3] == "") {
            Toast.show(strings.errorEnterOtp)
            return false;
        }

        return true;

    }
    submitHandler = (email, phone) => {
        if (this.validate()) {
            const code = this.state.otp.join("");

            console.log("email", email, "phone", phone)
            Keyboard.dismiss();
            this.props.hitVerifyOtpApi(email.trim(), phone, code)
                .then(
                    (data) => {
                        this.onVerifyOtpSuccess(data);
                    }
                ).catch((error) => {
                    if (error.msg) {
                        Toast.show(error.msg)
                    } else {
                        Toast.show(strings.wentWrong)
                    }
                });
        }
    }

    onVerifyOtpSuccess = async(data) => {
        // console.log("Data", data)
        // let appUsrObj = AppUser.getInstance();
        // appUsrObj.token = data.user.token;
        // appUsrObj.userId = data.user.id;
        // appUsrObj.userDetails = data.user;

        // const userToken = ["@USER_TOKEN", data.user.token];
        // const userId = ["@USER_ID", data.user.id.toString()];
        // const userDetails = ["@USER_DETAILS", JSON.stringify(data.user)];
        // try {
        //     await AsyncStorage.multiSet([userToken, userId, userDetails])
        // } catch (e) {
        //     console.log("Error saving user details", e);
        // }
        // console.log("data", data);
        // this.props.navigation.navigate("UserLocationScreen")
    }

    resendOtp = (email, phone) => {

        Keyboard.dismiss();
        // this.props.hitResendOtpApi(email.trim(), phone)
        //     .then(
        //         (data) => {
        //             this.onResendOtpSuccess(data);
        //         }
        //     ).catch((error) => {
        //         if (error.msg) {
        //             Toast.show(error.msg)
        //         } else {
        //             Toast.show(strings.wentWrong)
        //         }
        //     });
    }

    onResendOtpSuccess = (data) => {
        console.log("Data", data)
        Toast.show(strings.otpSuccess)
        this.setState({
            otp: ["", "", "", ""],
            current: 0,
        })
    }

    navigate = () => {
        this.props.navigation.goBack();
    }


    render() {
        // console.log("Phone", this.props.route.params.phone, "countryCode", this.props.navigation.getParam('countryCode'), "email", this.props.navigation.getParam('email'))
        const { navigation } = this.props;
        const phone = this.props.route.params.phone
        const countryCode = this.props.route.params.countryCode
        const email = this.props.route.params.email

        return (
            <SafeAreaView style={style.fullScreen}>
                <View style={style.HeaderContainer}>
                    <View style={style.SignUpHeading}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}><Image source={Images.Back} style={style.BackButton}/></TouchableOpacity>
                        <Text style={style.HeaderText}>Mobile Verification</Text>
                    </View>
                </View>
                
                <View style={style.textContainer}>
                    <Text style={style.text}>Enter 4 digit pass code sent to you at </Text><Text style={style.number}>{countryCode} {phone}</Text>
                </View>
                <View style={style.inputContainer}>
                    {this.state.otp.map((item, index) => {
                        console.log(index == this.state.current);
                        return (<TextInput ref={index} key={index} value={item} maxLength={1} autoFocus={index == this.state.current} style={style.input} onChangeText={this.otpChangeHandler.bind(this, index)} keyboardType={'phone-pad'} />);
                    })}
                </View>
                <View style={style.SubmitButtonContainer}>
                    <TouchableOpacity style={style.SubmitButton} onPress={()=>{this.submitHandler()}}><Text style={style.lable}>Submit</Text></TouchableOpacity>
                </View>
                <View style={style.notRecievedContainer}>
                    <Text style={style.notRecText}>{strings.DIDNT_RECIEVED_CODE}</Text>
                </View>
                <TouchableOpacity onPress={() => { this.resendOtp(email, phone) }}>
                    <View style={style.resendContainer}>
                        <Text style={style.resend}>{strings.RESEND_CODE}</Text>
                    </View>
                </TouchableOpacity>

            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => {
    const { verifyOtpResponse } = state.OtpReducer;
    return {
        verifyOtpResponse: verifyOtpResponse
    };
};
let otpContainer = connect(mapStateToProps, { ...actions })(OtpScreen);
let OtpWithLoader = APILoadingHOC(otpContainer);

OtpWithLoader.getIntent = () => {
    return {
        routeName: OtpScreen.ROUTE_NAME,
    };
};

// export default OtpScreen;
export default OtpWithLoader;