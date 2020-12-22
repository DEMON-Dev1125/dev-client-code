import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import PropTypes from 'prop-types'; 


 class ProfileHeader extends Component {

  get profileSocial() {

    const { profile } = this.props; 

    if(profile.social) {

      return Object.keys(profile.social).map(platform => {
        return isEmpty(profile.social[platform]) ? null :
          (
            <a key={platform} className="text-white p-2" href={profile.social[platform]} >
              <i className={`fab fa-${platform} fa-2x`}></i>
            </a>
          )
      })
    } 

    return null; 
  }

  render() {

    const { profile } = this.props; 

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img className="rounded-circle" src={profile.user.avatar} alt="" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">{profile.status} {isEmpty(profile.company) ? null : (<span> at {profile.company} </span>)}</p>
              {isEmpty(profile.location) ? null : (<p> {profile.location} </p>)}
              <p>
                {
                  isEmpty(profile.website) ? null : 
                  (
                    <a className="text-white p-2" href={profile.website} >
                      <i className="fas fa-globe fa-2x"></i>
                    </a>
                  )
                }

                { this.profileSocial }
                
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
}


export default ProfileHeader;