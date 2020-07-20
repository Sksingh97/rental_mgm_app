import React, { Component } from 'react';
import { TextInput, View, Text, TouchableOpacity, SafeAreaView, Keyboard, Platform, Image } from 'react-native';
import { getStyleProps } from './OtpStyle'
import { getImageByTheme } from '../../Constants/Images';
import { getLanguageString } from '../../Constants/Message'
import * as actions from '../../Store/Actions/OtpActions';
import * as loginAction from '../../Store/Actions/LoginActions'
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
        this.screen = route.name;
        this.state = {
            otp: ["", "", "", ""],
            current: 0,
            emailId: route.params.email,
            phone: route.params.phone
        }
    }

    componentDidMount() {
        if (this.screen != "") {

            // this.sendOtpCode()
        }
    }

    sendOtpCode = () => {
        Keyboard.dismiss();
        this.props.hitResendOtpApi(this.state.emailId, this.state.phone)
            .then(
                (data) => {
                    this.onResendOtpSuccess(data);
                }
            ).catch((error) => {

                if (error.msg) {
                    Toast.show(error.msg)
                } else {
                    Toast.show(String_Var.wentWrong)
                }
            });
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
            Toast.show(String_Var.errorEnterOtp)
            return false;
        } else if (code[1] == "") {
            Toast.show(String_Var.errorEnterOtp)
            return false;
        }
        else if (code[2] == "") {
            Toast.show(String_Var.errorEnterOtp)
            return false;
        }
        else if (code[3] == "") {
            Toast.show(String_Var.errorEnterOtp)
            return false;
        }

        return true;

    }
    submitHandler = (email, phone) => {
        if (this.validate()) {
            const code = this.state.otp.join("");

            Keyboard.dismiss();
            this.props.hitVerifyOtpApi(this.state.emailId.trim(), this.state.phone, code)
                .then(
                    (data) => {
                        this.props.RestoreReducer(data.user);
                        Toast.show(data.msg)
                    }
                ).catch((error) => {
                    if (error.msg) {
                        Toast.show(error.msg)
                    } else {
                        Toast.show(String_Var.wentWrong)
                    }
                });
        }
    }



    onResendOtpSuccess = (data) => {
        Toast.show(String_Var.otpSuccess)
        this.setState({
            otp: ["", "", "", ""],
            current: 0,
        })
    }

    navigate = () => {
        this.props.navigation.goBack();
    }


    render() {
        const { navigation } = this.props;
        const phone = this.props.route.params.phone
        const countryCode = this.props.route.params.countryCode
        const email = this.props.route.params.email
        let Style_Var = getStyleProps(this.props.theme.color);
        let String_Var = getLanguageString(this.props.theme.lang);
        let Image_Var = getImageByTheme(this.props.theme.color);

        return (
            <SafeAreaView style={Style_Var.fullScreen}>
                <View style={Style_Var.HeaderContainer}>
                    <View style={Style_Var.SignUpHeading}>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}><Image source={Image_Var.Back} style={Style_Var.BackButton} /></TouchableOpacity>
                        <Text style={Style_Var.HeaderText}>{String_Var.user_account_verify}</Text>
                    </View>
                </View>

                <View style={Style_Var.textContainer}>
                    <Text style={Style_Var.text}>{String_Var.otp_direction}</Text>
                    <Text style={Style_Var.number}>{countryCode} {phone}, </Text>
                    {/* <Text style={Style_Var.text}> and email :</Text> */}
                    <Text style={Style_Var.number}>{email}</Text>
                </View>
                <View style={Style_Var.inputContainer}>
                    {this.state.otp.map((item, index) => {
                        return (<TextInput ref={index} key={index} value={item} maxLength={1} autoFocus={index == this.state.current} style={Style_Var.input} onChangeText={this.otpChangeHandler.bind(this, index)} keyboardType={'phone-pad'} />);
                    })}
                </View>
                <View style={Style_Var.SubmitButtonContainer}>
                    <TouchableOpacity style={Style_Var.SubmitButton} onPress={() => { this.submitHandler() }}><Text style={Style_Var.lable}>{String_Var.submit}</Text></TouchableOpacity>
                </View>
                <View style={Style_Var.notRecievedContainer}>
                    <Text style={Style_Var.notRecText}>{String_Var.DIDNT_RECIEVED_CODE}</Text>
                </View>
                <TouchableOpacity onPress={() => { this.sendOtpCode(this.state.emailId, this.state.phone) }}>
                    <View style={Style_Var.resendContainer}>
                        <Text style={Style_Var.resend}>{String_Var.RESEND_CODE}</Text>
                    </View>
                </TouchableOpacity>

            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => {
    const { verifyOtpResponse } = state.OtpReducer;
    const {
        themeReducer
    } = state;
    return {
        verifyOtpResponse: verifyOtpResponse,
        theme: themeReducer.theme
    };
};
let otpContainer = connect(mapStateToProps, { ...actions,...loginAction })(OtpScreen);
let OtpWithLoader = APILoadingHOC(otpContainer);

OtpWithLoader.getIntent = () => {
    return {
        routeName: OtpScreen.ROUTE_NAME,
    };
};

// export default OtpScreen;
export default OtpWithLoader;