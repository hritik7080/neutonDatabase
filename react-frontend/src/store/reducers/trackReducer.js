import * as ACTION_TYPES from '../actions/action_types'

const initialState = {
    isStarting: true, 
    trackMetaData: [],
    oneTrackData: [],
    courseData: []
}

const trackReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTION_TYPES.SAVE_TRACK_METADATA:
            return {
                ...state,
                isStarting: false,
                trackMetaData: action.payload
            }
        case ACTION_TYPES.SAVE_ONE_TRACK_DATA:
            return {
                ...state,
                oneTrackData: action.payload
            }
        case ACTION_TYPES.SAVE_COURSE_DATA:
            return {
                ...state,
                courseData: action.payload
            }
      default:
        return state
    }
}

export default trackReducer;