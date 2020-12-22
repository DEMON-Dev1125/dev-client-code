import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registationUser } from '../../actions/authActions';


/**
 * Components 
 */

import TextFieldGroup from '../common/forms/TextFieldGroup';


class Register extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }; 

        this.onChangeField = this.onChangeField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * React Lifecycles 
     */

    componentDidMount() {

        if (this.props.auth.isAuthenticated) {

            this.props.history.push('/dashboard');
        }

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors}); 
        }
    }


    onChangeField(e) {

        this.setState({[e.target.name] : e.target.value })
    }

    onSubmit(e) {

        e.preventDefault(); 

        /**
         * TODO: setup up a redux store
         */

         const newUser = {
             name: this.state.name,
             email: this.state.email,
             password: this.state.password,
             password2: this.state.password2
         }; 

        this.props.registationUser(newUser, this.props.history);
    }

  render() {

    const { errors } = this.state; 

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your DevConnector account</p>
                        <form noValidate onSubmit={this.onSubmit}>

                            <TextFieldGroup
                                placeholder="Name"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChangeField}
                                error={errors.name}
                            /> 

                            <TextFieldGroup
                                placeholder="Email Address"
                                name="email"
                                type="email" 
                                value={this.state.email}
                                onChange={this.onChangeField}
                                error={errors.email}
                                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                            /> 

                            <TextFieldGroup
                                placeholder="Password"
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.onChangeField}
                                error={errors.password}
                            /> 

                            <TextFieldGroup
                                placeholder="Confirm Password"
                                name="password2"
                                type="password"
                                value={this.state.password2}
                                onChange={this.onChangeField}
                                error={errors.password2}
                            /> 

                            <input 
                                type="submit" 
                                className="btn btn-info btn-block mt-4" 
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

Register.propTypes = {
    registationUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
} 

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

const mapDispatchToProps = {
    registationUser
}; 

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(withRouter(Register));