/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import { Platform, NativeModules,AsyncStorage } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import Navigation from './src/Navigation';
import {Appearance} from 'react-native-appearance';
import AppUser from './src/Singleton/AsyncStorage';
import FirebaseSingleton from './src/Singleton/Firebase';
import APILoadingHOC from "./src/Components/HOCS/APILoadingHOC";
import { connect } from 'react-redux';
import * as actions from './src/Store/Actions/ThemeAction';
import * as loginAction from './src/Store/Actions/LoginActions'
import {getThemeSettings} from './src/Constants/Settings';
import {getThemeColor} from './src/Constants/Color'
import { ScrollView } from 'react-native-gesture-handler';

let Firebase = FirebaseSingleton.getInstance()
let AppAsync = AppUser.getInstance()

class App extends React.Component {
  
  async componentDidMount() {
    AppAsync.setInstance()
    await this.setupTheme();
    await this.RestorReducer()
    Firebase.FirebaseInit()
    Firebase.backGroundHandler()
    SplashScreen.hide();
  }

  async RestorReducer(){
    let data = await AppAsync.getAsyncData();
    if(data && data.token){
      let status = await this.props.RestoreReducer(data)
    }
  }

  async setupTheme(){
    let colorScheme = await AppAsync.getAsyncData('colorScheme')
    if(!colorScheme){
      colorScheme = Appearance.getColorScheme() == "dark"?"dark":"light"
      console.log("GETTING : : :",colorScheme)
      
      AppAsync.setAsyncData('colorScheme',colorScheme)
    }

    
    let lang = await AppAsync.getAsyncData('lang')

    if(!lang){
      lang =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;
      AppAsync.setAsyncData('lang',lang.split('_')[0])
    }
    this.props.setThemeData(colorScheme,lang.split('_')[0])

  }  

  render (){
  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle={getThemeSettings(this.props.theme.color).Status_bar}/>}
      <SafeAreaView style={{flex:1,backgroundColor:getThemeColor(this.props.theme.color).Main_BackGround}}>
        {/* <ScrollView style={{flex:1}}> */}
          <Navigation/>
        {/* </ScrollView> */}
      </SafeAreaView>
    </>
  );
}

}

const mapStateToProps = (state) => {


  const {
    themeReducer
  } = state;




  return {
    theme: themeReducer.theme
  };

};
let AppContainer = connect(mapStateToProps, { ...actions,...loginAction })(App);
let AppWithLoader = APILoadingHOC(AppContainer);

AppWithLoader.getIntent = () => {
  return {
      routeName: SignUpScreen.ROUTE_NAME,
  };
};

export default AppWithLoader;

