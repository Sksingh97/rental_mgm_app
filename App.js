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
import messaging from '@react-native-firebase/messaging';

import { Platform, NativeModules,AsyncStorage } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import Navigation from './src/Navigation';
import store from './src/Store';
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native';
import {Main_BackGround} from "./src/Constants/Color"
import {Appearance} from 'react-native-appearance';
import AppUser from './src/Singleton/AsyncStorage';
import FirebaseSingleton from './src/Singleton/Firebase'

let Firebase = FirebaseSingleton.getInstance()
let AppAsync = AppUser.getInstance()
const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

console.log(deviceLanguage); //en_US


store.subscribe(() => {
  console.log("NEW STAT : ", store.getState());
})


class App extends React.Component {
  
  async componentDidMount() {
    AppAsync.setInstance()
    Firebase.FirebaseInit()
    Firebase.backGroundHandler()
    await this.setupColorScheme();
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
      
  }

  async setupColorScheme(){
    // let colorScheme = await AppAsync.getAsyncData('colorScheme')
    // if(!colorScheme){
    //   AppAsync.setAsyncData('colorScheme',Appearance.getColorScheme())
    // }
  }  

  render (){
  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content"/>}
      <SafeAreaView style={{flex:1,backgroundColor:Main_BackGround}}>
        <Provider store={store}>
          <Navigation/>
        </Provider>
      </SafeAreaView>
    </>
  );
}

}


export default App;
