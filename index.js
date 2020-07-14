/**
 * @format
 */
import React, { useState, useEffect } from 'react';

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { Provider } from 'react-redux'
import store from './src/Store';

store.subscribe(() => {
    console.log("NEW STAT : ", store.getState());
  })
const container = ()=>(
    <Provider store={store}>
        <App/>
    </Provider>
)
AppRegistry.registerComponent(appName, () => container);
