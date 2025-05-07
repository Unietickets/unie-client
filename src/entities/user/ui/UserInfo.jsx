import moment from 'moment';
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
      <br />
      {user.pendingBalance && (
        <span title={`${moment(user?.pendingEdgeDate).format('YYYY-MM-DD/hh:mm')} - дата размораживания средств`}>
          pending balance: {user.pendingBalance} $
        </span>
      )}
      <br />
      active balance: {user.activeBalance} $
    </div>
  );
};
