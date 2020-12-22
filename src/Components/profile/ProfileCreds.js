import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class ProfileCreds extends Component {
  render() {

    const { education, experience } = this.props; 

    

    const expItems = experience.map(exp => {

      const from = (
        <Moment format="MM/DD/YYYY"> 
          {exp.from} 
        </Moment>
      );

      const to = exp.to === null ? ('presnet') : (
        <Moment format="MM/DD/YYYY">
          {exp.to}
        </Moment>
      );

      return (
        <li key={exp._id} className="list-group-item">
          <h4> {exp.company} </h4>
          <p> {from} -  {to} </p>
          <p> <strong>Position:</strong> {exp.title} </p>
          <p> {exp.location === '' ? null : (<span><strong>Location:</strong> {exp.location}</span>)} </p>
          <p> {exp.description === '' ? null : (<span><strong>Description:</strong> {exp.description}</span>)} </p>
        </li>
      );
    });

    const eduItems = education.map(edu => {

      const from = (
        <Moment format="MM/DD/YYYY">
          {edu.from}
        </Moment>
      );

      const to = edu.to === null ? ('presnet') : (
        <Moment format="MM/DD/YYYY">
          {edu.to}
        </Moment>
      );

      return (
        <li key={edu._id} className="list-group-item">
          <h4> {edu.school} </h4>
          <p> {from} -  {to} </p>
          <p> <strong>Degree:</strong> {edu.degree} </p>
          <p> <strong>Field of Study:</strong> {edu.fieldofstudy} </p>
          <p> {edu.description === '' ? null : (<span><strong>Description:</strong> {edu.description}</span>)} </p>
        </li>
      );
    });

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group"> {expItems} </ul>
          ) : (
            <p className="text-center">No Experience</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {expItems.length > 0 ? (
            <ul className="list-group"> {eduItems} </ul>
          ) : (
            <p className="text-center">No Education</p>
          )}
        </div>
      </div>
    )
  }
}


ProfileCreds.propTypes = {
  education: PropTypes.array.isRequired,
  experience: PropTypes.array.isRequired
}

export default ProfileCreds;