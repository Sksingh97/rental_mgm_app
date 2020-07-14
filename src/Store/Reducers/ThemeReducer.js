import {
    SET_THEME
} from '../Actions/ActionsTypes'

// initial state for login 
const INITIAL_STATE = {
    theme:{
        color:'dark',
        lang:'en'
    }
}
export default function themeReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_THEME:
            return {
                ...state,
                theme:action.payload
            }
        default:
            return state
    }


}