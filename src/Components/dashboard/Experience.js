import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {

    static propTypes = {
        experience: PropTypes.array.isRequired,
        deleteExperience: PropTypes.func.isRequired
    }

    onDeleteClick(id) {

        this.props.deleteExperience(id); 
    }

  render() {

    const experience = this.props.experience.map(exp => {
        const from = (
            <Moment format="MM/DD/YYYY">
                {exp.from}
            </Moment>
        );

        const to = exp.current ? 'present' : (
            <Moment format="MM/DD/YYYY">
                {exp.to}
            </Moment>
        );
        
        return (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    {from} - {to}
                </td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={this.onDeleteClick.bind(this, exp._id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        )
    });

    return (
      <div>
            <h4 className="mb-4">Experience Credentials</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Years</th>
                        <th></th>
                    </tr>
                    {experience}
                </thead>
            </table>
      </div>
    )
  }
}


const mapDispatchToProps = {
    deleteExperience
}

export default connect(
    null,
    mapDispatchToProps
)(Experience);