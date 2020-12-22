import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {

    static propTypes = {
        education: PropTypes.array.isRequired,
        deleteEducation: PropTypes.func.isRequired
    }

    onDeleteClick(id) {

        this.props.deleteEducation(id);
    }

    render() {

        const education = this.props.education.map(edu => {
            const from = (
                <Moment format="MM/DD/YYYY">
                    {edu.from}
                </Moment>
            );

            const to = edu.current ? 'present' : (
                <Moment format="MM/DD/YYYY">
                    {edu.to}
                </Moment>
            );

            return (
                <tr key={edu._id}>
                    <td>{edu.school}</td>
                    <td>{edu.degree}</td>
                    <td>{edu.fieldofstudy}</td>
                    <td>
                        {from} - {to}
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={this.onDeleteClick.bind(this, edu._id)}
                        >
                            Delete
                    </button>
                    </td>
                </tr>
            )
        });

        return (
            <div>
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Field of Study</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                        {education}
                    </thead>
                </table>
            </div>
        )
    }
}


const mapDispatchToProps = {
    deleteEducation
}

export default connect(
    null,
    mapDispatchToProps
)(Education);