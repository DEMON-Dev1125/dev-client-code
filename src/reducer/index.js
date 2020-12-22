import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import errorsReducer from './errorsReducer';
import postReducer from './postReducer';



/**
 * Combines the reducers so you can call 
 * props.auth to use the authReducers reducer
 */

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    errors: errorsReducer,
    post: postReducer
})