
import {
    SET_THEME, SET_PREFERENCES, SET_LOGINSTEP
} from './ActionsTypes'


export const setTheme = (data) => {
    return {
        type: SET_THEME,
        payload: data
    }
}

export const setPreferences = (data) => {
    return {
        type: SET_PREFERENCES,
        payload: data
    }
}

export const setLoginStep = (data) => {
    return {
        type:SET_LOGINSTEP,
        payload: null
    }
}

//============================= signup request api===================//

//POST REQUEST
export const setThemeData = (color,lang) =>

    (dispatch) => {
        dispatch(setTheme({color,lang}))
    };

export const SetPreferencesSetting = (color, lang, role) => 
    (dispatch) => {
        dispatch(setPreferences({color, lang, role}))
        dispatch(setLoginStep())

    }