import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, SignUp, Otp } from '../Screens';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function MyStack() {
    return (
      <Stack.Navigator headerMode="none">
        {/* <Stack.Screen name="login" component={Login} /> */}

        <Stack.Screen name="signup" component={SignUp} />
        <Stack.Screen name="Otp" component={Otp}/>
      </Stack.Navigator>
    );
}

function MyTabNavigation() {
    return (
        <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    );
}

export default function App() {
  return (
    <NavigationContainer>
      {MyStack()}
    </NavigationContainer>
  );
}