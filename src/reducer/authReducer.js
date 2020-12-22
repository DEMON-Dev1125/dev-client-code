import isEmpty from '../validation/is-empty';

/**
 * Action Types 
 */

 import { SET_CURRENT_USER } from '../actions/types';


/**
 * Setting the inital state for the 
 * auth reducers 
 */

 const initialState = {
     isAuthenticated: false,
     user: {}
 };

 /**
  * @param { state {}, actions {} } 
  * @return { state } 
  * 
  */

 export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }

        default:
            return state; 
    }
 }