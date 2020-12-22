import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/forms/TextFieldGroup';
import TextAreaFieldGroup from '../common/forms/TextAreaFieldGroup';
import InputGroup from '../common/forms/InputGroup';
import SelectListGroup from '../common/forms/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            displaySocialInput: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            gitubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const {
            handle,
            company,
            website,
            location,
            status,
            skills,
            githubusername,
            bio,
            twitter,
            facebook,
            linkedin,
            youtube,
            instagram
        } = this.state;

        const { history } = this.props;

        const profileData = {
            handle,
            company,
            website,
            location,
            status,
            skills,
            githubusername,
            bio,
            twitter,
            facebook,
            linkedin,
            youtube,
            instagram
        };

        this.props.createProfile(profileData, history);
    }

    onChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    render() {

        const { errors, displaySocialInput } = this.state; 

        let socialInputs; 

        if(displaySocialInput) {
            socialInputs = (
                <div>
                    <InputGroup 
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />
                    <InputGroup
                        placeholder="Facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputGroup
                        placeholder="YouTube Profile URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />
                    <InputGroup
                        placeholder="LinkedIn Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />
                    <InputGroup
                        placeholder="Instagram Profile URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>
            );
        }

        /**
         * Select options for status
         */
        const options = [
            { label: '* Select Professional Status', value: 0},
            { label: 'Developer', value: 'developer' },
            { label: 'Junior Developer', value: 'junior developer' },
            { label: 'Senior Developer', value: 'senior developer' },
            { label: 'Manager', value: 'manager' },
            { label: 'Student or Leanring', value: 'student or learning' },
            { label: 'Instructor', value: 'instructor' },
            { label: 'Intern', value: 'intern' },
            { label: 'Other', value: 'other' },
        ];

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Create Your Profile</h1>
                        <p className="lead text-center">
                            Let's get some information to make your profile standout 
                        </p>
                        <small className="d-block pb-3">* = require fields</small>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                placeholder="* Profile Hanlder"
                                name="handle"
                                value={this.state.handle}
                                onChange={this.onChange}
                                error={errors.handle}
                                info="A unique handle for your profile URL. Your full name, company name, nickname"
                            />
                            <SelectListGroup
                                placeholder="Status"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                                error={errors.status}
                                options={options}
                                info="Give us an idea where you are in your career"
                            />
                            <TextFieldGroup
                                placeholder="Company"
                                name="company"
                                value={this.state.company}
                                onChange={this.onChange}
                                error={errors.company}
                                info="Could be your own company or one you work for"
                            />
                            <TextFieldGroup
                                placeholder="Website"
                                name="website"
                                value={this.state.website}
                                onChange={this.onChange}
                                error={errors.website}
                                info="Could be your own website or a company one"
                            />
                            <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value={this.state.location}
                                onChange={this.onChange}
                                error={errors.location}
                                info="City or city &amp; state suggested (eg. Boston, MA)"
                            />
                            <TextFieldGroup
                                placeholder="Skills"
                                name="skills"
                                value={this.state.skills}
                                onChange={this.onChange}
                                error={errors.skills}
                                info="Please use comma separated values (eg. HTML,CSS,JavaScript, PHP)"
                            />
                            <TextFieldGroup
                                placeholder="Github Username"
                                name="githubusername"
                                value={this.state.gitubusername}
                                onChange={this.onChange}
                                error={errors.gitubusername}
                                info="If you want your latest repos and a Github link, include your username"
                            />
                            <TextAreaFieldGroup
                                placeholder="Bio"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.onChange}
                                error={errors.bio}
                                info="Tell us a little about yourself"
                            />
                            <div className="mb-3">
                                <button 
                                type="button"
                                onClick={() => {
                                    this.setState(prevState => ({
                                        displaySocialInput: !prevState.displaySocialInput
                                    }))
                                }} className="btn btn-light">
                                    Add Social Network Links
                                </button>
                                <span className="text-muted">Optional</span>
                            </div>
                            {socialInputs}
                            <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

const mapDispatchToProps = {
    createProfile
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CreateProfile));