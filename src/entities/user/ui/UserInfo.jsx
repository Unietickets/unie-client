import React from 'react';

export const UserInfo = ({ user }) => {
  const { email, name } = user;
  
  return user && (
    <div>
      <strong>Info</strong>
      <br />
      email: {email}
      <br />
      name: {name}
    </div>
  );
};
