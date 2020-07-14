
import {
    SET_THEME
} from './ActionsTypes'


export const setTheme = (data) => {
    return {
        type: SET_THEME,
        payload: data
    }
}

//============================= signup request api===================//

//POST REQUEST
export const setThemeData = (color,lang) =>

    (dispatch) => {
        dispatch(setTheme({color,lang}))
    };