import React, { useState, useEffect } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

const EditContact = props => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    errors: {}
  });

  const { name, email, phone, errors } = formData;

  useEffect(() => {
    const { id } = props.match.params;
    const fetchData = async id => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      const contact = res.data;

      setFormData({
        ...formData,
        name: contact.name,
        email: contact.email,
        phone: contact.phone
      });
    };

    fetchData(id);
  }, []);

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e, dispatch) => {
    e.preventDefault();

    // Check For Errors
    if (name === '') {
      setFormData({ errors: { name: 'Name is required' } });
      return;
    }

    if (email === undefined) {
      setFormData({ errors: { email: 'Email is required' } });
      return;
    }

    if (phone === undefined) {
      setFormData({ errors: { phone: 'Phone is required' } });
      return;
    }

    const updContact = {
      name,
      email,
      phone
    };

    const { id } = props.match.params;

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );

    dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

    // Clear State
    setFormData({ name: '', email: '', phone: '', errors: {} });

    // Redirect
    props.history.push('/');
  };

  return (
    <Consumer>
      {value => {
        const { dispatch } = value;
        return (
          <div className="card mb-3">
            <div className="card-header">Edit Contact</div>
            <div className="card-body">
              <form onSubmit={e => onSubmit(e, dispatch)}>
                <TextInputGroup
                  label="Name"
                  name="name"
                  placeholder="Enter Name"
                  value={name || ''}
                  onChange={onChange}
                  error={errors.name}
                />
                <TextInputGroup
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={email || ''}
                  onChange={onChange}
                  error={errors.email}
                />
                <TextInputGroup
                  label="Phone"
                  name="phone"
                  placeholder="Enter Phone"
                  value={phone || ''}
                  onChange={onChange}
                  error={errors.phone}
                />
                <input
                  type="submit"
                  value="Update Contact"
                  className="btn btn-light btn-block"
                />
              </form>
            </div>
          </div>
        );
      }}
    </Consumer>
  );
};

export default EditContact;
