import React, { Fragment } from 'react';
import Contact from './Contact';
import { Consumer } from '../../context';

const Contacts = props => {
  return (
    <Consumer>
      {value => {
        const { contacts } = value;
        return (
          <Fragment>
            <h1 className="display-4 mb-2">
              <span className="text-danger">Contact</span> List
            </h1>
            {contacts.map(contact => (
              <Contact key={contact.id} contact={contact} />
            ))}
          </Fragment>
        );
      }}
    </Consumer>
  );
};

Contacts.propTypes = {};

export default Contacts;
