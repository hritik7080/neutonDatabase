import * as ACTION_TYPES from '../actions/action_types'

const initialState = {
  logic: false,
  user_data: ''
}

const testReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.SUCCESS:
        return {
          ...state,
          logic: true
        }
      case ACTION_TYPES.FAILURE:
        return {
          ...state,
          logic: false
        }
      case ACTION_TYPES.USER_INPUT:
        return {
          ...state,
          user_data: action.payload
        }
      default:
        return state
    }
}

export default testReducer;