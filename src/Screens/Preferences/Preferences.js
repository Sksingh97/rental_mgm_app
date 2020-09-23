import React, { Component } from 'react';
import { TextInput, View, Text, TouchableOpacity, SafeAreaView, Keyboard, Platform, Image } from 'react-native';
import { getStyleProps } from './PreferencesStyle'
import { getImageByTheme } from '../../Constants/Images';
import { getLanguageString } from '../../Constants/Message'
import APILoadingHOC from "../../Components/HOCS/APILoadingHOC";
import * as LogoutAction from '../../Store/Actions/LogoutActions'
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import AppAsync from '../../Singleton/AsyncStorage';
import { ScrollView } from 'react-native-gesture-handler';


const AppAsyncStorage = AppAsync.getInstance();

class PreferencesScreen extends Component {
    static ROUTE_NAME = "Preferences";

    async componentDidMount(){
    }

    render() {
        const { navigation } = this.props;
        let Style_Var = getStyleProps(this.props.theme.color);
        let String_Var = getLanguageString(this.props.theme.lang);
        let Image_Var = getImageByTheme(this.props.theme.color);
        console.log(Style_Var)
        return (
            <ScrollView>
                <View style={Style_Var.Container}>
                    <TouchableOpacity onPress={()=>{this.props.logoutRequestApi("sample").then(data=>{console.log(data)}).catch(err=>{console.log("Error : : :",err)})}}><Text>Logout</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.saveFcm()}}><Text>Save FCM</Text></TouchableOpacity>
                </View>
            </ScrollView>
            
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
let PreferencesContainer = connect(mapStateToProps, {...LogoutAction })(PreferencesScreen);
let PreferencesWithLoader = APILoadingHOC(PreferencesContainer);

PreferencesWithLoader.getIntent = () => {
    return {
        routeName: PreferencesScreen.ROUTE_NAME,
    };
};

// export default PreferencesScreen;
export default PreferencesWithLoader;