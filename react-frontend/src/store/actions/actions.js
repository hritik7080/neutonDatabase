import * as ACTION_TYPES from './action_types'
import history from "../../utils/history"
// TEST actions

export const SUCCESS = {
  type: ACTION_TYPES.SUCCESS
}

export const FAILURE = {
  type: ACTION_TYPES.FAILURE
}

export const success = () => {
  return {
    type: ACTION_TYPES.SUCCESS
  }
}

export const failure = () => {
  return {
    type: ACTION_TYPES.FAILURE
  }
}

export const user_input = (text) => {
  return {
    type: ACTION_TYPES.USER_INPUT,
    payload: text
  }
}


// Profile Actions

export const get_contact = () =>{

  console.log("Getting user details...");

  return{
    type: ACTION_TYPES.GET_USER_CONTACT
  }
}

export const subscribe = (text) => {
  return{
    type: ACTION_TYPES.SUBSCRIBE_SUCCESS,
    payload: text
  }
}

export const feedback_success = () => {
  return {
    type: ACTION_TYPES.FEEDBACK_SUCCESS,
  }
}


// Track Actions

export const save_track_metadata = (data) => {
  return {
    type: ACTION_TYPES.SAVE_TRACK_METADATA,
    payload: data
  }
}

export const save_one_track_data = (data) => {
  return {
    type: ACTION_TYPES.SAVE_ONE_TRACK_DATA,
    payload: data
  }
}

// Course Actions

export const save_course_data = (data) => {
  return {
    type: ACTION_TYPES.SAVE_COURSE_DATA,
    payload: data
  }
}


// LOGIN ACTIONS

export const login_success = (data) => {
  try {
    localStorage.setItem("neuton_userToken", data.token)
  } catch (error) {
    console.log(error);
  }
  return{
    type: ACTION_TYPES.LOGIN_SUCCESS,
    userToken: data.token
  }
}

export const logout_success = () => {
  try {
    localStorage.removeItem("neuton_userToken")
    history.push('/')
  } catch (error) {
    console.log(error);
  }
  return{
    type: ACTION_TYPES.LOGOUT_SUCCESS
  }
}