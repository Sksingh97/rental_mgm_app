import React, { Component } from 'react';
import { TextInput, View, Text, TouchableOpacity, SafeAreaView, Keyboard, Platform, Image } from 'react-native';
import { getStyleProps } from './HomeStyle'
import { getImageByTheme } from '../../Constants/Images';
import { getLanguageString } from '../../Constants/Message'
import APILoadingHOC from "../../Components/HOCS/APILoadingHOC";
import * as LogoutAction from '../../Store/Actions/LogoutActions'
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import AppAsync from '../../Singleton/AsyncStorage';
import FirebaseSingleton from '../../Singleton/Firebase';
import {RegisterDevice} from '../../Utilities/Utils'

let Firebase = FirebaseSingleton.getInstance()

const AppAsyncStorage = AppAsync.getInstance();

class HomeScreen extends Component {
    static ROUTE_NAME = "Home";

    async componentDidMount(){
        await this.saveFcm();
    }

    saveFcm = async() => {
        let fcmToken = (await AppAsyncStorage.getAsyncData('fcmToken'))||null
        if(fcmToken && fcmToken.length>0){
            this.sendTokenToServer(fcmToken)
        }else{
            fcmToken = (await Firebase.FirebaseInit())||null;
            this.sendTokenToServer(fcmToken)
        }
    }

    sendTokenToServer(token){
        let data = {
            token: this.props.user.token,
            device_type: Platform.OS === 'android' ? "1" : "2",
            fcm_token: token
        }
        RegisterDevice(data)
    }

    render() {
        const { navigation } = this.props;
        let Style_Var = getStyleProps(this.props.theme.color);
        let String_Var = getLanguageString(this.props.theme.lang);
        let Image_Var = getImageByTheme(this.props.theme.color);

        return (
            <SafeAreaView>
                <TouchableOpacity onPress={()=>{this.props.logoutRequestApi("sample").then(data=>{console.log(data)}).catch(err=>{console.log("Error : : :",err)})}}><Text>Logout</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.saveFcm()}}><Text>Save FCM</Text></TouchableOpacity>
            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => {
    const { loginResponse } = state.loginReducer;
    const {
        themeReducer
    } = state;
    return {
        user: {...loginResponse},
        theme: themeReducer.theme
    };
};
let HomeContainer = connect(mapStateToProps, {...LogoutAction })(HomeScreen);
let HomeWithLoader = APILoadingHOC(HomeContainer);

HomeWithLoader.getIntent = () => {
    return {
        routeName: HomeScreen.ROUTE_NAME,
    };
};

// export default HomeScreen;
export default HomeWithLoader;