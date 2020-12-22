import axios from '../utils/axiosGlobalSettings';
import setAuthToken from '../utils/axiosGlobalSettings';
import jwt_decode from 'jwt-decode';


/**
 * Action Types
 */

import { GET_ERRORS, SET_CURRENT_USER } from './types';

/**
 * Register user
 */

export const  registationUser = (userData, history) =>  dispatch => {

    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => 
            /**
             * Dispatch is used because this is an async method
             */
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}


/**
 * Login user
 */

 export const loginUser = userData => dispatch => {

     axios.post('/api/users/login', userData)
        .then(res => {

            /**
             * capture token to save to local storage
             */

            const { token } = res.data;
            localStorage.setItem('jwtToken', token); 

            /**
             * Set the token to auth header
             */

             setAuthToken(token); 

             /**
              * Decode token to get user data
              */

              const decoded = jwt_decode(token); 

              /**
               * Set current user 
               */

               dispatch(setCurrentUser(decoded));
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
 }

 /**
  * Set Current user function 
  * @param { Object } decoded
  * @return { Object }
  */

  export const setCurrentUser = decoded => {

    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
  }

  /**
   * Log user out
   * @param {} dispatch 
   */

   export const logoutUser = () => dispatch => {
       /**
        * Remove token from localStorage
        */

        localStorage.removeItem('jwtToken'); 

        /**
         * Remove auth header from future requests
         */

         setAuthToken(false); 

         /**
          * Set current user to {} which will set isAuthenticated to false
          */

          dispatch(setCurrentUser({}));
   }