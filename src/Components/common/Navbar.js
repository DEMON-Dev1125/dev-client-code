import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';

import PropTypes from 'prop-types'; 
import { connect } from 'react-redux'; 
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class NavbarComponent extends Component {
    constructor(props) {
        super(props); 

        this.toggle = this.toggle.bind(this); 
        this.onLogoutClick = this.onLogoutClick.bind(this);

        this.state = {
            isOpen: false
        }
    }


    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onLogoutClick(e) {

        e.preventDefault(); 
        this.props.clearCurrentProfile();
        this.props.logoutUser(); 
    }


  render() {

    /**
     * Dynamically render header based on user logged in or not
     */

     const { isAuthenticated, user  } = this.props.auth; 

     const authLinks = (
         <Nav className="navbar-nav ml-auto">
            <Link className="nav-link" to="/feed">Post Feed</Link>
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
             <NavItem>
                <Link to="/" onClick={this.onLogoutClick} className='nav-link'> 
                    <img className="rounded-circle" src={user.avatar} alt={user.name} style={{width: '25px', marginRight: '5px'}} title="You must have a Gravatar connected to your email to display an image" />
                    Logout
                </Link>
             </NavItem>
         </Nav>
     );

      const guestLinks = (
          <Nav className="navbar-nav ml-auto">
              <NavItem>
                  <Link className="nav-link" to="/register">Sign Up</Link>
              </NavItem>
              <NavItem>
                  <Link className="nav-link" to="/login">Login</Link>
              </NavItem>
          </Nav>
      );
    
    return (
        <Navbar className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
                <NavbarBrand href="/">DevConnector</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="navbar-nav mr-auto">
                        <NavItem>
                            <Link className="nav-link" to="/profiles">Developers</Link>
                        </NavItem>
                    </Nav>
                    
                    {isAuthenticated ? authLinks : guestLinks}
                    
                </Collapse>
            </div>
        </Navbar>
    )
  }
}

NavbarComponent.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}; 

const mapStateToProps = state => ({
    auth: state.auth 
}); 

const mapDispatchToProps = {
    logoutUser,
    clearCurrentProfile
}; 

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(NavbarComponent); 