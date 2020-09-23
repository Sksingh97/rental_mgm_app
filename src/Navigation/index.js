import * as React from 'react';
import { Text, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, SignUp, Otp, Home, Preferences, Detail,Filter,Theme } from '../Screens';
import APILoadingHOC from "../Components/HOCS/APILoadingHOC";
import { connect } from 'react-redux';
import * as actions from '../Store/Actions/LoginActions';
import * as LogoutAction from '../Store/Actions/LogoutActions'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStyleProps } from './NavStyle'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function AuthStack() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={SignUp} />
        <Stack.Screen name="Otp" component={Otp}/>
      </Stack.Navigator>
    );
}


const MyTabNavigation=(property) =>{
  console.log("MY STACK : : :  : ",property.theme)
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            console.log("Color : : : ",color)
            if (route.name === 'Home') {
              iconName = focused
                ? 'md-home'
                :'md-home'
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list';
            }else if(route.name === 'Preferences'){
              iconName = focused ? 'ios-settings' : 'ios-settings';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: property.theme.color=="light"?"tomato":"#fff",
          inactiveTintColor: property.theme.color=="light"?'#777':"gray",
          style:getStyleProps(property.theme.color).tabNav,
        }}
        >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Preferences" component={Preferences}/>
      </Tab.Navigator>
    );
}

const AppNavigation=()=>(
<Stack.Navigator headerMode="none">
  <Stack.Screen name="App" component={TabNavWithLoader} />
  <Stack.Screen name="Detail" component={Detail} />
  <Stack.Screen name="Filter" component={Filter} />
</Stack.Navigator>
)




class App extends React.Component{
  render(){
    console.log("SET THEME CHECK IN APP : : : :",this.props.login_step)
    return (
      <NavigationContainer>
        {this.props.authenticated?this.props.login_step==0?<Theme/>:AppNavigation(this.props):AuthStack()}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => {


  const {
    authenticated,
    login_step
  } = state.loginReducer;

  const {
      themeReducer
  } = state;



  return {
    authenticated: authenticated,
      theme: themeReducer.theme,
      login_step:login_step
  };

};
let AppContainer = connect(mapStateToProps, { ...actions,...LogoutAction })(App);
let MyTabContainer = connect(mapStateToProps, { ...actions,...LogoutAction })(MyTabNavigation);

let NavWithLoader = APILoadingHOC(AppContainer);
let TabNavWithLoader = APILoadingHOC(MyTabContainer);


NavWithLoader.getIntent = () => {
  return {
      routeName: LogIn.ROUTE_NAME,
  };
};

export default NavWithLoader;