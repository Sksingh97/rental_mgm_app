import {
    SET_THEME, SET_PREFERENCES
} from '../Actions/ActionsTypes'

// initial state for login 
const INITIAL_STATE = {
    theme:{
        color:'dark',
        lang:'en',
        role:0
    }
}
export default function themeReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_THEME:
            return {
                ...state,
                theme:action.payload
            }
        case SET_PREFERENCES:
            return {
                ...state,
                theme:{
                    color:action.payload.color,
                    lang:action.payload.lang,
                    role:action.payload.role
                }
            }
        default:
            return state
    }


}