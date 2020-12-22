import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';
import { composeWithDevTools } from 'redux-devtools-extension';


const middleware = [thunk];

const initialState = {};

/**
 * The only store enhancer that ships with Redux is applyMiddleware
 * others are third party middlewares 
 * 
 * @param { rootReducer , preloadedState {}, applyMiddleware }
 */

/**
 * Compose allows you to call deeply nested functions, without the rightward drift.
 */

const store = createStore(
    rootReducer, 
    initialState, 
    composeWithDevTools(
        applyMiddleware(...middleware)
        )
    );


export default store; 