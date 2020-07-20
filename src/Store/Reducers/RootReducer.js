import { combineReducers } from 'redux';
import loginReducer from '../Reducers/LoginReducer'
import api_reducer from '../Reducers/ApiReducer'
import signupReducer from '../Reducers/SignupReducer'
import OtpReducer from '../Reducers/OtpReducer'
import PhoneNumberReducer from '../Reducers/PhoneNumberReducer'
import themeReducer from '../Reducers/ThemeReducer'
import AppAsyncStorage from '../../Singleton/AsyncStorage';

const AppStorage = AppAsyncStorage.getInstance()

let appReducer = combineReducers({
  loginReducer,
  api_reducer,
  signupReducer,
  OtpReducer,
  PhoneNumberReducer,
  themeReducer
  
});

let rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
    AppStorage.clearStorage()
  }
  return appReducer(state, action)
}

export default rootReducer;