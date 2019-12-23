import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';

const Contact = props => {
  const [showContactInfo, onContactInfo] = useState(false);

  const { id, name, email, phone } = props.contact;

  const onShowClick = e => {
    onContactInfo(!showContactInfo);
  };

  const onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (e) {
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    }
  };

  return (
    <Consumer>
      {value => {
        const { dispatch } = value;
        return (
          <div className="card card-body mb-3">
            <h4>
              {name}{' '}
              <i
                onClick={() => onShowClick()}
                className="fas fa-sort-down"
                style={{ cursor: 'pointer' }}
              ></i>
              <i
                className="fas fa-times"
                style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                onClick={() => onDeleteClick(id, dispatch)}
              ></i>
              <Link to={`contact/edit/${id}`}>
                <i
                  className="fas fa-pencil-alt"
                  style={{
                    float: 'right',
                    marginRight: '1rem',
                    cursor: 'pointer',
                    color: 'black'
                  }}
                ></i>
              </Link>
            </h4>
            {showContactInfo ? (
              <Fragment>
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              </Fragment>
            ) : null}
          </div>
        );
      }}
    </Consumer>
  );
};

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
