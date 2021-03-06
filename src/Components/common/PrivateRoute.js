import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRouter = ({component: Component, auth, ...rest}) => (
    <Route 
        {...rest}
        render = {props => 
            auth.isAuthenticated === true ? 
            (<Component {...props} />) : 
            (<Redirect to="/login" />)
        }
    />
);



PrivateRouter.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
    auth: state.auth 
});

const mapDispatchToProps = {

}

export default connect(
    mapStateToProp,
    mapDispatchToProps
)(PrivateRouter);