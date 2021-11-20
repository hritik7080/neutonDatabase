import * as ACTION_TYPES from '../actions/action_types'

const initialState = {
  userToken: null,
  isLogged: false,
  isFeedbacked: false
}

const profileReducer = (state = initialState, action) => {
    switch(action.type){
      case ACTION_TYPES.LOGIN_SUCCESS:
        return {
          ...state,
          isLogged: true,
          userToken: action.userToken
        }
      case ACTION_TYPES.LOGOUT_SUCCESS:
        return {
          ...state,
          isLogged: false,
          userToken: null
        }
      case ACTION_TYPES.FEEDBACK_SUCCESS:
        return {
          ...state,
          isFeedbacked: true
        }
      default:
        return state
    }
}

export default profileReducer;