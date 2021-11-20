import { applyMiddleware, combineReducers, createStore } from "redux";
import trackReducer from "./trackReducer";
import profileReducer from "./profileReducer";
import testReducer from "./testReducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            track: trackReducer,
            profile: profileReducer,
            test: testReducer
        }),
        applyMiddleware(thunk, logger)
    )
    return store
}

export const rootReducer = combineReducers({

})