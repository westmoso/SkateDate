import React from 'react';


import './UsersList.css';

const UsersList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No users found</h2>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map(user => (
        key = { user.id }
          id = { user.id }
          img = { user.image }
          name = { user.name }
          placeCount = { user.places.length }
      ))}
    </ul>
  );
};

export default UsersList;
