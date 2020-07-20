import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, SignUp, Otp, Home } from '../Screens';
import APILoadingHOC from "../Components/HOCS/APILoadingHOC";
import { connect } from 'react-redux';
import * as actions from '../Store/Actions/LoginActions';
import * as LogoutAction from '../Store/Actions/LogoutActions'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
        <Stack.Screen name="login" component={Login} />

        <Stack.Screen name="signup" component={SignUp} />
        <Stack.Screen name="Otp" component={Otp}/>
      </Stack.Navigator>
    );
}

function MyTabNavigation(props) {
    return (
        <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    );
}




class App extends React.Component{
  render(){
    return (
      <NavigationContainer>
        {this.props.authenticated?MyTabNavigation(this.props):MyStack()}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => {


  const {
    authenticated,
  } = state.loginReducer;

  const {
      themeReducer
  } = state;



  return {
    authenticated: authenticated,
      theme: themeReducer.theme
  };

};
let AppContainer = connect(mapStateToProps, { ...actions,...LogoutAction })(App);
let NavWithLoader = APILoadingHOC(AppContainer);

NavWithLoader.getIntent = () => {
  return {
      routeName: LogIn.ROUTE_NAME,
  };
};

export default NavWithLoader;