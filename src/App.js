import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions'; 
import './App.css';

/**
 * React-redux
 */

import { Provider } from 'react-redux';
import store from './store/store';

import PrivateRoute from './Components/common/PrivateRoute';

/**
 * Components layouts
 */
import Navbar from './Components/common/Navbar';
import Landing from './Components/layout/Landing';
import Footer from './Components/layout/Footer';
import Register from './Components/auth/Register';
import Login from './Components/auth/Login';
import Dashboard from './Components/dashboard/Dashboard';
import CreateProfile from './Components/create-profile/CreateProfile';
import EditProfile from './Components/edit-profile/EditProfile';
import AddExperience from './Components/add-credentials/AddExperience';
import AddEducation from './Components/add-credentials/AddEducation';
import Profiles from './Components/profiles/Profiles';
import Profile from './Components/profile/Profile';
import NotFound from './Components/not-found/NotFound';
import Posts from './Components/posts/Posts';
import Post from './Components/post/Post';

/**
 * Check for token 
 */


 if(localStorage.jwtToken) {


   /**
    * Decode token and get user info and exp
    */

    const decoded = jwt_decode(localStorage.jwtToken); 

    /**
     * Set user and isAuthenticated
     */

     store.dispatch(setCurrentUser(decoded));

     /**
      * Check for expired token
      */

      const currentTime = Date.now() / 1000; 
      if(decoded.exp < currentTime) {

        /**
         * Logout user
         */

         store.dispatch(logoutUser()); 

         /**
          * Clear current Profile
          */
         store.dispatch(clearCurrentProfile());

          /**
           * Redirect to login
           */

           window.location.href = '/login';

      }
 }

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container" style={{ minHeight: '77vh'}}>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:handle" component={Profile} />
                <Route exact path="/not-found" component={NotFound} />
                
                <PrivateRoute exact path='/dashboard' component={Dashboard} /> 
                <PrivateRoute exact path='/create-profile' component={CreateProfile} />
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
                <PrivateRoute exact path="/add-education" component={AddEducation} />
                <PrivateRoute exact path="/feed" component={Posts} />
                <PrivateRoute exact path="/post/:id" component={Post} />
                <Route path="*" component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
