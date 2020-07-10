import React from 'react';
import { View, Text, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import style from './SignUpStyle'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as Color from '../../Constants/Color';
import * as Images from '../../Constants/Images';
import * as util from '../../Utilities/Utils';
import APILoadingHOC from "../../Components/HOCS/APILoadingHOC";
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/SignupActions';
import Toast from 'react-native-simple-toast';



class SignUp extends React.Component{
    static ROUTE_NAME = "SignUp";
    state={
        name:"Goku",
        email:"Shudhanshu88@gmail.com",
        country_code:"+91",
        phone:"9717074214",
        password:"Qwerty@123",
        confirm_password:"Qwerty@123",
        error_email:false,
        error_country_code:false,
        error_phone: false,
        error_password: false,
        error_confirm_password: false,
        attempt:false
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
                            // this.onSuccess(data);
                            console.log("REsponse : : : ",data)
                            Toast.show("Login Success")
                        }
                    ).catch((error) => {
                        console.log("ERROR AI H BHAI : : ",error)
                        if (error.msg) {
                            Toast.show(error.msg)
                        } else {
                            Toast.show(strings.wentWrong)
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
                        <Text style={style.HeaderText}>Getting Started</Text>
                    </View>
                    <View style={style.FormContainer}>
                        <View style={style.InputGroup}>
                            <Text style={style.lable}>Name</Text>
                            <TextInput style={this.state.error_name?style.RongInput:style.Input} value={this.state.name} onChangeText={val => { this.setCreds(val, "name") }}/>
                        </View>
                        <View style={style.InputGroup}>
                            <Text style={style.lable}>Email</Text>
                            <TextInput style={this.state.error_email?style.RongInput:style.Input} value={this.state.email} onChangeText={val => { this.setCreds(val, "email") }}/>
                        </View>
                        <View style={style.InputGroup}>
                            <Text style={style.lable}>Phone</Text>
                            <View style={style.CountryPhone}>
                                <TextInput style={[this.state.error_country_code?style.RongInput:style.Input,style.Country]} value={this.state.country_code} placeholder="+91" placeholderTextColor={Color.OffWhite} maxLength={4} keyboardType="phone-pad" onChangeText={val => { this.setCreds(val, "country_code") }}/>
                                <TextInput style={[this.state.error_phone?style.RongInput:style.Input,style.Phone]} value={this.state.phone} placeholder="xxx-xxx-xxxx" placeholderTextColor={Color.OffWhite} maxLength={10} keyboardType="phone-pad" onChangeText={val => { this.setCreds(val, "phone") }} />
                            </View>
                        </View>
                        <View style={style.InputGroup}>
                            <Text style={style.lable}>Password</Text>
                            <TextInput style={this.state.error_password?style.RongInput:style.Input} placeholder="**********" secureTextEntry={true} placeholderTextColor={Color.OffWhite} value={this.state.password} onChangeText={val => { this.setCreds(val, "password") }}/>
                        </View>
                        <View style={style.InputGroup}>
                            <Text style={style.lable}>Confirm Password</Text>
                            <TextInput style={this.state.error_confirm_password?style.RongInput:style.Input}  placeholder="**********" secureTextEntry={true} placeholderTextColor={Color.OffWhite} value={this.state.confirm_password} onChangeText={val => { this.setCreds(val, "confirm_password") }}/>
                        </View>
                    </View>
                    <View style={style.SubmitButtonContainer}>
                        <TouchableOpacity style={style.SubmitButton} onPress={()=>{this.create_account()}}><Text style={style.lable}>Sign Up</Text></TouchableOpacity>
                    </View>
                    <View style={style.SocialLoginSeparetorContainer}>
                        <View><Text style={style.lable}>- - - - - - - - OR - - - - - - - -</Text></View>
                    </View>
                    <View style={style.SocialWrapper}>
                        <View style={style.SocialLoginContainer}>
                            <View>
                                <TouchableOpacity style={style.SocialButton}><Image source={Images.Google} style={style.SocialLogo}/></TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style={style.SocialButton}><Image source={Images.Facebook} style={style.SocialLogo}/></TouchableOpacity>
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
        signupResponse
    } = state.signupReducer;



    return {
        signupResponse: signupResponse
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
    