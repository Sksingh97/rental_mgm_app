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
} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import { Platform, NativeModules,AsyncStorage } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import Navigation from './src/Navigation';
import store from './src/Store';
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native';
import {Main_BackGround} from "./src/Constants/Color"

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!',Platform.OS, remoteMessage);
});

AppRegistry.registerComponent('app', () => App);

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
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
      this.requestUserPermission();
      this.un_subscriber = this.requrstHandler()
      // let msg = await messaging().registerDeviceForRemoteMessages();
        // console.log("MESSAGE : : : ",msg)
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
        console.log("FCM TOKEN : : : ",fcmToken)
  }

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async requrstHandler(){
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
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
