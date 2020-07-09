import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import style from './SignUpStyle'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as Color from '../../Constants/Color';
import * as Images from '../../Constants/Images';
export default ()=>(
    <View style={style.Container}>
        {/* <ScrollView> */}
            <View style={style.SubContainer}>
                <View style={style.SignUpHeading}>
                    <Text style={style.HeaderText}>Getting Started</Text>
                </View>
                <View style={style.FormContainer}>
                    <View style={style.InputGroup}>
                        <Text style={style.lable}>Name</Text>
                        <TextInput style={style.Input}/>
                    </View>
                    <View style={style.InputGroup}>
                        <Text style={style.lable}>Email</Text>
                        <TextInput style={style.Input}/>
                    </View>
                    <View style={style.InputGroup}>
                        <Text style={style.lable}>Phone</Text>
                        <View style={style.CountryPhone}>
                            <TextInput style={[style.Input,style.Country]} placeholder="+91" placeholderTextColor={Color.OffWhite} maxLength={4} keyboardType="phone-pad"/>
                            <TextInput style={[style.Input,style.Phone]} placeholder="xxx-xxx-xxxx" placeholderTextColor={Color.OffWhite} maxLength={10} keyboardType="phone-pad"/>
                        </View>
                    </View>
                    <View style={style.InputGroup}>
                        <Text style={style.lable}>Password</Text>
                        <TextInput style={style.Input} placeholder="**********" placeholderTextColor={Color.OffWhite}/>
                    </View>
                    <View style={style.InputGroup}>
                        <Text style={style.lable}>Confirm Password</Text>
                        <TextInput style={style.Input}  placeholder="**********" placeholderTextColor={Color.OffWhite}/>
                    </View>
                </View>
                <View style={style.SubmitButtonContainer}>
                    <TouchableOpacity style={style.SubmitButton}><Text style={style.lable}>Sign Up</Text></TouchableOpacity>
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